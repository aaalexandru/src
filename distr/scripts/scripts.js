"use strict";angular.module("barcelandoApp",["infinite-scroll","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/mobile",{templateUrl:"views/mobile.html",controller:"MobileCtrl",controllerAs:"mobile"}).when("/offers",{templateUrl:"views/offers.html",controller:"OffersCtrl",controllerAs:"offers"}).otherwise({redirectTo:"/"})}]).run(["$window",function(a){a.addToHomescreen({debug:!1})}]).factory("facebookService",["$q",function(a){return{callApi:function(b,c){var d=a.defer();return window.deFB.then(function(a){var e="?access_token=1612045092417575|6d0698addfd3d63060946506b5cbb461";a.api(b+e,c,function(a){!a||a.error?(d.reject("Error occured loading events: "),console.log(a.error)):d.resolve(a)})}),d.promise}}}]),angular.module("barcelandoApp").controller("MainCtrl",["$scope","facebookService","$window",function(a,b,c){function d(a){for(var b,c={},d=a.slice(a.indexOf("?")+1).split("&"),e=0;e<d.length;e++)b=d[e].split("="),c[b[0]]=b[1];return c}function e(c){c=c||{limit:g,fields:"full_picture,object_id,type,caption,message,name,link"},a.loading=!0,i=null,b.callApi("/Barcelandoculturecrawl/feed/",c).then(function(b){b.paging&&b.paging.next&&(i=b.paging.next);for(var c=0;c<b.data.length;c++)f.push(b.data[c]);a.loading=!1},function(a){window.alert(a)})}a.openLink=function(a){c.open(a,"_blank")},a.events=[];var f=a.events,g=5,h=0,i=null;a.loadMoreInfinite=function(){a.loading||!i||h>50||(h++,e(d(i)))},e()}]).controller("PhotoCtrl",["$scope","facebookService",function(a,b){var c=a.$parent.$parent.e.object_id;b.callApi("/"+c+"/",{fields:"images"}).then(function(a){console.log(a)})}]).controller("EventCtrl",["$scope","facebookService",function(a,b){var c=a.$parent.$parent.e.object_id,d=window.moment;b.callApi("/"+c+"/",{fields:"cover,start_time, place,timezone"}).then(function(b){b.start_time=d(b.start_time).format("dddd MMMM Do YYYY, h:mm:ss a"),a.edetails=b})}]),angular.module("barcelandoApp").controller("AboutCtrl",function(){}),angular.module("barcelandoApp").controller("MobileCtrl",function(){}),angular.module("barcelandoApp").controller("OffersCtrl",function(){}),angular.module("barcelandoApp").run(["$templateCache",function(a){a.put("views/about.html","<center> <br> From art expos, Live music, Movie retrospectives to underground DJ and live PA sets. </center>"),a.put("views/main.html",'<div class="event"> <div> <h6></h6> <div class="imgbox"></div> <pre ng-if="e.description">{{e.description}}</pre> </div> </div> <div class="row" ng-if="events"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"><center> <div ng-repeat="e in events track by $index"> <!--- link --> <div ng-if="e.type == \'link\'" ng-model="$e"> <h1>{{e.message}} </h1> <h3>{{e.name}} </h3> <button ng-click="openLink(e.link)" type="button" class="btn btn-default btn-lg moreinfo"> <span class="fa fa-arrow-circle-right"></span> More Info </button> <br> <img class="img-rounded img-responsive fullwidthimg" src="{{e.full_picture}}"> </div> <!--- photo --> <div ng-if="e.type == \'photo\'" ng-model="$e"> <h1>{{e.message}} </h1> <h3>{{e.name}} </h3> <button ng-click="openLink(e.link)" type="button" class="btn btn-default btn-lg moreinfo"> <span class="fa fa-arrow-circle-right"></span> More Info </button> <br> <img class="img-rounded img-responsive fullwidthimg" src="{{e.full_picture}}"> </div> <!--- event --> <div ng-if="e.type == \'event\'" ng-model="$e" ng-controller="EventCtrl"> <h1>{{e.message}} </h1> <h3>{{e.name}} </h3> <button ng-click="openLink(e.link)" type="button" class="btn btn-default btn-lg moreinfo"> <span class="fa fa-arrow-circle-right"></span> More Info </button> <div ng-show="edetails"> {{edetails.start_time}} <br> {{edetails.place.name}}, {{edetails.place.location.street}} <br> <div ng-show="edetails.place.location.latitude"><br> <a href="https://www.google.com/maps/place/{{edetails.place.location.latitude}},{{edetails.place.location.longitude}}/"><img class="img-rounded img-responsive" src="http://maps.googleapis.com/maps/api/staticmap?center={{edetails.place.location.latitude}},{{edetails.place.location.longitude}}&zoom=15&scale=false&size=600x200&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:red%7Clabel:0%7C{{edetails.place.location.latitude}},{{edetails.place.location.longitude}}" alt="Map"></a><br> </div> </div> <img class="img-rounded img-responsive fullwidthimg" src="{{edetails.cover.source}}"> </div> <hr class="separator"> </div> </center> <div ng-if="loading"> <div class="spinner"> <div class="double-bounce1"></div> <div class="double-bounce2"></div> </div> </div> <div infinite-scroll="loadMoreInfinite()" infinite-scroll-distance="3"></div> </div> </div>'),a.put("views/mobile.html",'<center> Visit barcelando.cat on your mobile and add it to your home screen.<br> Click <a target="_blank" href="http://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/">here</a> for instructions.<br> <img src="images/qr.jpg"> </center>'),a.put("views/offers.html",'<center> <h1><i class="fa fa-gift"></i> Sooon!</h1> <br> </center>')}]);