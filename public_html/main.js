function App($scope) {
 $scope.placeholder = 4;
 $scope.logo_url = ""
 $scope.currentURL = "yooo"
 $scope.loader = false;
 $scope.infoCard = false;
 $scope.loadingTitle = "Searching for Company Data..."

 // Company data
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
      $scope.employeeChange = (data.employees - data.employees_6_months_ago) / data.employees_6_months_ago;
      $scope.totalfunding = data.total_funding;
      var lastFunding = data.last_funding_date.substr(0, 4);
      $scope.lastfundingdate = lastFunding;
      var foundedYear = data.est_founding_date.substr(0, 4);
      $scope.founded = foundedYear;
      var avgFund = data.total_funding / foundedYear;
      $scope.avgYearlyFunding = avgFund;
      $scope.industries = data.industries;
      $scope.$apply();
    });

 }

 $.ajaxSetup({
  headers : {
    '_Token' : '2D21101015EE4060AD28DB78180FC1D7',
    'Access-Control-Allow-Origin':
  }
});

$.getJSON('https://globalnews.xignite.com/xGlobalNews.json/GetHistoricalMarketHeadlines?StartDate=11/2/2017&EndDate=12/1/2017 HTTP/1.1', function(json) {

  alert("Success");
  console.log(json);
});

 // function industryNews() {
 //   $.getJSON('https://globalnews.xignite.com/xGlobalNews.json/GetHistoricalMarketHeadlines?StartDate=11/2/2017&EndDate=12/1/2017 HTTP/1.1', function(news) {
 //     $.ajax({
 //       '_Token': '2D21101015EE4060AD28DB78180FC1D7';
 //     });
 //
 //     conosle.log(news);
 //
 //   });
 // }

};
