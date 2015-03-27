			// Filename: router.js
			define([
				'jquery',
				'underscore',
				'backbone',
				'views/home/HomeView',
				'views/projects/ProjectsView',
				'views/contributors/ContributorsView',
				'views/settings/SettingsView',
				'views/footer/FooterView',
				'views/game/StartGameView',
				'views/login/LoginView',
				'views/register/RegistrationView',
				"models/user/SessionModel",
				"models/user/UserModel",
				"views/LoginPageView"
				], function($, _, Backbone, HomeView, ProjectsView, ContributorsView, SettingsView, FooterView, StartGameView,LoginView,RegistrationView,SessionModel, UserModel, LoginPageView) {

					var AppRouter = Backbone.Router.extend({
						routes: {
							// Define some URL routes
							'projects': 'showProjects',
							'users': 'showContributors',
							'settings': 'showSettings',
							'startGame': 'startGame',
							'login':'login',
							'logout': 'doLogout',
							'register':'getRegister',
							'':"index",

							// Default
							'*actions': 'defaultAction'
						}
					});

					var initialize = function(){

						var app_router = new AppRouter;

						app_router.on('route:showProjects', function(){
								alert("here");
							// Call render on the module we loaded in via the dependency array
							var projectsView = new ProjectsView();
							projectsView.render();

						});

						app_router.on('route:showContributors', function () {
							alert("here");
							// Like above, call render but know that this view has nested sub views which 
							// handle loading and displaying data from the GitHub API  
							var contributorsView = new ContributorsView();
						});



						app_router.on('route:showSettings', function(){
							var settingsView = new SettingsView();
							settingsView.render();
						});


						app_router.on('route:startGame', function(){

							var startGameView = new StartGameView();
							startGameView.render();

						});
					
						app_router.on('route:login', function(){

							var loginView = new LoginView();
							loginView.render();

						});
						
						app_router.on('route:getRegister', function(){

							var registerView = new RegistrationView();
							registerView.render();

						});

						app_router.on('route:defaultAction', function (actions) {

							
							
							// We have no matching route, lets display the home page 
					   
							var homeView = new HomeView();
							homeView.render();
						});

			show: function(view, options){
			// Every page view in the router should need a header.
			// Instead of creating a base parent view, just assign the view to this
			// so we can create it if it doesn't yet exist
			/*if(!this.headerView){
			this.headerView = new HeaderView({});
			this.headerView.setElement( $(".header") ).render();
			}*/
			// Close and unbind any existing page view
			if(this.currentView) this.currentView.close();
			// Establish the requested view into scope
			this.currentView = view;
			// Need to be authenticated before rendering view.
			// For cases like a user's settings page where we need to double check against the server.
			if (typeof options !== 'undefined' && options.requiresAuth){
			var self = this;
			app.session.checkAuth({
			success: function(res){
			// If auth successful, render inside the page wrapper
			$('#content').html( self.currentView.render().$el);
			}, error: function(res){
			self.navigate("/", { trigger: true, replace: true });
			}
			});
			} else {
			// Render inside the page wrapper
			$('#content').html(this.currentView.render().$el);
			//this.currentView.delegateEvents(this.currentView.events); // Re-delegate events (unbound when closed)
			}
			},
			
			index: function() {
			// Fix for non-pushState routing (IE9 and below)
			var hasPushState = !!(window.history && history.pushState);
			if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
			else {
				this.show( new LoginPageView({}) );
			}
			}
			});


						 Backbone.history.start();

						// Unlike the above, we don't call render on this view as it will handle
						// the render call internally after it loads data. Further more we load it
						// outside of an on-route function to have it loaded no matter which page is
						// loaded initially.
						var footerView = new FooterView();

						
						
					};
					return { 
						initialize: initialize
					};
			});
