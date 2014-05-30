angular.module('Alert', []);
angular.module('Alert').controller('AlertCtrl', function($scope, $timeout) {
    $scope.alerts = [];

    $scope.alertMsgs = [
        [
            {
                text:'Motaba',
                entityType:'Virus',
                entityID:'Motaba'
            },
            {
                text:' outbreak in Cedar Creek, California reported by '
            },{
                text:'Major Salt.',
                entityType:'expert',
                entityID:'20c41041-e8a1-4d9b-8d19-f3fc947ffbe1'
            }
        ],
        [
            {
                text: 'Rudy Alvarez',
                entityType: 'patient',
                entityID: 'd53733a0-25ea-4a21-b6c2-c5298eaaec5b'
            },{
                text: ' has gone code red with '
            },{
                text: 'Motaba.',
                entityType: 'Virus',
                entityID: 'Motaba'
            }
        ],[
            {
                text: 'New research by '
            },{
                text: 'Major Casey Schuler',
                entityType: 'expert',
                entityID: '009e8e7e-3345-4f7a-a4a3-e552237c12c2'
            },{
                text: ' has uncovered serious new information regarding ',
            },{
                text:'Motaba.',
                entityType: 'Virus',
                entityID: 'Motaba'
            }
        ],[
            {
                text:'New lead for patient zero: '
            },{
                text: 'Jimbo.',
                entityType: 'expert',
                entityID: '340e083a-5d01-435e-96ea-e8ce03220ed5'
            },{
                text:' Reported by '
            },{
                text: 'Colonel Sam Daniels.',
                entityType: 'expert',
                entityID: 'fdce96e7-b5cf-4f9b-a87d-fac56d0d0742'
            }
        ],[
            {
                text: 'Betsy',
                entityType:'patient',
                entityID: '81c23c6a-3201-467b-954c-95e836363091'
            },{
                text: ' may have communicated '
            },{
                text: 'Motaba',
                entityType: 'Virus',
                entityID:'Motaba'
            },{
                text: ' to ',
            },{
                text: 'Jimbo.',
                entityType:'patient',
                entityID:'340e083a-5d01-435e-96ea-e8ce03220ed5'
            }
        ]
    ];

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    truncateDecimals = function(number, digits) {
        var multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };

    var iter = 0;

    $scope.onTimeout = function() {
        lat = getRandomArbitrary(27, 50);
        lng = getRandomArbitrary(-127, -80);
        lat = truncateDecimals(lat, 4);
        lng = truncateDecimals(lng, 4);
        message = $scope.alertMsgs[iter];
        iter ++;
        newAlert = {
            msg: message,
            time: Date.now(),
            location: [lat, lng]
        };
        $scope.alerts.unshift(newAlert);
        $scope.alerts = $scope.alerts.slice(0, 10);
        $timeout(function() {
            newAlert.isOld = true;
        }, 500);
        if (iter < $scope.alertMsgs.length){
            mytimeout = $timeout($scope.onTimeout, 5000);
        }
        OWF.Eventing.publish('Alert', newAlert);
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