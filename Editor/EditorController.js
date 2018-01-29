app.controller('EditorController', ['$scope' , 'dataService' , '$routeParams' , '$q' , "$location" , function($scope,dataService,$routeParams,$q,$location) {

    this.getItemId = ()=>{
        this.itemId = $routeParams.id;
    }


    this.setState = function(){
        $scope.movie ? $scope.stateId = 1 : 0
    }

    this.changeView =function(){
        if($scope.stateId==1){
            $scope.btnSaveText = "Update";
        }else{
            $scope.btnSaveText = "Add";
        }
    }

    this.getMovie = function(itemId) { 
        var def = $q.defer();
        dataService.getMovie(itemId).then(function(data) {
          if(data){
            console.log("Selected movie:",  $scope.movie);
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

    $scope.saveItem = function(){
        if($scope.stateId==1){ //Update

        }
        else{  //"Add
            dataService.addMovie($scope.movie).then(function(){
                $location.path("mylist");
            });

        }
    }

    $scope.deleteMovie = function(){
        dataService.deleteMovie($scope.movie.id).then(function(){
            $location.path("mylist");
        });
    }

    
    this.init = function(){
        this.getItemId();
        if(this.itemId){
            this.getMovie(this.itemId).then(function(item){
                $scope.movie = item;
                this.setState()
                this.changeView();
            }.bind(this));
        }
        else{
            this.setState()
            this.changeView();
        }
    }

    this.init()

  }]);