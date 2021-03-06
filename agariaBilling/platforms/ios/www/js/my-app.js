var $$ = Dom7;
var remote = "http://127.0.0.1/fw7electron/membershipCardApp/";
var db;
var app = new Framework7({
  // App root element
  root: '#agraria',
  // App Name
  name: 'Agraria',
  // App id
  id: 'org.agraria.ebilling',
  // Enable swipe panel
  panel: {
	swipe: 'left',
  },
  // Add default routes
  routes: [
		{
			name: 'Home',
			path: '/',
			url: 'main.html',
		},
		{
			name: 'Last Bill',
			path: '/lastBill/',
			url: 'lastBill.html',
		},
		{
			name: 'History',
			path: '/history/',
			url: 'history.html',
		},
		{
			name: 'Weekly Summary',
			path: '/weekly/',
			url: 'summary/weekly.html',
		},
		{
			name: 'Monthly Summary',
			path: '/monthly/',
			url: 'summary/monthly.html',
		},
		{
			name: 'Yearly Summary',
			path: '/yearly/',
			url: 'summary/yearly.html',
		},
		{
			name: 'Download',
			path: '/download/',
			url: 'summary/download.html',
		},
		{
			name: 'About',
			path: '/about/',
			url: 'about/about.html',
		},
		{
			name: 'Privacy',
			path: '/privacy/',
			url: 'about/privacy.html',
		},
		{
			name: 'Agraria',
			path: '/agraria/',
			url: 'about/agraria.html',
		}
  	],
  // ... other parameters
});

var mainView = app.views.create('.view-main', {url: '/lastBill/'});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
	// Do something here when page loaded and initialized

  	var swiper = app.swiper.create('.swiper-container', {
		speed: 400,
		spaceBetween: 100
	});

	/*Framework7.request.get(remote + 'server/index.php', function (data) {
		console.log(data);
	});*/
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
	var calendarInline = app.calendar.create({
		containerEl: '#demo-calendar-inline-container',
		value: [new Date()],
		weekHeader: false,
		renderToolbar: function () {
			return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
				'<div class="toolbar-inner">' +
				'<div class="left">' +
				'<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
				'</div>' +
				'<div class="center"></div>' +
				'<div class="right">' +
				'<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
				'</div>' +
				'</div>' +
				'</div>';
		},
		on: {
			init: function (c) {
				$$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
				$$('.calendar-custom-toolbar .left .link').on('click', function () {
					calendarInline.prevMonth();
				});
				$$('.calendar-custom-toolbar .right .link').on('click', function () {
					calendarInline.nextMonth();
				});
			},
			monthYearChangeStart: function (c) {
				$$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
			}
		}
	});
});

$(document).ready(function (){
	console.log("Ready");
	db = new PouchDB("billingData");
	db.info().then(function (info) {
		console.log(info);
	});

	var doc = {
		"_id": "mittens",
		"name": "Mittens",
		"occupation": "kitten",
		"age": 3,
		"hobbies": [
			"playing with balls of yarn",
			"chasing laser pointers",
			"lookin' hella cute"
		]
	};
	db.put(doc);
	// fetch mittens
	db.get('mittens').then(function (doc) {
		// update their age
		doc.age = 4;
		// put them back
		return db.put(doc);
	}).then(function () {
		// fetch mittens again
		return db.get('mittens');
	}).then(function (doc) {
		console.log(doc);
	});

});

// create searchbar
var searchbar = app.searchbar.create({
	el: '.searchbar',
	searchContainer: '.list',
	searchIn: '.item-title',
	on: {
		search(sb, query, previousQuery) {
			console.log(query, previousQuery);
		}
	}
})

