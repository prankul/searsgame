function clearconsole() { 
    console.log(window.console);
    if(window.console || window.console.firebug) {
        console.clear();
    }
}
$.getScript("js/lib/popUp.js", function(){

});

$(document).ready(function() {

//normal    
    $(this).on('click', '.deleteconfirm', (function(){
        var currentHref = $(this).attr('url');
        //var currentHref = $(this).attr('href') ;
        
        popUp('constructionMask', 'livePopupBlock', 'closePopupJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 

    }) ) ;   
                                               
 //change end date         
    $(this).on('click', '.changeToDateConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskchangeDate', 'livePopupBlockchangeDate', 'closePopupchangeDateJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ;	
    
   //change price         
    $(this).on('click', '.changePriceConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskPrice', 'livePopupBlockPrice', 'closePopupPriceJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ; 
    
    
    //refund         
    $(this).on('click', '.refundConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskRefund', 'livePopupBlockRefund', 'closePopupRefundJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ;
    
    
    
    //change est shipment date         
    $(this).on('click', '.changeest_shipDateInsConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskest', 'livePopupBlockest', 'closePopupestJQ');      
         
        $(".ok").click(function(){
            alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ; 
    
    //change expired tab - validity end date
    $(this).on('click', '.changeExpiredEndDateConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskexDate', 'livePopupBlockexDate', 'closePopupexDateJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ;                         

 
 //set notes   
    $(this).on('click', '.setNotesConfirm', (function(){
        var currentHref = $(this).attr('url');
        
        popUp('constructionMaskSetNotes', 'livePopupBlockSetNotes', 'closePopupSetNotesJQ');      
         
        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 
                                           
    }) ) ;     

});