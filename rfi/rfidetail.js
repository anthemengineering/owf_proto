angular.module('RFIDetail', []);
angular.module('RFIDetail').controller('RFIDetailCtrl', function($scope) {
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';
    $scope.rfi = {status: "Awaiting Response"};

    $scope.submit = function() {
        OWF.Eventing.publish('RFISubmit', $scope.rfi);
        $scope.rfi = {status: "Awaiting Response"};
        $scope.apply();
    };
    $scope.onRFIDetailView = function(sender, rfi) {
        if(!rfi) {
            $scope.rfi = {status: "Awaiting Response"};
        } else {
            $scope.rfi = rfi;
        }
        $scope.$apply();
    };
    $scope.onRFIUpdate = function(sender, rfi) {
        if($scope.rfi.$$hashKey === rfi.$$hashKey) {
            $scope.rfi = rfi;
            $scope.$apply();
        }
    };
    OWF.ready(function() {
        OWF.Eventing.subscribe('RFIDetailView', $scope.onRFIDetailView);
        OWF.Eventing.subscribe('RFIUpdate', $scope.onRFIUpdate);
    });
});


