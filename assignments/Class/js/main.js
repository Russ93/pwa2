/*
Description: DESCRIPTION INFO GOES HERE
1Main.js
*/

$(function(){
	$.ajax({
		url: 'xhr/list.php',
		type: 'get',
		dataType: 'json',
		success: function (response){
			console.log(response);
		}
	})


});