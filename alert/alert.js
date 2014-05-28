angular.module('Alert', []);
angular.module('Alert').controller('AlertCtrl', function($scope, $timeout) {
    $scope.alerts = [];
    $scope.onTimeout = function(){
        $scope.alerts.unshift({msg: 'test', time: Date.now()});
        mytimeout = $timeout($scope.onTimeout, 10000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
});
