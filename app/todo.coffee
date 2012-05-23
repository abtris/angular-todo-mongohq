# Angular Module
module = angular.module('todoApp', [])
# Controller TodoCtl
module.controller 'TodoCtrl',  ($scope, $http) ->
  $scope.todos = [];
  # Proxy to MongoHQ
  $scope.url = "proxy.php"
  # Get all todos from mongodb
  $scope.getAll = ->
    $http.get($scope.url).success($scope.getCallback)
    return
  $scope.getCallback = (data, status, headers, config) ->    
    $scope.todos = data
    return
  # Add new todo  
  $scope.addTodo = ->
    $http.defaults.headers.post['Content-Type']='application/json'
    $http.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://angular.dev https://api.mongohq.com'
    id = new Date().getTime()
    $scope.data = '{"document" : {"_id": "' + id + '" , "text" : "' + $scope.todoText + '"}, "done" : false }'
    todo = {text:$scope.todoText, done:false}
    $scope.todos.push(todo)
    $http.post($scope.url, $scope.data).success($scope.successCallback)
    return
  # Archive todo  
  $scope.archive = ->
    oldTodos = $scope.todos
    $scope.todos = []
    angular.forEach oldTodos, (todo) ->
      if (!todo.done) then $scope.todos.push(todo)
    return
  # Remaining todos  
  $scope.remaining = ->
    count = 0
    angular.forEach $scope.todos, (todo) ->
      if todo.done then count += 1
    return count  
  $scope.successCallback = ->    
    return

  return