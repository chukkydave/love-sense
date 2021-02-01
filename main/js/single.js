const apiT = 'https://api.kdaudiolibrary.com/api/v1/';

// https://streaming-audio-library.herokuapp.com/api/v1/
$(document).ready(function() {
	listSingleAudio();
	listRecentAudio();
	listPopularAudio();
});

function listSingleAudio() {
	var token1 = localStorage.getItem('token');

	let audioId = window.location.search.substring(1);

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiT}view_file/${audioId}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.result) {
					let audio = '';

					// $(res.records).each((index, value) => {
					let thisId = res.result.file_id;
					let audioDate = moment(res.result.date, 'YYYY-MM-DD').format('ll');

					audio += `<div class="post-item">
                                <div class="post-item-wrap">
                                    <div class="post-audio">
                                        <a href="#">
                                            <img alt="" src="${apiT}/file/${res.result.files[0]
						.filename}/${res.result.file_id}">
										</a>
										
                                        <!--<audio class="video-js vjs-default-skin" controls controlsList="nodownload" id="audiom" preload="false" data-setup="{}">
                                            <source src="${apiT}file/${res.result.files[1]
						.filename}/${res.result.file_id}" />
										</audio>-->
										
                                        
                                        
                                    </div>
                                    <div class="post-item-description">
                                    
                                    
                                        <h2>${res.result.title}</h2>
                                        <div class="post-meta">
                                            <span class="post-meta-date"><i class="fa fa-calendar-o"></i>${audioDate}</span>`;
					$(res.result.tags).each(function(i, v) {
						audio += `<span class="post-meta-category"><i class="fa fa-tag" style="color:${v.tag_color}"></i>${v.tag_name}</span>`;
					});

					audio += `<span class="post-meta-date">By ${res.result.author}</span>
                                        </div>`;

					audio += `<div class="blockquote">
                                            <p>${res.result.description}</p>
                                            <!--<small><cite>Joshua 1 : 8</cite></small>-->
                                        </div>

                                        </div>
                                    <form method="get" action="${apiT}download/${res.result.files[1]
						.filename}/${res.result.file_id}">
                                    
                                        <button class="btn btn-outline" type="submit"><i class="fa fa-download"></i>  Download!</button>
                                            </form>
                            </div>
                        </div>`;

					// });

					$('#blogy').html(audio);
					$('#audioLoader').hide();
					$('#blogy').show();
				}
			} else {
				$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#audioLoader').hide();
				$('#blogy').show();
			}
		},
		error: (res) => {
			$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#audioLoader').hide();
			$('#blogy').show();
		},
	});
}

function forwardAudio() {
	// Check for audio element support.
	if (window.HTMLAudioElement) {
		try {
			var oAudio = document.getElementById('audiom');
			oAudio.currentTime += 30.0;
		} catch (e) {
			// Fail silently but show in F12 developer tools console
			if (window.console && console.error('Error:' + e));
		}
	}
}

function listRecentAudio() {
	var token1 = localStorage.getItem('token');

	let audioId = window.location.search.substring(1);

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiT}most_recent`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.count.length > 0) {
					let audio = '';

					$(res.count).each(function(i, v) {
						let theDate = moment(v.files[0].uploadDate).fromNow();
						audio += `<div class="post-thumbnail-entry">
								<img alt="" src="${apiT}file/${v.files[0].filename}/${v.file_id}">
								<div class="post-thumbnail-content">
									<a href="single.html?${v.file_id}">${v.title}</a>
									<span class="post-date"><i class="icon-clock"></i> ${theDate}</span>`;
						$(v.tags).each(function(index, value) {
							audio += `<span class="post-category"><i class="fa fa-tag" style="color:${value.tag_color} !important;"></i>
										${value.tag_name}</span>`;
						});
						audio += `</div></div>`;
					});

					$('#recenty').html(audio);
					$('#recentLoader').hide();
					$('#recenty').show();
				} else {
					$('#recenty').html(`<h5 style="color:red"> No recent audio messages</h5>`);
					$('#recentLoader').hide();
					$('#recenty').show();
				}
			} else {
				$('#recenty').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#recentLoader').hide();
				$('#recenty').show();
			}
		},
		error: (res) => {
			$('#recenty').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#recentLoader').hide();
			$('#recenty').show();
		},
	});
}

function listPopularAudio() {
	var token1 = localStorage.getItem('token');

	let audioId = window.location.search.substring(1);

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiT}most_stream`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token1,
		},
		success: (res) => {
			if (res.status == 200) {
				if (res.count.length > 0) {
					let audio = '';

					$(res.count).each(function(i, v) {
						let theDate = moment(v.files[0].uploadDate).fromNow();
						audio += `<div class="post-thumbnail-entry">
								<img alt="" src="${apiT}file/${v.files[0].filename}/${v.file_id}">
								<div class="post-thumbnail-content">
									<a href="single.html?${v.file_id}">${v.title}</a>
									<span class="post-date"><i class="icon-clock"></i> ${theDate}</span>`;
						$(v.tags).each(function(index, value) {
							audio += `<span class="post-category"><i class="fa fa-tag" style="color:${value.tag_color} !important;"></i>
										${value.tag_name}</span>`;
						});
						audio += `</div></div>`;
					});

					$('#populary').html(audio);
					$('#popularLoader').hide();
					$('#populary').show();
				} else {
					$('#populary').html(`<h5 style="color:red"> No popular audio messages</h5>`);
					$('#popularLoader').hide();
					$('#populary').show();
				}
			} else {
				$('#populary').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#popularLoader').hide();
				$('#populary').show();
			}
		},
		error: (res) => {
			$('#populary').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#popularLoader').hide();
			$('#populary').show();
		},
	});
}

{
	/* <div class="post-thumbnail-entry">
	<img alt="" src="images/blog/thumbnail/7.jpg">
	<div class="post-thumbnail-content">
		<a href="#">The most happiest time of the day!</a>
		<span class="post-date"><i class="icon-clock"></i> 11h ago</span>
		<span class="post-category"><i class="fa fa-tag"></i>
			Lifestyle</span>
	</div>
</div> */
}
