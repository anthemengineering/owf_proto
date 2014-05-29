angular.module('Announcements', []);
angular.module('Announcements').controller('AnnouncementsCtrl', function($scope, $timeout) {
    $scope.announcements = [];
    $scope.announcementMsgs = [
        'This is something you may want to know about.',
        'There will be system downtime tomorrow for maintenance',
        'Everything looks good.',
    ];
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
        message = $scope.announcementMsgs[truncateDecimals(getRandomArbitrary(0, 3), 0)];
        $scope.announcements.unshift({msg: message, time: Date.now()});
        mytimeout = $timeout($scope.onTimeout, 10000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
});

