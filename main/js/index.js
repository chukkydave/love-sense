const apiT = 'https://api.kdaudiolibrary.com/api/v1/';
$(document).ready(function() {
	listAllAudios(1);
	listTags();

	$('#showAll').click(function() {
		$('#blogy').hide();
		$('#audioLoader').show();
		listAllAudios(1);
	});
	$('#recentAll').click(function() {
		listRecentAudio();
	});
	$('#popularAll').click(function() {
		listPopularAudio();
	});
	$('#fBtn').click(function() {
		listAllAudios(1);
	});
});

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

function listAllAudios(page) {
	$('#blogy').hide();
	$('#audioLoader').show();
	var token1 = localStorage.getItem('token');
	var page_limit = 12;

	let authoy = titleCase($('#fAuthor').val());
	let titley = titleCase($('#fTitle').val());
	let datey = $('#fDate').val();
	let tagy = $('#fTag').val();

	console.log(authoy, titley);
	// https://streaming-audio-library.herokuapp.com/api/v1/file/ad6c9d63df94d8509d74da9d590bfd0e.png/5fd72d3377f33e002c9201dc
	let data = {
		author: decodeURIComponent(authoy),
		title: decodeURIComponent(titley),
		date: $('#fDate').val(),
		tag_name: $('#fTag').val(),
	};

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiT}all_files/${page}/${page_limit}?author=${authoy}&title=${titley}&date=${datey}&tag_name=${tagy}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		// data: data,
		success: (res) => {
			if (res.status == 200) {
				if (res.result) {
					if (res.result.length > 0) {
						let audios = '';
						if (page == 1 || page == '') {
							var k = 1;
						} else {
							var k = page * page_limit - page_limit + 1;
						}
						$(res.result).each((index, value) => {
							let thisId = value.file_id;
							let audioDate = moment(value.date, 'YYYY-MM-DD').format('ll');

							audios += `<div class="post-item border grey-bg col-xl-3 col-lg-4 col-md-6 col-sm-12" >`;
							audios += `<div class="post-item-wrap">`;
							audios += `<div class="post-audio">`;
							audios += `<a href="single.html?${value.file_id}">
				                                    <img alt=""   src="${apiT}file/${value.files[0]
								.filename}/${value.file_id}">
				                                </a>`;
							// audios += `<audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
							//                             <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${value
							// 								.files[1].filename}" />
							//                         </audio>`;
							audios += `</div>`;
							audios += `<div class="post-item-description">`;
							audios += `<span class="post-meta-date"><i class="fa fa-calendar" style="margin-top:15px;"></i>${audioDate}</span>`;
							$(value.tags).each(function(i, v) {
								audios += `<span class="post-meta-category"><i class="fa fa-tag" style="color:${v.tag_color}"></i>${v.tag_name}</span>`;
							});
							audios += `<h2><a href="single.html?${value.file_id}">${value.title}</a></h2>`;
							audios += `<div class="post-author">
				                                    <p>by ${value.author}</p>
				                                </div>`;
							audios += `</div>`;
							audios += `</div>`;
							audios += `</div>`;
						});

						k++;

						$('#blogy').html(audios);
						// $(window).load(function() {
						// alert('hello');
						// });

						$('#audioLoader').hide();
						$('#blogy').show();
					} else {
						console.log(res);
						$('#blogy').html(
							`<h5 style="color:red"> No audio message record found</h5>`,
						);
						$('#audioLoader').hide();
						$('#blogy').show();
					}
				} else if (res.records) {
					if (res.records.length > 0) {
						let audios = '';
						if (page == 1 || page == '') {
							var k = 1;
						} else {
							var k = page * page_limit - page_limit + 1;
						}
						$(res.records).each((index, value) => {
							let thisId = value.file_id;
							let audioDate = moment(value.date, 'YYYY-MM-DD').format('ll');

							audios += `<div class="post-item border grey-bg col-xl-3 col-lg-4 col-md-6 col-sm-12" >`;
							audios += `<div class="post-item-wrap">`;
							audios += `<div class="post-audio">`;
							audios += `<a href="single.html?${value.file_id}">
				                                    <img alt=""   src="${apiT}file/${value.files[0]
								.filename}/${value.file_id}">
				                                </a>`;
							// audios += `<audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
							//                             <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${value
							// 								.files[1].filename}" />
							//                         </audio>`;
							audios += `</div>`;
							audios += `<div class="post-item-description">`;
							audios += `<span class="post-meta-date"><i class="fa fa-calendar" style="margin-top:15px;"></i>${audioDate}</span>`;
							$(value.tags).each(function(i, v) {
								audios += `<span class="post-meta-category"><i class="fa fa-tag" style="color:${v.tag_color}"></i>${v.tag_name}</span>`;
							});
							audios += `<h2><a href="single.html?${value.file_id}">${value.title}</a></h2>`;
							audios += `<div class="post-author">
				                                    <p>by ${value.author}</p>
				                                </div>`;
							audios += `</div>`;
							audios += `</div>`;
							audios += `</div>`;
						});

						k++;

						$('#blogy').html(audios);
						// $(window).load(function() {
						// alert('hello');
						// });

						$('#audioLoader').hide();
						$('#blogy').show();
					} else {
						console.log(res);
						$('#blogy').html(
							`<h5 style="color:red"> No audio message record found</h5>`,
						);
						$('#audioLoader').hide();
						$('#blogy').show();
					}
				}

				if (res.totalPages) {
					$('#pagination').twbsPagination({
						totalPages: res.totalPages,
						visiblePages: 10,
						onPageClick: function(event, page) {
							listAllAudios(page);
						},
					});
				}
			} else {
				console.log(res);
				$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#audioLoader').hide();
				$('#blogy').show();
			}
		},
		error: (res) => {
			console.log(res);
			$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#audioLoader').hide();
			$('#blogy').show();
		},
	});
}

