var module = angular.module('todoApp', []);
/**
 * Todo controller
 * @class
 * @name TodoCtrl
 * @param {Object} $scope
 * @param {Object} $http
 */
module.controller('TodoCtrl', function ($scope, $http) {
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

    $scope.url = "proxy.php";
  /**
   * Add todo
   * @name addTodo
   * @memberOf TodoCtrl
   * @function
   */
  $scope.addTodo = function() {
    $http.defaults.headers.post['Content-Type']='application/json';
    $http.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://angular.dev https://api.mongohq.com';

    id = new Date().getTime();
    $scope.data = '{"document" : {"_id": "' + id + '" , "text" : "' + $scope.todoText + '"}, "done" : false }';
    todo = {text:$scope.todoText, done:false};
    $scope.todos.push(todo);
    //  $http.jsonp($scope.url).successCallback()
    $http.post($scope.url, $scope.data).success($scope.successCallback);
  };
  /**
   * Sucess Callback
   * @name successCallback
   * @memberOf TodoCtrl
   * @function
   */
  $scope.successCallback = function () {
  };
  /**
   * Remaining   
   * @name remaining
   * @memberOf TodoCtrl
   */
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
  /**
   * Archive
   * @name archive
   * @memberOf TodoCtrl
   */
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
});

