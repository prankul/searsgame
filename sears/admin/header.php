<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
    <!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8" />

    <!--[if lt IE 9]>
    <script type="text/javascript" src="styles/admin/html5.js"></script>
    <link rel="stylesheet" href="styles/admin/ie.css" />
    <![endif]-->

    <!-- Use the .htaccess and remove these lines to avoid edge case issues.
    More info: h5bp.com/b/378 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <title>SEAR BACKEND</title>
    <meta name="description" content="" />
    <meta name="author" content="Connect91" />
    <base href="<?=BASE_HREF?>" />
    
    <!-- Mobile viewport optimized: j.mp/bplateviewport -->
    <meta name="viewport" content="width=device-width,initial-scale=1" />
     <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

    <!-- CSS: implied media=all -->
    <!-- CSS concatenated and minified via ant build script-->
    <link rel="stylesheet" href="styles/admin/style.css" />
    <link rel="stylesheet" href="styles/admin/all.css" />
    <link rel="stylesheet" href="styles/ui-lightness/jquery-ui-1.9.2.custom.css" />
    <link rel="stylesheet" href="styles/dateTimePicker.css" />
    <!-- end CSS-->

    <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

    <!-- All JavaScript at the bottom, except for Modernizr / Respond.
    Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
    For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
    <script src="js/admin/modernizr-2.0.6.min.js"></script>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.9.2.custom.js"></script>
    <script type="text/javascript" src="js/jquery.dateTimePicker.js"></script>
    <script src="js/lib/adminPopUp.js"></script>
    <script type="text/javascript" language="javascript" src="./js/admin/jquery.dataTables.js"></script>
    <script type="text/javascript" charset="utf-8">
        var asInitVals = new Array();

        $(document).ready(function() {
            var oTable = $('.dataTableJQ').dataTable( {
                'iDisplayLength' : 100,
                "aLengthMenu": [[27, 100, 150, 200, 300, -1], [27,100, 150, 200, 300, "All"]],
                "aoColumnDefs": [ { "bSortable": false, "aTargets": [ ] } ],
                "oLanguage": {
                    'iDisplayLength' : 50,
                    "sSearch": "Search all columns:",
                    "bStateSave": true 


                }


            } );

            $("tfoot input").keyup( function () {
                /* Filter on the column (the index) of this element */
                //alert($("tfoot input").index(this) );

                oTable.fnFilter( this.value, $("tfoot input").index(this) );
                //alert(this.value );
            } );



            /*
            * Support functions to provide a little bit of 'user friendlyness' to the textboxes in 
            * the footer
            */
            /*$("tfoot input").each( function (i) {
            asInitVals[i] = this.value;
            } );

            $("tfoot input").focus( function () {
            if ( this.className == "search_init" )
            {
            this.className = "";
            this.value = "";
            }
            } );

            $("tfoot input").blur( function (i) {
            if ( this.value == "" )
            {
            this.className = "search_init";
            this.value = asInitVals[$("tfoot input").index(this)];
            }
            } );*/
        } );
    </script> 
    <style type="text/css" title="currentStyle">
        @import "./styles/admin/jquery.dataTables.css";
        @import "./styles/admin/demo_page.css";
        @import "./styles/admin/demo_table.css";
        @import "./styles/admin/jquery.dataTables_themeroller.css";
        @import "./styles/admin/demo_table_jui.css";
       
        tfoot {
            display: table-header-group;
        }
    </style>




</head>

<body>
<div id="container">
<header>
    <div id="logo"><a href="admin/index.php?page=dashboard" title="Go back to the homepage">
       
       <img src="LOGO1-300x137.png" alt="SEAR" height=80/></a></div>
    <div id="logoGMI"><a href="admin/index.php?page=dashboard" title="C91"><img src="connect-91-logo.png" alt="C91 logo" /></a></div>


        </header>
       
        