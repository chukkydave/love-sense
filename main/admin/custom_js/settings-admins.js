$(document).ready(function() {
	listAdmins(1);
	$(document).on('click', '.deleteMe .deleteUs', function() {
		let particularId = $(this).attr('id');
		if (confirm('Click OK to Delete Admin')) deleteMe(particularId);
		return false;
	});
	$('#createBtn').on('click', function() {
		if (isEmptyInput('.required_cr')) {
			createAdmin();
		}
	});
});

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

function listAdmins(page) {
	var token1 = localStorage.getItem('token');
	var page_limit = 10;

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/view_admin/${page}/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.adminrecords.length > 0) {
					let contact_table = '';
					if (page == 1 || page == '') {
						var k = 1;
					} else {
						var k = page * page_limit - page_limit + 1;
					}
					$(res.adminrecords).each((index, value) => {
						let thisId = value._id;
						contact_table += `<tr id="con_${value._id}">`;
						contact_table += '<td>' + k++ + '</td>';
						contact_table += '<td>' + value.name + '</td>';
						contact_table += '<td>' + value.email + '</td>';
						contact_table += '<td>' + value.phone_number + '</td>';

						contact_table += `<td> <div class="dropdown d-inline mr-2">
                                <button class="btn btn-primary dropdown-toggle"
                                type="button" id="dropdownMenuButton3"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Actions
                                </button>
                                <div class="dropdown-menu deleteMe"
                                style="will-change: transform;">
                                
                                
                                <a style="cursor:pointer;" class="dropdown-item deleteUs" id="${value._id}" 
                                >Delete</a>

                                </div>
                                </div> </td>`;

						contact_table += '</tr>';
						contact_table += `<tr style="display:none" id="adminModal_${value._id}" class="loadySef"><td colspan="4"><i class="fa fa-3x fa-spin fa-spinner"></i></td></tr>`;
					});
					// <a class="dropdown-item" data-toggle="modal" data-target="#exampleModaledit"
					//         href="#">Edit</a>
					k++;

					$('#admin_body').html(contact_table);
					$('#adminModal').hide();
					$('#adminTable').show();
				}

				if (res.totalPages) {
					$('#pagination').twbsPagination({
						totalPages: res.totalPages,
						visiblePages: 10,
						onPageClick: function(event, page) {
							listAdmins(page);
						},
					});
				}
			} else {
				$('#admin_body').html(
					`<tr class="even"> <td class=" " colspan="4">Error Fetching Result</td></tr>`,
				);
				$('#adminModal').hide();
				$('#adminTable').show();
			}
		},
		error: (res) => {
			$('#admin_body').html(
				`<tr class="even"> <td class=" " colspan="4">Error Fetching Result</td></tr>`,
			);
			$('#adminModal').hide();
			$('#adminTable').show();
		},
	});
}

function deleteMe(idex) {
	var token2 = localStorage.getItem('token');
	if (idex != '') {
		$(`#con_${idex}`).hide();
		$(`#adminModal_${idex}`).show();
		$.ajax({
			type: 'DELETE',
			dataType: 'json',
			url: `${apiPaths}admin/delete/${idex}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token2,
			},
			success: function(res) {
				if (res.status == 200) {
					alert('Admin delete successful');
					listAdmins(1);
				} else {
					alert('Error!!');
					$(`#adminModal_${idex}`).hide();
					$(`#con_${idex}`).show();
				}
			},
			error: function(res) {
				alert('Error!!');
				$(`#adminModal_${idex}`).hide();
				$(`#con_${idex}`).show();
			},
		});
	} else {
		alert('Cannot Delete on an Empty Value');
	}
}

$('#filterNamey').on('keyup', function() {
	var value = $(this).val().toLowerCase();
	$('#admin_body tr').filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
	$('.loadySef').hide();
});
$('.toggle-password').click(function() {
	$(this).toggleClass('fa-eye fa-eye-slash');
	var input = $($(this).attr('toggle'));
	if (input.attr('type') == 'password') {
		input.attr('type', 'text');
	} else {
		input.attr('type', 'password');
	}
});

function viewAdmin(idex) {
	var token2 = localStorage.getItem('token');
	if (idex != '') {
		// $(`#con_${idex}`).hide();
		// $(`#adminModal_${idex}`).show();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: `${apiPaths}admin/view/${idex}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token2,
			},
			success: function(res) {
				if (res.status == 200 || res.status == 201) {
					$('#viewLoader').hide();
					$('#viewBody').show();
				} else {
					$('#viewBody').html(`<h5 style="color:red">${res.msg}</h5>`);
					$('#viewLoader').hide();
					$('#viewBody').show();
				}
			},
			error: function(res) {
				$('#viewBody').html(`<h5 style="color:red">${res.msg}</h5>`);
				$('#viewLoader').hide();
				$('#viewBody').show();
			},
		});
	} else {
		$('#viewBody').html(`<h5 style="color:red">ID field empty</h5>`);
		$('#viewLoader').hide();
		$('#viewBody').show();
	}
}

function createAdmin() {
	$('#createBtn').hide();
	$('#createLoader').show();

	let createName = $('#cName').val();
	let createEmail = $('#cEmail').val();
	let createPassword = $('#password').val();
	let createPhone = $('#cPhone').val();

	let data = {
		name: createName,
		email: createEmail,
		password: createPassword,
		phone_number: createPhone,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'POST',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/signup`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#createLoader').hide();
				$('#createBtn').show();
				$('#cName').val('');
				$('#cEmail').val('');
				$('#password').val('');
				$('#cPhone').val('');
				$('#exampleModal').modal('hide');
				listAdmins(1);
			} else {
				alert('Error!!');
				$('#createLoader').hide();
				$('#createBtn').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#createLoader').hide();
			$('#createBtn').show();
		},
	});
}

function editAdmin() {
	$('#editBtn').hide();
	$('#editLoader').show();

	let editName = $('#eName').val();
	let editEmail = $('#eEmail').val();
	let editPhone = $('#ePhone').val();

	let data = {
		name: editName,
		email: editEmail,
		phone_number: editPhone,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'POST',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/signup`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#editLoader').hide();
				$('#editBtn').show();
				$('#exampleModal').modal('hide');
				listAdmins(1);
			} else {
				alert('Error!!');
				$('#editLoader').hide();
				$('#editBtn').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#editLoader').hide();
			$('#editBtn').show();
		},
	});
}

// deleteMe = () => {
// 	if (confirm('Click OK to Delete Admin')) alert('Just a test To delete');
// 	return false;
// };
