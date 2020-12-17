// $('#postBtn').click(function() {
// 	createPost();
// });
var postImgy;
var postFiley;

$(document).ready(function() {
	listTags();
	$('input#image-upload').on('change', function() {
		let file = this.files[0];
		postImgy = file;
	});

	$('input#postFile').on('change', function() {
		let filet = this.files[0];
		postFiley = filet;
	});

	$('#postBtn').click(function() {
		if (isEmptyInput('.required_po')) {
			createPost();
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

function createPost() {
	$('#postBtn').hide();
	$('#postLoader').show();

	let date = $('#postDate').val();
	let author = $('#postAuthor').val();
	let title = $('#postTitle').val();
	let desc = $('#postDesc').val();
	let tags = $('#postTag').val();
	let thumb;
	let filer;
	if (postImgy == undefined) {
		thumb = null;
	} else {
		thumb = postImgy;
	}

	if (postFiley == undefined) {
		filer = null;
	} else {
		filer = postFiley;
	}

	let data = new FormData();
	data.append('title', title);
	data.append('author', author);
	data.append('date', date);
	data.append('description', desc);
	data.append('image', thumb);
	data.append('file', filer);

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		type: 'POST',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}upload_file`,
		processData: false,
		contentType: false,
		headers: {
			enctype: 'multipart/form-data',
			Authorization: token1,
		},
		data: data,

		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				alert('Succesful');
				$('#postLoader').hide();
				$('#postBtn').show();
				$('.required_po').val('');
				window.location.reload();
				// $('#createTagLoader').hide();
				// $('#createTagBtn').show();
				// $('#tag_name').val('');
				// $('#tag_color').val('');
				// $('#exampleModal').modal('hide');
				// listTags(1);
			} else {
				alert('Error!!');
				$('#postLoader').hide();
				$('#postBtn').show();
				// $('#createTagLoader').hide();
				// $('#createTagBtn').show();
			}
		},
		error: (res) => {
			alert(res.responseText);
			$('#postLoader').hide();
			$('#postBtn').show();
			// $('#createTagLoader').hide();
			// $('#createTagBtn').show();
		},
	});
}

function listTags() {
	var token1 = localStorage.getItem('token');
	var page_limit = 500;
	$('#postTag').hide();
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
				options += `<option value="${v._id}">${toTitleCase(v.tag_name)}</option>`;
			});

			$('#postTag').append(options);
			$('#tagOptLoader').hide();
			$('#postTag').show();
		},
		// jqXHR, textStatus, errorThrown
		error(response) {
			console.log(response);
			$('#postTag').append(`<option value="">Error Loading result!!</option>`);
			$('#tagOptLoader').hide();
			$('#postTag').show();
		},
	});
}