function listRecentAudio() {
	$('#blogy').hide();
	$('#audioLoader').show();
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
					let audios = '';

					$(res.count).each((index, value) => {
						let thisId = value.file_id;
						let audioDate = moment(value.date, 'YYYY-MM-DD').format('ll');

						audios += `<div class="post-item border grey-bg col-xl-3 col-lg-4 col-md-6 col-sm-12" >`;
						audios += `<div class="post-item-wrap">`;
						audios += `<div class="post-audio">`;
						audios += `<a href="single.html?${value.file_id}">
				                                    <img alt=""  src="${apiT}file/${value.files[0]
							.filename}/${value.file_id}">
				                                </a>`;
						// audios += `<audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
						//                             <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${value
						// 								.files[1].filename}" />
						//                         </audio>`;
						audios += `</div>`;
						audios += `<div class="post-item-description">`;
						audios += `<span class="post-meta-date"><i class="fa fa-calendar" style="margin-top:15px;"></i>${audioDate}</span>`;
						$(value.tags).each(function(i, v) {
							audios += `<span class="post-meta-category"><i class="fa fa-tag" style="color:${v.tag_color}"></i>${v.tag_name}</span>`;
						});
						audios += `<h2><a href="single.html?${value.file_id}">${value.title}</a></h2>`;
						audios += `<div class="post-author">
				                                    <p>by ${value.author}</p>
				                                </div>`;
						audios += `</div>`;
						audios += `</div>`;
						audios += `</div>`;
					});

					$('#blogy').html(audios);
					// $(window).load(function() {
					// alert('hello');
					// });

					$('#audioLoader').hide();
					$('#blogy').show();
				} else {
					console.log(res);
					$('#blogy').html(`<h5 style="color:red"> No audio message record found</h5>`);
					$('#audioLoader').hide();
					$('#blogy').show();
				}
			} else {
				console.log(res);
				$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#audioLoader').hide();
				$('#blogy').show();
			}
		},
		error: (res) => {
			console.log(res);
			$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#audioLoader').hide();
			$('#blogy').show();
		},
	});
}

