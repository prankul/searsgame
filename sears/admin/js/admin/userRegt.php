<?php
    include_once($_SERVER["DOCUMENT_ROOT"]."/controller/userRegtController.php");?>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
    <link rel="stylesheet" href="/resources/demos/style.css" />
    <script>
    $(document).ready(function() {
        $( "#txtDOB" ).datepicker({
            changeMonth: true,
            changeYear: true
        });
    });
    //custom radio buttons 	
    function setupLabel() {
        if ($('.label_check input').length) {
            $('.label_check').each(function(){ 
                $(this).removeClass('c_on');
            });
            $('.label_check input:checked').each(function(){ 
                $(this).parent('label').addClass('c_on');
            });                
        };
        if ($('.label_radio input').length) {
            $('.label_radio').each(function(){ 
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function(){ 
                $(this).parent('label').addClass('r_on');
            });
        };
    };
    $(document).ready(function(){
        $('body').addClass('has-js');
        $('.label_check, .label_radio').click(function(){
            setupLabel();
        });
        setupLabel(); 
    });
</script>
<style type="text/css"> 
    /*custom radio buttons */
    .has-js .label_check,
    .has-js .label_radio { padding-left: 34px; }
    .has-js .label_radio { background: url(../assets/images/normal-radio.png) no-repeat; }
    .has-js .label_check { background: url(../assets/images/normal-radio.png) no-repeat; }
    .has-js label.c_on { background: url(../assets/images/radio.png) no-repeat; }
    .has-js label.r_on { background: url(../assets/images/radio.png) no-repeat; }
    .has-js .label_check input,
    .has-js .label_radio input { position: absolute; left: -9999px; }
</style>	
<div class="login-form-container border-shade">
    <div class="form-container">
        <div class="already-login login-container border-shade">
            <h3>Log hier in!</h3>
            <form name="frmUserLogin" action="" method="post" enctype="application/x-www-form-urlencoded">
                <div class="box"><label>E-mail adres</label> <input type="text" name="email"></div>
                <div class="box"><label>Wachtwoord</label> <input type="password" name="password"></div>

                <span class="wacht">Wachtwoord vergeten?</span>
                <input type="hidden" name="doLogin" value="true">
                <input type="submit" name="subLogin" value="Inloggen" class="blue as inloggenbutton" />
            </form>
        </div>
        <div class="new-login login-container border-shade">
            <h3 class="b-margine">Nog geen account? Registreer hier!</h3>
            <form name="frmUserRegistration" action="" method="post">
                <div class="box"><label>Voornaam*</label> <input type="text" name="txtFName" value="<?php echo $oneUser['fname'];?>" /></div>
                <div class="box"><label>Achternaam*</label> <input type="text" name="txtLName" value="<?php echo $oneUser['fname'];?>" /></div>
                <div class="box">
                    <label>Nickname</label> 
                    <input type="text" name="txtUName" value="<?php echo $_POST['txtUName'];?>" />
                </div>
                <div class="radio-buttons">
                    <div class="radio-container">
                        <label class="label_radio">Man
                            <input type="radio" name="radGender" value="1" <?php if($_POST['radGender'] == 1 || empty($_POST['radGender']) )echo "checked='checked'";?> />
                        </label>
                    </div>
                    <div class="radio-container">
                        <label class="label_radio">Vrouw
                            <input type="radio" name="radGender" value="0" <?php if($_POST['radGender'] && 0 == $_POST['radGender']) echo "checked='checked'";?> />
                        </label>
                    </div>
                </div><br/>
                <div class="box">
                    <label>E-mail adres*</label> 
                    <input type="text" name="txtEmail" value="<?php echo $_POST['txtEmail'];?>" />
                </div>
                <div class="box"><label>Wachtwoord*</label> <input type="password" name="txtPass" /></div>
                <div class="box"><label class="m-top">Bevestig <br/> wachtwoord*</label> <input type="password" name="txtConfPass" /></div>
                <div class="box checkbox-container">
                    <label class="l-width" for="man" id="man">Aanmelden voor nieuwsbrief</label> 
                    <input type="checkbox" name="chkNewsletter" value="1" <?php if(1 == $_POST['chkNewsletter']) echo "checked='checked'";?> />
                    <span class="selectd-checkbox"></span>
                </div>
                <div class="box checkbox-container">
                    <label class="l-width" for="woman" id="woman"><b>Ik ga akkoord met<br/>de Algemene Voorwaarden*</b></label>
                    <input type="checkbox" name="chkTnC" value="1" />
                    <span class="checkbox"></span>
                </div>
                <!--<div class="aanmelden-button">
                <a href="#">
                <span class="blue as">Aanmelden</span>
                </a>-->
                <input type="submit" class="blue as aanmelden-button" name="sub<?php if("" != $userId)echo "Edit"; else echo "Add";?>Regstn" value="<?php if("" != $userId)echo "Edit"; else echo "Aanmelden";?>" />
                <!--</div>-->
            </form></div>
    </div>
</div>
<?php //$registered = 1;
    if($registered == 1){
    ?>
  <!--  <div class="constructionMask" style="display: block;"> </div>-->
    <div class="livePopupBlock" style="display: block;">
    <div class="already-login login-container border-shade loginDivJQ" style="background: none repeat scroll 0 0 #FFFFFF;">
        <h3>ingediend formulier met succes</h3>
		<a href="" class="blue as inloggenbutton loginButtonJQ" >OK</a>
    </div>
    </div>
    <?php }?>
<style>

    .auctionStyle{ background: none repeat scroll 0 0 black;
        color: white;
        font-family: Tahoma,Courier,monospace;
        font-size: 30px;
        height: 47px;
        text-align: center;
    width: 293px;}


    .constructionMask {
        background: none repeat scroll 0 0 #000000;
        height: inherit;
        opacity: 0.4;
        position: absolute;
        width: 100%;
        z-index: 109;
        top: 0px;
        overflow: auto;
    }

    div.livePopupBlock {

        margin: 0 auto;
        position: absolute;
        width: 400px;
        z-index: 110;
    }

    div.livePopupWrapper {
        border: 1px solid #6C2412;
        float: left;
        width: 100%;
    }
    img.logoPopup {
        float: left;
        margin: 10px 0 10px 10px;
    }
    img.closePopup {
        cursor: pointer;
        float: right;
        margin: 20px 10px 10px 0;
    }
    div.livePopupContentWrapper {
        background-color: #FBE0D9;
        clear: both;
        float: left;
        padding: 25px 20px;
        width: 430px;
    }
    div.livePopupContentWrapper p.header, div.livePopupContentWrapper p.subHeader {
        color: #D52027;
        display: block;
        font-family: "dinBold",Arial,Helvetica,sans-serif;
        font-size: 1.8em;
    }
    div.livePopupContentWrapper p.subHeader {
        color: #4C4C48;
        font-size: 1.4em;
        padding-top: 15px;
    }
</style>
<script>
    $(document).ready(function() {
        if($('div.livePopupBlock').length != 0){
           // alert($(document).height());
            $("div.constructionMask").parent().css("height",$(document).height()+"px");
            //alert($("div.livePopupBlock").height());
            $("div.livePopupBlock").css("left",(($('div.livePopupBlock').parent().width() - $("div.livePopupBlock").width()) / 2)+"px");
            $("div.livePopupBlock").css("top",(($(window).height() - $("div.livePopupBlock").height()) / 2)+"px");
        }

    });
</script>

<?php /*?>
    <fieldset class="userregtform">
    <legend><?php if("" != $userId)echo "Edit details"; else echo "Register";?></legend><br/>
    <form name="frmUserRegistration" action="" method="post">
    <div class="ctrlholder1" onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Gender</label>
    <input type="radio" name="radGender" value="1" <?php if(1 == $oneUser['sex']) echo "checked='checked'";?> /><span>Male</span>
    <input type="radio" name="radGender" value="0" <?php if(0 == $oneUser['sex']) echo "checked='checked'";?> /><span>Female</span>
    <br />
    </div>
    <div class="ctrlholder" onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>First name</label>
    <input type="text" name="txtFName" value="<?php echo $oneUser['fname'];?>" />
    </div>

    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Surname</label>
    <input type="text" name="txtLName" value="<?php echo $oneUser['lname'];?>" />
    </div>

    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Date of birth</label>
    <input type="text" name="txtDOB" id="txtDOB" value="<?php echo $oneUser['dob'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';" >
    <label>Address</label>
    <input type="text" name="txtAddress" value="<?php echo $oneUser['address'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Postal code</label>
    <input type="text" name="txtZip" value="<?php echo $oneUser['zip'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>City</label>
    <input type="text" name="txtCity" value="<?php echo $oneUser['city'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Country</label>
    <input type="text" name="txtCountry" value="<?php echo $oneUser['country'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Phone</label>
    <input type="text" name="txtPhone" value="<?php echo $oneUser['phone'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Mobile number</label>
    <input type="text" name="txtMobile" value="<?php echo $oneUser['mobile'];?>" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Nick Name</label>
    <input type="text" name="txtUName" value="<?php echo $oneUser['username'];?>" <?php if("" != $oneUser['username']) echo "disabled='disabled'"?> />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>E-mail</label>
    <input type="text" name="txtEmail" value="<?php echo $oneUser['email'];?>" <?php if("" != $oneUser['email']) echo "disabled='disabled'"?> />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <?php if("" == $userId){?>
    <label>Password</label>
    <input type="password" name="txtPass" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>Confirm password</label>
    <input type="password" name="txtConfPass" />
    </div>
    <div class="ctrlholder"  onClick="style.backgroundColor='#EDEDED';" onFocusout="style.backgroundColor='white';">
    <label>CAPTCHA Code</label>
    <input type="text" name="txtCaptcha" /><br/><span>Enter the characters in the field are</span>			
    </div>

    <br />
    <?php }?>
    <div class="newsletter">
    <span>Subscribe to the newsletter</span>	
    <input type="checkbox" name="chkNewsletter" value="1" <?php if(1 == $oneUser['newsletter']) echo "checked='checked'";?> />
    <br />
    </div>
    <div>
    <?php if("" == $userId){?>
    I agree to the Terms and Conditions and the Security and Privacy
    <input type="checkbox" name="chkTnC" value="1" />
    <br /></div>
    <?php }?>
    <input type="submit" class="subButton" name="sub<?php if("" != $userId)echo "Edit"; else echo "Add";?>Regstn" value="<?php if("" != $userId)echo "Edit"; else echo "Create Account";?>" />
    </form>
</fieldset><?php */?>