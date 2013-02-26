$('#landing-page').live('pageshow',function() {
                        getEventList();
                        
                        });


//                        
//                        $("#logout").click(function(){
//                                        Facebook.logout();
                                        //console.log("Logout initiated");
                                        //Facebook.me();
                                        //localStorage.removeItem(facebook_token);
                                        //$.mobile.changePage( "index.html", { transition: "slideup"} );
//                                        });
                        
            
                        
                        


$('#dance-page').live('swiperight',function(){
                        $.mobile.changePage( "theatre-page.html", { transition: "reverse slide"} );
                        });
  
$("#dance-page").live('swipeleft',function(){
                        $.mobile.changePage( "jazz-page.html", { transition: "slide"} );
                        });

$("#dance-page").live('pageshow',function(){
                        getEventList("dance");
                        });



$('#jazz-page').live('swiperight',function(){
                      $.mobile.changePage( "dance-page.html", { transition: "reverse slide"} );
                      });

$("#jazz-page").live('swipeleft',function(){
                      $.mobile.changePage( "music-page.html", { transition: "slide"} );
                      });


$("#jazz-page").live('pageshow',function(){
                      getEventList("jazz");
                      });


$("#music-page").live('swiperight',function(event, ui){
                      $.mobile.changePage("jazz-page.html", { transition: "reverse slide"});
                      });

$("#music-page").live('swipeleft',function(event, ui){
                      $.mobile.changePage("opera-page.html", { transition: "slide"});
                      });


$("#opera-page").live('swiperight',function(event, ui){
                      $.mobile.changePage("music-page.html", { transition: "reverse slide"});
                      });

$("#opera-page").live('swipeleft',function(event, ui){
                      $.mobile.changePage("performance-page.html", { transition: "slide"});
                      });


$("#opera-page").live('pageshow',function(){
                      getEventList("opera");
                      });


$("#performance-page").live('swiperight',function(event, ui){
                            $.mobile.changePage("opera-page.html", { transition: "reverse slide"});
                            });

$("#performance-page").live('swipeleft',function(event, ui){
                            $.mobile.changePage("theatre-page.html", { transition: "slide"});
                            });


$('#theatre-page').live('swiperight',function(){
                      $.mobile.changePage( "performance-page.html", { transition: "reverse slide"} );
                      });

$("#theatre-page").live('swipeleft',function(){
                      $.mobile.changePage( "dance-page.html", { transition: "slide"} );
                      });


function getEventList(genre) {
    console.log("Begin get event list for " + genre);
	$.ajax({
		   url: serviceURL + "event/",
		   type: 'get',
		   dataType: 'json',
		   error: function (XMLHttpRequest, textStatus, errorThrown) {
		   navigator.notification.alert('failed to get JSON');
		   console.log(JSON.stringify(XMLHttpRequest));
		   console.log(JSON.stringify(textStatus));
		   console.log(JSON.stringify(errorThrown));
		   },
		   success: function (data) {
               //navigator.notification.alert(JSON.stringify(data));
               $('#events li').remove();
               var events = data.elements;
               var eventsArray = jQuery.parseJSON(events);
               events.sort(SortByStartDate);
               var today = new Date();
               var categoryMap;
                if (genre == "dance"){
                    categoryMap = "Modern Dance";
                } else if (genre == "opera"){
                    categoryMap = "Opera";
                }
               //today = today.setMonth(3);
               //console.log(today);
               $.each(events, function(key, event) {
                   /*if (convertToDate(event.event_start_date) >= today && Math.abs(convertToDate(event.event_start_date) - today) < 7*1000*60*60*24){ */
                   if (event.category == categoryMap){
                       $('#'+genre+'-events').append('<div id="event_box"><div class="showcase_img"><div class="showcase_title">'+event.name+'</div><div class="showcase_date">'+ makeDateString(event.event_start_date) + ' to ' + makeDateString(event.event_end_date) +'</div><div class="showcase_venue">'+ event.vname +'</div></div></div>');
                   }
				  });
               $('#'+genre+'-events').listview('refresh');  
                $.mobile.changePage( "dance-page.html");
           } 
    });
}