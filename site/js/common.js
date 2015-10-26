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
			var tab_link = $(this).find("a"),
				tab_item = $(this).find("li"),
				index = tab_link.attr("href"),
				parents = $(this).parents(".js-tab-group"),
				tab_cont = parents.find(".js-tab-cont");
			tab_link.on("click", function() {
				var index = $(this).attr("href");
				$('.js-tab-item').removeClass("is-active");
				$(this).parent().addClass("is-active");
				tab_cont.fadeOut(0);
				parents.find("."+index).fadeIn(300);
				return false;
			});
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
		var val = $(this).attr("data-val");
		var text = $(this).text();
		var select = $(this).parents(".js-select");
		var selectList = $(this).parents(".js-select-list");
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
    	showOn: "both",
    	buttonImage: "img/calendar.png",
    	buttonImageOnly: true
    });

	$('.js-close').on('click', function(){
		$(this).parents('.js-inf').remove();
	});

	// slider init
	$('.js-slider').slick({
		dots: true,
		infinite: true,
		speed: 1000,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000
	});
	$('.js-gallery').slick({
		dots: false,
		infinite: false,
		speed: 600,
		cssEase: 'linear',
		slidesToShow: 4,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
				  slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.js-open-menu').on('click', function() {
		$('.js-header').addClass('is-open-menu');
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
	
		

});