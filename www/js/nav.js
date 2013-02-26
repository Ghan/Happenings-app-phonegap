var navLoad = function(){
  $("#dance-page").bind('swipeleft',function(event, ui){
                        $.mobile.changePage("#theatre-page", "slide");
                        });

  $("#dance-page").bind('swiperight',function(event, ui){
                  $.mobile.changePage("#jazz-page", "slide");
                        });
  
  
  $("#jazz-page").bind('swipeleft',function(event, ui){
                        $.mobile.changePage("#dance-page", "slide");
                        });
  
  $("#jazz-page").bind('swiperight',function(event, ui){
                        $.mobile.changePage("#music-page", "slide");
                        });
  
  
  $("#music-page").bind('swipeleft',function(event, ui){
                       $.mobile.changePage("#jazz-page", "slide");
                       });
  
  $("#music-page").bind('swiperight',function(event, ui){
                       $.mobile.changePage("#opera-page", "slide");
                       });
  
  
  $("#opera-page").bind('swipeleft',function(event, ui){
                        $.mobile.changePage("#music-page", "slide");
                        });
  
  $("#opera-page").bind('swiperight',function(event, ui){
                        $.mobile.changePage("#performance-page", "slide");
                        });
  
  
  $("#performance-page").bind('swipeleft',function(event, ui){
                        $.mobile.changePage("#opera-page", "slide");
                        });
  
  $("#performance-page").bind('swiperight',function(event, ui){
                        $.mobile.changePage("#theatre-page", "slide");
                        });
  
  
  $("#theatre-page").bind('swipeleft',function(event, ui){
                              $.mobile.changePage("#performance-page", "slide");
                              });
  
  $("#theatre-page").bind('swiperight',function(event, ui){
                              $.mobile.changePage("#dance-page", "slide");
                              });

  }
