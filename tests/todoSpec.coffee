describe 'ToDo', ->      
  testData = [{"text":"new Todo", "done": false}, {"text": "new Todo 2", "done": true}]
  newTodo = [{"id": 1111, "text": "new test Todo", "done": false}]
  describe 'TodoCtrl', ->
    scope = null
    ctrl = null
    $httpBackend = null
    beforeEach ->
      module('todoApp')
      inject (_$httpBackend_, $rootScope, $controller) ->
        $httpBackend = _$httpBackend_
        scope = $rootScope.$new()
        scope.todos = []                
        ctrl = $controller('TodoCtrl', {$scope: scope})
    it 'should todos at start will be empty', ->
      expect(scope.todos).toBeDefined()      
      expect(scope.url).toEqual('proxy.php')
    it 'get all', ->
      $httpBackend.expectGET('proxy.php').respond(testData)
      scope.getAll()
      $httpBackend.flush()
      expect(scope.todos).toEqual(testData)  
    it 'remaining', ->
      scope.todos = testData
      count = scope.remaining()
      expect(count).toEqual(1)
    it 'archive', ->
      scope.todos = testData
      scope.archive()
      expect(scope.todos.length).toEqual(1)
    it 'add todo', ->
      $httpBackend.expectPOST('proxy.php').respond(newTodo)
      scope.todos = testData
      scope.todoText = "new test Todo"
      scope.addTodo()      
      $httpBackend.flush()      
      expect(scope.todos.length).toEqual(3)