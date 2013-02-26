
$('#login-page').live('pageshow',function() {
					  sendCreds();
					  });

function sendCreds() {
	//navigator.notification.alert('Hi!');
	$('#send-cred').submit(function() {
			//navigator.notification.alert("hi");
			$('#login-messages').html('Connecting....');
			/*
			$.ajax({
			  url: serviceURL + "login/",
			  type: 'get',
			  dataType: 'json',
			  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  navigator.notification.alert('failed to get JSON');
				  console.log(JSON.stringify(XMLHttpRequest));
				  console.log(JSON.stringify(textStatus));
				  console.log(JSON.stringify(errorThrown));
                },
				   success: function (data) {
						$('#login-content').html(data); 
						}
			});
			*/
			$.post(
				serviceURL + "login/",
				$("#send-cred").serialize(), 
				
                   function(data){
                    //navigator.notification.alert("inside data function");
                    $('#login-content').empty();
                    $('#login-content').html("welcome back, " + data.id);
                    
                   
                   }
               /*    
                function(data){
				   //success
				   $('#login-content').empty();
                   
                   if (data.already == true){
                        //show data
                        loggedInAs = data.info.mail;
                        $('#login-next-button').css("display","").attr("href","eventlist.html").html("Confirm");
                        $('#login-content').html("Welcome back, " + data.info.fname + ". ");
                        $('#user-setup-fname').val(data.info.fname);
                        $('#user-setup-email').val(data.info.mail);
                        $('#user-setup-lname').val(data.info.lname);
                        $('#user-setup-phone').val(data.info.phone);
                   
                        //url for button goes to event list page
                   } else {
                        //register user
                        //$('#login-next-button').css("display","").attr("href","login2.html").html("Register");
                        $('#login-submit-button').css("display","");
                        $('#login-content').html("Hi New User");
                        $('#user-setup-email').val(data.info.mail);
            
                        $('#user-setup').submit(function() {  
                                                //navigator.notification.alert("submit function");
                                                $.post(
                                                       serviceURL + "register/",
                                                       $("#user-setup").serialize(), 
                                                       function(data1){
                                                        $('#login-subpage').empty();
                                                        navigator.notification.alert("success");
                                                       });
                                                //return false;
                                                });
                            
            
                        
                    //url for next button goes to first time page (which first posts data)
                   }
                   $('#login-subpage').css("display","block");
				}
                */
                   ,'json');
            return false;
			});

}