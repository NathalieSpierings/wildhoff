window.wildhoff = window.wildhoff || {};

wildhoff.cookiesEnabled = function(){
	var cookieEnabled = navigator.cookieEnabled;
	if (!cookieEnabled){
		document.cookie = 'webcookie';
		cookieEnabled = (document.cookie.indexOf('webcookie') !== -1);
	}
	return cookieEnabled;
}

wildhoff.setCookie = function(cname, cvalue, exdays){
	var date = new Date();
	date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + date.toGMTString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

wildhoff.getCookie = function(cname){
	var name = cname + '=',
		decodedCookie = decodeURIComponent(document.cookie),
		cookieArray = decodedCookie.split(';');

	for(var i = 0; i < cookieArray.length; i++) {
		var cookieItem = cookieArray[i];
		while (cookieItem.charAt(0) === ' ') {
			cookieItem = cookieItem.substring(1);
		}
		if (cookieItem.indexOf(name) === 0) {
			return cookieItem.substring(name.length, cookieItem.length);
		}
	}
	return '';
}

wildhoff.cookieConsent = function(){

	var $cookiePlaceholder = $('.cookie'),
		cookieName = 'cookie-consents',
		settings = {
			event: "cookie-consent",
			accept: true
		},
		cookieValue = 'accept',
		currentCookie = wildhoff.getCookie(cookieName),
		cookieConsent,
		isJson = true;
	try
	{
		cookieConsent = JSON.parse(currentCookie);
	}
	catch(err)
	{
		isJson = false;
	}     	    

	if(currentCookie != undefined 
        && currentCookie != null 
        && currentCookie != '' 
        && isJson){	
			
		// Show or hide cookie consent
		if (cookieConsent.accept == true || cookieConsent.accept == false) {
			
			$cookiePlaceholder.removeClass('shown');
			$cookiePlaceholder.remove();
		} else {
			setTimeout(function() {
				$cookiePlaceholder.addClass('shown');
			}, 1500);		
		}
	}else{
        console.debug('sisi');
		setTimeout(function() {
			$cookiePlaceholder.addClass('shown');
		}, 1500);
	}
	
	// Adjust settings
	$(document).on('click', '[data-action="cookie-adjust"]', function(){
		var $self =  $('.cookie__settings'),
			$buttons = $self.find('.btn');

		$self.animate({height: 'toggle'}, 1000, function(){
			$('.cookie__footer').fadeOut(500, function(){
				$buttons.each(function(index) {
					$(this).delay(400*index)
					$(this).css('display', 'inline-flex').fadeIn(300);
				});
			});    
		});
	});

	$(document).on('click', '[data-action="cookie-save"]', function(e) {
		e.preventDefault();
		
		if($('#checkboxAnalytics').is(':checked')){
			 settings.essentials = true;
			 settings.analytics = true;
		}else{
			 settings.essentials = true;			
		}
		settings.accept = false;
		cookieValue = JSON.stringify(settings);			
		cookie(cookieValue, true, 356);
	});
	$(document).on('click', '[data-cookie="deny"]', function(e) {
		e.preventDefault();		
		settings.essentials = false;
		settings.analytics = false;	
		settings.accept = false;
		cookieValue = JSON.stringify(settings);			
		cookie(cookieValue, false, 356);
	});
	$(document).on('click', '[data-cookie="accept"]', function(e) {
		e.preventDefault();
		settings.essentials = true;
		settings.analytics = true;
		settings.accept = true;
		cookieValue = JSON.stringify(settings);	
		cookie(cookieValue, true, 356);
	});
	
	var cookie = function(cookieValue, accept, days){
		wildhoff.setCookie(cookieName, cookieValue, days);
		$cookiePlaceholder.remove();
	}
}

wildhoff.hero = function(){
    $(window).scroll(function () { 
        var Num = $(window).scrollTop() / 500;
        var Num2 = $(window).scrollTop() * .0004; // higher number for more zoom
        var Num2mod = Num2 + 1;
        var Num3 = $(window).scrollTop() * .2; // Title speed
        var Num3mod = Num3 + 1;
       // return $('.hero__shade').css('opacity', Num),
        $('.banner__media').css({"transform":"scale(" + Num2mod + ")"}),
        $('.banner__content').css({"margin-top":"-" + Num3mod + "px"});
    });
}

wildhoff.dropdown = function(){
	$('.dropdown-toggle').on('click', function(e){
		e.preventDefault();

		$(this).toggleClass('shown');
		$('.dropdown-menu').toggleClass('shown');
	});
}

// Show/hide password prefix

wildhoff.passwordToggle = function(){
	$('.password .prefix').on('click', function (e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$(this).toggleClass('on');
		$input.attr('type', function (i, attr) {
			return attr === 'text' ? 'password' : 'text';
		});
	});
}

// Drawer
wildhoff.drawer = function(){
	$('[data-action="drawer"]').on('click', function(){
		$('.wh-drawer').addClass('shown');
	});

	$('[data-dismiss="drawer"]').on('click', function(){
		$('.wh-drawer').removeClass('shown');
	});	
}

// Login drawer
wildhoff.logindrawer = function(){
	$('[data-action="forgot-password"]').on('click', function(){
		$('.wh-login__content').removeClass('shown');
		$('[data-view="reset"]').addClass('shown');

		$('.wh-login__title').hide();
		$('.wh-login__title--reset').fadeIn('slow');		
	});
	  
	$('[data-action="register"]').on('click', function(){
		$('.wh-login__content').removeClass('shown');
		$('[data-view="register"]').addClass('shown');
		$('.wh-login__title').hide();
		$('.wh-login__title--register').fadeIn('slow');
	});
	  
	$('[data-action="cancel-forgot"], [data-action="cancel-register"]').on('click', function(){
		$('.wh-login__content').removeClass('shown');
		$('[data-view="login"]').addClass('shown');
		$('.wh-login__title').hide();
		$('.wh-login__title--login').fadeIn('slow');
	});
}

// Drawer
wildhoff.scrolToTop = function(){
	var $self = $('.to-top');

	$('body').on('click', $self, function(e) {
		e.preventDefault();
		$('body, html').stop().animate({ scrollTop: 0 }, '500');
	});


	$(window).scroll(function() {
	if ($(window).scrollTop() >= 200) {
		$self.fadeIn().css({display:'inline-flex'});
	} else {
		$self.fadeOut();	}
	});
}


wildhoff.marquee = function() {	
	var marquee = '';

	$('[data-dismiss="marquee"]').on('click', function(){
		wildhoff.setCookie('wildhoff_marquee', 1, 1);
		$('.wh-marquee').slideUp();
	});

	marquee = wildhoff.getCookie('wildhoff_marquee');
	if(marquee != 1 ){
		$('.wh-marquee').slideDown();
	}
};

wildhoff.pageCollections = function() {
	
	var storedView = localStorage.getItem('grid-view');
	if(storedView){	
	var $grid = $('.wh-collection__grid'),
		$items = $('.wh-collection__toolbar__view');

		$items.removeClass('active');
		$('#' + storedView).addClass('active');
		$grid.removeClass().addClass('wh-collection__grid collection ' + storedView + ' loaded');
	}
   
	  
	$('.wh-collection__toolbar__view').on('click', function(){
		var $grid = $('.wh-collection__grid'),
			$items = $('.wh-collection__toolbar__view'),
			view =  $(this).data('view');	  
			
		  $items.removeClass('active');
		  $(this).addClass('active');
	  
		  if(view == 'grid-4'){
			  $grid.removeClass().addClass('wh-collection__grid collection grid-4 loaded');
		  }else if(view == 'grid-3'){
			  $grid.removeClass().addClass('wh-collection__grid collection grid-3 loaded');
		  }
		  else if(view == 'grid-2'){
			  $grid.removeClass().addClass('wh-collection__grid collection grid-2 loaded');
		  }else{
			  $grid.removeClass().addClass('wh-collection__grid collection list loaded');
		  }

		  localStorage.setItem("grid-view", view);
	});
	  
    // Toggle sidebar
    $('.wh-collection__aside__overlay, [data-dismiss="filter-drawer"]').on('click', function(){
        $('.wh-collection').removeClass('shown');
    });
      
    $('[data-action="filter-drawer"]').on('click', function(){
        var $container = $('.wh-collection');
        if($container.hasClass('shown')){
          $container.removeClass('shown');
        }else{
          $container.addClass('shown');
        }
    });

      	  
	// $('.quickaction').on('click', function(){
	// 	$('.quickaction').removeClass('active');
	// 	$(this).addClass('active');
	// 	$(this).find('svg use').attr('xlink:href', '#svg-spinner');
	// });
	

	function loadMore(el){
		var $self = $(el);

		var grid = $('.wh-collection__grid'),
			baseUrl = grid.attr('data-base-url'),
			currentPage =  parseInt(grid.attr('data-current-page')),
			totalPages =  parseInt(grid.attr('data-total-pages')),
			pageSize =  parseInt(grid.attr('data-page-size')),
			totalItems =  parseInt(grid.attr('data-total-items')),
			nextUrl = grid.attr('data-next-url');
						
			
			// Determine new page details
			var newCurrentPage = currentPage + 1;
			var newPageIndex = currentPage + 2;
		
		$.ajax({
			url: nextUrl,
			type: 'GET',
			dataType: 'html',
			beforeSend:function(){
				$self.addClass('active');	
			},
			success: function(response){
				var newGrid = $(response).find('.wh-collection__grid');   

				// Update hidden fields with new page details
				grid.attr('data-next-url', baseUrl + '?page=' + newPageIndex);
				grid.attr('data-current-page', newCurrentPage);


				// Add new items to collections grid
				grid.append(newGrid.html());	

			},
			complete: function() {
				if(newCurrentPage < totalPages) {

					// Update text
					var viewedItems = pageSize * newCurrentPage;
					 $('.wh-collection__footer__count').find('span').first().html(viewedItems);
				
					// Update percentage
					var min_page = 1;
					var current_page = newCurrentPage;
					var max_page = pageSize * current_page;	
					if (current_page > 1){
						current_page = current_page-1;
					}
					if(max_page > totalItems){
						max_page = totalItems;
					}			
					
					var percent = max_page * 100 / totalItems;
					$('.percent').attr('style', 'width:'+ percent+'%');
						
						$self.removeClass('active');
					} 

				if(newCurrentPage >= totalPages) {
					$('.wh-collection__footer').hide();
					$self.hide();
				} 
			}
		});
	}

	$('#LoadMoreProducts').on('click', function(){
		loadMore($(this));
	});

};


wildhoff.init = function() {
	//wildhoff.scrolToTop();
	wildhoff.cookieConsent();
    wildhoff.hero();
	wildhoff.dropdown();
	wildhoff.passwordToggle();
	wildhoff.drawer();
	wildhoff.logindrawer();
	wildhoff.marquee();
	wildhoff.pageCollections();
}

$(document).ready(function () {
	wildhoff.init();
});

document.addEventListener("DOMContentLoaded", function() {
	var elements = document.getElementsByTagName("INPUT");
	for (var i = 0; i < elements.length; i++) {
		elements[i].oninvalid = function(e) {
			e.target.setCustomValidity("");
			if (!e.target.validity.valid) {
				//e.target.setCustomValidity("Dit is een verplicht veld");
				e.target.setCustomValidity(wildhoff.strings.validateFieldMessage);
			}
		};
		elements[i].oninput = function(e) {
			e.target.setCustomValidity("");
		};
	}
})