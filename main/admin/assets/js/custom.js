/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

// "use strict";

$(document).ready(function() {
	checkLoggedin();
});

('use strict');
var apiPaths = 'https://love-sense.herokuapp.com/api/v1/';
var myHome = 'https://www.lovesense.online/admin/index.html';

// love-sense

let namey = localStorage.getItem('user_name');
let emaily = localStorage.getItem('user_email');
$('#namey1').html(namey);
$('#user-name1').html(namey);

$('#logMeOut').click(function() {
	localStorage.clear();
	window.location.href = myHome;
});

function checkLoggedin() {
	if (localStorage.getItem('token') === null) {
		var url = myHome;
		window.location.replace(url);
	}
}
