(function () {
    
    angular.module('memorization_app', [])
        .controller('appController', appController);

    appController.$inject = ['$scope', '$http'];

    /**
     * @name appController
     * @description app controller function
     * */
    function appController($scope, $http) {
        var vm = this;

        $scope.str_array = [];
        $scope.data = [];
        $scope.indexValue = 0;
        if (Storage) {
            if (localStorage.getItem('whole_password') === null) {
                localStorage.setItem('whole_password', makeid());
                localStorage.setItem("memorisedCount", 0);
            }
            localStorage.setItem("memorisedCount", 0);
            //console.log("in function"); 
            //console.loglocalStorage.getItem("memorisedCount"));
            var pass_str = localStorage.getItem('whole_password');
            $scope.str_array = pass_str.match(/.{1,3}/g);

            for (var i = 0; i < 9; i++) {
                var node = {};
                node.id = i;
                node.isCompleted = false;
                node.isSeen = false;
                node.text = $scope.str_array[i];
                $scope.data.push(node);
            }
            $scope.data[0].isSeen = true;
        } else {
            alert('Sorry!!! your browswer doesnt support localStorage!!');
        }

        /**
         * @name makeid
         * @description to create random Id
         * */
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 27; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        function getUserID() {
            if (localStorage.getItem("userID")) {
                return localStorage.getItem("userID");localStorage.getItem("userID");
            }
            const userID = randomWord(10);
            localStorage.setItem("userID", userID);
            return userID
        }

        function getSessionID() {
            if (sessionStorage.getItem("sessionID")) {
                return sessionStorage.getItem("sessionID");
            }
            const sessionID = randomWord(10);
            sessionStorage.setItem("sessionID", sessionID);
            return sessionID
        }

        function getMemoCount() {
            return parseInt(localStorage.getItem("memorisedCount"), 10) || 0;
        }

        function randomWord(length) {
            const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
            let res = "";
            for (let i = 0; i < length; i++) {
                res += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            return res
        }

        function resetNew($scope){
            localStorage.setItem('whole_password', makeid());
            var pass_str = localStorage.getItem('whole_password');
           
            //console.log($scope + "scope.array " + $scope.str_array);
            
            $scope.str_array = [];
            $scope.str_array = pass_str.match(/.{1,3}/g);

            // $scope.data = [];
            // $scope.indexValue = 0;
            // $scope.data[0].isCompleted = true;
            // console.log($scope.data);
            
            //$scope.str_array = pass_str.match(/.{1,3}/g);
            
            console.log($scope.str_array);
            
            
            
            $scope.pass_input = "";
            
            console.log("current password  " + localStorage.getItem("whole_password"));

            for (var i = 0; i < 9; i++) {
                $scope.data[i].isCompleted = false;
                $scope.data[i].isSeen = false;
                $scope.data[i].text = $scope.str_array[i];
            }
            $scope.data[0].isSeen = true;
            
            $scope.pass_input="";
            $scope.indexValue = 0;

            console.log($scope.data);
        }

        //resetNew($scope);    
        /**
         * @name checkForValidNode
         * @description it will check user has write correct pass or not
         * */
        $scope.checkForValidNode = function () {
           // console.log("Memorisedcount "+localStorage.getItem("memorisedCount"));
            if($scope.indexValue == 8){
                var memcount = parseInt(localStorage.getItem("memorisedCount"));
                localStorage.setItem("memorisedCount", memcount + 1);
                alert("Memorization completed!");
                resetNew($scope);
                console.log("memorisedcount: "+localStorage.getItem("memorisedCount"));
                
            }
            if ($scope.data.length > $scope.indexValue && $scope.pass_input.length >= (3 * ($scope.indexValue + 1))) {
                var strdata2 = "";

                for (var x = 0; x <= $scope.indexValue; x++) {
                    strdata2 = strdata2 + $scope.data[x].text;
                }

                if ($scope.pass_input === strdata2) {
                    $scope.data[$scope.indexValue].isCompleted = true;
                    $scope.data[$scope.indexValue].isSeen = false;
                    $scope.indexValue = $scope.indexValue + 1;
                    if ($scope.data.length > $scope.indexValue){
                        //alert( getUserID() + "   " + getSessionID()+"  "+ $scope.indexValue + "  "+ $scope.pass_input + "  "+strdata2 + localStorage.getItem('whole_password'));
                       //$http.post('http://localhost:8080/api/guess',  { "userID" : getUserID(), "sessionID": getSessionID(), "nodeID": $scope.indexValue, "userInput": $scope.pass_input, "nodeText": strdata2,"fullText": localStorage.getItem('whole_password'), "memorisedCount": 1});
                        //$http.post('http://localhost:5000/api/guess',  JSON.stringify({"userID" : "asdfdfdfdd", "sessionID": "23asdassdf", "nodeID": 9, "input": "sdafasdf", "nodeText": "a","fullText": "slkdf", "memorisedCount": 1, "isLeftCorrect": false, "isRightCorrect": false }),{headers: {'Content-Type':'application/json'}}) 
                        //send data
                        $http.post('https://lovely-mesa-verde-30277.herokuapp.com/api/guess',  { "userID" : getUserID(), "sessionID": getSessionID(), "nodeID": $scope.indexValue, "userInput": $scope.pass_input, "nodeText": strdata2,"fullText": localStorage.getItem('whole_password'), "memorisedCount": localStorage.getItem('memorisedCount')});
                        $scope.data[$scope.indexValue].isSeen = true;
                     //  

                //alert("out");
            
                    }
                }
                else {
                    $scope.data[$scope.indexValue].isCompleted = false;
                    $scope.data[$scope.indexValue].isSeen = false;
                    $scope.indexValue = $scope.indexValue - 1;

                    if($scope.indexValue === 0 && $scope.data[$scope.indexValue].isCompleted)
                    {
                        $scope.data[$scope.indexValue].isSeen = true;
                        $scope.pass_input = "";
                           
                        return;
                    }   

                    if ($scope.indexValue < 0)
                    {
                        $scope.indexValue = 0;
                        $scope.data[$scope.indexValue].isCompleted = false;                        
                    }

                    $scope.data[$scope.indexValue].isSeen = true;
                }
                $scope.pass_input = "";
            } 
        }
    }
})();

