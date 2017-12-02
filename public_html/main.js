function App($scope) {
 $scope.placeholder = 4;
 $scope.logo_url = "";
 $scope.currentURL = "yooo";
 $scope.loader = false;
 $scope.infoCard = false;
 $scope.loadingTitle = "Searching for Company Data...";

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

      var industry = '';

      var saas = ['enterprise software', 'enterprise', 'b2b', 'saas', 'machine learning', 'security', 'software development'];
      var fintech = ['finance', 'money', 'fintech', 'market research', 'payments', 'banking', 'bitcoin'];
      var ecommerce = ['retail', 'e-commerce', 'marketplace', 'fashion'];
      var ai = ['artificial intelligence', 'ai', 'neural networks'];
      var healthcare = ['healthcare', 'healthcare providers', 'medical devices', 'pharmaceuticals']

      var findOne = function (haystack, arr) {
          return arr.some(function (v) {
              return haystack.indexOf(v) >= 0;
          });
      };

      if (findOne($scope.industries, saas) == true) {
        industry = 'saas';
      } else if (findOne($scope.industries, fintech) == true) {
        industry = 'fintech';
      }  else if (findOne($scope.industries, ecommerce) == true) {
        industry = 'e-commerce';
      }  else if (findOne($scope.industries, ai) == true) {
        industry = 'ai%20startup';
      }  else if (findOne($scope.industries, healthcare) == true) {
        industry = 'healthcare%20tech';
      }

      // if (_.contains($scope.industries, 'enterprise software' || 'enterprise' || 'b2b' || 'saas' || 'machine learning' || 'security')) {
      //   industry == 'saas';
      // }
      // else if (_.contains($scope.industries, 'finance' || 'money' || 'fintech' || 'market research' || 'payments' || 'banking' || 'bitcoin')) {
      //   industry == 'fintech';
      // }
      // else if (_.contains($scope.industries, 'retail' || 'e-commerce' || 'marketplace' || 'fashion')) {
      //   industry == 'e-commerce';
      // }
      // else if (_.contains($scope.industries, 'artificial intelligence' || 'AI' || 'neural networks')) {
      //   industry == 'ai%20startup';
      // }
      // else if (_.contains($scope.industries, 'healthcare' || 'healthcare providers' || 'medical devices' || 'pharmaceuticals')) {
      //   industry == 'healthcare%20tech';
      // };
      //
      // console.log(industry);

      marketNews(industry);
    });

 };

  function marketNews(industry) {
    $.getJSON('https://newsapi.org/v2/everything?q='+ 'fintech%20industry' + '&sortBy=popularity&language=en&apiKey=96e8a4ea89e24a5aa48ed02ff80f7a2a', function(news) {
      console.log(news);
      // $scope.industryNews = news.articles[];
      // setTimeout(function () {
      //   console.log('waiting...');
      // }, 1000);

      marketNewsAnalysis(news.articles);

    });
  };

 function marketNewsAnalysis(data) {
   $.post(
     'https://apiv2.indico.io/sentiment',
     JSON.stringify({
       'api_key': "b4f6e45ef5da987fb05dd30a800f85fc",
       'data': JSON.stringify(data),
     })
   ).then(function(res) {
     console.log(res);
     console.log(res.results);

     $scope.yr17 = res.results;

     $scope.$apply();

    });

    console.log($scope.sentimentArray);
 };

}
