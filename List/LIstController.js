app.controller('ListController', ListController); 

ListController.$inject = ['$scope' , 'dataService' ,"$location"];

function ListController($scope, dataService ,  $location ) {

        $scope.goUpdateItem =function(itemId){
            $location.path("update/"+itemId);
        }

        this.getMovies = function() {
            dataService.getMovies()
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

// app.controller('ListController', ['$scope', 'dataService' ,function($scope, dataService){
//     console.log('yos');
//     $scope.movies = [];

//     this.getMovies = function() {
//         dataService.getMovies()
//             .then(function(movies) {
//                 $scope.movies = movies;
//                 console.log('movies returned to controller.');
//             },
//             function(data) {
//                 console.log('movies retrieval failed.')
//             });
//     };
    
//     this.getMovies();
// }]);
