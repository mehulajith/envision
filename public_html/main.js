function App($scope) {
 $scope.placeholder = 4;
 $scope.logo_url = ""
 $scope.currentURL = "yooo"
 $scope.loader = false;
 $scope.infoCard = false;
 $scope.loadingTitle = "Searching for Company Data..."

 // Company and finance data
 $scope.company = '';
 $scope.description = '';
 $scope.employeesNow = 0;
 $scope.employees6moAgo = 0;
 $scope.totalfunding = 0;
 $scope.lastfundingdate = 0;
 $scope.avgYearlyFunding = 0;
 $scope.employeeChange = 0;
 $scope.founded = 0;
 $scope.industries = '';

 // Sentiment per year
 $scope.yr13 = 0.0;
 $scope.yr14 = 0.0;
 $scope.yr15 = 0.0;
 $scope.yr16 = 0.0;
 $scope.yr17 = 0.0;

 // Industry news
 $scope.industryNews = [];

 //TabCategories
 $scope.Company = true;
 $scope.Funding = false;
 $scope.Market = false;

// Tabs
 $scope.companyTab = function() {
   $scope.Company = true;
   $scope.Funding = false;
   $scope.Market = false;
 };
 $scope.fundingTab = function() {
   $scope.Company = false;
   $scope.Funding = true;
   $scope.Market = false;
 };
 $scope.marketTab = function() {
   $scope.Company = false;
   $scope.Funding = false;
   $scope.Market = true;
 };

 $scope.getCompanyData = function() {
   companyInfo();
   $scope.loader = true;

   setTimeout(function () {
      $scope.infoCard = true;
      $scope.loadingText = "Analyzing Data";
      $scope.$apply();
    }, 2000);

    $scope.$apply();

 };

 // When key up
 $( ".form-control" ).keyup(function() {
   $scope.logo_url = 'http://logo.clearbit.com/' + $(this).val();
   console.log($scope.logo_url);
   $scope.$apply();
 });


 // Getting Data for each tab category

 function companyInfo() {

    $.getJSON('https://api.mattermark.com/domains/' + $('.form-control').val() + '/companies?key=34cc41d72b44b5c8ed19ee44361829eeb2b53edcdb030731fef654f6048d26d8', function(data) {
      console.log(data);
      $scope.company = data.name;
      $scope.description = data.description;
      $scope.employeesNow = data.employees;
      $scope.employees6moAgo = data.employees_6_months_ago;
      $scope.employeeChange = ((data.employees - data.employees_6_months_ago) / data.employees_6_months_ago).toFixed(2);
      $scope.employeeChange = $scope.employeeChange * 100;
      $scope.totalfunding = data.total_funding;
      var lastFunding = data.last_funding_date.substr(0, 4);
      $scope.lastfundingdate = lastFunding;
      var foundedYear = data.est_founding_date.substr(0, 4);
      $scope.founded = foundedYear;
      var avgFund = data.total_funding / (2017 - foundedYear);
      $scope.avgYearlyFunding = avgFund.toFixed(2);
      $scope.industries = data.industries;
      $scope.$apply();
      marketNews('saas');
    });

 }

function marketNews(industry) {
  for (x in ['2013', '2014', '2015', '2016', '2017']) {
  $.getJSON('https://newsapi.org/v2/everything?q='+ industry + '&from=' + x + '-01-01&to=' + x + '-01-12&sortBy=popularity&apiKey=96e8a4ea89e24a5aa48ed02ff80f7a2a', function(news) {
    console.log(news);
    // $scope.industryNews = news.articles[];
    marketNewsAnalysis(news.articles, x);
  });
  }
}

function marketNewsAnalysis(data, x) {
  $.post(
    'https://apiv2.indico.io/sentiment',
    JSON.stringify({
      'api_key': "b4f6e45ef5da987fb05dd30a800f85fc",
      'data': JSON.stringify(data),
    })
  ).then(function(res) {
    console.log(res)

    if (x == '2013') {
      $scope.yr13 = res
    } else if (x == '2014') {
      $scope.yr14 = res
    } else if (x == '2015') {
      $scope.yr15 = res
    } else if (x == '2016') {
      $scope.yr16 = res
    } else if (x == '2017') {
      $scope.yr17 = res
    }
    
    $scope.$apply();

   });
}



};
