app.controller('movieEditorController', ['$scope' , 'moviesService' , '$routeParams' , '$q' , "$location" ,
        
function($scope,moviesService,$routeParams,$q,$location) {


    this.updateState = function(){
        $scope.movie ? $scope.viewState = 'edit' : 'add';
    }

    this.changeView =function(){
        if($scope.viewState=='edit'){
            $scope.btnSaveText = "Update";
        }else{
            $scope.btnSaveText = "Add";
        }
    }

    this.getMovie = function(itemId) { 
        var def = $q.defer();
        moviesService.getMovie(itemId).then(function(data) {
          if(data){
            console.log("Selected movie:",  data);
          }else{
            console.log("movie not found");
          }
          def.resolve(data);
        },
        function(data) {
            console.log('movie retrieval failed.')
            def.resolve(null);
        });
        return def.promise;
    };

    $scope.saveMovie = function(){
        if($scope.viewState=='edit'){
            moviesService.updateMovie($scope.movie).then(function(){
                $location.path("movies-list");
            });
        }
        else{  //"Add
            moviesService.addMovie($scope.movie).then(function(){
                $location.path("movies-list");
            });

        }
    }

    $scope.deleteMovie = function(){
        moviesService.deleteMovie($scope.movie.id).then(function(){
            $location.path("movies-list");
        });
    }

    
    this.init = function(){
        this.itemId = $routeParams.id;
        if(this.itemId){
            this.getMovie(this.itemId).then(function(item){
                $scope.movie = item;
                this.updateState()
                this.changeView();
            }.bind(this));
        }
        else{
            this.updateState()
            this.changeView();
        }
    }

    this.init()

  }]);