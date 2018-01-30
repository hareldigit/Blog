app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "./app/components/welcome/welcomeView.html"
    })
    .when('/movies-list', {
        templateUrl : "./app/components/moviesList/moviesListView.html"
    })
    .when('/new' ,{
        templateUrl : "./app/components/movieEditor/movieEditorView.html"
    })
    .when('/edit/:id' ,{
        templateUrl :  "./app/components/movieEditor/movieEditorView.html"
    })
});