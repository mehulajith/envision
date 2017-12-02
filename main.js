
function App($scope) {
  $scope.placeholder = 4;

  

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



}
