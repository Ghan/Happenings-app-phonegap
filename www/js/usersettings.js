
$('#user-settings-page').live('pageshow',function() {
                                 console.log("in usersettings.js, going to launch submit");
                      setUserSettings();
					  });

function setUserSettings() {
    
    //pre-fetch user data
    $.post(
    serviceURL + "login/",
    "token=" + localStorage.getItem(facebook_token), 
    function(data){
        console.log(data.mail);
        $('#user-setup-fname').html(data.fname);
    });
    
    
	//navigator.notification.alert('Hi!');
	$('#user-setup').submit(function() {
                            console.log("submitting user settings info...");
                            $.post(
                                  serviceURL + "user/",
                                  $("#user-setup").serialize(), //sends fname lname email phone
                                  function(data){
                                   if(!data){
                                   console.log("Error on post to /user/");
                                   }
                                   if(data.value == "success"){
                                   navigator.notification.alert("User Profile Saved!");
                                   $.mobile.changePage( "landing.html", { transition: "slideup"} );
                                   } else {
                                   navigator.notification.alert("Eeep! Changes not saved. Please try again.");
                                   }
                                  },'json');
                            return false;
                            });

}