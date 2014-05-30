angular.module('RFI', []);
angular.module('RFI').controller('RFICtrl', function($scope) {
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';

    $scope.rfis = [];
    $scope.rfis.unshift({
        rfiName: 'Test',
        agency: 'Agency',
        status: 'Awaiting Response'
    });
    $scope.onRFIClick = function(rfi) {
        OWF.Launcher.launch({
            universalName: 'rfidetail.anthemengineering.com',
        });
    };
    $scope.onRFISubmitReceive = function(sender, rfi) {
        console.log('received rfi ' + JSON.stringify(rfi));
        $scope.rfis.unshift(rfi);
        $scope.$apply();
        console.log('rfis ' + JSON.stringify($scope.rfis));
    };
    OWF.ready(function() {
        OWF.Eventing.subscribe('RFISubmit', $scope.onRFISubmitReceive);
    });

});

