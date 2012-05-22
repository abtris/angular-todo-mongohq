describe 'ToDo', ->      
  # test data
  testData = [{"text":"new Todo", "done": false}, {"text": "new Todo 2", "done": true}]
  newTodo = [{"id": 1111, "text": "new test Todo", "done": false}]
  # test Controller
  describe 'TodoCtrl', ->
    scope = null
    ctrl = null
    $httpBackend = null
    # inject
    beforeEach ->
      module('todoApp')
      inject (_$httpBackend_, $rootScope, $controller) ->
        $httpBackend = _$httpBackend_
        scope = $rootScope.$new()
        scope.todos = []                
        ctrl = $controller('TodoCtrl', {$scope: scope})
    # Init    
    it 'should todos at start will be empty', ->
      expect(scope.todos).toBeDefined()      
      expect(scope.url).toEqual('proxy.php')
    # Work with mocks to GET request  
    it 'get all', ->
      $httpBackend.expectGET('proxy.php').respond(testData)
      scope.getAll()
      $httpBackend.flush()
      expect(scope.todos).toEqual(testData)  
    # Remaining  
    it 'remaining', ->
      scope.todos = testData
      count = scope.remaining()
      expect(count).toEqual(1)
    # Archive  
    it 'archive', ->
      scope.todos = testData
      scope.archive()
      expect(scope.todos.length).toEqual(1)
    # Work with mocks to POST request
    it 'add todo', ->
      $httpBackend.expectPOST('proxy.php').respond(newTodo)
      scope.todos = testData
      scope.todoText = "new test Todo"
      scope.addTodo()      
      $httpBackend.flush()      
      expect(scope.todos.length).toEqual(3)