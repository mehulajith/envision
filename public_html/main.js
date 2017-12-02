function App($scope) {
 $scope.placeholder = 4;
 $scope.currentURL = "yooo"
 $scope.loader = false;

 // Company data
 $scope.company
 $scope.description
 $scope.employeesNow
 $scope.employees6moAgo
 $scope.totalfunding
 $scope.founded
 $scope.industries

 //TabCategories
 $scope.Company = true;
 $scope.Funding = false;
 $scope.Market = false;

 $scope.getCompanyData = function() {
   $scope.loader = true;
   comanyInfo()
 };

// Tabs
 $scope.companyTab = function() {
   
 };
 $scope.fundingTab = function() {

 };
 $scope.marketTab = function() {

 };


 function comanyInfo() {

    $.getJSON('https://api.mattermark.com/domains/glide.com/companies?key=34cc41d72b44b5c8ed19ee44361829eeb2b53edcdb030731fef654f6048d26d8', function(data) {
      console.log(data);
    });

 }

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

}
