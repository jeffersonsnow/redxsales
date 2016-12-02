angular.module('app').controller('commissionCtrl', function($scope, mainService, commissionService){
  $scope.testing = "Comms page connected to controller";
  $scope.setupFeeTotal = 0;
  $scope.totalRevenue = 0;
  $scope.revenueCommission = 0;
  $scope.totalCommissions = 0;
    mainService.getUser().then(function(user){
      $scope.user = user;
      $scope.id = user.user_id;

    commissionService.salesThisWeek($scope.id).then(function(sales){
      $scope.sales = sales;
      for(var i = 0; i <$scope.sales.length; i++){
        $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
        $scope.totalRevenue += Number($scope.sales[i].amount);
      }
      $scope.setupFeeTotal = $scope.setupFeeTotal.toFixed(2);
      $scope.totalRevenue = $scope.totalRevenue.toFixed(2);
      console.log($scope.sales);
      $scope.setupFeeCommission = (0.25 * $scope.setupFeeTotal).toFixed(2);
      $scope.adjustedRevenue = $scope.totalRevenue - $scope.setupFeeTotal;
            if($scope.totalRevenue < 3000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.05).toFixed(2);
            }
            if($scope.totalRevenue >= 3000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.06).toFixed(2);
            }
            if($scope.totalRevenue >= 3500){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.07).toFixed(2);
            }
            if($scope.totalRevenue >= 4000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.08).toFixed(2);
            }
            if($scope.totalRevenue >= 4500){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.09).toFixed(2);
            }
            if($scope.totalRevenue >= 5000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.10).toFixed(2);
            }
            if($scope.totalRevenue >= 6000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.11).toFixed(2);
            }
            if($scope.totalRevenue >= 7000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.12).toFixed(2);
            }
            if($scope.totalRevenue >= 8000){
              $scope.revenueCommission = ($scope.adjustedRevenue * 0.15).toFixed(2);
            }
      $scope.totalCommissions = (Number($scope.revenueCommission) + Number($scope.setupFeeCommission)).toFixed(2);
      console.log($scope.sales);


      });
    });
    function ngGridFlexibleHeightPlugin (opts) {
        var self = this;
        self.grid = null;
        self.scope = null;
        self.init = function (scope, grid, services) {
            self.domUtilityService = services.DomUtilityService;
            self.grid = grid;
            self.scope = scope;
            var recalcHeightForData = function () { setTimeout(innerRecalcForData, 1); };
            var innerRecalcForData = function () {
                var gridId = self.grid.gridId;
                var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
                var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
                var naturalHeight = self.grid.$canvas.height() + 1;
                if (opts != null) {
                    if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
                        naturalHeight = opts.minHeight - extraHeight - 2;
                    }
                    if (opts.maxHeight != null && (naturalHeight + extraHeight) > opts.maxHeight) {
                        naturalHeight = opts.maxHeight;
                    }
                }

                var newViewportHeight = naturalHeight + 3;
                if (!self.scope.baseViewportHeight || self.scope.baseViewportHeight !== newViewportHeight) {
                    self.grid.$viewport.css('height', newViewportHeight + 'px');
                    self.grid.$root.css('height', (newViewportHeight + extraHeight) + 'px');
                    self.scope.baseViewportHeight = newViewportHeight;
                    self.domUtilityService.RebuildGrid(self.scope, self.grid);
                }
            };
            self.scope.catHashKeys = function () {
                var hash = '',
                    idx;
                for (idx in self.scope.renderedRows) {
                    hash += self.scope.renderedRows[idx].$$hashKey;
                }
                return hash;
            };
            self.scope.$watch('catHashKeys()', innerRecalcForData);
            self.scope.$watch(self.grid.config.data, recalcHeightForData);
        };
    }
    $scope.gridOpts = {
      data: 'sales',
      resizable: 'true',
      // sortInfo: {fields: ['customer_name', 'amount'], directions: ['asc']},
      columnDefs: [
      {field: 'customer_name', displayName: 'Customer'},
      {field: 'amount', displayName: 'Sale'},
      {field: 'date_sold | date:"short"', displayName: 'Sold On'}
    ],
    plugins: [new ngGridFlexibleHeightPlugin()]
    };

  // $scope.setupFeeCommission = 0.25 * Number($scope.setupFeeTotal);

  // $scope.example = $scope.sales[3].setup_fee;
  // $scope.extractSetupFee = function(){
  //   for(var i = 0; i <$scope.sales.length; i++){
  //     $scope.setupFeeTotal += Number($scope.sales[i].setup_fee);
  //   }
  // };
  // $scope.extractSetupFee();


});
