/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/
$("document").ready(function(){

$('button#jlog').click(function(){
	$.get('hts/login.html',function(data){
		$('#jq').html(data);
		close();
	})	
})

function close(){
	$('#jqlogin header button').click(function(){
		data = ''
		$('#jq').html(data);	
	})
}
$('.email').click(function(){
	$.get('hts/signup.html',function(data){
		$('#jqsignup').html(data);
	})	
})
});//.ready
