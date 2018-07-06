'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
	
	
	$scope.dataSets = [
		{label:"Number of Memorizations",value:"https://lovely-mesa-verde-30277.herokuapp.com/api/memo"},
		{label:"Total time for Guess",value:"https://lovely-mesa-verde-30277.herokuapp.com/api/guessTimeTotal"},
		{label:"Total time in sessions",value:"https://lovely-mesa-verde-30277.herokuapp.com/api/guessTimeSession"},
		{label:"Distinct Users",value:"https://lovely-mesa-verde-30277.herokuapp.com/api/distinctUsers"},
		{label:"Total DB",value:"https://lovely-mesa-verde-30277.herokuapp.com/api/totaldb"}
	];
	
	$scope.selectedDataSet = 'https://lovely-mesa-verde-30277.herokuapp.com/api/distinctUsers';
	$scope.tableData = [];
	$scope.tableDataColumns = [];

	$scope.checkForData = function() {
		console.log($scope.selectedDataSet)
		$scope.getData();
	}

	$scope.getData = function(){
		$scope.tableData = [];
		$http.get($scope.selectedDataSet)
		    .then(function(response) {
		        $scope.tableData = response['data'];
		        $scope.tableDataColumns = Object.keys(response['data'][0]);
		        console.log($scope.tableData, $scope.tableDataColumns)
		    });
	}

	$scope.getData();
	
});
