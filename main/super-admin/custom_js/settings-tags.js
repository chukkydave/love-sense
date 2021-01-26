$(document).ready(function() {
	listTags(1);
	$(document).on('click', '.deleteMe .deleteUs', function() {
		let particularId = $(this).attr('id');
		if (confirm('Click OK to Delete Tag')) deleteMe(particularId);
		return false;
	});

	$(document).on('click', '.deleteMe .editUs', function() {
		let thisId = $(this).attr('id');
		$('#editTagBtn').attr('dir', thisId);
		$('#exampleModaledit').modal('show');
		viewSingleTag(thisId);
	});
	$('#createTagBtn').on('click', function() {
		if (isEmptyInput('.required_t')) {
			createTag();
		}
	});

	$('#editTagBtn').on('click', function() {
		if (isEmptyInput('.required_te')) {
			editTag();
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

function titleCase(str) {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	// Directly return the joined string
	return splitStr.join(' ');
}

function listTags(page) {
	var token1 = localStorage.getItem('token');
	var page_limit = 10;

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/view_tags/${page}/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.tagsrecords.length > 0) {
					let tag_table = '';
					if (page == 1 || page == '') {
						var k = 1;
					} else {
						var k = page * page_limit - page_limit + 1;
					}
					$(res.tagsrecords).each((index, value) => {
						let thisId = value._id;
						tag_table += `<tr id="tag_${value._id}">`;
						tag_table += '<td>' + k++ + '</td>';
						tag_table += '<td>' + value.tag_name + '</td>';
						tag_table += `<td class="align-middle"><i class="material-icons col-${value.tag_color.toLowerCase()}">local_offer</i>${value.tag_color}</td>`;

						tag_table += `<td> <div class="dropdown d-inline mr-2">
                                <button class="btn btn-primary dropdown-toggle"
                                type="button" id="dropdownMenuButton3"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Actions
                                </button>
                                <div class="dropdown-menu deleteMe"
                                style="will-change: transform;">
                                
                                <a class="dropdown-item editUs" id="${value._id}" data-toggle="modal" data-target="#exampleModaledit"
                                                                        >Edit</a>
                                <a style="cursor:pointer;" class="dropdown-item deleteUs" id="${value._id}" 
                                >Delete</a>

                                </div>
                                </div> </td>`;

						tag_table += '</tr>';
						tag_table += `<tr style="display:none" id="tagLoader_${value._id}" class="loadySef"><td colspan="3"><i class="fa fa-3x fa-spin fa-spinner"></i></td></tr>`;
					});
					// <a class="dropdown-item" data-toggle="modal" data-target="#exampleModaledit"
					//         href="#">Edit</a>
					k++;

					$('#tag_body').html(tag_table);
					$('#tagLoader').hide();
					$('#tagTable').show();
				} else {
					$('#tag_body').html(
						`<tr class="even"> <td class=" " colspan="3">No tag records available</td></tr>`,
					);
					$('#tagLoader').hide();
					$('#tagTable').show();
				}

				if (res.totalPages) {
					$('#pagination').twbsPagination({
						totalPages: res.totalPages,
						visiblePages: 10,
						onPageClick: function(event, page) {
							listTags(page);
						},
					});
				}
			} else {
				$('#tag_body').html(
					`<tr class="even"> <td class=" " colspan="3">Error Fetching Result</td></tr>`,
				);
				$('#tagLoader').hide();
				$('#tagTable').show();
			}
		},
		error: (res) => {
			$('#tag_body').html(
				`<tr class="even"> <td class=" " colspan="3">Error Fetching Result</td></tr>`,
			);
			$('#tagLoader').hide();
			$('#tagTable').show();
		},
	});
}

function deleteMe(idex) {
	let token2 = localStorage.getItem('token');
	if (idex != '') {
		$(`#tag_${idex}`).hide();
		$(`#tagLoader_${idex}`).show();
		$.ajax({
			type: 'DELETE',
			dataType: 'json',
			url: `${apiPaths}admin/delete_tag/${idex}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token2,
			},
			success: function(res) {
				if (res.status == 200) {
					alert(res.msg);
					listTags(1);
				} else {
					alert('Error!!');
					$(`#tagLoader_${idex}`).hide();
					$(`#tag_${idex}`).show();
				}
			},
			error: function(res) {
				alert('Error!!');
				$(`#tagLoader_${idex}`).hide();
				$(`#tag_${idex}`).show();
			},
		});
	} else {
		alert('Cannot Delete on an Empty Value');
	}
}

function createTag() {
	$('#createTagBtn').hide();
	$('#createTagLoader').show();

	let createTagName = titleCase($('#tag_name').val());
	let createTagColor = $('#tag_color').val();

	let data = {
		tag_name: createTagName,
		tag_color: createTagColor,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'POST',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/create_tags`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#createTagLoader').hide();
				$('#createTagBtn').show();
				$('#tag_name').val('');
				$('#tag_color').val('');
				$('#exampleModal').modal('hide');
				listTags(1);
			} else {
				alert('Error!!');
				$('#createTagLoader').hide();
				$('#createTagBtn').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#createTagLoader').hide();
			$('#createTagBtn').show();
		},
	});
}

function editTag() {
	let token2 = localStorage.getItem('token');
	let id = $('#editTagBtn').attr('dir');
	$('#editTagBtn').hide();
	$('#editTagLoader').show();

	let editTagName = $('#tagName').val();
	let editTagColor = $('#tagColor').val();

	let data = {
		tag_name: editTagName,
		tag_color: editTagColor,
	};
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		url: `${apiPaths}admin/update_tags/${id}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token2,
		},
		data: JSON.stringify(data),
		success: function(res) {
			if (res.status == 200 || res.status == 201) {
				alert('Successful');
				$('#tagName').val('');
				$('#tagColor').val('');
				$('#exampleModaledit').modal('hide');
				$('#editTagLoader').hide();
				$('#editTagBtn').show();
				listTags(1);
			} else {
				alert('Error!!');
				$('#editTagLoader').hide();
				$('#editTagBtn').show();
			}
		},
		error: function(res) {
			alert('Error!!');
			$('#editTagLoader').hide();
			$('#editTagBtn').show();
		},
	});
}

function viewSingleTag(id) {
	var token1 = localStorage.getItem('token');
	$('#tagName').hide();
	$('#editTagNameLoader').show();
	$('#tagColor').hide();
	$('#editTagColorLoader').show();

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/single_tag/${id}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},

		success: function(res) {
			if (res.status == 200) {
				$('#tagName').val(res.tag.tag_name);
				$('#tagColor').val(res.tag.tag_color);

				$('#editTagNameLoader').hide();
				$('#tagName').show();
				$('#editTagColorLoader').hide();
				$('#tagColor').show();
			} else {
				console.log(res);
				$('#editTagNameLoader').hide();
				$('#tagName').show();
				$('#editTagColorLoader').hide();
				$('#tagColor').show();
			}
		},
		error(res) {
			console.log(res);
			$('#editTagNameLoader').hide();
			$('#tagName').show();
			$('#editTagColorLoader').hide();
			$('#tagColor').show();
		},
	});
}

$('#filterNamey').on('keyup', function() {
	var value = $(this).val().toLowerCase();
	$('#tag_body tr').filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
	$('.loadySef').hide();
});

$('#exampleModaledit').on('hide.bs.modal', function() {
	$('#tagName').val('');
	$('#tagColor').val('');
});
