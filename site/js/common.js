$(document).ready(function() {
	
	$(document).click(function() {
		$(".js-select").removeClass("is-active");
		$(".js-select-list").fadeOut(100);
		$('.js-header').removeClass('is-open-menu');
		$('.js-country').removeClass('is-active');
	});

	// tab
	function tab() {
		$(".js-tab").each(function(){
			var tab_link 	= $(this).find("a"),
				tab_item 	= $(this).find("li"),
				index 		= tab_link.attr("href"),
				parents 	= $(this).parents(".js-tab-group"),
				accordL 	= parents.find('.js-tab-link'),
				tab_cont 	= parents.find(".js-tab-cont");
			tab_link.on("click", function() {
				var index = $(this).attr("href");
				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(0);
				parents.find("."+index).fadeIn(300);
				return false;
			});
			accordL.on("click", function() {
				var this_ 	= $(this),
					index 	= $(this).attr("href"),
					parent 	= $(this).parent();
				if (!parent.hasClass('is-active')) {
					$('.js-tab-acc').removeClass("is-active");
					tab_cont.slideUp(300);
					parent.addClass("is-active");
					parents.find("."+index).slideDown(300);
				}
				else {
					console.log('k');
					parent.removeClass("is-active");
					tab_cont.slideUp(300);
				}
				return false;
			});
			parents.find('.js-tab-acc:first').addClass("is-active");
			$(this).find('li:first').addClass("is-active");
			parents.find("."+index).fadeIn(300);
		});
	}
	tab();
   
	// select list
	$("body").on("click",".js-select",function(event) {
		event.stopPropagation();
	});
	$("body").on("click",".js-select-text",function(event) {
		var select = $(this).parents(".js-select");
		if (select.hasClass("is-active")) {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").fadeOut(100);
		}
		else {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").fadeOut(100);
			select.toggleClass("is-active").find(".js-select-list").fadeToggle(100);
		}
		
	});
	$("body").on("click",".js-select-list li",function() {
		var val 		= $(this).attr("data-val");
		var text 		= $(this).text();
		var select 		= $(this).parents(".js-select");
		var selectList 	= $(this).parents(".js-select-list");
		select.find(".js-select-text").text(text);
		select.find("option").removeAttr("selected");
		select.find('option[value="'+val+'"]').attr("selected", "selected");
		selectList.find("li").removeClass("is-active");
		$(this).addClass("is-active");
		select.removeClass("is-active");
		selectList.fadeOut(100);
		return false;
		
	});

	// datepicker
	$(".js-datepicker").datepicker({
    	showOn 			: "both",
    	buttonImage 	: "img/calendar.png",
    	buttonImageOnly : true
    });

	$('.js-close').on('click', function(){
		$(this).parents('.js-inf').remove();
	});

	// slider init
	$('.js-slider').slick({
		dots 			: true,
		infinite		: true,
		speed 			: 1000,
		fade 			: true,
		cssEase 		: 'linear',
		slidesToShow 	: 1,
		slidesToScroll 	: 1,
		autoplay 		: true,
		autoplaySpeed 	: 5000
	});
	$('.js-gallery').slick({
		dots 			: false,
		infinite 		: false,
		speed 			: 600,
		cssEase 		: 'linear',
		slidesToShow 	: 4,
		slidesToScroll 	: 1,
		adaptiveHeight 	: true,
		responsive 		: [
			{
				breakpoint	: 1200,
				settings 	: {
					slidesToShow: 3
				}
			},
			{
				breakpoint 	: 768,
				settings	: {
				  slidesToShow: 2
				}
			},
			{
				breakpoint 	: 480,
				settings 	: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.slider-for').slick({
		slidesToShow	: 1,
		slidesToScroll	: 1,
		arrows			: true,
		fade 			: true,
		asNavFor 		: '.js-slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow	: 7,
		slidesToScroll	: 1,
		asNavFor		: '.js-slider-for',
		dots 			: false,
		arrows 			: false,
		centerMode 		: true,
		focusOnSelect 	: true
	});
	$('.js-gall').each(function() {
		var this_ = $(this),
			top = this_.find('.js-gall-top'),
			pag = this_.find('.js-gall-pag');
		top.slick({
			slidesToShow	: 1,
			slidesToScroll	: 1,
			arrows			: false,
			fade 			: true,
			asNavFor 		: pag
		});
		pag.slick({
			slidesToShow	: 4,
			slidesToScroll	: 1,
			asNavFor		: top,
			dots 			: false,
			arrows 			: false,
			focusOnSelect 	: true
		});
	});
	

	$('.js-open-menu').on('click', function() {
		$('.js-header').toggleClass('is-open-menu');
	});
	// select list
	$('.js-open-menu, .menu').on("click", function(event) {
	    event.stopPropagation();
	});

	// 
	$('.js-topic').on('click', function(event) {
		$('.js-country').removeClass('is-active');
		$(this).parents('.js-country').addClass('is-active');
		event.stopPropagation();
	});

	// map
	if ($('#map').length) {
		function initialize() {
			var myLatlng = {lat: -25.363, lng: 131.044};

			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 9,
				center 				: myLatlng,
				mapTypeControl 		: false,
				streetViewControl 	: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				zoomControl 		: true,
				zoomControlOptions 	: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: true,
				panControlOptions 	: {
					position: google.maps.ControlPosition.LEFT_CENTER
				}
			});

			var marker = new google.maps.Marker({
				position: myLatlng,
				map 	: map,
				title: 'Click to zoom'
			});

			map.addListener('center_changed', function() {
				window.setTimeout(function() {
				  map.panTo(marker.getPosition());
				}, 3000);
			});

			marker.addListener('click', function() {
				map.setZoom(8);
				map.setCenter(marker.getPosition());
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	};

	// range
	$( ".js-slider-range" ).each(function(){
		var slider = $(this),
			parent = slider.parent(),
			amount = parent.find('.js-amount');
		slider.slider({
			range: true,
			min: 0,
			max: 14,
			values: [7, 10],
			slide: function( event, ui ) {
				amount.val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		amount.val($(slider).slider( "values", 0 ) + " - " + $(slider).slider( "values", 1 ) );
	});

	// addZero
	function addZero(value) {
		return value < 10 ? '0' + value : value;
	};

	// range time
	$( ".js-range-time" ).each(function(){
		var slider = $(this),
			parent = slider.parent(),
			amount = parent.find('.js-amount-time');
		slider.slider({
			range: true,
			min: 0,
			max: 1440,
			step: 15,
			values: [ 0, 1440 ],
			slide: function( event, ui ) {
				var hours1 = Math.floor(ui.values[0] / 60);
				var minutes1 = ui.values[0] - (hours1 * 60);

				if(hours1.length < 10) hours1= '0' + hours;
				if(minutes1.length < 10) minutes1 = '0' + minutes;

				if(minutes1 == 0) minutes1 = '00';

				var hours2 = Math.floor(ui.values[1] / 60);
				var minutes2 = ui.values[1] - (hours2 * 60);

				if(hours2.length < 10) hours2= '0' + hours;
				if(minutes2.length < 10) minutes2 = '0' + minutes;

				if(minutes2 == 0) minutes2 = '00';

				amount.val(addZero(hours1) + ':'+minutes1+' - '+addZero(hours2)+':'+minutes2 );
			}
		});
	});

	// check
	var countChecked = function() {
		$('.js-check-group').each(function() {
			var this_ 		= $(this),
				input 		= this_.find('.js-check:checked'),
				quantity 	= this_.find('.js-check-quantity'),
				n 			= $(input).length;
			quantity.val(n);
		});
	};
	countChecked();
	
	$('.js-check').on('click', function(){
		var this_ 	= $(this),
			parent 	= this_.parents('.js-check-parents'),
			prev 	= parent.prevAll().find('.js-check'),
			next 	= parent.nextAll().find('.js-check');
		if ($(this).is(':checked')) {
			prev.prop('checked', true);
		}
		else {
			next.prop('checked', false);
		}
		countChecked();
	});

	// spiner
	function spiner() {
		var number = $('.js-spiner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.js-plus');
			var minus = $(this).find('.js-minus');
			plus.on('click', function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				}
			});
			minus.on('click', function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('0');
					return false;
				}
			});
		});
	}
	spiner();
	
	// popup
	$('.js-popup').on('click', function(){
		$(this).removeClass('is-active');
	});
	$('.js-popup-close').on('click', function(){
		$(this).parents('.js-popup').removeClass('is-active');
	});
	$('.js-popup-in').on("click", function(event) {
		event.stopPropagation();
	});

});