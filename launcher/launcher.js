angular.module('Launcher', []);
angular.module('Launcher').controller('LauncherCtrl', function($scope) {
    $scope.launch = function(name) {
        OWF.Launcher.launch({
            universalName: 'geo.anthemengineering.com',
        });
    };
});
