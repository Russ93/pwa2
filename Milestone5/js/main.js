/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/
$("document").ready(function(){

function start(){
	$.get('hts/landing.html',function(data){
		$('body').html(data);
	})
}
$('button#jlog').click(function(){
	$.get('hts/login.html',function(data){
		$('#jq').html(data);
		close();
	})	
})


$('#email').click(function(){
	$.get('hts/signup.html',function(data){
		$('#jqsignup').html(data);
	})	
})

function close(){
	$('#jqlogin header button').click(function(){
		data = ''
		$('#jq').html(data);	
	})
}
start();
});//.ready