function listPopularAudio() {
	$('#blogy').hide();
	$('#audioLoader').show();
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
					let audios = '';

					$(res.count).each((index, value) => {
						let thisId = value.file_id;
						let audioDate = moment(value.date, 'YYYY-MM-DD').format('ll');

						audios += `<div class="post-item border grey-bg col-xl-3 col-lg-4 col-md-6 col-sm-12" >`;
						audios += `<div class="post-item-wrap">`;
						audios += `<div class="post-audio">`;
						audios += `<a href="single.html?${value.file_id}">
				                                    <img alt=""  src="${apiT}file/${value.files[0]
							.filename}/${value.file_id}">
				                                </a>`;
						// audios += `<audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
						//                             <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${value
						// 								.files[1].filename}" />
						//                         </audio>`;
						audios += `</div>`;
						audios += `<div class="post-item-description">`;
						audios += `<span class="post-meta-date"><i class="fa fa-calendar" style="margin-top:15px;"></i>${audioDate}</span>`;
						$(value.tags).each(function(i, v) {
							audios += `<span class="post-meta-category"><i class="fa fa-tag" style="color:${v.tag_color}"></i>${v.tag_name}</span>`;
						});
						audios += `<h2><a href="single.html?${value.file_id}">${value.title}</a></h2>`;
						audios += `<div class="post-author">
				                                    <p>by ${value.author}</p>
				                                </div>`;
						audios += `</div>`;
						audios += `</div>`;
						audios += `</div>`;
					});

					$('#blogy').html(audios);
					// $(window).load(function() {
					// alert('hello');
					// });

					$('#audioLoader').hide();
					$('#blogy').show();
				} else {
					console.log(res);
					$('#blogy').html(`<h5 style="color:red"> No audio message record found</h5>`);
					$('#audioLoader').hide();
					$('#blogy').show();
				}
			} else {
				console.log(res);
				$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
				$('#audioLoader').hide();
				$('#blogy').show();
			}
		},
		error: (res) => {
			console.log(res);
			$('#blogy').html(`<h5 style="color:red"> Error Fetching Result</h5>`);
			$('#audioLoader').hide();
			$('#blogy').show();
		},
	});
}

