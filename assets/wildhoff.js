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

wildhoff.drawer = function(){
	$('[data-action="drawer"]').on('click', function(){
		$('.wh-drawer').addClass('shown');
	});

	$('[data-dismiss="drawer"]').on('click', function(){
		$('.wh-drawer').removeClass('shown');
	});	
}

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

wildhoff.marquee = function() {	
	var $banner = $('#MarqueeBanner'),
		currentBanner = '';

	$('[data-dismiss="marquee"]').on('click', function(){
		wildhoff.setCookie('marquee-banner', 1, 1);
		$banner.slideUp();
	});

	currentBanner = wildhoff.getCookie('marquee-banner');
	if(currentBanner != 1 ){
		$banner.slideDown();
	}
};

wildhoff.pageCollections = function() {
	
	// Toolbar view options
	var storedProductsView = localStorage.getItem("products-grid-view");
	if (storedProductsView) {
		$('.page-products__grid').attr('data-view', storedProductsView);
		$('.page-products__grid').removeClass().addClass('page-products__grid').addClass(storedProductsView);
		$('.view-options__view').removeClass('active');
		$('.view-options__view[data-view~='+storedProductsView+']').addClass('active');
	}

	$('.view-options__view').on('click', function(){
		var $grid = $('.page-products__grid'),
			$items = $('.view-options__view'),
			view =  $(this).data('view');

		$items.removeClass('active');
		$(this).addClass('active');

		var currentView = $grid.attr('data-view');  
		$grid.attr('data-view', view);
		$grid.removeClass(currentView).addClass(view);
		
		localStorage.setItem("products-grid-view", view);
	});
  
	// Toggle filter
	$('.page-products__aside__overlay, [data-dismiss="filter-sidebar"]').on('click', function(){
        $('.page-products').removeClass('shown');
    });

	$('[data-action="filter-sidebar"]').on('click', function(){
		var $container = $('.page-products');
        if($container.hasClass('shown')){
          $container.removeClass('shown');
        }else{
          $container.addClass('shown');
        }
	});


	/*
		  
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
	
*/
	function loadMore(el){
		var $self = $(el);

		var grid = $('.page-products__grid'),
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
				var newGrid = $(response).find('.page-products__grid');   

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
					 $('.page-products__footer__count').find('span').first().html(viewedItems);
				
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
					$('.page-products__footer').hide();
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


// Show translated validation message
document.addEventListener("DOMContentLoaded", function() {
	var elements = document.getElementsByTagName("INPUT");
	for (var i = 0; i < elements.length; i++) {
		elements[i].oninvalid = function(e) {
			e.target.setCustomValidity("");
			if (!e.target.validity.valid) {
				e.target.setCustomValidity(wildhoff.strings.validateFieldMessage);
			}
		};
		elements[i].oninput = function(e) {
			e.target.setCustomValidity("");
		};
	}
})