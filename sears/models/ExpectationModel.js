/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
], function(app){

    var ExpectationModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        
        },

        defaults: {
            id: 0,
            expectation: '',
            goal: 0,
            game_session: '53f35ccc0bd384e410000041'
        },

        url: function(){
            return app.API + '/';
        },

         


        postAuth: function(opts, callback, args){
            var self = this;
            var postData = _.omit(opts, 'method');
             if(DEBUG) console.log(postData);
            $.ajax({
                url: this.url() +opts.method+'.php', //+ opts.method,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                beforeSend: function(xhr) {
                    // Set the CSRF Token in the header for security
                    var token = $('meta[name="csrf-token"]').attr('content');
                    if (token) xhr.setRequestHeader('X-CSRF-Token', token);
                },
                data:  JSON.stringify( _.omit(opts, 'method') ),
                success: function(res){

                    if( !res.error ){
                            
                        if(_.indexOf(['saveExpectation', 'signup'], opts.method) !== -1){
                            
                           // self.updateSessionUser( res.user || {} );
                           // self.set({ user_id: res.user._id, logged_in: true}); // change user_id: res.user._id, logged_in: true
                        } else {
                           // self.set({ logged_in: false });
                        }

                        if( callback && 'success' in callback ) callback.success(res);
                    } else {
                        if( callback && 'error' in callback ) callback.error(res);
                    }
                },
                error: function(mod, res){
                    if(callback && 'error' in callback ) callback.error(res);
                }
            }).complete( function(){
                if(callback && 'complete' in callback ) callback.complete(res);
            });
        }
            
           





    });
    
    return ExpectationModel;
});

