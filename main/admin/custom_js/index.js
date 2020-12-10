$(document).ready(function() {
	$('#login_button').click(function(event) {
		login_user();
	});

	$(document).on('keypress', function(e) {
		if (e.which == 13) {
			login_user();
		}
	});

	// $("#forgot_p").on('click', show_forgot_password_box);
});

function login_user() {
	var username = $('#email').val();
	var password = $('#password').val();

	var blank_dey;
	$('.required_f').each(function() {
		var the_val = $.trim($(this).val());
		// alert(the_val);
		if (the_val == '' || the_val == '0') {
			$(this).addClass('has-error');
			blank_dey = 'yes';
		} else {
			$(this).removeClass('has-error');
		}
	});

	if (blank_dey == 'yes') {
		$('invalid-feedback').show();
		return;
	}

	$('#preloadert').show();
	$('#login_button').hide();

	var dataD = { email: username, password: password };

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(dataD),
		cache: false,
		url: 'https://love-sense.herokuapp.com/api/v1/admin',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// 'Authorization': 'Bearer ' + token1
		},

		success: function(result) {
			if (result.token) {
				// $("#preloadert").hide();

				alert('Login Successful');
				localStorage.setItem('token', result.token);
				localStorage.setItem('user_name', result.user.name);
				localStorage.setItem('user_email', result.user.email);
				setTimeout(() => {
					window.location.href = 'https://www.lovesense.online/admin/dashboard.html';
				}, 2000);
				// checkLoggedin();
			} else {
				alert('unsuccessful');
				$('#preloadert').hide();
				$('#login_button').show();
				// alert(result.message);
			}
		},

		error: function(result) {
			console.log(result);
			$('#preloadert').hide();
			$('#login_button').show();
			alert(result.message);
		},
	});
}
