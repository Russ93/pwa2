/*  
	Your Project Title
	Author: You
*/
// -------------------- Ross's code
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
                        	$.get('templates/login.html',function(data){
                        		$('#jq').html(data);
                        		$('#submit_login').on('click', function(e) {
                        		        e.preventDefault();
                        		        login();
                        		})
                        		close();
                        	})
                        })
                        $('#email').click(function(){
                        	$.get('templates/regis.html',function(data){
                        		$('#regis').append(data);
                        	})	
                        })
                        function close(){
                        	$('#jqlogin header button').click(function(){
                        		data = ''
                        		$('#jq').html(data);
                        			
                        	})
                        }
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
                        $('#log-out').on('click', function(e){
                                e.preventDefault();
                                $.get('xhr/logout.php', function(){
                                        loadLanding();
                                });
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

        }
        var init = function(){
                checkLoginState();
        }
        init();
});

//-------------------- My code --------------------
