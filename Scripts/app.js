var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : "Templates/test.html"
    })
    .when('/mylist', {
        templateUrl : "./List/List.html"
    })
    .when('/new' ,{
        templateUrl : "./Editor/Editor.html"
    })
    .when('/update/:id' ,{
        templateUrl : "./Editor/Editor.html"
    })
});