//@ sourceMappingURL=todo.map
// Generated by CoffeeScript 1.6.1
(function() {
  var module;

  module = angular.module('todoApp', []);

  module.controller('TodoCtrl', function($scope, $http) {
    $scope.todos = [];
    $scope.url = "proxy.php";
    $scope.getAll = function() {
      $http.get($scope.url).success($scope.getCallback);
    };
    $scope.getCallback = function(data, status, headers, config) {
      $scope.todos = data;
    };
    $scope.addTodo = function() {
      var id, todo;
      $http.defaults.headers.post['Content-Type'] = 'application/json';
      $http.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://angular.dev https://api.mongohq.com';
      id = new Date().getTime();
      $scope.data = '{"document" : {"_id": "' + id + '" , "text" : "' + $scope.todoText + '"}, "done" : false }';
      todo = {
        text: $scope.todoText,
        done: false
      };
      $scope.todos.push(todo);
      $http.post($scope.url, $scope.data).success($scope.successCallback);
    };
    $scope.archive = function() {
      var oldTodos;
      oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) {
          return $scope.todos.push(todo);
        }
      });
    };
    $scope.remaining = function() {
      var count;
      count = 0;
      angular.forEach($scope.todos, function(todo) {
        if (todo.done) {
          return count += 1;
        }
      });
      return count;
    };
    $scope.successCallback = function() {};
  });

}).call(this);
