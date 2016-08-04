/* Principal Module */
var app = angular.module('app',['ngMaterial','ngMessages','ngAnimate','ngRoute']);

/* Routing Configs */
app.config(function ($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {templateUrl: "./public/partials/home.html", controller: "MainCtrl"})
    .when("/about", {templateUrl: "./public/partials/about.html", controller: "MainCtrl"})
    .when("/services", {templateUrl: "./public/partials/services.html", controller: "MainCtrl"})
    .when("/contact", {templateUrl: "./public/partials/contact.html", controller: "MainCtrl"})
    .otherwise("/404", {templateUrl: "./public/partials/404.html", controller: "MainCtrl"});
});

/* Main Controller */
app.controller('MainCtrl', function($scope, $location, $route, $routeParams, $filter, $http){
    /*Slider Images*/
    $scope.images=[{src:'./public/img/img1.jpg',title:'Pic 1'},{src:'./public/img/img2.jpg',title:'Pic 2'},{src:'./public/img/img3.png',title:'Pic 3'}]; 
    /* Logo */
    $scope.logo="./public/img/rusi2.png";
    
    /* Sumbit Form and Send E-mail */
    $scope.formsubmit = function(isValid){
       // $scope.url = 'index.php/Welcome/sendEmail';
        if(isValid){
            $http.post($scope.url, {"name": $scope.name, "phone":$scope.phone, "email": $scope.email, "subject":$scope.subject, "message": $scope.message}).
                success(function(data, status){
                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; 
                });
        }else{
            alert('Form is not valid');
        }
    };

   
   
    /* Services & Treatments */
    $(".header").click(function(){
        $header = $(this);
        $content = $header.next();
        $content.slideToggle(500, function (){});
    });
    $scope.titles=[
        { name: 'Physiotherapy' },
        { name: 'Chiropractic Treatment' },
        { name: 'Occupational Therapy' },        
        { name: 'Contemporary Medical Acupuncture' },
        { name: 'Acupuncture' },
        { name: 'Massage Therapy' },
        { name: 'Chiropody' },
        { name: 'Shockwave Therapy' }
    ];

    /* Map Location */
   

    /* Mobile */
    $scope.show_mobile=function(){
        $(".mob_menu").css({
           left:0+"px",
            '-webkit-transition': '0.3s ease',
            '-moz-transition': '0.3s ease',
            'transition': '.3s ease'
            
        });
        $(".mob_menu_mask").css({
            display:"block"
        });
        $(".lista_mob").css({
            display:"none"
        });
        $(".clear_menu").css({
            display:"inline-block"
        });
    };
    $scope.remove_mobile=function(){
        $(".lista_mob").css({
            display:"inline-block"
        });
        $(".clear_menu").css({
            display:"none"
        });
        $(".mob_menu").css({
            left:-1200+"px"
        });
        $(".mob_menu_mask").css({
            display:"none"
        });
    };
    $scope.vanish_menu=function(){
        $(".mob_menu").css({
            left:-1200+"px",
            '-webkit-transition': '0.3s ease',
            '-moz-transition': '0.3s ease',
            'transition': '.3s ease'
        });
        $(".lista_mob").css({
            display:"inline-block"
        });
        $(".clear_menu").css({
            display:"none"
        });
        $(".mob_menu_mask").css({
            display:"none"
        });
    };

    $scope.hide_mask= function(){
        $(".mob_menu_mask").css({
            display:"none"
        });
        $(".mob_menu").css({
            left:-1200+"px"
        });
        $(".lista_mob").css({
            display:"inline-block"
        });
        $(".clear_menu").css({
            display:"none"
        });
    };

});



/* Slider Directive */
app.directive('slider', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope:{
            images: '='
        },
        link: function (scope, elem, attrs) {
            scope.currentIndex=0;

            scope.next=function(){
                scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
            };
            scope.prev=function(){
                scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
            };
            scope.$watch('currentIndex',function(){
                scope.images.forEach(function(image){
                    image.visible=false;
                });
                scope.images[scope.currentIndex].visible=true;
            });
            
            /* Start: For Automatic slideshow */
            
            var timer;
            var sliderFunc=function(){
                timer=$timeout(function(){
                    scope.next();
                    timer=$timeout(sliderFunc,5000);
                },5000);
            };
            
            sliderFunc();
            
            scope.$on('$destroy',function(){
                $timeout.cancel(timer);
            });
            
            /* End : For Automatic slideshow*/
            
        },
        templateUrl:'./public/templates/templateurl.html'
    }
});
