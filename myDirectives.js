var app = angular.module('pending', []);

app.directive('pending', function($q){
    return {
    restrict: 'AE',
    scope: {
			request: '&'
    },
    link: function(scope, elem, attrs){
      elem.bind('click', function(){
 				var deferred = $q.defer();
 				$('*').css('cursor', 'progress');
 				elem.text('Pending...');
 				elem.attr('disabled', true);
 				scope.request().then(function(response){		
 		    	setTimeout(function(){
 						elem.text('Success!');
 		    	}, 1000);
 		    	setTimeout(function(){
 						$('*').css('cursor', 'default');
 						elem.text('Submit');
 						elem.removeAttr('disabled');		    
						console.log(response);
						deferred.resolve(response);
 		    	}, 1500);
 				});
 				return deferred.promise;
 	    });
    }
  };
});


app.directive('notify', function(){
    return {
restrict: 'AE',
	scope: {
	    notif: '&'
	},
	link: function(scope, elem, attr) {
	    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
	    elem.bind('click', function(){
		Notification.requestPermission(function (permission) {
		    if (permission === 'granted') {
			console.log('You\'ve got permission baby.');
		    }
		});

		var notification = new Notification('Hi there!', {body: 'this is a notification, which you\'ve allowed to exist'});
		
            });
	}
    };
});