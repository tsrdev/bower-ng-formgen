app.directive('formGen', function ($parse){
  return {
    'controller': function ($scope, $element, $attrs, $transclude) {
      $scope.params = {
        "view": $attrs.formGen || "formgen/",
        "formClass": "form-horizontal",
        "fieldsetClass": "form-group",
        "formcontrolClass": "col-lg-9 col-md-8 col-sm-8 col-xs-12",
        "labelClass": "col-lg-9 col-md-8 col-sm-8 col-xs-12",
        "inputClass": "form-control"
      };

      $scope.expr = function (expr) {
        return $scope.$eval(expr);
      };

      $scope.resolveTemplate = function (tag, formKey) {
        return $scope.forms[formKey].extend.view + tag + '.html';
      }

      $scope.resolveClass = function (value, module, formKey) {
        return value ? value : $scope.forms[formKey].extend[module + 'Class'];
      }

      angular.forEach($scope.forms, function(form, formKey) {
        form.extend = form.extend || {};
        form.formData = form.formData || {};

        angular.extend(form.extend, $scope.params);
      });
    },
    'controllerAs': 'formGenCtrl',
    'transclude': 'element',
    'restrict': 'A',
    'replace': true,
    'scope': '=',
    'templateUrl': function (element, attr) {
      return (attr.formGen ? attr.formGen : 'formgen/') + 'layout.html';
    }
  }
});
