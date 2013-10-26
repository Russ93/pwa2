/*  
	Your Project Title
	Author: You
*/
$.ajaxSetup({cache: false});
$(function(){
console.log('run');

var container = $('#container');
function loadLanding() {
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
        		})//#rSubmit
         	}//if
        })//#rEmail
	});//.get
};//loadLanding()

function checkLoginState(){
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
	    	var username = response.user.user_n;
            $.get('templates/app.html', function(html){
                var appCode = $(html).find('#template_projects').html();
                $.template('projectView', appCode);                // compile template
                var projectTemp = $.render(response.projects,'projectView');               // use template
                $('#projectSpace').append(projectTemp);
            });
            $('#title').html(username);
	    }
	});
}
function getProjects(){
    $.ajax({
        url: 'xhr/get_projects.php',
        type: 'get',
        dataType: 'json',
        success: function(response){
        	var proInfo = response;
            $.get('templates/app.html', function(html){
                var appCode = $(html).find('#template_projects').html();
                $.template('projectView', appCode);                // compile template
                var projectTemp = $.render(response.projects, 'projectView');                // use template
                $('#projectSpace').append(projectTemp);
                var box= ($('#space').html());
                
                $('.info').on('click', function(e){
                	e.preventDefault();
                	$(this).prev().attr('projectID');
                	getTasks($(this).prev().attr('projectID'))
                });
                
                $('.edit').on('click', function(e){
                	e.preventDefault();
                	var selectedID = $(this).attr('projectID');
        		    if(($('#space').html())== box){
        	    	 $.template('new_obj', ($(html).find('#template_new').html()));
        	    	 $('#space').append($.render('', 'new_obj'));
        	    	 $('.popHead').html('Edit Project');
        	    	 $('.pros').prepend('<span id="delete">Delete Project</span>')
        	    	 
        	   		}//if
        	   		
            		close(box);
            		
            	    $('#add').on('click', function(e){
            	    	e.preventDefault();
            	    	proEdit(selectedID);
            	    	loadApp();
            	    });//#add
                });//.edit
            });//.get
        }//success
    });//.ajax
}
function getTasks(id){
	$('.label').html('Tasks');
	$('#new').html('New Task');
	
    $.ajax({
        url: 'xhr/get_tasks.php',
        type: 'get',
        data: {projectID: id},
        dataType: 'json',
        success: function(response){
            $.get('templates/app.html', function(html){
            	$('#projectSpace').empty();
                var appCode = $(html).find('#template_task_view').html();
                $.template('taskView', appCode);                // compile template
                var projectTemp = $.render(response.tasks, 'taskView');                // use template
                $('#projectSpace').append(projectTemp);
                var box= ($('#space').html());
                $('#new').on('click', function(e){                   	
                	$('.pros').empty()
                	$.get('templates/app.html', function(html){
                	    if(($('#space').html())== box){
                	    	$.template('tEdit', ($(html).find('#template_task_new').html()));
                	    	$('#space').append($.render('', 'tEdit'));
                	    } 
                	    $('#add').on('click', function(e){
                	    	e.preventDefault();
                	    	tasks(id)
                	    });//#add
                	});
                	close(box);
                })
                $('.edit').on('click', function(e){
                	console.log(box);
                	e.preventDefault();
                	var taskID = $(this).attr('taskID');
                	console.log(taskID)
        		    if(($('#space').html())== box){
	        	    	 $.get('templates/app.html', function(html){
	        	    	     $.template('tEdit', ($(html).find('#template_task_new').html()));// compile template
	        	    	     $('#space').html($.render('', 'tEdit'));
	        	    	     $('.popHead').html('Edit Task');
	        	    	     $('#add').on('click', function(e){
	        	    	     	e.preventDefault();
	        	    	     	updateTasks(taskID)
	        	    	     });//#add
	        	    	 });
        	   		}//if
        	   		$('#close').on('click', function(e){
        	   			$('#space').empty();
        	   		})
		   			
		   			$('#add').on('click', function(e){
		   				e.preventDefault();
		   				console.log('ive been clicked')
		   			});//#add
                });//.edit
            });//.get
        }//success
    });//.ajax
}
function tasks(id,taskID){
	var name = $('#name').val();
	var due = $('#due').val();
	var desc = $('#desc').val();
	var urg = $('#urg').val();

	$.ajax({
		url: 'xhr/new_task.php',
		data:{
			projectID: id,
			taskID: taskID,
			taskName: name,
			status: urg,
			taskDescription: desc,
			dueDate: due
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
	})

}
function updateTasks(id){
	var name = $('#name').val();
	var due = $('#due').val();
	var desc = $('#desc').val();
	var urg = $('#urg').val();

	$.ajax({
		url: 'xhr/update_task.php',
		data:{
			taskID: id,
			taskName: name,
			status: urg,
			taskDescription: desc,
			dueDate: due
			},
		type: 'post',
		dataType: 'json',
		success: function(response){
			if(response.error){
				console.log(response.error);
			} else {
				data = ''
				$('#space').html(data);
			}
		}
	})
	console.log(id,name,due,desc,urg)

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

function proEdit(numbah){        
	var name = $('#name').val();
	var desc = $('#desc').val();
	var urg = $('#urg').val();
	$.ajax({
		url: 'xhr/update_project.php',
		data:{
			projectID: numbah,
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
}

function loadApp(){
//			console.log(res);
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
				
			$('#lout').on('click', function(e){
			e.preventDefault();
			$.get('xhr/logout.php', function(){	
				loadLanding();
			});
		});
		$('#logo').css('cursor', 'pointer')
		$('#logo').on('click', function(e){
			loadApp();
		});
		$('#usr').css('cursor', 'pointer')
		$('#usr').on('click', function(e){
			console.log('the click ran');
			$.template('drop_name', ($(html).find('#template_account_info').html()));
			$('#drop').html($.render('', 'drop_name'));
			$('#editAccount').on('click', function(e){
				$('#drop').empty();
				if(($('#space').html())== box){
					$.template('edit_acc', ($(html).find('#template_edit_acc').html()));
					$('#space').append($.render('', 'edit_acc'));
					
				}
				close(box);
				$('#add').on('click', function(e){
					e.preventDefault();
					updateAccount();
				});
			})
			$('#off').on('click', function(e){
				$('#drop').empty();
			})
		});
        getProjects();
        return false;
        });//.get
        getAccount();
}
function updateAccount() {
	var email = $('#email').val();
	var pass = $('#pass').val();
	
	$.ajax({
		url: 'xhr/update_user.php',
		data:{
			user_p: pass,
			email: email
		},
		type: 'post',
		dataType: 'json',
		success: function(response){
		
			if(response.error){
			    console.log(response.error);
			    $('#ack').html('* '+response.error)
			} else {
			    console.log(response);
			    loadApp();
			}
		}
	});
}

function login(){
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
                            $('#ack').html('* '+response.error)
                    } else {
                            loadApp();

                    }
            }
    });
}

function register(){        
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
function init(){
	checkLoginState();
}
function close(data){
	$('#close').click(function(){
		$('#space').empty();
		$('#space').html(data);	
	})
}
init();
});
