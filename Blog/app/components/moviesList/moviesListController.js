app.controller('moviesListController', moviesListController); 

moviesListController.$inject = ['$scope' , 'moviesService' ,"$location"];

function moviesListController($scope, moviesService ,  $location ) {


       console.log("moviesListController");

        $scope.goUpdateItem =function(itemId){
            $location.path("edit/"+itemId);
        }

        this.getMovies = function() {
            moviesService.getMovies()
                .then(function(data) {
                    $scope.movies = data;
                    console.log('movies returned to controller.');
                },
                function(data) {
                    console.log('movies retrieval failed.')
                });
        };
        
        this.getMovies();
}


