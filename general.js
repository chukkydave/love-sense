$(document).ready(() => {
	// alert('welcome');
	var socket = io.connect('https://love-sense.herokuapp.com/', { forceNew: true });

	// var socket = io.connect('http://localhost:8000/', { forceNew: true });

	socket.on('successful_booking', function(data) {
		console.log({ data });
		// alert(data);
		counter = counter + 1;
		$('#notification_count').html(counter);
		let body = '';

		let dates = moment(data.resBookings.date).format('ll');
		body += `<a href="appointments" class="dropdown-item">  <span class="dropdown-item-desc"> <span class="message-user">${data
			.resBookings.first_name} ${data.resBookings.last_name}
                    </span> <span class="time messege-text">${data.resBookings.service}<br> ${data
			.resBookings.time} ${dates}</span>
                  </span>
                </a>`;
		$('#notification_body').append(body);
		if (window.location.pathname.split('/')[1] == 'admin') {
			function play2() {
				/* Audio link for notification */
				var audio = new Audio('https://lovesense.online/audio/swiftly.mp3');
				audio.play();
			}
			// var audio = new Audio('https://lovesense.online/audio/swiftly.mp3');
			var img = 'https://lovesense.online/images/logos/logo3.png';
			var text = `Hey!! ${data.resBookings.first_name} ${data.resBookings
				.last_name} just booked a ${data.resBookings.service} service scheduled for ${data
				.resBookings.time} ${dates}`;
			var notification = new Notification('New Booking', { body: text, icon: img });
			play2();
		}
	});
});

function makePayment() {
	let Famount = localStorage.getItem('price');
	let Ffname = localStorage.getItem('first_name');
	let Flname = localStorage.getItem('last_name');
	let Femail = localStorage.getItem('email');
	let Fservice = localStorage.getItem('service');
	let Fphoness = localStorage.getItem('phones');
	let fullname = Ffname + ' ' + Flname;
	let finalAmt;
	let finalCur;

	if (convCurrency == undefined || convCurrency == null || convCurrency == '') {
		finalCur = 'GHS';
	} else {
		finalCur = convCurrency;
	}
	if (convAmount == undefined || convAmount == null || convAmount == '') {
		finalAmt = 50;
	} else {
		finalAmt = convAmount;
	}

	FlutterwaveCheckout({
		public_key: 'FLWPUBK-98cb379fa4bab657de583bf5c16c7a91-X',

		// public_key: 'FLWPUBK_TEST-4a90330b534132a4d82f4389620fdb56-X',
		tx_ref: '' + Math.floor(Math.random() * 1000000000 + 1),
		amount: finalAmt,
		currency: finalCur,
		// country: "GH",
		payment_options: 'card, mobilemoneyghana, ussd',
		// specified redirect URL
		// redirect_url: 'https://www.lovesense.online',
		meta: {
			consumer_id: 23,
			consumer_mac: '92a3-912ba-1192a',
		},
		customer: {
			email: Femail,
			phone_number: Fphoness,
			name: fullname,
		},
		callback: function(data) {
			// alert(data);
			// return;
			var socket = io.connect('https://love-sense.herokuapp.com/', { forceNew: true });
			// var socket = io.connect('http://localhost:8000/', { forceNew: true });

			console.log(data);

			// console.log(data);
			var _id = localStorage.getItem('_id');
			let resBookings = JSON.parse(localStorage.getItem('resBookings'));
			console.log({ _id });
			socket.emit('successful_booking', {
				_id: _id,
				resBookings: resBookings,
			});
			$('#make_payment').hide();
			localStorage.removeItem('name');
			localStorage.removeItem('last_name');
			localStorage.removeItem('email');
			localStorage.removeItem('service');
			localStorage.removeItem('price');
			localStorage.removeItem('phones');
			localStorage.removeItem('resBookings');
			setTimeout(() => {
				window.location.href = 'https://www.lovesense.online';
			}, 2000);
		},
		onclose: function() {
			// close modal
		},
		// success: function(data) {
		//  alert(data);
		//  return;
		//  // var _id = localStorage.getItem('_id');
		//  // console.log({ _id });
		//  // socket.emit('successful_booking', {
		//  //  _id: _id,
		//  // });
		//  // setTimeout(() => {
		//  //  localStorage.removeItem(_id);
		//  // }, 1000);
		// },
		customizations: {
			title: 'Love Sense',
			description: Fservice,
			// logo: "https://myreohub.com/images/relt22.png",
		},
	});
}
function callSomething(data) {
	console.log(data);
}
