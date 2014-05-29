angular.module('Launcher', []);
angular.module('Launcher').controller('LauncherCtrl', function($scope) {
    $scope.launch = function(name) {
        OWF.Launcher.launch({
            universalName: name + '.anthemengineering.com',
        });
    };
});
