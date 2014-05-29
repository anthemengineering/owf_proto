angular.module('Launcher', []);
angular.module('Launcher').controller('LauncherCtrl', function($scope) {
    $scope.apps = [{
        icon: 'fa-globe',
        name: 'Geo',
        id: 'geo'
    }, {
        icon: 'fa-warning',
        name: 'Alerts',
        id: 'alert'
    }, {
        icon: 'fa-cloud',
        name: 'eXo',
        id: 'eXo'
    }, {
        icon: 'fa-comments-o',
        name: 'Chat',
        id: 'chat'
    }, {
        icon: 'fa-comment',
        name: 'Announcements',
        id: 'announcements'
    }, {
        icon: 'fa-search',
        name: 'Fed Search',
        id: 'fed_search'
    }, {
        icon: 'fa-history',
        name: 'Activity',
        id: 'activity'
    }, {
        icon: 'fa-space-shuttle',
        name: 'RFI',
        id: 'rfi'
    }, {
        icon: 'fa-cogs',
        name: 'ETC',
        id: ''
    }];
    $scope.launch = function(name) {
        if (!name) {
            return;
        }
        OWF.Launcher.launch({
            universalName: name + '.anthemengineering.com',
        });
    };
});