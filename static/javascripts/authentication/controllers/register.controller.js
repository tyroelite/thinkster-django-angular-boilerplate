(function() {
    'use strict';
    
    angular
        .module('thinkster.authentication.controllers')
        .controller('RegisterController', RegisterController);
        
    RegisterController.$inject = ['$location', '$scope', 'Authentication'];
    
    function RegisterController($location, $scope, Authentication){
        var vm = this;
        
        vm.register = register;
        
        activate();
        
        
        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.authentication.controllers.RegisterController
         */
        function activate(){
            //If the user is already authenticated, the should not be here
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }
        
        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccessFn, registerErrorFn);
            
            function registerSuccessFn(data, status, headers, config){
                Authentication.login(email, password);
            }
            
            function registerErrorFn(data, status, headers, config){
                console.error('Epic Failure!');
            }
        }
    }
})();