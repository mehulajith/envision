function App($scope) {
 $scope.placeholder = 4;
 $scope.currentURL = "yooo"
 $scope.loader = false;

 // Company data
 $scope.company = '';
 $scope.description = '';
 $scope.employeesNow = 0;
 $scope.employees6moAgo = 0;
 $scope.totalfunding = 0;
 $scope.lastfundingdate = 0;
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

 // Getting Data for each tab category

 function comanyInfo() {

    $.getJSON('https://api.mattermark.com/domains/glide.com/companies?key=34cc41d72b44b5c8ed19ee44361829eeb2b53edcdb030731fef654f6048d26d8', function(data) {
      console.log(data);
      $scope.company = data.name;
      $scope.description = data.description;
      $scope.employeesNow = data.employees;
      $scope.employees6moAgo = data.employees_6_months_ago;
      $scope.totalfunding = data.total_funding;
      $scope.lastfundingdate = data.last_funding_date;
      $scope.founded = data.est_founding_date;
      $scope.industries = data.industries;
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
