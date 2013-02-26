$('#venue-detail').live('pageshow',function() {
					  var id = getUrlVars()["id"];
					  getVenueDetail(id);
			});

function getVenueDetail(id) {
    console.log("begin venue detail for id: " + id);
	$.ajax({
		   url: serviceURL + "venue/" + id + "/",
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
            
            if (data.imageURL){
              eventphoto = data.imageURL;
            } else {
              eventphoto = "./images/eventdetail-placeholder.jpg";
            }
            $('.img').html('<img src="'+eventphoto+'" />');
			
            $('.title').html(data.name);
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
            $('#stars').html("<img src='images/star_fill.png' /><img src='images/star_fill.png' /><img src='images/star_empty.png' /><img src='images/star_empty.png' /><br />");
            
		   }
	});
}


