function clearconsole() { 
    console.log(window.console);
    if(window.console || window.console.firebug) {
        console.clear();
    }
}

$.getScript("js/lib/popUp.js", function(){
    //alert("Script loaded and executed.");
    // here you can use anything you defined in the loaded script

});  

$(document).ready(function() {
    $(this).on('click', '.deleteJQ', (function(){
        popUp('constructionMask', 'livePopupBlockDel', 'closePopupJQ');      

        $(".okDelJQ").click(function(){
            var email = $('#email').val();
            //alert(email);
            $.ajax({
                type: "POST",
                url: 'ajax/deleteAccAjax.php',
                data: {email : email},
                success: function(data) {
                    //alert(data);
                    $("#deleteconfirmJQ").hide();
                    popUp('constructionMask', 'livePopupBlockDelConfirm', 'closePopupJQ');

                },
                error: function(data) {

                    //alert('error');
                } 
            });

        }) 

    }) ) ; 

});

//$(".bidBeforeButtonJQ").click(function(){
//alert(this);
//$(this).on('click', '.bidBeforeButtonJQ', (function(){
$(".bidBeforeButtonJQ").live('click',(function(){
    var loggedIn = 0; 
    if(loggedIn === 0){
        popUp('constructionMask', 'livePopupBlock', 'closePopupJQ');
    }
}) );



// login form submit
$("#frmUserLogin").live("submit",(function(){
    var email = $('#email').val();

    var password = $('#password').val();



    //var hash = CryptoJS.SHA256("connect91");
    // alert(hash);
    //alert(password);
    //alert($('#email').val());
    $.ajax({
        type: "POST",
        url: 'ajax/login.php',
        data: {email : email, password : password},
        success: function(data) {
            loggedInPopUpForLogin(data);
            $('.beforeLoggedInJQ').fadeOut(10);
            $('.afterLoggedInJQ').fadeIn(20);

        },
        error: function(data) {

            //alert('error');
        } 
    });     
    return false;
}));

//forgot password submit
$("#frmforgotPass").live("submit",(function(){
    var email = $('#emailFgtPwdJQ').val();
    $.ajax({
        type: "POST",
        url: 'ajax/forgotPass.php',
        data: {emailFgtPwdJQ : email},
        success: function(data) {
            $("#displayMessage").text(data);
        },
        error: function(data) {

            //alert('error');
        } 
    });     
    return false;
}));


$("#frmAjxChangePass").live("submit",(function(){
    $.ajax({
        type: "POST",
        url: 'ajax/changePass.php',
        data: $(this).serialize(),
        success: function(data) {
            loggedInPopUp(data);
            $('.beforeLoggedInJQ').fadeOut(10);
            $('.afterLoggedInJQ').fadeIn(20);
        },
        error: function(data) {

            //alert('error');
        } 
    });
    return false;
}));

$("#frmAjxKeepOldPass").live("submit",(function(){
    $.ajax({
        type: "POST",
        url: 'ajax/changePass.php',
        data: $(this).serialize(),
        success: function(data) {
            loggedInPopUp(data);
            $('.beforeLoggedInJQ').fadeOut(10);
            $('.afterLoggedInJQ').fadeIn(20);
        },
        error: function(data) {

        } 
    });
    return false;
}));

$("#userRegister").live("submit",(function(){
    //alert($(this).serialize());
    $.ajax({
        type: "POST",
        url: 'ajax/register.php',
        data: $(this).serialize(),
        success: function(result) {
            var data = result;
            if(data == 'successNewUser'){
                $('.registerJQ').empty();
                $('.registerJQ').append("<strong style='color:#0053FB; padding: 10px;'><center>Formulier succesvol bewaard. Zie uw email voor activatering. </center></strong>");
                //alert("Form submitted successfully. Please check your email for activation.")
                // $('.registerJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");
            }
            else if(data == 'successOldUser'){
                $('.registerJQ').empty();
                $('.registerJQ').append("<strong style='color:#0053FB; padding: 10px;'><center>Dit email adres is al geregistreerd bij ons.</center></strong>");
                //alert("You have already registered with this email-id. Please check your email for activation.");
                // $('.registerJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");
            }
            else{
                $('.registerError').empty();
                $('.registerJQ').append("<strong class='registerError' style='color:#0053FB; padding: 10px;'><br><br><br><br><center>"+ data+" </center></strong>");
            }
            /*loggedInPopUp(data);
            $('.beforeLoggedInJQ').fadeOut(10);
            $('.afterLoggedInJQ').fadeIn(20);*/

        },
        error: function(data) {

            //alert('error');
        } 
    });
    return false;
}));

