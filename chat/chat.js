angular.module('Chat', []);
angular.module('Chat').controller('ChatCtrl', function($scope) {
    $scope.chatLog = [];
    $scope.chat = "";
    $scope.submitChat = function() {
        $scope.chatLog.push({
            msg: $scope.chat
        });
        $scope.chat = "";
    };

});

/*

 

    */