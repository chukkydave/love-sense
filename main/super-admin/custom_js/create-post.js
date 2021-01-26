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
		previewFile();
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

function createPost() {
	$('#postBtn').hide();
	$('#postLoader').show();
	$('#uploadStatus').html('');
	$('.progress-bar').css('background-color', '#6777ef');
	$('#progressArea').show();

	let date = $('#postDate').val();
	let author = titleCase($('#postAuthor').val());
	let title = titleCase($('#postTitle').val());
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

	let tag_nameArr = [];

	$('.select2-selection__choice').each(function(i, v) {
		tag_nameArr.push($(v).attr('title'));
	});

	let data = new FormData();
	data.append('title', title);
	data.append('author', author);
	data.append('date', date);
	data.append('description', desc);
	data.append('image', thumb);
	data.append('file', filer);
	$(tag_nameArr).each(function(i, v) {
		data.append(`tags[${i}][tag_name]`, v);
	});
	$(tags).each(function(i, v) {
		data.append(`tags[${i}][tag_color]`, v);
	});
	// data.append('tag', tags);
	console.log(data);

	var token1 = localStorage.getItem('token');

	//using AJAX to make the submit call
	$.ajax({
		xhr: function() {
			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener(
				'progress',
				function(evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total * 100;
						$('.progress-bar').width(Math.round(percentComplete) + '%');
						$('.progress-bar').html(Math.round(percentComplete) + '%');
					}
				},
				false,
			);
			return xhr;
		},
		type: 'POST',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}upload_file`,
		processData: false,
		beforeSend: function() {
			$('.progress-bar').width('0%');
			// $('#uploadStatus').html('<i class="fa fa-3x fa-spin fa-spinner"></i>');
		},
		contentType: false,
		headers: {
			enctype: 'multipart/form-data',
			Authorization: token1,
		},
		data: data,

		success: (res) => {
			if (res.status == 201 || res.status == 200) {
				$('.progress-bar').css('background-color', 'green');
				alert('Succesful');
				$('#postLoader').hide();
				$('#postBtn').show();
				$('.required_po').val('');
				$('#audioImg').attr('src', '');
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
			$('#uploadStatus').html(
				'<p style="color:#EA4335;">File upload failed, please try again.</p>',
			);
			$('.progress-bar').css('background-color', 'red');
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
				options += `<option value="${v.tag_color}">${toTitleCase(v.tag_name)}</option>`;
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
