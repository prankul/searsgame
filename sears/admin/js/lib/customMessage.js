function clearconsole() { 
    console.log(window.console);
    if(window.console || window.console.firebug) {
        console.clear();
    }
}
$.getScript("js/lib/popUp.js", function(){

});


$(document).ready(function() {

    $(this).on('click', '.tejuPopup', (function(){
		array =[];
        
        
		$("#notpaidDiv .chkWinsArr:checked").each(function(){
				array.push( $(this).val());
		});
        
        $("#paidDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
        $("#deactivatedDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
        $("#cancelledDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
        $("#under_minPriceDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
        $("#expiredDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
        $("#incassoDiv .chkWinsArr:checked").each(function(){
                array.push( $(this).val());
        });
        
			if( 'on' == array[0]){
				array.shift();
			}

            //alert(array);
        $('#txttestJQ').val(array);
        
        $.ajax({
            url : "admin/wins/emailMessageAjax.php",
            type: "POST",
            data : {frmData : array},
            success : function(html){
                        $("#txtemailJQ").val(html);
                }                                                   
        });
        
        var currentHref = $(this).attr('hrf');
        popUp('constructionMask', 'livePopupBlock', 'closePopupJQ');      


        $(".ok").click(function(){
            //alert(currentHref);
            document.location = currentHref;
        }) 

    }) ) ;

    
}); 