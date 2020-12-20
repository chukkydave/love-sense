$(document).ready(function() {
	viewAdmin();
});
$('#changeBtn').on('click', function() {
	if (isEmptyInput('.required_f')) {
		updateInfo();
	}
});

$('#changeBtn2').on('click', function() {
	if (isEmptyInput('.required_cp')) {
		changePassword();
	}
});

// let namer = localStorage.getItem('user_name');
// let emailer = localStorage.getItem('user_email');
// let phoner = localStorage.getItem('user_phone');
// $('#myName').html(namer);
// $('#myEmail').html(emailer);
// $('#myPhone').html(phoner);

function isEmptyInput(first) {
	let isEmpty = false;
	$(first).each(function() {
		var input = $.trim($(this).val());
		if (input.length === 0 || input === '0') {
			$(this).addClass('has-error');
			isEmpty = true;
		} else {
			$(this).removeClass('has-error');
		}
	});
	if (isEmpty === true) {
		return false;
	} else {
		return true;
	}
}

function updateInfo() {
	$('#changeBtn').hide();
	$('#changeLoader').show();

	let changeName = $('#cName').val();
	let changeEmail = $('#cEmail').val();
	let changePhone = $('#cPhone').val();

	let data = {
		name: changeName,
		email: changeEmail,
		phone_number: changePhone,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/update_super_admin`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#changeLoader').hide();
				$('#changeBtn').show();
				window.location.reload;
			} else {
				alert('Error!!');
				$('#changeLoader').hide();
				$('#changeBtn').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#changeLoader').hide();
			$('#changeBtn').show();
		},
	});
}

function changePassword() {
	$('#changeBtn2').hide();
	$('#changeLoader2').show();

	let oldPassword = $('#cOldPassword').val();
	let newPassword = $('#cNewPassword').val();

	let data = {
		new_password: newPassword,
		password: oldPassword,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}super_admin/change_password`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#changeLoader2').hide();
				$('#changeBtn2').show();
				window.location.reload;
			} else {
				alert('Error!!');
				$('#changeLoader2').hide();
				$('#changeBtn2').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#changeLoader2').hide();
			$('#changeBtn2').show();
		},
	});
}

function viewAdmin() {
	var token2 = localStorage.getItem('token');
	var idt = localStorage.getItem('user_sm');

	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: `${apiPaths}admin/get_super_admin/${idt}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token2,
		},
		success: function(res) {
			if (res.status == 200 || res.status == 201) {
				$('#myName').html(res.result.name);
				$('#myEmail').html(res.result.email);
				$('#myPhone').html(res.result.phone_number);
				$('#viewLoader').hide();
				$('#viewBodyi').show();
			} else {
				console.log(res);
				$('#myName').html('Error');
				$('#myEmail').html('Error');
				$('#myPhone').html('Error');
				$('#viewLoader').hide();
				$('#viewBodyi').show();
			}
		},
		error: function(res) {
			console.log(res);
			$('#myName').html('Error');
			$('#myEmail').html('Error');
			$('#myPhone').html('Error');
			$('#viewLoader').hide();
			$('#viewBodyi').show();
		},
	});
}
