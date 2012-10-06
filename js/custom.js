$(document).ready(function() {

//REMOVES DISABLED JAVASCRIPT FIX CLASSES
$('#portfolio_slider').removeClass("slider_no_js");
$('#gallery_nav').removeClass("gallery_nav_no_js");

	
//INITIALIZES PRETTYPHOTO PLUGIN
	$("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_square'}); //choose between different styles / dark_rounded / light_rounded / dark_square / light_square / facebook /

	
//INITIALIZES TWITTER FEED PLUGIN
	$("#twitter_feed").tweet({
		username: "eriras",  //just enter your twitter username
		join_text: "auto",
		avatar_size: null,
		count: 1, //number of tweets showing (to avoid any issues with the design leave at 1)
		auto_join_text_default: "",
		loading_text: "loading latest tweets..." //text displayed while loading tweets
	});

	
//qTip TOOLTIPS
	$.fn.qtip.styles.custom = {
		fontSize: 10,
		padding: 5,
		background: '#252525',
		color: '#8d8d8d',
		border: {
			width: 0,
			radius: 0,
			color: '#282828'
		}
	};

	$('.click_box').qtip({
		content: 'Click to see the popup panel...',
		style: 'custom',
		position: {
			corner: {
				target: 'topLeft',
				tooltip: 'bottomLeft'
			}
		},
		show: 'mouseover',
		hide: 'mouseout'
	});	
	
	
//NAVIGATION
	
	$('#navigation').each(function () {

		var $links = $(this).find('a'),
		panelIds = $links.map(function() { return this.hash; }).get().join(","),
		$panels = $(panelIds),
		$panelwrapper = $panels.filter(':first').parent(),
		delay = 600,
		heightOffset = 40;	  // we could add margin-top + margin-bottom + padding-top + padding-bottom of $panelwrapper
		 
		$panels.hide();
	   
		$links.click(function () {
		
			$('.boxes').animate({opacity : 0}, 300, function () {
				 $('.boxes').hide();
			});
			
			var link = this, 
				$link = $(this);
				var nextPage = $link.attr('href');
				var newHeight = $(nextPage).outerHeight(true);
			   
			  // ignore if already visible
			  if ($link.is('.selected')) {
				return false;
			  }
			 
			$links.removeClass('selected');
			$link.addClass('selected');
		 					 
			$panels.stop().animate({opacity: 0 }, delay);
			$('.panel img, .project').animate({opacity: 0 }, 600);
				
					
			$('html, body').animate( {scrollTop: 0}, function () { 
				$panelwrapper.stop().animate({
					height: newHeight
				}, delay, function () {
					var height = $panels.hide().filter(link.hash).animate({opacity: 1}).show().height() + heightOffset;
					$('.panel img, .project').animate({opacity: 1 }, 400);	
					$panelwrapper.animate({
					height: height
					}, delay);
				});
			});
		});
	  
		$links.filter(window.location.hash ? '[hash=' + window.location.hash + ']' : ':first').click();
	});

				
	
// CONTACT FORM 
		
	$('#contact_form').ajaxForm({
		target: '#message_outcome',
			beforeSubmit: function() {
				$('#message_outcome').addClass('visible');
			},
				success: function() {
					$('#message_outcome').show();
				}
	});
		
		
	$('.textbox, #message').focus(function (){
		$(this).css({backgroundColor : '#141414', borderColor : '#303030'});
			$(this).blur(function (){
				$(this).css({backgroundColor : '#121212', borderColor : '#282828'});
			});
	});

	
// SOCIAL LINKS FX

	$('ul.social_links li').hover(function () {
		$(this).css('backgroundColor' , '#1b1b1b');
	}, function () {
		$(this).css('backgroundColor' , '#161616');
	});

	
//PORTFOLIO NAVIGATION

	$('#portfolio_slider').cycle({ 
		fx:      'fade',  
		speed:    500, 
		timeout:  0,
		cleartype: false,   //  Fixes the issue with IE6+
		startingSlide: 0,
		next: '#next',
		prev: '#prev'
	});
	
	$('#latest_projects_slider').cycle({ 
		fx:      'fade',  
		speed:    500, 
		timeout:  5000,
		cleartype: false,   //  Fixes the issue with IE6+
		startingSlide: 0,
		next: '',
		prev: ''
	});
	
	
// PORTFOLIO IMAGE OPACITY

	$(function() {
		$('.gallery img').animate({"opacity": 1 }); // sets the opacity to 100% to all images inside the div with the class of .gallery
		
		$('.gallery img').hover(function() {
			$(this).stop().animate({ "opacity": .5 }); // on mouse hover sets the opacity to 30% to all images inside the div with the class of .gallery	
		}, 	
			function() {
				$(this).stop().animate({ "opacity": 1 });
			});
	});


// POPUP BOXES FUNCTIONS	

	$('boxes').css('opacity', 0);

	$('.close_box').click(function () {
		$('.boxes').animate({opacity : 0}, 600, function () {
			 $('.boxes').hide();
		});
	});	
								
	$('.click_box').click(function () { 
		if ( $('.boxes').is(':visible')) {
			$('.boxes').animate({opacity : 0}).hide();
		}
		$($(this).attr('href')).show().animate({opacity : 1}, 600);
	});

});	





