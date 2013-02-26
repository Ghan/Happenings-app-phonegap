$('#event-detail').live('pageshow',function() {
					  var id = getUrlVars()["id"];
					  //navigator.notification.alert(id + "yup");
					  getEventDetail(id);
			});

function getEventDetail(id) {
    console.log("begin event detail for id: " + id);
	$.ajax({
		   url: serviceURL + "event/" + id +"/",
		   type: 'get',
		   dataType: 'json',
		   error: function (XMLHttpRequest, textStatus, errorThrown) {
			navigator.notification.alert('failed to get JSON');
			console.log(JSON.stringify(XMLHttpRequest));
			console.log(JSON.stringify(textStatus));
			console.log(JSON.stringify(errorThrown));
		   },
		   success: function (jdata) {
            var eventphoto;
            var data = jdata.elements;
            var sessuser = jdata.sessuser;
            
            console.log(data);
            /*
            if (data.photos.length >= 1){
              eventphoto = data.photos[0];
            } else {
              eventphoto = "./images/events/eventdetail-placeholder.jpg";
            }
            $('.event_detail_img').html('<img src="'+eventphoto+'" />');
            */
           
            $("#learn-more").css("font-weight","bold");
            $("#event-description").show();
            $("#user-content").hide();
            $("#videos").hide();
            $('#title').html(data.name);
            $('.showcase_title').html(data.name);  
            $('.showcase_date').html(makeDateString(data.event_start_date) + ' to ' + makeDateString(data.event_end_date));
            $('.showcase_venue').html("<a href='venuedetail.html?id="+data.venueId+"' data-transition='slide'>" + data.vname + "</a>");
            $('#long-description').html(data.long_description);
               
               
               if(data.wear == "1"){
                   $('#bowties').html("<img src='images/bowtie_fill.png' /><img src='images/bowtie_empty.png' /><img src='images/bowtie_empty.png' /><img src='images/bowtie_empty.png' /><br />");   
               } else if (data.wear == "2"){
                   $('#bowties').html("<img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_empty.png' /><img src='images/bowtie_empty.png' /><br />"); 
               } else if (data.wear == "3"){
                   $('#bowties').html("<img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_empty.png' /><br />"); 
               } else if (data.wear == "4"){
                   $('#bowties').html("<img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><br />");
               } else {
                   $('#bowties').html("<img src='images/bowtie_fill.png' /><img src='images/bowtie_fill.png' /><img src='images/bowtie_empty.png' /><img src='images/bowtie_empty.png' /><br />"); 
               }
               $('#stars').html("<img src='images/star_fill.png' /><img src='images/star_fill.png' /><img src='images/star_fill.png' /><img src='images/star_empty.png' /><br />");
            
           console.log(sessuser.mail);
            //check if sessuser is in data.rushlist. If it is, #add-to-faves = "Already!"
            
           if(sessuser.rushList.indexOf(data.id) != -1){
                $('#fave_img').attr("src", "images/rushticketACTIVE_btn.png");
            }
            
            //check data.rushList, if it contains user's email then say "Already Fave!"
		   $('#add-to-faves').click(function() {
								console.log("posting to fave " + data.id);
               navigator.notification.confirm(
                                            "Would you like to be added to rush tickets for " + data.name + " at " + data.vname + "?",
                                            faveConfirm,
                                            "Confirm Rush",
                                            "Yes!,No"
                                            );
								
                                 });

               function faveConfirm(button){
                   if(button == 1){
                       $.post(
                       serviceURL + "fave/" + id + "/",
                       data.id, 
                       function(faveData){
                           //callback 
                           console.log(faveData.value);
                           if (faveData.value == "added"){
                               $('#fave_img').attr("src", "images/rushticketACTIVE_btn.png");
                               navigator.notification.alert("Thanks. We'll let you know by sending you a text message if a seat is available.");
                           }
                           if (faveData.value == "already"){
                               $('#fave_img').attr("src", "images/rushticketACTIVE_btn.png");
                           }
                       },'json');
                   }
                  
               }
               
               //share functionality
               $("#facebook-link").click(function(){
                   app.createPost(jdata);	
                   $('#facebook_img').attr("src", "images/facebookACTIVE_btn.png");
               });	
           
               //like functionality
               $("#like-link").click(function(){
                    var imgStatus = $('#like-img').attr("src");
                    if (imgStatus == "images/likeACTIVE_btn.png"){
                        $('#like-img').attr("src", "images/like_btn.png");
                    } else {
                        $('#like-img').attr("src", "images/likeACTIVE_btn.png");
                    }
               });	
               
               
               //bottom half tab navigation
                $("#learn-more").click(function(){
                                       $(this).addClass("on");
                                       $(this).css("font-weight","bold");
                                       $("#fan-say").removeClass("on").css("font-weight","normal");
                                       $("#trailers").removeClass("on").css("font-weight","normal");
                                       $("#event-description").show();
                                       $("#user-content").hide();
                                       $("#videos").hide();
                   
                });
                $("#fan-say").click(function(){
                                    $(this).addClass("on");
                                    $(this).css("font-weight","bold"); 
                                    $("#learn-more").removeClass("on").css("font-weight","normal");
                                    $("#trailers").removeClass("on").css("font-weight","normal");
                                    $("#event-description").hide();
                                    $("#user-content").show();
                                    $("#videos").hide();
                   
                });
                $("#trailers").click(function(){
                                     $(this).addClass("on");
                                     $(this).css("font-weight","bold");
                                     $("#learn-more").removeClass("on").css("font-weight","normal");
                                     $("#fan-say").removeClass("on").css("font-weight","normal");
                                     $("#event-description").hide();
                                     $("#user-content").hide();
                                     $("#videos").show();
                   
                });
		   }
	});
}


