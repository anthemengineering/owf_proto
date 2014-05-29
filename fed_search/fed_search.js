angular.module('FedSearch', []);
angular.module('FedSearch').controller('FedSearchCtrl', function($scope) {
    $scope.showSearch = false;
    $scope.search = function() {
        $scope.showSearch = true;
    };
});

