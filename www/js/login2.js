$('#login-page-2').live('pageshow',function() {
					  registerNewUser();
					  });

function registerNewUser() {
	$.post(
           serviceURL + "register/",
           $("#user-setup").serialize(), 
           function(data){
                //navigator.notification.alert("sending data");
                //data is JSON with success var: success, redundant, or other
                //if success, state "Success!" and send to eventlist.html
                //if redundant, state "Redundant!" and send to login.html
                //if other, state Other! and send to login.html
                navigator.notification.alert(data);

           });
    });

}