'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

                    
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
            
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    console.log($scope.feedback);
                    feedbackFactory.getFeedbacks().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                   
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );         
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory)  {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.ratings = [{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"}];
            
            $scope.submitComment = function () {                
                        $scope.mycomment.date = new Date().toISOString();
                        console.log($scope.mycomment);
                        $scope.dish.comments.push($scope.mycomment);
                        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                        $scope.commentForm.$setPristine();
                        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        .controller('IndexController', ['$scope', 'menuFactory','corporateFactory', function($scope, menuFactory,corporateFactory) {
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );   
            
            $scope.showPromo = false;
            $scope.promoMessage="Loading promotion ...";
            $scope.promoDish = menuFactory.getPromotions().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promoDish = response;
                    $scope.showPromo = true;
                },
                function(response) {
                    $scope.promoMessage = "Error: "+response.status + " " + response.statusText;
                }
            );  
            
            
            $scope.showLeader = false;
            $scope.leaderMessage="Loading leader ...";            
            $scope.leader = corporateFactory.getLeaders().get({id:3})
            .$promise.then(
                function(response){
                    $scope.leader = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.leaderMessage = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.showLeaders = false;
            $scope.message = "Loading leaders ..";
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });            
        }])

;
