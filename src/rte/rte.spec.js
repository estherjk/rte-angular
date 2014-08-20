describe('rte directive', function () {
  var scope, element;

  beforeEach(module('templates'));
  beforeEach(module('rte-angular'));

  beforeEach(inject(function ($rootScope, $compile, $sce) {
    element = angular.element('<rte ng-model="testContent"></rte>');

    scope = $rootScope;
    scope.testContent = $sce.trustAsHtml('<div>Hello, <b>world</b></div>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should have a contenteditable', function () {
    expect(element.html()).toContain('contenteditable');
  });
});