function loggedInPopUpForLogin(data){
    if(data == 'trueNewUser'){
        //clearconsole();
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>Je bent succesvol ingelogd. </center></strong>");
        /*$('.loginDivJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");*/
        $('.loginDivJQ').append("<input type='button' name='goAhead' value='Veel Plezier' class='blue as inloggenbutton goAheadButtonJQ' />");
        remove();

    }else if(data=="false"){
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>De gebrukersnaam en paswoord worden niet herkend door het systeem </center></strong>");
        /* $('.loginDivJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");*/
        $('.loginDivJQ').append("<input type='button' name='goAhead' value='Opnieuw' class='blue as inloggenbutton goAheadButtonJQ' />");
        remove();
    }
    else{ //if(data == 'trueOldUser'){
        //clearconsole();
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>"+data+"</center></strong>");
        $("#changePassJQ").show();
        remove();

    }
}

function loggedInPopUp(data){
    if(data == 'trueNewUser'){
        //clearconsole();
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>Je bent succesvol ingelogd </center></strong>");
        /*$('.loginDivJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");*/
        $('.loginDivJQ').append("<input type='button' name='goAhead' value='Veel Plezier' class='blue as inloggenbutton goAheadButtonJQ' />");

        removeRedirectHome();


    }else if(data=="false"){
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>Het paswoord klopt niet </center></strong>");
        /*  $('.loginDivJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");*/
        $('.loginDivJQ').append("<input type='button' name='goAhead' value='Veel Plezier' class='blue as inloggenbutton goAheadButtonJQ' />");
        remove();
    }
    else{ //if(data == 'trueOldUser'){
        //clearconsole();
        //alert('else');
        $('.loginDivJQ').empty();
        $('.loginDivJQ').append("<strong style='color:#0053FB;'><center>"+data+"</center></strong>");
        /*$('.loginDivJQ').append("<input type='button' name='goAhead' value='Go Ahead' class='blue as inloggenbutton goAheadButtonJQ' />");*/
        $('.loginDivJQ').append("<input type='button' name='goAhead' value='Veel Plezier' class='blue as inloggenbutton goAheadButtonJQ' />");
        $("#changePassJQ").show();
        //remove()
        removeRedirectHome();


    }
}
function remove(){
    $('.goAheadButtonJQ').click(function(){
        $('#bidButton').removeClass('bidBeforeButtonJQ').addClass('bidAfterButtonJQ');
        $('#bidButtonInlogeen').removeClass('bidBeforeButtonJQ').addClass('bidAfterButtonJQ');
        $('#bidButtonRegister').removeClass('bidBeforeButtonJQ').addClass('bidAfterButtonJQ');

        $("div.constructionMask").hide();
        $("div.livePopupBlock").hide();
        $("div.loginDivJQ").hide();  
        window.location.reload();
        //clear();
        loggedIn = 1;
    });
}      
function removeRedirectHome(){
    $('.goAheadButtonJQ').click(function(){
        //document.location = "/";
        //alert("hi");

        clear();
        loggedIn = 1;
        window.location.reload();
    });
}      

function wonPopUp(){
    
    var cycleID = $('.auctionDetailJQ').attr('cycleID');
    var auctionID = $('.auctionDetailJQ').attr('auctionId');
    
    if(cycleID && auctionID){
        $.ajax({
            type: "POST",
            url: 'ajax/wonPopUp.php',
            data: {auctionID : auctionID, cycleID : cycleID},
            success: function(data) {
                if(1 == data){
                    
                    popUp('constructionMask', 'allTextPopUpJQ', 'closeJQ', 'Congratulation. You won this auction.', 'OK')
                }

            },
            error: function(data) {

                //alert('error');
            } 
        });


    }

}

