var postImgy;
$(document).ready(function() {
	listAudios(1);
	listTags();
	$(document).on('click', '.deleteMe .deleteUs', function() {
		let particularId = $(this).attr('id');
		if (confirm('Click OK to Delete Audio')) deleteMe(particularId);
		return false;
	});

	$(document).on('click', '.deleteMe .editUs', function() {
		let particularIde = $(this).attr('id');

		viewAudio(particularIde);
	});
	$('#audEditBtn').on('click', function() {
		// if (isEmptyInput('.required_aud')) {
		editAudio();
		// }
	});
	$('input#image-upload').on('change', function() {
		let file = this.files[0];
		postImgy = file;
		previewFile();
	});
});

$('#filterNamey').on('keyup', function() {
	var value = $(this).val().toLowerCase();
	$('#audio_body tr').filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	});
	$('.loadySef').hide();
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

function listAudios(page) {
	var token1 = localStorage.getItem('token');
	var page_limit = 10;

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}all_files/${page}/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.records.length > 0) {
					let audio_table = '';
					if (page == 1 || page == '') {
						var k = 1;
					} else {
						var k = page * page_limit - page_limit + 1;
					}
					$(res.records).each((index, value) => {
						let thisId = value.file_id;
						audio_table += `<tr id="aud_${value.file_id}">`;
						// audio_table += `<td><div class="custom-checkbox custom-control">
						//         <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
						//           id="checkbox-2">
						//         <label for="checkbox-2" class="custom-control-label">&nbsp;</label>
						//       </div></td>`;
						audio_table += '<td>' + k++ + '</td>';
						audio_table += `<td> ${value.title}</td>`;
						audio_table += `<td><span class="d-inline-block ml-1">${value.author}</span></td>`;
						// audio_table += `<td> ${value.tag}</td>`;
						audio_table += `<td> ${value.date}</td>`;
						// audio_table += `<td> ${value.streams}/${value.downloads}</td>`;

						audio_table += `<td> <div class="dropdown d-inline mr-2">
                                <button class="btn btn-primary dropdown-toggle"
                                type="button" id="dropdownMenuButton3"
                                data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Actions
                                </button>
                                <div class="dropdown-menu deleteMe"
                                style="will-change: transform;">
                                
                                <a class="dropdown-item editUs" id="${value.file_id}" data-toggle="modal" data-target="#exampleModal"
                                                                        >Edit</a>
                                <a style="cursor:pointer;" class="dropdown-item deleteUs" id="${value.file_id}" 
                                >Delete</a>

                                </div>
                                </div> </td>`;

						audio_table += '</tr>';
						audio_table += `<tr style="display:none" id="audLoader_${value.file_id}" class="loadySef"><td colspan="4"><i class="fa fa-3x fa-spin fa-spinner"></i></td></tr>`;
					});
					// <a class="dropdown-item" data-toggle="modal" data-target="#exampleModaledit"
					//         href="#">Edit</a>
					k++;

					$('#audio_body').html(audio_table);
					$('#audioLoader').hide();
					$('#audioTable').show();
				} else {
					$('#audio_body').html(
						`<tr class="even"> <td class=" " colspan="6">No record found</td></tr>`,
					);
					$('#audioLoader').hide();
					$('#audioTable').show();
				}

				if (res.totalPages) {
					$('#pagination').twbsPagination({
						totalPages: res.totalPages,
						visiblePages: 10,
						onPageClick: function(event, page) {
							listAudios(page);
						},
					});
				}
			} else {
				$('#audio_body').html(
					`<tr class="even"> <td class=" " colspan="6">Error Fetching Result</td></tr>`,
				);
				$('#audioLoader').hide();
				$('#audioTable').show();
			}
		},
		error: (res) => {
			$('#audio_body').html(
				`<tr class="even"> <td class=" " colspan="6">Error Fetching Result</td></tr>`,
			);
			$('#audioLoader').hide();
			$('#audioTable').show();
		},
	});
}

function deleteMe(idex) {
	var token2 = localStorage.getItem('token');
	if (idex != '') {
		$(`#aud_${idex}`).hide();
		$(`#audLoader_${idex}`).show();
		$.ajax({
			type: 'DELETE',
			dataType: 'json',
			url: `${apiPaths}admin/delete_file/${idex}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token2,
			},
			success: function(res) {
				if (res.status == 200) {
					alert('Audio delete successful');
					listAudios(1);
				} else {
					alert('Error!!');
					$(`#audLoader_${idex}`).hide();
					$(`#aud_${idex}`).show();
				}
			},
			error: function(res) {
				alert('Error!!');
				$(`#audLoader_${idex}`).hide();
				$(`#aud_${idex}`).show();
			},
		});
	} else {
		alert('Cannot Delete on an Empty Value');
	}
}

