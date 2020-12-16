// $(document).ready(function () {
listAllAudios(1);
// });

function listAllAudios(page) {
	var token1 = localStorage.getItem('token');
	var page_limit = 10;

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `https://streaming-audio-library.herokuapp.com/api/v1/all_files/${page}/${page_limit}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		success: (res) => {
			console.log(res);
			if (res.status == 200) {
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

						audios += `<div class="post-item border grey-bg col-4 col-md-3" >`;
						audios += `<div class="post-item-wrap">`;
						audios += `<div class="post-audio">`;
						audios += `<a href="single.html?${value.files[1].filename}">
				                                    <img alt="" src="images/blog/audio-bg.jpg">
				                                </a>`;
						// audios += `<audio class="video-js vjs-default-skin" controls preload="true" data-setup="{}">
						//                             <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${value
						// 								.files[1].filename}" />
						//                         </audio>`;
						audios += `</div>`;
						audios += `<div class="post-item-description">`;
						audios += `<span class="post-meta-date"><i class="fa fa-calendar" style="margin-top:15px;"></i>${audioDate}</span>`;
						$(value.tags).each(function(i, v) {
							audios += `<span class="post-meta-category"><i class="fa fa-tag"></i>${v}</span>`;
						});
						audios += `<h2><a href="single.html?${value.files[1]
							.filename}">${value.title}</a></h2>`;
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

					// $('#audioLoader').hide();
					// $('#audioTable').show();
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
				$('#audio_body').html(`<h5> Error Fetching Result</h5>`);
				// $('#audioLoader').hide();
				// $('#audioTable').show();
			}
		},
		error: (res) => {
			$('#audio_body').html(`<h5> Error Fetching Result</h5>`);
			// $('#audioLoader').hide();
			// $('#audioTable').show();
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
