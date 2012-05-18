
var testData = [{"text":"new Todo", "done": false}, {"text": "new Todo 2", "done": true}];

describe('ToDo', function() {
  
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe("TodoCtrl", function() {
  	var scope, ctrl, $httpBackend;
	
	beforeEach(module('todoApp'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      scope.todos = [];
      $httpBackend.expectGET('proxy.php').respond(testData);
      ctrl = $controller('TodoCtrl', {$scope: scope});      
      
    }));

    it('should todos at start will be empty', function() {
      expect(scope.todos).toBeDefined();          
      expect(scope.url).toEqual('proxy.php');          
    });    

    it('get all', function() {
      scope.getAll();
      $httpBackend.flush();      
      expect(scope.todos).toEqual(testData);
    });

    it('remaining', function() {
      scope.todos = testData;   
      count = scope.remaining();         
      expect(count).toEqual(1);
    });
  });

});
