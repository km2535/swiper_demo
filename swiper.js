let mainSliderSelector = "main-slider",
  navSliderSelector = "nav-slide",
  interleaveOffset = 0.5;
let mainSliderOptions = {
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
  },
  loopAdditionalSlides: 10,
  grabSlidesProgress: true,
  navigation: {
    nextEl: "swiper-button-next",
    prevEl: "swiper-button-prev",
  },
  on: {
    init: function () {
      this.autoplay.stop();
    },
    imagesReady: function () {
      this.el.classList.remove("loading");
      this.autoplay.start();
    },
    slideChangeTransitionEnd: function () {
      let swiper = this,
        captions = swiper.el.querySelectorAll(".caption");
      for (let i = 0; i < captions.length; ++i) {
        captions[i].classList.remove("show");
      }
      swiper.slides[swiper.activeIndex]
        .querySelector(".caption")
        .classList.add("show");
    },
    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * innerleaveOffset,
          innerTranslate = slideProgress * innerOffset;
        swiper.slides[i].querySelector(".slide-bgimg").style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (speed) {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector("slide-bgimg").style.transition =
          speed + "ms";
      }
    },
  },
};

let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

let navSliderOption = {
  loop: true,
  loopAdditionalSlides: 10,
  speed: 1000,
  spaceBetween: 5,
  speedPerView: 5,
  centeredSlides: true,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  direction: "vertical",
  on: {
    imagesReady: function () {
      this.el.classList.remove("loading");
    },
    click: function () {
      mainSlider.autoplay.stop();
    },
  },
};
let navSlider = new Swiper(navSliderSelector, navSliderOption);

mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
