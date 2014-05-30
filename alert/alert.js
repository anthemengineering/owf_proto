angular.module('Alert', []);
angular.module('Alert').controller('AlertCtrl', function($scope, $timeout) {
    $scope.alerts = [];
    $scope.alertMsgs = [{
        title: 'Something went wrong',
        verb: ' with ',
        entityType: 'patient',
        entityName: 'Rudy Alvarez',
        entityID: 'd53733a0-25ea-4a21-b6c2-c5298eaaec5b',
        context: ' related to ',
        contextName: 'Motaba',
        contextType: 'Virus',
        contextID: 'Motaba'
    }, {
        title: 'Danger',
        verb: ' with ',
        entityType: 'expert',
        entityName: 'Major Casey Schuler',
        entityID: '009e8e7e-3345-4f7a-a4a3-e552237c12c2',
        context: ' related to ',
        contextName: 'Motaba',
        contextType: 'Virus',
        contextID: 'Motaba'
    }, {
        title: 'H1N1 Rumor',
        verb: ' for ',
        entityType: 'expert',
        entityName: 'Colonel Sam Daniels',
        entityID: 'fdce96e7-b5cf-4f9b-a87d-fac56d0d0742',
        context: ' when he met ',
        contextName: 'Robby',
        contextType: 'expert',
        contextID: 'a44980e9-615c-46c8-adef-2e7643c4b15f'
    }, {
        title: 'Anthrax Warning',
        verb: ' between ',
        entityType: 'patient',
        entityName: 'Betsy the Monkey',
        entityID: '81c23c6a-3201-467b-954c-95e836363091',
        context: ' and ',
        contextName: 'Jimbo',
        contextType: 'patient',
        contextID: '340e083a-5d01-435e-96ea-e8ce03220ed5'
    }, {
        title: 'Ebola outbreak',
        verb: ' on ',
        entityType: 'expert',
        entityName: 'Major Salt',
        entityID: '20c41041-e8a1-4d9b-8d19-f3fc947ffbe1',
        context: ' treating ',
        contextName: 'Alice',
        contextType: 'patient',
        contextID: 'afd7f848-0716-4e4a-9df7-1e84c7044710'
    }];

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    truncateDecimals = function(number, digits) {
        var multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };

    $scope.onTimeout = function() {
        lat = getRandomArbitrary(27, 50);
        lng = getRandomArbitrary(-127, -80);
        lat = truncateDecimals(lat, 4);
        lng = truncateDecimals(lng, 4);
        message = $scope.alertMsgs[truncateDecimals(getRandomArbitrary(0, $scope.alertMsgs.length), 0)];
        newAlert = {
            msg: message,
            time: Date.now(),
            location: [lat, lng]
        };
        $scope.alerts.unshift(newAlert);
        $scope.alerts = $scope.alerts.slice(0, 10);
        OWF.Eventing.publish('Alert', newAlert);
        $timeout(function() {
            newAlert.isOld = true;
        }, 500);
        mytimeout = $timeout($scope.onTimeout, 10000);
    };

    var mytimeout = $timeout($scope.onTimeout, 1000);
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';
    $scope.onAlertClick = function(alert) {
        OWF.Launcher.launch({
            universalName: 'geo.anthemengineering.com'
        }, function() {
            OWF.Eventing.publish('AlertClick', alert);
        });
    };

    $scope.openCortexWidget = function(entity) {
        Panopticon.open({
            id: entity.id,
            type: entity.type
        });
    };
});