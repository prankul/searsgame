<?php

    include_once('../controller/loginController.php');
?>
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8" />



        <!-- Use the .htaccess and remove these lines to avoid edge case issues.
        More info: h5bp.com/b/378 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <title>SEAR BACKEND</title>
        <meta name="description" content="" />
        <meta name="author" content="Connect91" />
        <base href="" />
        <!-- Mobile viewport optimized: j.mp/bplateviewport -->
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

        <!-- CSS: implied media=all -->
        <!-- CSS concatenated and minified via ant build script-->
        <link rel="stylesheet" href="styles/admin/style.css" />
        <link rel="stylesheet" href="styles/admin/all.css" />
        <!-- end CSS-->

        <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

        <!-- All JavaScript at the bottom, except for Modernizr / Respond.
        Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
        For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
        <script src="js/admin/modernizr-2.0.6.min.js"></script>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <!--[if lt IE 9]>
        <script type="text/javascript" src="styles/admin/html5.js"></script>
        <link rel="stylesheet" href="styles/admin/ie.css" type="text/css" media="all">
        <![endif]-->
    </head>
             
    <body>
        <div id="container">

          
        
        <div class="connect-logo"><img src="connect-91-logo.png" width="200" height="71" /></div>  
        <div id="main" role="main"  class="registration">

            <div id="content">  <?php if($_GET['auth']=="false"){ echo "<b>Wrong User-Name or Password";}?>

                <form id="frmLogin" class="cssform" name="frm_login" action="" method="post">
                    <p>
                        <label >Admin Name</label>
                        <input class="text name" type="text"  name="userName" id="user" value="" />
                    </p>

                    <p>
                        <label >Password</label>
                        <input class="password text"  type="password" name="password" id="" value="" />
                    </p>
                    <p>
                        <label for="submit">&nbsp;</label>
                        <input type="hidden" name="doLogin" value="true" />
                        <input type="submit" name="submit" value="Log In" id="sub"/>

                    </p>  
                </form>        

            </div>
        </div>



        <div>

        </div> <!--! end of #container -->


        <!-- JavaScript at the bottom for fast page loading -->

        <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->




        <!-- scripts concatenated and minified via ant build script-->
        <script defer src="js/admin/plugins.js"></script>
        <script defer src="js/admin/script.js"></script>
        <!-- end scripts-->


        <!-- Change UA-XXXXX-X to be your site's ID -->
        <!--<script>
        window._gaq = [['_setAccount','UAXXXXXXXX1'],['_trackPageview'],['_trackPageLoadTime']];
        Modernizr.load({
        load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
        });
        </script>
        -->

        <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
        chromium.org/developers/how-tos/chrome-frame-getting-started -->
        <!--[if lt IE 7 ]>
        <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
        <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
        <![endif]-->

    </body>
</html>