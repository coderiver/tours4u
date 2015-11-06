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

	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 14,
		values: [7, 10],
		slide: function( event, ui ) {
			$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );

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