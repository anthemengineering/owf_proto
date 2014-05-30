angular.module('RFI', []);
angular.module('RFI').controller('RFICtrl', function($scope, $timeout) {
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';
    $scope.responseReceivedString = 'Response Received';

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    truncateDecimals = function(number, digits) {
        var multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };

    $scope.possibleResponses = [
        "Isolate the patient.",
        "There is nothing to worry about.",
    ];

    $scope.rfis = [];
    $scope.rfiClass = function(rfi) {
        if(rfi.status == $scope.responseReceivedString) {
            return 'rfi-response';
        }
        return '';
    };
    $scope.onRFIClick = function(rfi) {
        OWF.Launcher.launch({
            universalName: 'rfidetail.anthemengineering.com'
            },
            function() {
                OWF.Eventing.publish('RFIDetailView', rfi);
            }
        );
    };
    $scope.onRFISubmitReceive = function(sender, rfi) {
        if(rfi.$$hashKey) {
            for( i = 0; i < $scope.rfis.length; i++ ) {
                if($scope.rfis[i].$$hashKey === rfi.$$hashKey) {
                    $scope.rfis[i] = rfi;
                }
            }
        } else {
            $scope.rfis.unshift(rfi);
        }
        $scope.$apply();
    };
    $scope.onRFITimeout = function() {
        for( i = 0; i < $scope.rfis.length; i++ ) {
            var currRfi = $scope.rfis[i];
            if(currRfi.status === 'Awaiting Response') {
                currRfi.status = $scope.responseReceivedString;
                currRfi.response = $scope.possibleResponses[truncateDecimals(getRandomArbitrary(0, $scope.possibleResponses.length), 0)];
                OWF.Eventing.publish('RFIUpdate', currRfi);
            }
        }
        $scope.$apply();
        $timeout($scope.onRFITimeout, 10000);
    }
    OWF.ready(function() {
        OWF.Eventing.subscribe('RFISubmit', $scope.onRFISubmitReceive);
    });
    $timeout($scope.onRFITimeout, 10000);
});

