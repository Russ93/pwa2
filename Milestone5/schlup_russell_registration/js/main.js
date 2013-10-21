/*  
	Your Project Title
	Author: You
*/
$.ajaxSetup({cache: false});
$(function(){
        console.log('run');

        var container = $('#container');
        var loadLanding = function() {
                console.log('laodlanding');

                container.empty();

                $.get('templates/landing.html', function(html){
                        $.template('landing', ($(html).find('#template_landing').html()));// compile template
                        container.append($.render('', 'landing')); // use template
                        $('#jlog').click(function(){
                        	$.template('login', ($(html).find('#template_login').html()));
                        	$('#space').append($.render('', 'login'));
                        	$('#submit_login').on('click', function(e) {
                        		e.preventDefault();
                        		login();
                        	})
                        	close();
                        })
                        var regis= ($('#regis').html());
                        $('#rEmail').click(function(){
                        	if(($('#regis').html())== regis){
                        		$.template('registration', ($(html).find('#template_regis').html()));
                        		$('#regis').append($.render('', 'registration'));
                        		$('#rSubmit').ready(function(){
                        			$('#rSubmit').on('click', function(e) {
                        			        e.preventDefault();
                        			        register();
                        			})
                        		})
                         	}
                        })
                });
        };
 
        var checkLoginState = function(){
                $.ajax({
                        url: 'xhr/check_login.php',
                        type: 'get',
                        dataType: 'json',
                        success: function(response){
                                // if user, loadApp()
                                // if error, loadLanding()

                                if(response.user){
                                        loadApp();
                                } else {
                                        loadLanding();
                                }
                        }
                });
        };

        var getProjects = function(){
                $.ajax({
                        url: 'xhr/get_projects.php',
                        type: 'get',
                        dataType: 'json',
                        success: function(response){
                                console.log(response);

                                $.get('templates/app.html', function(html){
                                        var appCode = $(html).find('#project-view').html();
                                        $.template('projectView', appCode);                // compile template
                                        var projectTemp = $.render(response.projects, 'projectView');                // use template
                                        $('#projects-content').append(projectTemp);
                                });
                        }
                });
        }

        var loadApp = function(){
			console.log("load app");
                container.empty();
               

                $.get('templates/app.html', function(html){
                        var appCode = $(html).find('#template_app').html();
                        $.template('appHeader', appCode);                // compile template
                        var appHeader = $.render('', 'appHeader');                // use template
                        container.append(appHeader);
                        //logout button
                        $('#lout').on('click', function(e){
                                e.preventDefault();
                                $.get('xhr/logout.php', function(){
                                		
                                        loadLanding();
                                });
                        })
                        $('#new').click(function(){
                        	$.template('new', ($(html).find('#new').html()));
                        	$('#space').append($.render('', 'new'));
                        	close();
                        })
                                return false;
                });
        }

        var login = function(){
                var user = $('#username').val();
                var pass = $('#password').val();

                $.ajax({
                        url: 'xhr/login.php',
                        data:{
                                username: user,
                                password: pass
                                },
                        type: 'post',
                        dataType: 'json',
                        success: function(response){
                                
                                if(response.error){
                                        console.log(response.error);
                                } else {
                                        console.log(response.user);
                                        loadApp();

                                        e.preventDefault();
                                }
                        }
                });
        }

        var register = function(){        
			var mail = $('#rEmail').val();
			var user = $('#rUser').val();
			var pass =$('#rPass').val();

			$.ajax({
				url: 'xhr/register.php',
				data:{
					email: mail,
					username: user,
					password: pass
					},
				type: 'post',
				dataType: 'json',
				success: function(response){
					if(response.error){
						console.log(response.error);
					} else {
							console.log(response.user);
							loadApp();
	        
							e.preventDefault();
					}
				}
			});
		}
		var init = function(){
			checkLoginState();
		}
		function close(){
			$('#close').click(function(){
				data = ''
				$('#space').html(data);
					
			})
		}
		init();
});