function viewAudio(idex) {
	$('#auBody').hide();
	$('#auLoader').show();
	$('#audioTag').val('').select2();
	var token2 = localStorage.getItem('token');
	$('#audEditBtn').attr('dir', idex);
	// if (idex != '') {
	// $(`#con_${idex}`).hide();
	// $(`#adminModal_${idex}`).show();
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: `${apiPaths}view_file/${idex}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token2,
		},
		success: function(res) {
			if (res.status == 200) {
				if (res.result.files) {
					let allTags = [];
					// $(res.result.files).each(function(i, v) {
					$('#audioTitle').val(res.result.title);
					$('#audioAuthor').val(res.result.author);
					$('#audioDesc').val(res.result.description);
					$('#audioDate').val(res.result.date);
					$(res.result.tags).each(function(i, v) {
						allTags.push(v.tag_color);
					});
					$('#audioTag').val(allTags).select2();

					$('#audioImg').attr(
						'src',
						`https://api.kdaudiolibrary.com/api/v1/file/${res.result.files[0]
							.filename}/${res.result.file_id}`,
					);

					$('#auLoader').hide();
					$('#auBody').show();
					// });
				} else {
					console.log(res);
					$('#auLoader').hide();
					$('#auBody').show();
				}
			} else {
				console.log(res);
			}

			// if (res.status == 200 || res.status == 201) {
			// 	$('#exampleModal').modal('show');
			// 	$('#viewLoader').hide();
			// 	$('#viewBody').show();
			// } else {
			// 	$('#viewBody').html(`<h5 style="color:red">${res.msg}</h5>`);
			// 	$('#viewLoader').hide();
			// 	$('#viewBody').show();
			// }
		},
		error: function(res) {
			console.log('res');
			// $('#viewBody').html(`<h5 style="color:red">${res.msg}</h5>`);
			// $('#viewLoader').hide();
			// $('#viewBody').show();
		},
	});
	// } else {
	// $('#viewBody').html(`<h5 style="color:red">ID field empty</h5>`);
	// $('#viewLoader').hide();
	// $('#viewBody').show();
	// }
}

function editAudio() {
	$('#audEditBtn').hide();
	$('#audEditLoader').show();

	let id = $('#audEditBtn').attr('dir');

	$('#audioTitle').val();
	$('#audioAuthor').val();
	$('#audioDesc').val();
	$('#audioDate').val();
	let tagy = $('#audioTag').val();

	let thumb;
	if (postImgy == undefined) {
		thumb = null;
	} else {
		thumb = postImgy;
	}

	let tagArr = [];

	$('.select2-selection__choice').each(function(i, v) {
		tagArr.push($(v).attr('title'));
	});

	let alltagArr = tagArr.map((item, index) => ({ tag_name: item, tag_color: tagy[index] }));

	let data = {
		title: titleCase($('#audioTitle').val()),
		author: titleCase($('#audioAuthor').val()),
		date: $('#audioDate').val(),
		description: $('#audioDesc').val(),
		tags: alltagArr,
	};

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'PATCH',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}edit_file/${id}`,
		headers: {
			// 'Accept': 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		data: JSON.stringify(data),
		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#audEditLoader').hide();
				$('#audEditBtn').show();
				$('#exampleModal').modal('hide');
				listAudios(1);
			} else {
				alert('Error!!');
				$('#audEditLoader').hide();
				$('#audEditBtn').show();
			}
		},
		error: (res) => {
			alert('Error!!');
			$('#audEditLoader').hide();
			$('#audEditBtn').show();
		},
	});
}

function listTags() {
	var token1 = localStorage.getItem('token');
	var page_limit = 500;
	$('#audioTag').hide();
	$('#tagOptLoader').show();

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}admin/view_tags/1/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},

		success: function(res) {
			function toTitleCase(str) {
				return str.replace(/\w\S*/g, function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			}

			var options = '';

			$(res.tagsrecords).each(function(i, v) {
				options += `<option value="${v.tag_color}">${toTitleCase(v.tag_name)}</option>`;
			});

			$('#audioTag').append(options);
			$('#tagOptLoader').hide();
			$('#audioTag').show();
		},
		// jqXHR, textStatus, errorThrown
		error(response) {
			console.log(response);
			$('#audioTag').append(`<option value="">Error Loading result!!</option>`);
			$('#tagOptLoader').hide();
			$('#audioTag').show();
		},
	});
}

function previewFile() {
	var preview = document.querySelector('img');
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	reader.addEventListener(
		'load',
		function(e) {
			// convert image file to base64 string
			var img = new Image();
			img.src = e.target.result;

			// fileName = reader.result;
			$('#audioImg').attr('src', reader.result);
		},
		false,
	);

	if (file) {
		reader.readAsDataURL(file);
	}
}

$('#exampleModal').on('hide.bs.modal', function() {
	$('#image-upload').val('');
	$('#audioImg').attr('src', '');
	$('.required_aud').val('');
	// $('.select2-selection__rendered li').each(function(i, v) {
	// 	$(v).removeClass('select2-selection__choice');
	// });
});

// deleteMe = () => {
// 	if (confirm('Click OK to Delete Admin')) alert('Just a test To delete');
// 	return false;
// };
