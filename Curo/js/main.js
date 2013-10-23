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
                        var log= ($('#space').html());
                        $('#jlog').click(function(){
                        	if(($('#space').html())== log){
	                        	$.template('login', ($(html).find('#template_login').html()));
	                        	$('#space').append($.render('', 'login'));
	                        	$('#submit_login').on('click', function(e) {
	                        		e.preventDefault();
	                        		login();
	                        	})
	                        }
                        	close(log);
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
		function getAccount(){
			$.ajax({
			    url: 'xhr/get_user.php',
			    type: 'get',
			    dataType: 'json',
			    success: function(response){
			            console.log(response);
			            $.get('templates/app.html', function(html){
			                var appCode = $(html).find('#template_projects').html();
			                $.template('projectView', appCode);                // compile template
			                var projectTemp = $.render(response.projects, 'projectView');                // use template
			                $('#projectSpace').append(projectTemp);
			            });
			    }
			});
		}
        function getProjects(){
                $.ajax({
                    url: 'xhr/get_projects.php',
                    type: 'get',
                    dataType: 'json',
                    success: function(response){
                            console.log(response);
                            $.get('templates/app.html', function(html){
                                var appCode = $(html).find('#template_projects').html();
                                $.template('projectView', appCode);                // compile template
                                var projectTemp = $.render(response.projects, 'projectView');                // use template
                                $('#projectSpace').append(projectTemp);
                            });
                    }
                });
        }
        function projects(){        
        	var name = $('#name').val();
        	var desc = $('#desc').val();
        	var urg = $('#urg').val();
        	
        		$.ajax({
        			url: 'xhr/new_project.php',
        			data:{
        				projectName: name,
        				status: urg,
        				projectDescription: desc
        				},
        			type: 'post',
        			dataType: 'json',
        			success: function(response){
        				if(response.error){
        					console.log(response.error);
        				} else {
        					console.log(response.user);
        					console.log(name,desc,urg);
        					data = ''
        					$('#space').html(data);
        				}
        			}
        		})//.ajax
        }//projects

        var loadApp = function(){
        	getAccount();
			console.log("load app");
                container.empty();
               

                $.get('templates/app.html', function(html){
                $.template('app', ($(html).find('#template_landing').html()));// compile template
                container.append($.render('', 'app')); // use template
                        var appCode = $(html).find('#template_app').html();
                        $.template('appHeader', appCode);                // compile template
                        var appHeader = $.render('', 'appHeader');                // use template
                        container.append(appHeader);
                        var box= ($('#space').html());
                        $('#new').on('click', function(e){
                     	   if(($('#space').html())== box){
		                    	 $.template('new_obj', ($(html).find('#template_new').html()));
		                    	 $('#space').append($.render('', 'new_obj'));
		                   }                    	
                        	close(box);
                        	
	                        $('#add').on('click', function(e){
	                        	e.preventDefault();
	                        	projects();
	                        	loadApp();
	                        });
	                    });
	                    
						$('#projectSpace section button').on('click', function(e){
							if(($('#space').html())== box){
							 	 $.template('new_obj', ($(html).find('#template_new').html()));
							 	 $('#space').append($.render('', 'new_obj'));
							}                    	
							close(box);
						});
                    
                        $('#lout').on('click', function(e){
                            e.preventDefault();
                            $.get('xhr/logout.php', function(){	
                            	loadLanding();
                            });
                        });
                        getProjects();
                            
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
		function close(data){
			$('#close').click(function(){
				$('#space').html(data);
					
			})
		}
		init();
});
