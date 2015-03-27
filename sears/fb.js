  define(['facebook'], function(){
                    FB.init({
                        appId      : '985248544822163',
                    });
                    FB.getLoginStatus(function(response) {
                        console.log(response);
                    });
                }); 