function listTags() {
	var token1 = localStorage.getItem('token');
	var page_limit = 500;
	$('#fTag').hide();
	$('#tagOptLoader').show();

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `${apiT}admin/view_tags/1/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: token1,
		},

		success: function(res) {
			function toTitleCase(str) {
				return str.replace(/\w\S*/g, function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			}

			var options = '';

			$(res.tagsrecords).each(function(i, v) {
				options += `<option value="${v.tag_name}">${toTitleCase(v.tag_name)}</option>`;
			});

			$('#fTag').append(options);
			$('#tagOptLoader').hide();
			$('#fTag').show();
		},
		// jqXHR, textStatus, errorThrown
		error(response) {
			console.log(response);
			$('#fTag').append(`<option value="">Error Loading result!!</option>`);
			$('#tagOptLoader').hide();
			$('#fTag').show();
		},
	});
}

{
	/* <div class="post-item border grey-bg bc-economics bc-medical bc-sport bc-science">
    <div class="post-item-wrap">
        <div class="post-audio">
            <a href="#">
                <img alt="" src="images/blog/audio-bg.jpg">
            </a>
            <!-- <span class="post-meta-category"><a href="#">Audio</a></span> -->
            <audio class="video-js vjs-default-skin" controls preload="false" data-setup="{}">
                <source src="audio/beautiful-optimist.mp3" type="audio/mp3" />
            </audio>
        </div>
        <div class="post-item-description">
            <span class="post-meta-date"><i class="fa fa-calendar-o"></i>Jan 21, 2017</span>
            <span class="post-meta-category"><i class="fa fa-tag"></i> Righteousness</span>
            <h2><a href="single.html">Frontliners Conference / Black and Blessed
                    sec3</a></h2>
            <!-- <p>Curabitur pulvinar euismod ante, ac sagittis ante posuere ac. Vivamus luctus
                        commodo dolor porta feugiat. Fusce at velit id ac sagittis ante posuere ac
                        ligula pharetra laoreet.</p> -->
            <div class="post-author">
                <p>by Ardian Musliu</p>
            </div>
        </div>
    </div>
</div> */
}

// <div class="post-item border grey-bg  bc-medical bc-sport bc-science">
//     <div class="post-item-wrap">
//         <div class="post-audio">
//             <a href="#">
//                 <img alt="" src="images/blog/audio-bg.jpg">
//             </a>
//             <!-- <span class="post-meta-category"><a href="#">Audio</a></span> -->
//             <audio class="video-js vjs-default-skin" controls preload="false" data-setup="{}">
//                 <source src="audio/beautiful-optimist.mp3" type="audio/mp3" />
//             </audio>
//         </div>
//         <div class="post-item-description">
//             <span class="post-meta-date"><i class="fa fa-calendar-o"></i>Jan 21, 2017</span>
//             <span class="post-meta-category"><i class="fa fa-tag"></i> Love</span>
//             <h2><a href="single.html">Frontliners Conference / Black and Blessed
//                     sec4</a></h2>
//             <!-- <p>Curabitur pulvinar euismod ante, ac sagittis ante posuere ac. Vivamus luctus
//                         commodo dolor porta feugiat. Fusce at velit id ac sagittis ante posuere ac
//                         ligula pharetra laoreet.</p> -->
//             <div class="post-author">
//                 <p>by Ardian Musliu</p>
//             </div>
//         </div>
//     </div>
// </div>

// <div class="post-item border grey-bg bc-sport bc-science">
//     <div class="post-item-wrap">
//         <div class="post-audio">
//             <a href="#">
//                 <img alt="" src="images/blog/audio-bg.jpg">
//             </a>
//             <!-- <span class="post-meta-category"><a href="#">Audio</a></span> -->
//             <audio class="video-js vjs-default-skin" controls preload="false" data-setup="{}">
//                 <source src="audio/beautiful-optimist.mp3" type="audio/mp3" />
//             </audio>
//         </div>
//         <div class="post-item-description">
//             <span class="post-meta-date"><i class="fa fa-calendar-o"></i>Jan 21, 2017</span>
//             <span class="post-meta-category"><i class="fa fa-tag"></i> Meekness</span>
//             <h2><a href="single.html">Frontliners Conference / Black and Blessed
//                     sec5</a></h2>
//             <!-- <p>Curabitur pulvinar euismod ante, ac sagittis ante posuere ac. Vivamus luctus
//                         commodo dolor porta feugiat. Fusce at velit id ac sagittis ante posuere ac
//                         ligula pharetra laoreet.</p> -->
//             <div class="post-author">
//                 <p>by Ardian Musliu</p>
//             </div>
//         </div>
//     </div>
// </div>

// <div
//     class="post-item border grey-bg  bc-general bc-music bc-economics bc-medical bc-sport bc-science">
//     <div class="post-item-wrap">
//         <div class="post-audio">
//             <a href="#">
//                 <img alt="" src="images/blog/audio-bg.jpg">
//             </a>
//             <!-- <span class="post-meta-category"><a href="#">Audio</a></span> -->
//             <audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
//                 <source src="audio/beautiful-optimist.mp3" type="audio/mp3" />
//             </audio>
//         </div>
//         <div class="post-item-description">
//             <span class="post-meta-date"><i class="fa fa-calendar-o"></i>Jan 21, 2017</span>
//             <span class="post-meta-category"><i class="fa fa-tag"></i> Humility</span>
//             <h2><a href="single.html">Frontliners Conference / Black and Blessed
//                     sec6</a></h2>
//             <!-- <p>Curabitur pulvinar euismod ante, ac sagittis ante posuere ac. Vivamus luctus
//                         commodo dolor porta feugiat. Fusce at velit id ac sagittis ante posuere ac
//                         ligula pharetra laoreet.</p> -->
//             <div class="post-author">
//                 <p>by Ardian Musliu</p>
//             </div>
//         </div>
//     </div>
// </div>
