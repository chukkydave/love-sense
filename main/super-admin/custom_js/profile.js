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

let namer = localStorage.getItem('user_name');
let emailer = localStorage.getItem('user_email');
let phoner = localStorage.getItem('user_phone');
$('#myName').html(namer);
$('#myEmail').html(emailer);
$('#myPhone').html(phoner);

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
	//declaring variable using the ES6 let
	let changeName = $('#cName').val();
	let changeEmail = $('#cEmail').val();
	let changePhone = $('#cPhone').val();

	// using the ES6 const variable to hold the url to the api path
	const URL = `${apiPaths}admin/update_admin`;
	//storing the variable in a data variable to be an object as Displayed in the PAYLOAD

	let data = {
		name: changeName,
		email: changeEmail,
		phone_number: changePhone,
	};
	console.log(data);

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		cache: false,
		url: URL,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			// alert(res.status)
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
	//declaring variable using the ES6 let
	let oldPassword = $('#cOldPassword').val();
	let newPassword = $('#cNewPassword').val();

	// using the ES6 const variable to hold the url to the api path
	const URL = `${apiPaths}super_admin/change_password`;
	//storing the variable in a data variable to be an object as Displayed in the PAYLOAD

	let data = {
		new_password: newPassword,
		password: oldPassword,
	};
	console.log(data);

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		cache: false,
		url: URL,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			// alert(res.status)
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
