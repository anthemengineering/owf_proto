angular.module('Announcements', []);
angular.module('Announcements').controller('AnnouncementsCtrl', function($scope, $timeout) {
    $scope.announcements = [];
    $scope.onTimeout = function(){
        console.log('onTimeout');
        $scope.announcements.unshift({msg: 'test', time: Date.now()});
        mytimeout = $timeout($scope.onTimeout, 10000);
    }
    var mytimeout = $timeout($scope.onTimeout, 1000);
});

