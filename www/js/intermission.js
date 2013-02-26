$('#intermission').live('pageshow',function() {
    var id = getUrlVars()["id"];
    //getIntermission(id);
    soundEvent();
});

function soundEvent(){
    var soundOn = false;
    var snd = new Media("/images/thecage.mp3");
    $("#intermission_player").click(function(){
                                if (snd){
                                        if (soundOn == false){
                                            console.log("sound off, turning on");
                                            soundOn = true;
                                            snd.play();
                                        } else {
                                            console.log("sound on, turning off");
                                            snd.pause();
                                            soundOn = false;
                                        }
                                    }
                                });
}

function getIntermission(id) {
    console.log("begin Intermission for id: " + id);
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
            
            if (data.photos.length >= 1){
                eventphoto = data.photos[0];
            } else {
                eventphoto = "./images/eventdetail-placeholder.jpg";
            }
            $('.event_detail_img').html('<img src="'+eventphoto+'" />');
            
            $('#title').html(data.name);
            $('.showcase_title').html(data.name);  
            $('.showcase_date').html(makeDateString(data.event_start_date) + ' to ' + makeDateString(data.event_end_date));
            $('.showcase_venue').html("<a href='venuedetail.html?id="+data.venueId+"' data-transition='slide'>" + data.vname + "</a>");
            
            
            
        }
    });
}
