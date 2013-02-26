// GLOBAL VARS
var my_client_id = "219629038133901", // YOUR APP ID
	my_secret = "ae1ec1ee98f444a24cef8083ccab2b75", // YOUR APP SECRET 
	my_redirect_uri = "http://www.facebook.com/connect/login_success.html", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
 
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var client_browser;

// FACEBOOK
var Facebook = {
	init:function(){
        
        console.log("Facebook.init start");
		// Begin Authorization
		var authorize_url = "https://graph.facebook.com/oauth/authorize?";
		 authorize_url += "client_id=" + my_client_id;
		 authorize_url += "&redirect_uri=" + my_redirect_uri;
		 authorize_url += "&display=" + my_display;
		 authorize_url += "&scope=email,user_birthday,status_update,publish_stream,user_about_me,offline_access"
 
		 // Open Child browser and ask for permissions
        if(client_browser == null){
            console.log("creating childbrowser object");
            client_browser = ChildBrowser.install();
        }
		 client_browser.onLocationChange = function(loc){
             console.log("browser detects location change");
			 Facebook.facebookLocChanged(loc);
		 };
		 if (client_browser != null) {
             console.log("showing website in childbrowser"); 
			window.plugins.childBrowser.showWebPage(authorize_url);
		 }
	},
	facebookLocChanged:function(loc){
        console.log("location changed in childbrowser");
		// When the childBrowser window changes locations we check to see if that page is our success page.
		if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
			var fbCode = loc.match(/code=(.*)$/)[1]
			$.ajax({
				url:'https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&client_secret='+my_secret+'&code='+fbCode+'&redirect_uri=http://www.facebook.com/connect/login_success.html',
				data: {},
				dataType: 'text',
				type: 'POST',
				success: function(data, status){
                    console.log("successfully retrieved facebook_token from facebook");
					// We store our token in a localStorage Item called facebook_token
					localStorage.setItem(facebook_token, data.split("=")[1]);
                    
                   console.log(data);
					window.plugins.childBrowser.close();
                   
					app.init();
				},
				error: function(error) {
                    console.log("couldn't retrieve facebook_token from facebook");
					window.plugins.childBrowser.close();
				},
                fail: function(jqXHR, textStatus) {
                    alert( "Request failed: " + textStatus );
                }
			});
		}
	},
	share:function(url){
 
		// Create our request and open the connection
		var req = new XMLHttpRequest(); 
		req.open("POST", url, true);
 
 
		req.send(null); 
		return req;
	},
	post:function(_fbType,params){
 
		// Our Base URL which is composed of our request type and our localStorage facebook_token
		var url = 'https://graph.facebook.com/me/'+_fbType+'?access_token='+localStorage.getItem(facebook_token);
 
		// Build our URL
		for(var key in params){
			if(key == "message"){
 
				// We will want to escape any special characters here vs encodeURI
				url = url+"&"+key+"="+escape(params[key]);
			}
			else {
				url = url+"&"+key+"="+encodeURIComponent(params[key]);
			}
		}
 
		var req = Facebook.share(url);
 
		// Our success callback
		req.onload = Facebook.success();
	},
	success:function(){
        navigator.notification.alert('Shared on FB!');
		console.log("DONE!");
 
	}
    ,
    logout:function(){
        console.log("Facebook.logout() init");
        //window.plugins.childBrowser.LogOut();
        localStorage.removeItem(facebook_token);
        $.mobile.changePage( "index.html", { transition: "slideup"} );
        app.init();
    },
/*
     me:function(){
        FB.api('/me', function(response) {
                if (response.error) {
                    console.log(JSON.stringify(response.error));
                } else {
                    var data = document.getElementById('data');
                    response.data.forEach(function(item) {
                                          console.log(item.name);
                                          //var d = document.createElement('div');
                                          //d.innerHTML = item.name;
                                          //data.appendChild(d);
                                          });
                }
                });
     }
     */
};

// APP
var app = {
	bodyLoad:function(){
        console.log("found body");
		document.addEventListener("deviceready", app.deviceReady, false);
	},
	deviceReady:function(){
		app.init();
	},
	init:function(){
        console.log("initialized");
		// First lets check to see if we have a user or not
		if(!localStorage.getItem(facebook_token)){
            console.log("No facebook_token");
			$("#loginArea").show();
			$("#status").hide();
 
			$("#login").click(function(){
				Facebook.init();
			});
		}
		else {
			console.log("found facebook_token in localstorage, logged in.");
            
			$("#loginArea").hide();
			$("#status").show();
            //send facebook token to server using localStorage.getItem(facebook_token)
            $.post(
                   serviceURL + "login/",
                   "token=" + localStorage.getItem(facebook_token), 
                   function(data){
                        console.log("Post to /login/ successful");
                        //if set a new record, send to user settings page
                        if (data.email){
                            //send to user welcome page
                            console.log("found record on server, sending to welcome page");
                            $.mobile.changePage( "landing.html", { transition: "fade"} );
                        }
                        else{
                            //send to user settings page
                            console.log("created new user record, sending to user settings page");
                            $.mobile.changePage( "usersettings.html", { transition: "slideup"} );
                        }
                   }
                   ,'json');
            
            /* -- OR, to add Error Handling --
             $.ajax({
             url: serviceURL + "login/?token=" + localStorage.getItem(facebook_token),
             type: 'get',
             dataType: 'json',
             error: function (XMLHttpRequest, textStatus, errorThrown) {
             navigator.notification.alert('failed to set token');
             console.log(JSON.stringify(XMLHttpRequest));
             console.log(JSON.stringify(textStatus));
             console.log(JSON.stringify(errorThrown));
             },
             success: function (data) {
             navigator.notification.alert("Session started");
             }
             });
             */
		}
	},
	done:function(){
 
	},
	createPost:function(jdata){
        
        var data = jdata.elements;
        var sessuser = jdata.sessuser;
 
		// Define our message!
		var msg = sessuser.fname + " wants to see " + data.name + " at " + data.vname + ". Check it out on Happenings App (on iPhone).";
 
		// Define the part of the Graph you want to use.
		var _fbType = 'feed';
 
		// This example will post to a users wall with an image, link, description, text, caption and name.
		// You can change
		var params = {};
			params['message'] = msg;
			params['name'] = '';
			params['description'] = "Now following on Happenings App:";
			params['_link'] = "";
			params['picture'] = "";
			params['caption'] = 'Happenings App';
 
		// When you're ready send you request off to be processed!
		Facebook.post(_fbType,params);	
	}
};

