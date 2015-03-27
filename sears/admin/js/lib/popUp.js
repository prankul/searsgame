function popUp(mask, popUpDivClassName, closeButtonClass, message, closeText){

    var mask = $('div.' + mask);
    var popUpDivClassName = $('div.' + popUpDivClassName);
    var closeButtonClass = $('.' + closeButtonClass);
   

    mask.css("height",$(document).height()+"px");
    //alert($("div.livePopupBlock").height());

    console.log($('html').offset());

    var top;
    top = $('html').offset().top;
    //alert(top);

    /* if (navigator.appName != 'Netscape') {
    top = $('html').offset().top;


    }
    else{
    top = $('html').offset().top;
    //alert( "this is not msie!" );
    }*/



    popUpDivClassName.css({"left" : ((popUpDivClassName.parent().width() - popUpDivClassName.width()) / 2)+"px"}, 500);
    // popUpDivClassName.css({'top' : (($(window).height() - popUpDivClassName.height()) / 2)+"px"}, 500);
    popUpDivClassName.css({'top' : (($(window).height()+(-(top*2)) - popUpDivClassName.height()) / 2)+"px"}, 500);
    //  alert($(window).height())
    // alert( popUpDivClassName.height())
    // alert(($(window).height() - popUpDivClassName.height()) / 2)
    mask.show();
    $('.messageJQ').html(message);
    $('.closeJQ').html(closeText);
    popUpDivClassName.show();


    closeButtonClass.click(function(){
        mask.hide();
        popUpDivClassName.hide();
    });
}