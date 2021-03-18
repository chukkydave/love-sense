$(document).ready(() => {
	// alert('welcome');
	var socket = io.connect('https://love-sense.herokuapp.com/', { forceNew: true });

	socket.on('successful_booking', function(data) {
		console.log({ data });
		alert(data);
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
		// public_key: "FLWPUBK-98cb379fa4bab657de583bf5c16c7a91-X",
		public_key: 'FLWPUBK_TEST-4a90330b534132a4d82f4389620fdb56-X',
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

			console.log(data);

			// console.log(data);
			var _id = localStorage.getItem('_id');
			console.log({ _id });
			socket.emit('successful_booking', {
				_id: _id,
			});
		},
		onclose: function() {
			// close modal
		},
		// success: function(data) {
		// 	alert(data);
		// 	return;
		// 	// var _id = localStorage.getItem('_id');
		// 	// console.log({ _id });
		// 	// socket.emit('successful_booking', {
		// 	// 	_id: _id,
		// 	// });
		// 	// setTimeout(() => {
		// 	// 	localStorage.removeItem(_id);
		// 	// }, 1000);
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
