function auctionTabs(){
    var tabs = Array(); 
    $('ul.auctionTabJQ li').each(function(index) {
        tabs.push($(this).children().attr('tabName'))        
       // alert(index + ': ' + $(this).children().attr('tabName'));
    });
//console.log(tabs);
    $(".auctionTabs").live('click',(function(){
		//alert("here");
        $(".auctionTabs").removeClass("bied-menu-active");
		$(this).addClass("bied-menu-active");
		var auctionTabName = $(this).attr('tabName');
		$.each(tabs, function(key, value) {
             //alert(value)
             $('.'+value).fadeOut('fast').delay(100); 
         });
        $('.'+ auctionTabName).fadeIn('slow');  
    }));
}



$(function() {
    // Handler for .ready() called.
    auctionTabs();
});