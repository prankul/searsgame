$.ajax({
    url: 'templates/anmtImgsAjax.php',
    success: function(data) {
        jsonObj = eval ("(" + data + ")");
        var cnt = jsonObj.length;
		if(cnt > 1){
			if(0	==	jsonObj[0].subcategory_url){
				$("#imageSlideJQ").attr('src', "assets/images/announcement/" + jsonObj[0].image);
				$("#imgLinkJQ").attr({'href' : jsonObj[0].anmt_url,'target' : '_blank'});
			}
			else
			{
				$("#imageSlideJQ").attr('src', "assets/images/auction/" + jsonObj[0].image);
				$("#imgLinkJQ").attr({'href' : jsonObj[0].category_url+"/"+jsonObj[0].subcategory_url+"/"+jsonObj[0].anmt_url,'target' : '_blank'});
			}
			
			
		}
        function Slider(){
            
           
			$('#imageSlideJQ').fadeOut(1000, function() {
				currIndex = (jsonObj.length++) % cnt;
				if(0	==	jsonObj[currIndex].subcategory_url){
                $(this).attr('src', "assets/images/announcement/" + jsonObj[currIndex].image).fadeIn(1000);
				$(this).parent().attr({'href': jsonObj[currIndex].anmt_url, 'target':'_blank'});
				}
				else
				{
					 $(this).attr('src', "assets/images/auction/" + jsonObj[currIndex].image).fadeIn(1000);
				$(this).parent().attr({'href': jsonObj[currIndex].category_url+"/"+jsonObj[currIndex].subcategory_url+"/"+jsonObj[currIndex].anmt_url, 'target':'_blank'});
				}
			});
        }

        $(function() {
            setInterval(Slider, 5000);
        });
    }
});