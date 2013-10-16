/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/
$("#jq").ready(function(){
	$('#jlog').click(function(){
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
});