function bidderInfo(){

    var auctionId = $('.auctionDetailJQ').attr('auctionId');
    var cycleID = $("#bidButton").attr('cycleID');
    
    //alert(auctionId)
    //alert(cycleID)

    if(auctionId){

        $.ajax({
            type: "POST",
            url: 'ajax/bidderInfo.php',
            data: {auctionId : auctionId, cycle_num : cycleID},
            success: function(data) {

                $('.bidderInfoJQ').empty();
                $('.bidderInfoJQ').html(data);
                $('.currentBid').html($('#tblHighest').find("td:first").html());

            },
            error: function(data) {

                //alert('error');
            } 
        }); 
    }
}


$(document).ready(function() { 

    window.setInterval(function(){
        /// call your function here
        if(true === getBidderInfo)    
        {
            bidderInfo();
        }
        }, 500);



});

