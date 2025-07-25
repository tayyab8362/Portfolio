$(document).ready(function () {
  var canScroll = true,
    scrollController = null;

  // Mousewheel and DOMMouseScroll event handler
  $(this).on('mousewheel DOMMouseScroll', handleScroll);

  // Click event handler for side and outer navigation
  $('.side-nav li, .outer-nav li').click(handleNavClick);

  // Click event handler for CTA button
  $('.cta').click(handleCTAClick);

  // Swipe support for touch devices
  var mc = new Hammer(document.getElementById('viewport'));
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', handleSwipe);

  // Keyboard event handler
  $(document).keyup(handleKeyboard);

  // Function to handle scroll event
  function handleScroll(e) {
    if ($('.outer-nav').hasClass('is-vis')) {
      e.preventDefault();
      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 10;
      if (Math.abs(delta) > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function () {
          canScroll = true;
        }, 800);
        updateHelper(delta > 0 ? 1 : -1);
      }
    }
  }

  // Function to handle navigation click
  function handleNavClick() {
    if (!($(this).hasClass('is-active'))) {
      var $this = $(this),
        curActive = $this.parent().find('.is-active'),
        curPos = $this.parent().children().index(curActive),
        nextPos = $this.parent().children().index($this),
        lastItem = $(this).parent().children().length - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  }

  // Function to handle CTA button click
  function handleCTAClick() {
    var curActive = $('.side-nav').find('.is-active'),
      curPos = $('.side-nav').children().index(curActive),
      lastItem = $('.side-nav').children().length - 1,
      nextPos = lastItem;
    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);
  }

  // Function to handle swipe event
  function handleSwipe(e) {
    var delta = e.type === "swipeup" ? -1 : 1;
    updateHelper(delta);
  }

  // Function to handle keyboard event
  function handleKeyboard(e) {
    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      var delta = e.keyCode === 40 ? 1 : -1;
      updateHelper(delta);
    }
  }

  // Function to update navigation
  function updateNavs(nextPos) {
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');
  }

  // Function to update content
  function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');
    if ((curPos === lastItem && nextPos === 0) || (curPos === 0 && nextPos === lastItem)) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    } else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    } else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }
    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    } else {
      $('.header--cta').removeClass('is-active');
    }
  }
  
// Function to update helper
function updateHelper(delta) {
  var curActive = $('.side-nav').find('.is-active'),
    curPos = $('.side-nav').children().index(curActive),
    lastItem = $('.side-nav').children().length - 1,
    nextPos = 0;

  // Check if mainContent exists
  var mainContent = document.getElementById('main-content');
  if (!mainContent) {
    console.error("Main content element not found!");
    return; // Exit function if mainContent is null
  }

  // Update navigation position
  if (delta > 0) {
    if (curPos !== lastItem) {
      nextPos = curPos + 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  } else {
    if (curPos !== 0) {
      nextPos = curPos - 1;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    } else {
      nextPos = lastItem;
      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);
    }
  }

  // Scroll main content
  mainContent.scrollTop += delta * 100;
}

  // Function to initialize work slider
  // function workSlider() {
  //   $('.slider--prev, .slider--next').click(function () {
  //     var $this = $(this),
  //       curLeft = $('.slider').find('.slider--item-left'),
  //       curLeftPos = $('.slider').children().index(curLeft),
  //       curCenter = $('.slider').find('.slider--item-center'),
  //       curCenterPos = $('.slider').children().index(curCenter),
  //       curRight = $('.slider').find('.slider--item-right'),
  //       curRightPos = $('.slider').children().index(curRight),
  //       totalWorks = $('.slider').children().length,
  //       $left = $('.slider--item-left'),
  //       $center = $('.slider--item-center'),
  //       $right = $('.slider--item-right'),
  //       $item = $('.slider--item');
  //     $('.slider').animate({ opacity: 1 }, 400);
  //     setTimeout(function () {
  //       if ($this.hasClass('slider--next')) {
  //         if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
  //           $left.removeClass('slider--item-left').next().addClass('slider--item-left');
  //           $center.removeClass('slider--item-center').next().addClass('slider--item-center');
  //           $right.removeClass('slider--item-right').next().addClass('slider--item-right');
  //         } else {
  //           if (curLeftPos === totalWorks - 1) {
  //             $item.removeClass('slider--item-left').first().addClass('slider--item-left');
  //             $center.removeClass('slider--item-center').next().addClass('slider--item-center');
  //             $right.removeClass('slider--item-right').next().addClass('slider--item-right');
  //           } else if (curCenterPos === totalWorks - 1) {
  //             $left.removeClass('slider--item-left').next().addClass('slider--item-left');
  //             $item.removeClass('slider--item-center').first().addClass('slider--item-center');
  //             $right.removeClass('slider--item-right').next().addClass('slider--item-right');
  //           } else {
  //             $left.removeClass('slider--item-left').next().addClass('slider--item-left');
  //             $center.removeClass('slider--item-center').next().addClass('slider--item-center');
  //             $item.removeClass('slider--item-right').first().addClass('slider--item-right');
  //           }
  //         }
  //       } else {
  //         if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
  //           $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
  //           $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
  //           $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
  //         } else {
  //           if (curLeftPos === 0) {
  //             $item.removeClass('slider--item-left').last().addClass('slider--item-left');
  //             $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
  //             $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
  //           } else if (curCenterPos === 0) {
  //             $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
  //             $item.removeClass('slider--item-center').last().addClass('slider--item-center');
  //             $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
  //           } else {
  //             $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
  //             $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
  //             $item.removeClass('slider--item-right').last().addClass('slider--item-right');
  //           }
  //         }
  //       }
  //     }, 400);
  //     $('.slider').animate({ opacity: 1 }, 400);
  //   });
  // }

  // Function to handle transition labels
  // function transitionLabels() {
  //   $('.work-request--information input').focusout(function () {
  //     var textVal = $(this).val();
  //     if (textVal === "") {
  //       $(this).removeClass('has-value');
  //     } else {
  //       $(this).addClass('has-value');
  //     }
  //     window.scrollTo(0, 0);
  //   });
  // }

  // Initialization functions
  // workSlider();
  // transitionLabels();
});
