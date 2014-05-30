angular.module('Alert', []);
angular.module('Alert').controller('AlertCtrl', function($scope, $timeout) {
    $scope.alerts = [];
    $scope.alertMsgs = [
        'Something went wrong',
        'Danger',
        'Anthrax Warning',
        'Ebola',
        'H1N1'];
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
        message = $scope.alertMsgs[truncateDecimals(getRandomArbitrary(0, 5), 0)];
        newAlert = {msg: message, time: Date.now(), location: [lat, lng]};
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
            universalName: 'geo.anthemengineering.com'}, function() {
                OWF.Eventing.publish('AlertClick', alert);
        });
    };
});
