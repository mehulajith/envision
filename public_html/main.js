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
      $scope.founded = data.est_founding_date;
      $scope.industries = data.industries;
    });

 }

 };

 // function doSearch() {
 //     ajax.open("GET", "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" + input.value.trim(), true);
 //         ajax.onload = function() {
 //             var sHTML = '';
 //       console.log(ajax.responseText);
 //             JSON.parse(ajax.responseText).map(function(i) {
 //
 //         var logoArray = [i.logo]
 //         //
 //         // $scope.name = i.name
 //         // $scope.domain = i.domain
 //         // $scope.logo = i.logo
 //
 //         console.log(logoArray);
 //
 //             });
 //             // result.innerHTML = sHTML;
 //         };
 //         ajax.send();
 // }
