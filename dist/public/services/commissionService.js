'use strict';

angular.module('app').service('commissionService', ["$http", function ($http) {
    this.salesThisWeek = function (id) {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/weeklysales/' + id
        }).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        });
    };

    this.ngGridFlexibleHeightPlugin = function (opts) {
        var self = this;
        self.grid = null;
        self.scope = null;
        self.init = function (scope, grid, services) {
            self.domUtilityService = services.DomUtilityService;
            self.grid = grid;
            self.scope = scope;
            var recalcHeightForData = function recalcHeightForData() {
                setTimeout(innerRecalcForData, 1);
            };
            var innerRecalcForData = function innerRecalcForData() {
                var gridId = self.grid.gridId;
                var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
                var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
                var naturalHeight = self.grid.$canvas.height() + 1;
                if (opts != null) {
                    if (opts.minHeight != null && naturalHeight + extraHeight < opts.minHeight) {
                        naturalHeight = opts.minHeight - extraHeight - 2;
                    }
                    if (opts.maxHeight != null && naturalHeight + extraHeight > opts.maxHeight) {
                        naturalHeight = opts.maxHeight;
                    }
                }

                var newViewportHeight = naturalHeight + 3;
                if (!self.scope.baseViewportHeight || self.scope.baseViewportHeight !== newViewportHeight) {
                    self.grid.$viewport.css('height', newViewportHeight + 'px');
                    self.grid.$root.css('height', newViewportHeight + extraHeight + 'px');
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
    };
}]);