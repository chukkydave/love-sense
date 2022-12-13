/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */
let counter = 0;
$(document).ready(function() {
	checkLoggedin();
	getNotification();
	// askNotificationPermission();
	const notificationBtns = document.getElementById('breathing-button');

	// Do an initial check to see what the notification permission state is

	if (Notification.permission === 'denied' || Notification.permission === 'default') {
		notificationBtns.style.display = 'block';
	} else {
		notificationBtns.style.display = 'none';
	}

	$('#breathing-button').on('click', askNotificationPermission);
});

('use strict');
var apiPaths = 'https://love-sense.herokuapp.com/api/v1/';
var myHome = 'https://www.mylovesense.online/admin/index.html';

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

function getNotification() {
	let token1 = localStorage.getItem('token');

	axios
		.get(`${apiPaths}notifications`, {
			params: {
				// ID: 12345
			},
			headers: {
				Authorization: token1,
			},
		})
		.then(function(response) {
			console.log(response.data);
			let notLength = response.data.length;

			if (notLength > 0) {
				counter = notLength;
				$('#notification_count').html(counter);
				$('#notification_count').show();
				$('#notification_icon').addClass('mailAnim');
				let body = '';
				$(response.data).map((i, v) => {
					// let dates = v.date.moment().format("MMM Do YY")
					let dates = moment(v.date).format('ll');
					body += `<a href="appointments" class="dropdown-item">  <span class="dropdown-item-desc"> <span class="message-user">${v.first_name} ${v.last_name}
                    </span> <span class="time messege-text">${v.service}<br> ${v.time} ${dates}</span>
                  </span>
                </a>`;
				});
				$('#notification_body').html(body);
			}
		})
		.catch(function(error) {
			console.log(error);
		})
		.then(function() {
			// always executed
		});
}

function checkNotificationPromise() {
	try {
		Notification.requestPermission().then();
	} catch (e) {
		return false;
	}

	return true;
}

function askNotificationPermission() {
	// function to actually ask the permissions
	const notificationBtn = document.getElementById('breathing-button');

	function handlePermission(permission) {
		// set the button to shown or hidden, depending on what the user answers
		if (Notification.permission === 'denied' || Notification.permission === 'default') {
			notificationBtn.style.display = 'block';
		} else {
			notificationBtn.style.display = 'none';
		}
	}

	// Let's check if the browser supports notifications
	if (!('Notification' in window)) {
		console.log('This browser does not support notifications.');
	} else {
		if (checkNotificationPromise()) {
			Notification.requestPermission().then((permission) => {
				handlePermission(permission);
			});
		} else {
			Notification.requestPermission(function(permission) {
				handlePermission(permission);
			});
		}
	}
}
