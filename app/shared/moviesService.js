app.factory('moviesService', ['$http', '$q' , function ($http, $q ) {
     

        // implementation
        function getMovies() {
            var def = $q.defer();
            if(!service.movies.length){
            $http.get("./movieData.json")
                .success(function(data) {
                    service.movies = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get movies");
                });
            }else{
                def.resolve(service.movies);
            }
            return def.promise;
        }

        function _getMovieInner(id){
            return service.movies.find(function(item){
                return item.id == id;
            });
        }

        function getMovie(id){
            var def = $q.defer();
            getMovies().then(function(){
                def.resolve( _getMovieInner(id));
            })
            return def.promise;
        }

        function _getNextIdInner(){
            var value = 0;
            if(service.movies.length){
               value = Math.max.apply(Math,service.movies.map(function(o){return o.id;}));
            }
            return  ++value;
        }

        function getNextId(){
            var def = $q.defer();
            getMovies().then(function(){
                def.resolve(_getNextIdInner());
            })
            return def.promise;
        }

        function addMovie(movie){
            var def = $q.defer();
            getNextId().then(function(id){
                movie.id = id;
                def.resolve(service.movies.push(movie));
            });
            return def.promise;
        }


        function _deleteMovieInner(id){
            return service.movies.filter(function(item){
                return item.id != id;
            });
        }

        function deleteMovie(id){
            var def = $q.defer();
            getMovies().then(function(){
                def.resolve( service.movies = _deleteMovieInner(id));
            })
            return def.promise;
        }


        function _updateMovieInner(movie){
            var def = $q.defer();
            getMovie(movie.id).then(function(data){
                data = movie;
                def.resolve("updated");
            });
            return def.promise;
        }

        function updateMovie(movie){
            var def = $q.defer();
            getMovies().then(function(){
                def.resolve( _updateMovieInner(movie));
            })         
            return def.promise;
        }

        // interface
        var service = {
            movies: [],
            getMovies: getMovies,
            getMovie: getMovie,
            addMovie : addMovie,
            deleteMovie : deleteMovie,
            updateMovie : updateMovie
        };

        return service;
    }]);