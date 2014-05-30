angular.module('RFIDetail', []);
angular.module('RFIDetail').controller('RFIDetailCtrl', function($scope) {
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';

    $scope.submit = function() {
        rfi = {
            rfiName: $scope.rfiName,
            agency: $scope.agency,
            status: "Awaiting Response"
        }
        console.log('publishing ' + JSON.stringify(rfi));
        OWF.Eventing.publish('RFISubmit', rfi);
    };
});


