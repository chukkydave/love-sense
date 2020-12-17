$(document).ready(function() {
	listSingleAudio();
});

function listSingleAudio() {
	var token1 = localStorage.getItem('token');

	let audioId = window.location.search.substring(1);

	$.ajax({
		type: 'GET',
		dataType: 'json',
		cache: false,
		url: `https://streaming-audio-library.herokuapp.com/api/v1/view_file/${audioId}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token1,
		},
		success: (res) => {
			console.log(res);
			if (res.status == 200) {
				if (res.result) {
					let audio = '';

					// $(res.records).each((index, value) => {
					let thisId = res.result.file_id;
					let audioDate = moment(res.result.date, 'YYYY-MM-DD').format('ll');

					audio += `<div class="post-item">
                                <div class="post-item-wrap">
                                    <div class="post-audio" style="width: 50%;">
                                        <a href="#">
                                            <img alt="" src="images/blog/audio-bg.jpg">
                                        </a>
                                        <audio class="video-js vjs-default-skin" controls controlsList="nodownload" preload="false" data-setup="{}">
                                            <source src="https://streaming-audio-library.herokuapp.com/api/v1/file/${res
												.result.files[1].filename}" />
                                        </audio>
                                        
                                        
                                    </div>
                                    <div class="post-item-description">
                                    
                                    
                                        <h2>${res.result.title}</h2>
                                        <div class="post-meta">
                                            <span class="post-meta-date"><i class="fa fa-calendar-o"></i>${audioDate}</span>`;
					$(res.result.tags).each(function(i, v) {
						audio += `<span class="post-meta-category"><i class="fa fa-tag"></i>${v}</span>`;
					});

					audio += `<span class="post-meta-date">By ${res.result.author}</span>
                                        </div>`;

					audio += `<div class="blockquote">
                                            <p>${res.result.description}</p>
                                            <!--<small><cite>Joshua 1 : 8</cite></small>-->
                                        </div>

                                        <div class="post-tags">`;
					$(res.result.tags).each(function(i, v) {
						audio += `<a href="#">${v}</a> <a href="#">Convenant</a>
                                                            <a href="#">Love</a>
                                                            <a href="#">Hope</a>
                                                        `;
					});

					audio += `</div></div>
                                    <form method="get" action="https://streaming-audio-library.herokuapp.com/api/v1/download/${res
										.result.files[1].filename}">
                                    
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
