var changeStyle = function() {
    var els = document.querySelectorAll(".main-wrapper");
    var inf = document.querySelectorAll(".main-wrapper-intro");
    for (var x = 0; x < els.length; x++){
    els[x].style.padding = '120px 0 100px';
    inf[x].style.display = 'none';}
}

var client = angular.module('ombdClient', []);
client.controller('searchController', function($scope, $http){
    $scope.movie = '';
    $scope.resultsClass = 'dn';
    $scope.hintClass = 'dn';
    $scope.placeholder = 'Enter the name of the movie';

    $scope.searchMovies = function() {
             
         if ($scope.movie != '') {
            setTimeout(function(){
                if ($scope.movie.length < 2) {
                    return
                } else {
                    $http.get("https://www.omdbapi.com/?s="+$scope.movie)
                    .then(function successCallback(response) {
                        $scope.resultsClass = 'dn'
                        $scope.hintClass = 'db';
                        $scope.hints = response.data.Search
                        return changeStyle(); 
                    }); 
                }
            }, 500)

        } else {
            $scope.resultsClass = 'dn'
        }
    }

    $scope.showMovie = function(imbdId) {
        if ($scope.movie != '') {
            var ombd = 'https://www.omdbapi.com/?';
            var urlType = ombd+'t='+$scope.movie;
            if (imbdId != undefined) {
                urlType = ombd+'i='+imbdId;
            }
            $scope.results = 'Waiting for data...';
            $scope.warning = '';
            $http.get(urlType)
            .then(function successCallback(response) {
                $scope.movie = '';
                $scope.placeholder = 'Enter the name of next movie';
                $scope.hintClass = 'dn'
                $scope.resultsClass = 'db'
                if (response.data.Type != "game") {
                    $scope.results = response.data;
                    $scope.name = response.data.name;
                    $scope.img = response.data.Poster
                } else {
                    $scope.movie = '';
                    $scope.placeholder = 'Enter the name of the movie';
                    $scope.warning = "Ups! Games not allowed!"
                }
            });
        } else {
           $scope.placeholder = 'Enter the name of next movie';
            $scope.resultsClass = 'dn'
            
        }
    }
})
