/*  
	Your Project Title
	Author: You
*/
$(function(){
var container = $('#container');
function loadLanding() {	
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
function loadApp(){
        container.empty();
    $.get('templates/app.html', function(html){
        $.template('app', ($(html).find('#template_landing').html()));// compile template
        container.append($.render('', 'app')); // use template
        $.template('appHeader', ($(html).find('#template_app').html()));                // compile template
        container.append($.render('', 'appHeader'));           // use template
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
			$.template('drop_name', ($(html).find('#template_account_info').html()));
			$('#drop').html($.render('', 'drop_name'));
			$('#editAccount').css('cursor', 'pointer')
			$('#editAccount').on('click', function(e){
				$('#drop').empty();
				if(($('#space').html())== box){
					$.template('edit_acc', ($(html).find('#template_new').html()));
					$('#space').append($.render('', 'edit_acc'));
					$('.popHead').html('Edit Your Account');
					$('.forName').html('New Email Address');
					$('#name').val($('#usr').attr('usrEmail'));
					$('#desc,#urg,.forDesc,.forType').remove();
					$.template('acc_input', ($(html).find('#template_edit_account').html()));
					$($.render('', 'acc_input')).insertAfter( "#name" );
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
            $.get('templates/app.html', function(html){
                var appCode = $(html).find('#template_projects').html();
                $.template('projectView', appCode);                // compile template
                var projectTemp = $.render(response.projects, 'projectView');                // use template
                $('#projectSpace').append(projectTemp);
                var box= ($('#space').html());
                
                $('.info').on('click', function(e){
                	var nameHt = $(this).children('h2');
                	var nameTx = $(nameHt).html();
                	e.preventDefault();
                	getTasks(($(this).prev().attr('projectID')),nameTx)
                });
                
                $('.edit').on('click', function(e){
                	e.preventDefault();
                	var selectedID = $(this).attr('projectID');
        		    if(($('#space').html())== box){
        	    	 $.template('new_obj', ($(html).find('#template_new').html()));
        	    	 $('#space').append($.render('', 'new_obj'));
        	    	 $('.popHead').html('Edit Project');
        	    	 $('#name').val($($(this).next().children('h2')).html());
        	    	 $('#desc').val($($(this).next().children('p')).html());
        	    	 $('.pros').prepend('<span id="delete">Delete Project</span>')
        	    	 $('#delete').on('click', function(e){
        	    	 	e.preventDefault;
        	    	 	deleteThings("pro",selectedID);
        	    	 	loadApp;
        	    	 })
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
}//getProjects
function deleteThings(type,id){
	if(type==="pro"){
		$.ajax({
		    url: 'xhr/delete_project.php',
		    data:{projectID: id,
		    	},
		    type: 'post',
		    dataType: 'json',
		    success: function(response){
				loadApp();
		    }
		});
	}else if(type==="task"){
		$.ajax({
		    url: 'xhr/delete_task.php',
			data:{taskID: id},
		    type: 'post',
		    dataType: 'json',
		    success: function(response){
				$('#space').html('');
		    }
		});
	}else{
		console.log("you forgot something");
	}

}
function getTasks(id, proName){
	$('.label').html(proName);
	$('#new').html('New Task');
	$('#new').unbind();
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
                	if(($('#space').html())== box){
                		$.template('new_obj', ($(html).find('#template_new').html()));
                		$('#space').append($.render('', 'new_obj'));
                		$('.popHead').html('Create a New Task');
                		$('.forName').html('Task Name:');
                		$('#desc').after('<label>Due Date:</label><input id="due" type="text" value="due" name="due"/>');
                	}                    	
                	close(box);
                	
                	$('#add').on('click', function(e){
                		e.preventDefault();
                		newTask(id);
                	});
                });
                $('.edit').on('click', function(e){
                	e.preventDefault();
                	var selectedID = $(this).attr('taskID');
                	var selectedName = $(this).attr('#name');
                    if(($('#space').html())== box){
                	 $.template('new_obj', ($(html).find('#template_new').html()));
                	 $('#space').append($.render('', 'new_obj'));
                	 $('.popHead').html('Edit Task');
                	 $('.pros').prepend('<span id="delete">Delete Task</span>')
                	 $('.forName').html('Task Name:');
                	 $('#desc').after('<label>Due Date:</label><input id="due" type="text" value="due" name="due"/>');
                	 $('#name').val($($(this).next().children('h2')).html());
                	 $('#desc').val($($(this).next().children('p')).html());
                	 $('#due').val($($(this).siblings('p')).html());
                	 $('#delete').on('click', function(e){
                	 	e.preventDefault;
                	 	deleteThings("task",selectedID);
                	 	getTasks(id);
                	 })
                	}//if
                		
                	close(box);
                	
                    $('#add').on('click', function(e){
                    	e.preventDefault();
                    	updateTasks(selectedID);
                    	getTasks(id);
                    });//#add
                });//.edit
            });//.get
        }//success
    });//.ajax
}
function newTask(id,taskID){
	var name = $('#name').val();
	var due = $('#due').val();
	var desc = $('#desc').val();
	var urg = $('#urg').val();

	$.ajax({
		url: 'xhr/new_task.php',
		data:{
			projectID: id,
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
				getTasks(id);
			}//else
		}//sucess
	})//.ajax
}//tasks
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
				data = ''
				$('#space').html(data);
			}
		}
	})//.ajax
}
function updateAccount() {
	var email = $('#name').val();
	var pass = $('#pass').val();
	var f_name = $('#f_nam').val();
	var l_name = $('#l_nam').val();
	var phone = $('#phone').val();
	
	$.ajax({
		url: 'xhr/update_user.php',
		data:{
			email: email,
			user_p: pass,
			first_name: f_name,
			last_name: l_name,
			phone: phone
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
		$('#space').html(data);	
	})
}
init();
});
