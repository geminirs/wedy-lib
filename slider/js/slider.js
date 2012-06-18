/* ================ Slider Configuration Starts ===================*/ 
var defaultSlideWidth = 800; // the width of each slideItem
var defaultSlideHeight = 360; // the height of each slideItem
var left = 0;		// current offset of #slideContent
var activeIndex = 0;		// which slide is active
var animationSpeed = 500;	// in ms, it takes for the animation to slides to next slide
var intervalBetweenSlides = 5000;	// in ms, how long it will change to next slide, if auto rotating.

var arrowNav = true;		// To have arrow navigation
var autoSlide = false;	// auto rotating slider
var slideLoop = true;	// if all slides in a loop, (0,1,2,3,0,1,2,3,...)
var fullScreen = false;    // if each slide displayed full screen

var sliderAnimation = {     // to be enhanced
	'1' : 'show',
	'2' : 'fadeIn'	
}
/* ================ Config ends =================== */


$(function(){
	$('#slider, #viewport, .slideItem img').css({width: defaultSlideWidth, height: defaultSlideHeight});
	
	var $slideContent = $('#slideContent');
	var $slideNavs = $('#slideNav li');
	var slideNum = $('.slideItem').size();
	var step = defaultSlideWidth;	

	function updateNavs(){
		$('#slideNav li:eq('+activeIndex+')').addClass('active').siblings().removeClass('active');
	}
	function updateSlider(){
		left = (-1) * activeIndex * step;
		$slideContent.stop().animate({left:left}, animationSpeed);
		updateNavs();
		if(autoSlide){
	  		clearInterval(rotateInterval);   //reset rotate interval
	  		startInterval();
		}
	}
	
	var windowWidth;
	function setSlideWidth(){
		windowWidth = $(window).width();
		var newSlideWidth = Math.max(windowWidth, defaultSlideWidth);
		$('#slider, #viewport, .slideItem').css({width: newSlideWidth});
		$('#preSlide, #nextSlide').hide();
		step = newSlideWidth;
	}
	
	// click event binding	
	$('#slideNav li').click(function(e) {
	    activeIndex  = $slideNavs.index(this);
		updateSlider();
		return false;
	});	
	
	$('#preSlide').click(function(e) {
		if(slideLoop){ if(activeIndex <= 0) return false;}
		activeIndex = (activeIndex-1+slideNum)%slideNum;
		updateSlider();
		return false;
	});

	$('#nextSlide').click(function(e) {
		if(slideLoop){ if(activeIndex >= (slideNum-1)) return false;}
		activeIndex = (activeIndex+1)%slideNum;
		updateSlider();
		return false;	
	});
	
	
	// auto slide interval
	var rotateInterval;   // set interval to auto sliding
	function startInterval(){
		rotateInterval = setInterval(function(){
			activeIndex = (activeIndex+1)%slideNum; 
			updateSlider();
		}, intervalBetweenSlides);	
	}
	
	
	// slider initialization
	function sliderInit(){
		if(autoSlide) {startInterval();}
		if(!arrowNav) {$('#preSlide, #nextSlide').hide();}
		if(fullScreen) { setSlideWidth();}
	}
	
	$(window).resize(function(e) {
        if(fullScreen) {
			setSlideWidth(); 
			left = (-1) * activeIndex * step;
			$slideContent.css({left:left});
		}
    });
	
	
	// need to add swipe support for iPad


	sliderInit();
});
