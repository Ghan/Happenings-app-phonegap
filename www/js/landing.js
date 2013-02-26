
var appEvents = {};


$('#landing-page').live('pageshow',function() {
                        
                        $.event.special.swipe.horizontalDistanceThreshold = 100;
                        
                        getEventList();
                        });            
                        


$('#dance-page').live('swiperight',function(){
                        $.mobile.changePage( "theatre-page.html", { transition: "reverse slide"} );
                        });
  
$("#dance-page").live('swipeleft',function(){
                        $.mobile.changePage( "jazz-page.html", { transition: "slide"} );
                        });

$("#dance-page").live('pageshow',function(){
                        displayList("dance");
                        
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "theatre-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "jazz-page.html", { transition: "slide"} );
                            });
                        
                        });



$('#jazz-page').live('swiperight',function(){
                      $.mobile.changePage( "dance-page.html", { transition: "reverse slide"} );
                      });

$("#jazz-page").live('swipeleft',function(){
                      $.mobile.changePage( "music-page.html", { transition: "slide"} );
                      });


$("#jazz-page").live('pageshow',function(){
                      displayList("jazz");
                      
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "dance-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "music-page.html", { transition: "slide"} );
                            });
                      
                      });


$("#music-page").live('swiperight',function(event, ui){
                      $.mobile.changePage("jazz-page.html", { transition: "reverse slide"});
                      });

$("#music-page").live('swipeleft',function(event, ui){
                      $.mobile.changePage("opera-page.html", { transition: "slide"});
                      });

$("#music-page").live('pageshow',function(){
                     displayList("music");
                     
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "jazz-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "opera-page.html", { transition: "slide"} );
                            });
                     
                     });

$("#opera-page").live('swiperight',function(event, ui){
                      $.mobile.changePage("music-page.html", { transition: "reverse slide"});
                      });

$("#opera-page").live('swipeleft',function(event, ui){
                      $.mobile.changePage("performance-page.html", { transition: "slide"});
                      });

$("#opera-page").live('pageshow',function(){
                      displayList("opera");
                      
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "music-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "performance-page.html", { transition: "slide"} );
                            });
                      
                      });


$("#performance-page").live('swiperight',function(event, ui){
                            $.mobile.changePage("opera-page.html", { transition: "reverse slide"});
                            });

$("#performance-page").live('swipeleft',function(event, ui){
                            $.mobile.changePage("theatre-page.html", { transition: "slide"});
                            });

$("#performance-page").live('pageshow',function(){
                     displayList("performance");
                     
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "opera-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "theatre-page.html", { transition: "slide"} );
                            });
                     
                     });


$('#theatre-page').live('swiperight',function(){
                      $.mobile.changePage( "performance-page.html", { transition: "reverse slide"} );
                      });

$("#theatre-page").live('swipeleft',function(){
                      $.mobile.changePage( "dance-page.html", { transition: "slide"} );
                      });

$("#theatre-page").live('pageshow',function(){
                     displayList("theatre");
                     
                        $("#left_btn").click(function () {
                            $.mobile.changePage( "performance-page.html", { transition: "reverse slide"} );
                            });
                        
                        $("#right_btn").click(function () {
                            $.mobile.changePage( "dance-page.html", { transition: "slide"} );
                            });
                     
                     });


function getEventList() {
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
               appEvents = events;
               events.sort(SortByStartDate);
               var today = new Date();
               //today = today.setMonth(3);
               //console.log(today);
               $.each(events, function(key, event) {
                   /*if (convertToDate(event.event_start_date) >= today && Math.abs(convertToDate(event.event_start_date) - today) < 7*1000*60*60*24){ */
                   if (convertToDate(event.event_start_date) >= today){
                       //appEvents.push(event);
                   }
				  }); 
               $.mobile.changePage( "dance-page.html", { transition: "flip"});
           } 
    });
}

function displayList(genre) {
    //map genres to category names
    console.log("going to display " +genre);
    var categoryMap;
    var eventphoto;
    var random;
    switch (genre){
        case "dance":
            categoryMap = ["Modern Dance","Contemporary"];
            break;
        case "jazz":
            categoryMap = ["Jazz","Rhythm & Blues"];
            break;
        case "music":
            categoryMap = ["Music", "Exhibition"];
            break;
        case "opera":
            categoryMap = ["Opera"];
            break; 
        case "performance":
            categoryMap = ["Performance"];
            break;
        case "theatre":
            categoryMap = ["Off Broadway"];
            break;
        default:
            categoryMap = ["Broadway"];
    } 
   $.each(appEvents, function(key, event) {
          if (categoryMap.indexOf(event.category) != -1){
          console.log("found a matching event");
          if (event.photos.length >= 1){
            eventphoto = event.photos[0];
          } else {
              random = Math.floor(Math.random()*3) + 1;
              eventphoto = "./images/events/"+genre+"-"+ random +".jpg";
          }
          console.log(eventphoto);
          $('#'+genre+'-events').append('<div class="event_box"><a href="eventdetail.html?id='+event.id+'" data-transition="slideup"><div class="showcase_img"><img src="'+eventphoto+'" /></div><div class="showcase_left"><div class="showcase_date">'+ makeDateString(event.event_start_date) + ' to ' + makeDateString(event.event_end_date) +'</div><div class="showcase_title">'+event.name+'</div><div class="showcase_venue">'+ event.vname +'</div></div><div class="showcase_right"><img class="friends_btn" src="images/friends_btn.png" /></div><div class="clear"></div></a></div>');
           } 
    }); 
}


