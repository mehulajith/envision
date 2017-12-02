function App($scope) {
  $scope.placeholder = 4;
  $scope.currentURL = "yooo"
  $scope.loader = false;

  $scope.getCompanyData = function() {
    $scope.loader = true;
  };

  function doSearch() {
  	ajax.open("GET", "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" + input.value.trim(), true);
  		ajax.onload = function() {
  			var sHTML = '';
        console.log(ajax.responseText);
  			JSON.parse(ajax.responseText).map(function(i) {

          var logoArray = [i.logo]
          //
          // $scope.name = i.name
          // $scope.domain = i.domain
          // $scope.logo = i.logo

          console.log(logoArray);

  			});
  			// result.innerHTML = sHTML;
  		};
  		ajax.send();
  }


// Get URL of current tab w/ Chrome Extension
// chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
//
//      // since only one tab should be active and in the current window at once
//      // the return variable should only have one entry
//      var activeTab = arrayOfTabs[0];
//      var activeTabId = activeTab.id; // or do whatever you need
//      console.log(activeTab.id)
//   });

}

// chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true
// }, function(tabs) {
//     // and use that tab to fill in out title and url
//     var tab = tabs[0];
//     console.log(tab.url);
//     alert(tab.url);
// });
