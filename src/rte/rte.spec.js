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

  describe('2-way data binding', function () {
    it('should render the model', function () {
      expect(element.find('.rte-content').html()).toBe(scope.testContent.toString());
    });

    it('should update the model on model change', inject(function ($sce) {
      var html = '<div>Hello, <b><i>world</i></b></div>';

      scope.testContent = $sce.trustAsHtml(html);
      scope.$digest();

      expect(element.find('.rte-content').html()).toBe(html);
    }));
  });
});