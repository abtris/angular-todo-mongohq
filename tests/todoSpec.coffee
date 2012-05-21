describe 'ToDo', ->      
  testData = [{"text":"new Todo", "done": false}, {"text": "new Todo 2", "done": true}]

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
        $httpBackend.expectGET('proxy.php').respond(testData)
        ctrl = $controller('TodoCtrl', {$scope: scope})
    it 'should todos at start will be empty', ->
      expect(scope.todos).toBeDefined()      
      expect(scope.url).toEqual('proxy.php')
    it 'get all', ->
      scope.getAll()
      $httpBackend.flush()
      expect(scope.todos).toEqual(testData)  
    it 'remaining', ->
      scope.todos = testData;   
      count = scope.remaining()
      expect(count).toEqual(1)