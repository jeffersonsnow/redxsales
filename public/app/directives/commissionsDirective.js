angular.module('app').directive('commissionsDirective', function(){
  return {
    restrict: "EA",
    scope: {
      commissionPercentage: "=",
      graphPercent: "=",
      totalRevenue: "="

    },
    link: function(scope, element, attribute){
      // scope.commissionPercentage;
      // scope.graphPercent;
      console.log(element, scope.graphPercent, scope.totalRevenue);
    }
  };
});
