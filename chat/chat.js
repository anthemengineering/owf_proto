angular.module('Chat', []);
angular.module('Chat').controller('ChatCtrl', function($scope) {
    $scope.chatLog = [{
        usr: 'Suma',
        msg: 'Hi there!'
    }];
    $scope.chat = "";
    $scope.conversation = ['How are you?', 'That\s terrific!', 'I\'m not sure how I feel about that.', 'Nice.', 'You don\'t say?'];
    $scope.submitChat = function(user) {
        $scope.chatLog.push({
            usr: user,
            msg: $scope.chat
        });
        $scope.chatLog.push({
            usr: 'Suma',
            msg: $scope.conversation[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
        });
        $scope.chat = "";
        $(".chatLog").animate({
            scrollTop: $(".chatTable").height()
        }, "slow");
    };

    $scope.pluralize = function(username) {
        if (username === "You") {
            return "say";
        } else {
            return "says";
        }
    };
});