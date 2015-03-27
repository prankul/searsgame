$(document).ready(function() {

    $('.teju').click(function(){
        var classList =$('#bidButtonInlogeen, #bidButtonRegister').attr('class').split(/\s+/);     
        $.each( classList, function(index, item){ 
            if(item === "bidBeforeButtonJQ"){
                //alert(item);
                var loggedIn = 0; 
                if(loggedIn === 0){
                    popUp('constructionMask', 'livePopupBlock', 'closePopupJQ');
                }
                return false;
            } 
        });
    }) ;



    $("#bidAuction").live("submit",(function(){

        // $(this).on('click', '.bidAfterButtonJQ', (function(){

        var classList =$('#bidButton').attr('class').split(/\s+/);

        $.each( classList, function(index, item)
            {
                if (item === 'bidAfterButtonJQ') {

                    //do something
                    if(isNaN($('#txtbidAmount').val()))
                    {

                        popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Please enter valid amount to bid.', 'OK')
                        return;

                    }
                    var auctionId = $("#bidButton").attr('auctionId');
                    var cycleID = $("#bidButton").attr('cycleID');
                    var bidAmount =  $("input[name=bidAmount]").val();

                    $.ajax({
                        type: "POST",
                        url: 'ajax/bidAuction.php',
                        data: {auctionId : auctionId, bidAmount : bidAmount, cycle_num : cycleID},
                        success: function(data) { 
                            
                            if(1 == data){
                                //alert('Your bid was successful.'); 
                                popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Bidding successfull.', 'OK')
                                $("#headMoney").html('&euro;&nbsp;'+$('#txtbidAmount').val());

                                //to show the money as clicked on bid button just for functionality
                            }

                            switch(data){
                                case 'too_high_bid' :
                                    //bid higher than the last bid
                                    popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Too high bid amount.', 'OK')
                                    break;   

                                case 'low_bid' :
                                    //bid higher than the last bid
                                    popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Low bid amount.', 'OK')
                                    break;
                                case 'same_user' :
                                    //bid higher than the last bid
                                    popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Same user. Please bid higher than last bid.', 'OK')
                                    break;
                                case 'unpaid':
                                    //you have more than 3 unpaid auctions
                                    popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Cant bid. You have already more than 3 unpaid auctions.', 'OK')
                                    break;

                            }

                        },
                        error: function(data) {

                            //alert('error');
                        } 
                    });
                    return false;
                }

                else if(item === "DealAfterButtonJQ") { 

                    var deal = $("#dealUrl").val();
                    // alert(deal);
                    window.location.href = "/payment-gateway/" + deal;
                }

                else if(item === "bidBeforeButtonJQ"){
                    
                    var loggedIn = 0; 
                    if(loggedIn === 0){
                        popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Please login before bidding.', 'OK')
                    }
                    return false;
                }

        });


        return false;

    }) );


});