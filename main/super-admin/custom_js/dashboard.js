$(document).ready(function() {
	noOfStreams();
	noOfDownloads();
});

function noOfStreams() {
	var token1 = localStorage.getItem('token');
	// $('#audioTag').hide();
	// $('#tagOptLoader').show();

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}stream_data`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},

		success: function(res) {
			if (res.status == 200 || res.status == 201) {
				$('#noOfStream').html(res.count);
				$('#noOfStreamLoader').hide();
				$('#noOfStream').show();
			} else {
				$('#noOfStream').html('Error fetching result');
				$('#noOfStreamLoader').hide();
				$('#noOfStream').show();
			}
		},
		error(response) {
			console.log(response);
			$('#noOfStream').html('Error fetching result');
			$('#noOfStreamLoader').hide();
			$('#noOfStream').show();
		},
	});
}

function noOfDownloads() {
	var token1 = localStorage.getItem('token');

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiPaths}all_downloads`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},

		success: function(res) {
			if (res.status == 200 || res.status == 201) {
				$('#noOfDown').html(res.count);
				$('#noOfDownLoader').hide();
				$('#noOfDown').show();
			} else {
				$('#noOfDown').html('Error fetching result');
				$('#noOfDownLoader').hide();
				$('#noOfDown').show();
			}
		},
		error(response) {
			console.log(response);
			$('#noOfDown').html('Error fetching result');
			$('#noOfDownLoader').hide();
			$('#noOfDown').show();
		},
	});
}

let years = {
	2017: {
		count: [
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			1,
			2,
			4,
			5,
			6,
		],
		months: [
			Jan,
			Feb,
			Mar,
			Apr,
			May,
			Jun,
			Jul,
			Aug,
			Sep,
			Oct,
			Nov,
			Dec,
		],
	},
	2018: {
		count: [
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			1,
			2,
			4,
			5,
			6,
		],
		months: [
			Jan,
			Feb,
			Mar,
			Apr,
			May,
			Jun,
			Jul,
			Aug,
			Sep,
			Oct,
			Nov,
			Dec,
		],
	},
	2019: {
		count: [
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			1,
			2,
			4,
			5,
			6,
		],
		months: [
			Jan,
			Feb,
			Mar,
			Apr,
			May,
			Jun,
			Jul,
			Aug,
			Sep,
			Oct,
			Nov,
			Dec,
		],
	},
};
