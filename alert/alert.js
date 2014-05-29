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
    truncateDecimals = function (number, digits) {
        var multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

        return truncatedNum / multiplier;
    };
    $scope.onTimeout = function(){
        lat = getRandomArbitrary(27, 50);
        lng = getRandomArbitrary(-127, -80);
        lat = truncateDecimals(lat, 4);
        lng = truncateDecimals(lng, 4);
        message = $scope.alertMsgs[truncateDecimals(getRandomArbitrary(0, 4), 0)];
        newAlert = {msg: message, time: Date.now(), location: [lat, lng]};
        $scope.alerts.unshift(newAlert);
        OWF.Eventing.publish('Alert', newAlert);
        mytimeout = $timeout($scope.onTimeout, 10000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
    OWF.relayFile = '/owf/js/eventing/rpc_relay.uncompressed.html';
});
