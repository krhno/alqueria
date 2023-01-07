/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Document Ready
jQuery(document).ready(function(e){
  //Sliders
  //Slider Anchors2
    jQuery(".anchors2 .steps-anchor .step-anchor").click(function(e){
      jQuery(".anchors2 .steps-anchor .step-anchor").removeClass("active");
      jQuery(this).addClass("active");

      jQuery(".anchors2 .content-anchor .item-anchor").css("display", "none");
      jQuery(".anchors2 .content-anchor .item-anchor[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();
    });
    //Accordion Anchors2
    jQuery(".anchors2 .content-anchor .item-collapse a.icon-icon-arrow").click(
      function(e){
        jQuery(".anchors2 .content-anchor .item-collapse .collapse").collapse("hide");
      }
    );
    function s_slider_anchors2(){
      jQuery(".s-slider-anchors2").owlCarousel({
        loop: false,
        nav: false,
        margin: 20,
        rewind: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
          0: {
            items: 1,
            dots: true
          },
          540: {
            items: 2,
            dots: true
          },
          769: {
            items: 3,
            dots: true
          },
          1025: {
            items: 0,
            dots: false
          }
        }
      });
    }

  //Slider Axes
    function s_slider_axes(){
      jQuery(".s-slider-axes").owlCarousel({
        loop: jQuery(".s-slider-axes .items").length <= 1 ? false : true,
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: false
      });
    }

  //Slider Cards Default
    function s_slider_cards_default(){
      jQuery(".default .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".default .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".default .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".default .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".default .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards News3
    function s_slider_cards_news3(){
      jQuery(".news3 .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".news3 .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".news3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".news3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".news3 .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards News4
    function s_slider_cards_news4(){
      jQuery(".news4 .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".news4 .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".news4 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".news4 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".news4 .s-slider-cards article").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards Nutrition
    function s_slider_cards_nutrition(){
      jQuery(".nutrition .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".nutrition .s-slider-cards article").length <= 4 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".nutrition .s-slider-cards article").length <= 4 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".nutrition .s-slider-cards article").length <= 4 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".nutrition .s-slider-cards article").length <= 4 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards Pillars
    function s_slider_cards_pillars(){
      jQuery(".pillars .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".pillars .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".pillars .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".pillars .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".pillars .s-slider-cards article").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards Products
    function s_slider_cards_products(){
      jQuery(".products .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".products .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".products .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".products .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".products .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards Programs
    function s_slider_cards_programs(){
      jQuery(".programs .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".programs .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".programs .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".programs .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".programs .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards Realities
    function s_slider_cards_realities(){
      jQuery(".realities .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".realities .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".realities .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".realities .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".realities .s-slider-cards article").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards Recipes
    function s_slider_cards_recipes(){
      jQuery(".recipes .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".recipes .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".recipes .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".recipes .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          },
          1025: {
            loop: jQuery(".recipes .s-slider-cards article").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards Related
    function s_slider_cards_related(){
      jQuery(".related .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".related .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".related .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".related .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".related .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards Sustainability
    function s_slider_cards_sustainability1(){
      jQuery(".sustainability .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards2 Sustainability
    function s_slider_cards_sustainability2(){
      jQuery(".sustainability.cards2 .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".sustainability.cards2 .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".sustainability.cards2 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".sustainability.cards2 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".sustainability.cards2 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          }
        }
      });
    }

  //Slider Cards3 Sustainability
    function s_slider_cards_sustainability3(){
      jQuery(".sustainability.cards3 .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".sustainability.cards3 .s-slider-cards article").length <= 3 ? false : true,
            items: 3,
            nav: true
          }
        }
      });
    }

  //Slider Cards Tips
    function s_slider_cards_tips(){
      jQuery(".tips .s-slider-cards").owlCarousel({
        loop: false,
        dots: true,
        margin: 10,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            items: 1,
            nav: false
          },
          540: {
            items: 2,
            nav: true
          },
          769: {
            items: 3,
            nav: true
          },
          1025: {
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards TOM
    function s_slider_cards_tom(){
      jQuery(".tom .s-slider-cards").owlCarousel({
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".tom .s-slider-cards article").length <= 1 ? false : true,
            items: 1,
            nav: false
          },
          540: {
            loop: jQuery(".tom .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".tom .s-slider-cards article").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          1025: {
            loop: jQuery(".tom .s-slider-cards article").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Cards Valued
    function s_slider_cards_valued(){
      jQuery(".valued .s-slider-cards").owlCarousel("destroy");
    }

  //Slider Full-Img
    function s_slider_full_img(){
      jQuery(".s-slider-full-img").owlCarousel({
        loop: jQuery(".s-slider-full-img .item").length <= 1 ? false : true,
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false
      });
    }

  //Slider Infographic Cards
    function s_slider_infographic_cards(){
      jQuery(".s-slider-infographic-cards").owlCarousel({
        dots: true,
        margin: 15,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: false,
            items: 0,
            nav: false
          },
          540: {
            loop: jQuery(".cards4 .s-slider-infographic-cards .item").length <= 2 ? false : true,
            items: 2,
            nav: true
          },
          769: {
            loop: jQuery(".cards4 .s-slider-infographic-cards .item").length <= 3 ? false : true,
            items: 3,
            nav: true
          },
          1025: {
            loop: jQuery(".cards4 .s-slider-infographic-cards .item").length <= 4 ? false : true,
            items: 4,
            nav: true
          }
        }
      });
    }

  //Slider Infographic Grid2
    function s_slider_infographic_grid2(){
      jQuery(".s-slider-infographic-grid2").owlCarousel({
        margin: 15,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".s-slider-infographic-grid2 .item").length <= 1 ? false : true,
            items: 1,
            dots: true,
            nav: false
          },
          540: {
            loop: jQuery(".s-slider-infographic-grid2 .item").length <= 2 ? false : true,
            items: 2,
            dots: true,
            nav: true
          },
          769: {
            loop: false,
            items: 0,
            dots: false,
            nav: false
          },
          1025: {
            loop: false,
            items: 0,
            dots: false,
            nav: false
          }
        }
      });
    }

  //Slider Infographics gridTags
    function s_slider_grid_tags(){
      jQuery(".s-slider-grid-tags").owlCarousel({
        loop: jQuery(".s-slider-grid-tags .item").length <= 1 ? false : true,
        items: 1,
        margin: 15,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false
      });
    }

  //Slider Infographic ODS
    function s_slider_infographic_ods(){
      jQuery(".s-slider-infographic-ods").owlCarousel({
        margin: 10,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 7500,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-home2 .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-home2 .item").length <= 5 ? false : true,
            items: 5
          },
          769: {
            loop: jQuery(".s-slider-home2 .item").length <= 5 ? false : true,
            items: 5
          },
          1025: {
            loop: jQuery(".s-slider-home2 .item").length <= 6 ? false : true,
            items: 6
          }
        }
      });
    }

  //Slider Timeline
    //Slider Timeline Desktop
    var items_timeline_desktop=jQuery(".s-slider-timeline.desktop").html();
    var items_timeline_mobile=jQuery(".s-slider-timeline.mobile").html();

    function s_slider_timeline_desktop(){
      //Move items slider desktop
      jQuery(".s-slider-timeline.desktop").empty();
      jQuery(".s-slider-timeline.desktop").append(items_timeline_desktop);
      jQuery(".s-slider-timeline.mobile").owlCarousel("destroy");
      jQuery(".s-slider-timeline.mobile").empty();

      //owlCarousel
      jQuery(".s-slider-timeline.desktop").owlCarousel({
        items: 1,
        margin: 15,
        loop: false,
        dots: true,
        nav: true,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 35000,
        autoplayHoverPause: false,
        onInitialized: start_barProgress,
        onTranslate: reset_barProgress,
        onTranslated: start_barProgress,
        navText:[
          "<i class='demo-icon icon-icon-arrow-left'>&#xe80a;</i>",
          "<i class='demo-icon icon-icon-arrow-right'>&#xe80c;</i>",
        ]
      });

      //Add activeClass item:first-child
      jQuery(".s-slider-timeline .owl-item.active .items .item:first-child").addClass("active");

      //Interval add and remove activeClass
      timer = setInterval(function(e){
        jQuery(".s-slider-timeline .item.active").next().addClass("active");
        jQuery(".s-slider-timeline .item.active").prev().removeClass("active");
      }, 7000);

      //startBarProgress
      function start_barProgress(){
        var totalItems = jQuery(".slider-timeline .owl-item.active .items .item").length;
        var time = (totalItems - 1) * 7000;

        jQuery(".start-barProgress").css({
          width: "100%",
          transition: "width " + time +"ms linear"
        });
      }

      //resetBarProgress
      function reset_barProgress(){
        jQuery(".start-barProgress").css({
          width: "0",
          transition: "width 0s linear"
        });

        clearInterval(timer);
        //Interval add and remove activeClass
        timer = setInterval(function(e){
          jQuery(".s-slider-timeline .item.active").next().addClass("active");
          jQuery(".s-slider-timeline .item.active").prev().removeClass("active");
        }, 7000);
        setTimeout(function(e){
          //Add and remove activeClass
          jQuery(".s-slider-timeline .owl-item .items .item").removeClass("active");
          jQuery(".s-slider-timeline .owl-item.active .items .item:first-child").addClass("active");
        }, 100);
      }

      //click item
      jQuery(".s-slider-timeline .item").click(function(e){
        //Init Interval
        clearInterval(timer);
        //Interval add and remove activeClass
        timer = setInterval(function(e){
          jQuery(".s-slider-timeline .item.active").next().addClass("active");
          jQuery(".s-slider-timeline .item.active").prev().removeClass("active");
        }, 7000);


        var dataNumber = jQuery(this).data("number"); //click item data-number
        var totalItems=jQuery(".slider-timeline .owl-item.active .items .item").length;

        var time = (totalItems - dataNumber) * 7000; //time click item

        var porc = 100 / (totalItems - 1); //% barProgress
        var totalPorc = porc * (dataNumber - 1); //% total barProgress

        //startBarProgress %
        jQuery(".start-barProgress").css({
          width: totalPorc+"%",
          transition: "width 0ms linear"
        });
        setTimeout(function(e){
          //startBarProgress time
          jQuery(".start-barProgress").css({
            width: "100%",
            transition: "width " + time +"ms linear"
          });
        });

        //Add and remove activeClass
        jQuery(".s-slider-timeline .item").removeClass("active");
        jQuery(this).addClass("active");
      });
    }

    //Slider Timeline Mobile
    function s_slider_timeline_mobile(){
      //Move items slider mobile
      jQuery(".s-slider-timeline.desktop").owlCarousel("destroy");
      jQuery(".s-slider-timeline.desktop .items .item").each(function(i, item){
        jQuery(".s-slider-timeline.mobile").append(item);
      });
      jQuery(".s-slider-timeline.desktop").empty();

      //owlCarousel
      jQuery(".s-slider-timeline.mobile").owlCarousel({
        items: 1,
        margin: 15,
        loop: false,
        nav: false,
        dots: true,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: false,
        onInitialized: start_barProgress,
        onTranslate: reset_barProgress,
        onTranslated: start_barProgress
      });

      //startBarProgress
      function start_barProgress(){
        jQuery(".start-barProgress-left, .start-barProgress-right").css({
          width: "0",
          transition: "width 7100ms linear"
        });
      }
      //resetBarProgress
      function reset_barProgress(){
        jQuery(".start-barProgress-left, .start-barProgress-right").css({
          width: "50%",
          transition: "width 0s linear"
        });
      }

      //height and margin (auto)
      var autoHeight = jQuery(".s-slider-timeline.mobile");
      jQuery.each(autoHeight, function(i, item){
        var arreglo = [];
        var items = jQuery(item).find(".item .text");

        jQuery(items).each(function(i, item){
          arreglo.push(jQuery(item).innerHeight());
        });
        jQuery(".s-slider-timeline.mobile .item").css("margin-bottom", Math.max.apply(Math, arreglo)+25);
        jQuery(".s-slider-timeline.mobile .item .text").css("height", Math.max.apply(Math, arreglo));
      });
    }

  //Slider Home1
    function s_slider_home1(){
      jQuery(".s-slider-home1").owlCarousel({
        // loop: jQuery(".s-slider-home1 .item").length <= 1 ? false : true,
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: false,
        // autoplayTimeout: 7500,
        autoplayHoverPause: false
      });
      //DotsProgress
      setTimeout(function(e){
        // jQuery(".s-slider-home1 .owl-dot span").append("<div class='bar'></div>");
        jQuery(".s-slider-home1").on("changed.owl.carousel", function(e){
          jQuery(".s-slider-home1 .owl-dot.active").prevAll().addClass("complete");
          jQuery(".s-slider-home1 .owl-dot.active").nextAll().removeClass("complete");
        });
      }, 100);
    }

  //Slider Home2
    function s_slider_home2(){
      jQuery(".s-slider-home2").owlCarousel({
        nav: false,
        dots: true,
        slideBy: 3,
        dotsEach: 3,
        rewind: false,
        autoplay: true,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-home2 .item").length <= 1 ? false : true,
            items: 1,
            margin: 0,
            autoplayTimeout: 2500
          },
          540: {
            loop: jQuery(".s-slider-home2 .item").length <= 3 ? false : true,
            items: 3,
            margin: 10,
            autoplayTimeout: 7500
          },
          769: {
            loop: jQuery(".s-slider-home2 .item").length <= 3 ? false : true,
            items: 3,
            margin: 10,
            autoplayTimeout: 7500
          },
          1025: {
            loop: jQuery(".s-slider-home2 .item").length <= 3 ? false : true,
            items: 3,
            margin: 10,
            autoplayTimeout: 7500
          }
        }
      });
      //DotsProgress
      setTimeout(function(e){
        jQuery(".s-slider-home2 .owl-dot span").append("<div class='bar'></div>");
        if(jQuery(window).width() > 540){
          jQuery(".s-slider-home2 .owl-item.active:eq(1)").addClass("center");
        }
        jQuery(".s-slider-home2").on("changed.owl.carousel", function(e){
          jQuery(".s-slider-home2 .owl-dot.active").prevAll().addClass("complete");
          jQuery(".s-slider-home2 .owl-dot.active").nextAll().removeClass("complete");
          if(jQuery(window).width() > 540){
            setTimeout(function(e){
              jQuery(".s-slider-home2 .owl-item.active:eq(1)").addClass("center");
            }, 100);
          }
        });
      }, 100);
    }

  //Slider Horizontal
    function s_slider_horizontal(){
      jQuery(".s-slider-horizontal").on("initialized.owl.carousel changed.owl.carousel", function(e){
        var carousel = e.relatedTarget;
        jQuery(".s-slider-horizontal .counter-desktop").html("<span class='indexD'>" + (carousel.relative(carousel.current()) + 1) + "</span>" + " / " + "<span class='totalD'>" + carousel.items().length + "</span>");
      })
      .owlCarousel({
        loop: jQuery(".s-slider-horizontal article").length <= 1 ? false : true,
        items: 1,
        margin: 10,
        nav: true,
        dots: false,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ]
      });
      jQuery(".s-slider-horizontal .wrapper-info .bottom").append(jQuery(".s-slider-horizontal .owl-nav"));
    }

  //Slider Icons
    function s_slider_icons(){
      jQuery(".s-slider-icons").owlCarousel({
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-icons .items").length <= 1 ? false : true,
            items: 1,
            margin: 0
          },
          540: {
            loop: jQuery(".s-slider-icons .items").length <= 2 ? false : true,
            items: 2,
            margin: 25
          },
          769: {
            loop: false,
            items: 0,
            margin: 0
          },
          1025: {
            loop: false,
            items: 0,
            margin: 0
          }
        }
      });
    }

  //Slider imgSlider
    function s_slider_imgSlider(){
      jQuery(".s-slider-imgSlider").owlCarousel({
        loop: jQuery(".s-slider-imgSlider .item").length <= 1 ? false : true,
        items: 1,
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
      });
    }

  //Slider Indicator1
    function s_slider_indicator1(){
      jQuery(".s-slider-indicator1").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-indicator1 .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-indicator1 .item").length <= 2 ? false : true,
            items: 2
          },
          769: {
            loop: jQuery(".s-slider-indicator1 .item").length <= 3 ? false : true,
            items: 3
          },
          1025: {
            loop: jQuery(".s-slider-indicator1 .item").length <= 4 ? false : true,
            items: 4
          }
        }
      });
    }

  //Slider Indicator2
    function s_slider_indicator2(){
      jQuery(".s-slider-indicator2").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-indicator2 .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-indicator2 .item").length <= 2 ? false : true,
            items: 2
          },
          769: {
            loop: jQuery(".s-slider-indicator2 .item").length <= 3 ? false : true,
            items: 3
          },
          1025: {
            loop: jQuery(".s-slider-indicator2 .item").length <= 4 ? false : true,
            items: 4
          }
        }
      });
    }

  //Slider Indicator3
    function s_slider_indicator3(){
      jQuery(".s-slider-indicator3").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-indicator3 .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-indicator3 .item").length <= 2 ? false : true,
            items: 2
          },
          769: {
            loop: jQuery(".s-slider-indicator3 .item").length <= 2 ? false : true,
            items: 2
          },
          1025: {
            loop: jQuery(".s-slider-indicator3 .item").length <= 3 ? false : true,
            items: 3
          }
        }
      });
    }

  //Slider Know-us
    function s_slider_knowUs(){
      jQuery(".s-slider-knowUs").owlCarousel({
        nav: true,
        dots: false,
        margin: 20,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: false,
            items: 0
          },
          540: {
            loop: false,
            items: 0
          },
          769: {
            loop: jQuery(".s-slider-knowUs .item").length <= 6 ? false : true,
            items: 6
          },
          1025: {
            loop: jQuery(".s-slider-knowUs .item").length <= 6 ? false : true,
            items: 6
          }
        }
      });
    }

  //Slider Milks
    function s_slider_milks(){
      jQuery(".s-slider-milks").owlCarousel({
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            loop: jQuery(".s-slider-milks .item").length <= 1 ? false : true,
            items: 1,
            nav: false,
            dots: true
          },
          540: {
            loop: jQuery(".s-slider-milks .item").length <= 2 ? false : true,
            items: 2,
            nav: true,
            dots: false
          },
          769: {
            loop: jQuery(".s-slider-milks .item").length <= 2 ? false : true,
            items: 2,
            nav: true,
            dots: false
          },
          1025: {
            loop: jQuery(".s-slider-milks .item").length <= 4 ? false : true,
            items: 4,
            nav: true,
            dots: false
          }
        }
      });
    }

  //Slider Modules
    function s_slider_modules(){
      jQuery(".s-slider-modules").owlCarousel({
        loop: jQuery(".s-slider-modules .item").length <= 1 ? false : true,
        items: 1,
        nav: false,
        dots: true,
        margin: 20,
        dotData: true,
        dotsData: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        responsiveClass: true
      });
      //DotsProgress
      setTimeout(function(e){
        jQuery(".s-slider-modules .owl-dot button").append("<div class='bar'></div>");
        jQuery(".s-slider-modules").on("changed.owl.carousel", function(e){
          jQuery(".s-slider-modules .owl-dot.active").prevAll().addClass("complete");
          jQuery(".s-slider-modules .owl-dot.active").nextAll().removeClass("complete");
        });
      }, 100);
    }

  //Slider Moments1
    function s_slider_moments1(){
      jQuery(".s-slider-moments1").owlCarousel({
        loop: false,
        margin: 0,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            items: 2,
            nav: false,
            dots: true
          },
          540: {
            items: 4,
            nav: true,
            dots: false
          },
          769: {
            items: 5,
            nav: true,
            dots: false
          },
          1025: {
            items: 7,
            nav: true,
            dots: false
          }
        }
      });
    }

  //Slider Moments2
    function s_slider_moments2(){
      jQuery(".s-slider-moments2").owlCarousel({
        loop: false,
        margin: 0,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            items: 3,
            nav: false,
            dots: true
          },
          540: {
            items: 3,
            nav: true,
            dots: false
          },
          769: {
            items: 5,
            nav: true,
            dots: false
          },
          1025: {
            items: 7,
            nav: true,
            dots: false
          }
        }
      });
    }

  //Slider ODS
    function s_slider_ods(){
      jQuery(".s-slider-ods").owlCarousel({
        loop: false,
        margin: 10,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          540: {
            items: 2,
            nav: true,
            dots: false
          },
          769: {
            items: 3,
            nav: true,
            dots: false
          },
          1025: {
            items: 4,
            nav: true,
            dots: false
          }
        }
      });
      jQuery(".s-slider-ods .item").click(function(e){
        jQuery(".content-ods .item-ods").hide();
        jQuery(".s-slider-ods .item").removeClass("active");

        jQuery(this).addClass("active");
        jQuery(".content-ods .item-ods[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();
      });
    }

  //Slider Prehome
    function s_slider_prehome(){
      jQuery(".s-slider-prehome").owlCarousel({
        nav: false,
        dots: true,
        slideBy: 3,
        dotsEach: 2,
        rewind: false,
        autoplay: true,
        mouseDrag: false,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-prehome .item").length <= 1 ? false : true,
            items: 1,
            margin: 0,
            autoplayTimeout: 2000
          },
          540: {
            loop: jQuery(".s-slider-prehome .item").length <= 1 ? false : true,
            items: 1,
            margin: 0,
            autoplayTimeout: 6000
          },
          769: {
            loop: jQuery(".s-slider-prehome .item").length <= 2 ? false : true,
            items: 2,
            margin: 5,
            autoplayTimeout: 6000
          },
          1025: {
            loop: jQuery(".s-slider-prehome .item").length <= 2 ? false : true,
            items: 2,
            margin: 5,
            autoplayTimeout: 6000
          }
        }
      });
      //DotsProgress
      setTimeout(function(e){
        jQuery(".s-slider-prehome .owl-dot span").append("<div class='bar'></div>");
        jQuery(".s-slider-prehome").on("changed.owl.carousel", function(e){
          jQuery(".s-slider-prehome .owl-dot.active").prevAll().addClass("complete");
          jQuery(".s-slider-prehome .owl-dot.active").nextAll().removeClass("complete");
        });
      }, 100);
    }

  //Slider Percentage2
    function s_slider_percentage2(){
      jQuery(".s-slider-percentage2").owlCarousel({
        loop: jQuery(".s-slider-percentage2 .item").length <= 1 ? false : true,
        items: 1,
        nav: true,
        dots: true,
        margin: 10,
        center: true,
        dotsEach: 2,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ]
      });
    }

  //Slider Pricing1
    function s_slider_pricing1(){
      jQuery(".s-slider-pricing1").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-pricing1 .item").length <= 1 ? false : true,
            items: 1,
            center: false
          },
          540: {
            loop: jQuery(".s-slider-pricing1 .item").length <= 2 ? false : true,
            items: 2,
            center: false
          },
          769: {
            loop: jQuery(".s-slider-pricing1 .item").length <= 3 ? false : true,
            items: 3,
            center: false
          },
          1025: {
            loop: jQuery(".s-slider-pricing1 .item").length <= 3 ? false : true,
            items: 3,
            center: true,
          }
        }
      });
    }

  //Slider Pricing2
    function s_slider_pricing2(){
      jQuery(".s-slider-pricing2").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-pricing2 .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-pricing2 .item").length <= 2 ? false : true,
            items: 2
          },
          769: {
            loop: jQuery(".s-slider-pricing2 .item").length <= 2 ? false : true,
            items: 2
          },
          1025: {
            loop: jQuery(".s-slider-pricing2 .item").length <= 3 ? false : true,
            items: 3
          }
        }
      });
    }

  //Slider Products
    //hasClass Active
    if(jQuery(".s-slider-products1 .item").hasClass("active")){
      //Clone infoMobile
      jQuery(".info-mobile-products .info").remove();
      jQuery(".s-slider-products1 .item.active").find(".info").clone().appendTo(".info-mobile-products");

      //btn-buy-product
      jQuery(".btn-buy-product").css("pointer-events", "none");
    }
    //Click item slider-products1
    jQuery(".s-slider-products1 .item").click(function(e){
      var json_info=jQuery(this).data("json");

      //Add Active
      jQuery(".s-slider-products1 .item").removeClass("active");
      jQuery(this).addClass("active");

      if(json_info.length != 0){
        jQuery(".slider-products .c-filters .empty").css("display", "none");

        //Clone infoMobile
        jQuery(".info-mobile-products .info").remove();
        jQuery(this).find(".info").clone().appendTo(".info-mobile-products");

        //Add itemsSlider "products2"
        jQuery(".s-slider-products2").owlCarousel("destroy");
        jQuery(".s-slider-products2").empty();
        jQuery.each(jQuery(this).data("json"), function(i, item){
          jQuery(".s-slider-products2").append("<div class='item' data-url='" + item.link + "'><picture><img src='" + item.img + "' alt='" + item.alt + "' title='" + item.title + "'></picture><i class='demo-icon icon-icon-check1'>&#xe820;</i></div>");
        });
        s_slider_products2();
      }
      else{
        jQuery(".s-slider-products2").owlCarousel("destroy");
        jQuery(".slider-products .c-filters .empty").fadeIn();
      }
    });
    function s_slider_products1(){
      jQuery(".s-slider-products1").owlCarousel({
        loop: false,
        margin: 20,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-arrow-left'>&#xe80a;</i>",
          "<i class='demo-icon icon-icon-arrow-right'>&#xe80c;</i>",
        ],
        responsive:{
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          540: {
            items: 4,
            nav: true,
            dots: false
          },
          769: {
            items: 5,
            nav: true,
            dots: false
          },
          1025: {
            items: 5,
            nav: true,
            dots: false
          }
        }
      });
    }
    function s_slider_products2(){
      jQuery(".s-slider-products2").owlCarousel({
        loop: false,
        margin: 10,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-arrow-left'>&#xe80a;</i>",
          "<i class='demo-icon icon-icon-arrow-right'>&#xe80c;</i>",
        ],
        responsive:{
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          540: {
            items: 3,
            nav: true,
            dots: true
          },
          769: {
            items: 3,
            nav: true,
            dots: true
          },
          1025: {
            items: 4,
            nav: true,
            dots: true
          }
        }
      });
      //Click item slider-products2
      jQuery(".s-slider-products2 .item").click(function(e){
        //Add Active
        jQuery(".s-slider-products2 .item").removeClass("active");
        jQuery(this).addClass("active");

        //Url btn-buy-product
        jQuery(".btn-buy-product").attr("href", jQuery(this).data("url"));
        jQuery(".btn-buy-product").css("pointer-events", "visible");
      });
    }

  //Slider Products Arequipe
    jQuery(".s-slider-arequipe .item").click(function(e){
      jQuery(".c-nutrition-info .div-info-table").hide();
      jQuery(".s-slider-arequipe .item").removeClass("active");
      jQuery(this).addClass("active");

      jQuery(".c-nutrition-info .div-info-table[data-id='" + jQuery(this).data("id") + "']").css("display", "flex").hide().fadeIn();
    });
    function s_slider_arequipe(){
      jQuery(".s-slider-arequipe").owlCarousel({
        loop: false,
        nav: false,
        dots: false,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
          0: {
            items: 3,
            margin: 20,
            stagePadding: 37.5
          },
          540: {
            items: 6,
            margin: 0,
            stagePadding: 0
          },
          769: {
            items: 7,
            margin: 0,
            stagePadding: 0
          },
          1025: {
            items: 0,
            margin: 0,
            stagePadding: 0
          }
        }
      });
    }

  //Slider Recipe Description
    function s_recipe_description(){
      var nav=false;
      if(jQuery(".recipe-description .content-description").hasClass("center")){ nav=true; }else{ nav=false; }

      jQuery(".s-recipe-description").owlCarousel({
        loop: jQuery(".s-recipe-description .item").length <= 1 ? false : true,
        items: 1,
        dots: true,
        margin: 0,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText:[
          "<i class='demo-icon icon-icon-slider-left'>&#xe81a;</i>",
          "<i class='demo-icon icon-icon-slider-right'>&#xe81b;</i>",
        ],
        responsive:{
          0: {
            nav: false
          },
          540: {
            nav: nav
          },
          769: {
            nav: nav
          },
          1025: {
            nav: nav
          }
        }
      });
    }

  //Slider Recipe Ingredients
    function s_recipe_ingredients(){
      jQuery(".s-recipe-ingredients").owlCarousel({
        loop: jQuery(".s-recipe-ingredients .item").length <= 1 ? false : true,
        items: 1,
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
      });
    }

  //Slider Related Recipes
    function s_related_recipes(){
      jQuery(".s-related-recipes").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-related-recipes article").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-related-recipes article").length <= 1 ? false : true,
            items: 1
          },
          769: {
            loop: false,
            items: 0
          },
          1025: {
            loop: false,
            items: 0
          }
        }
      });
    }

  //Slider Register
    function s_slider_register(){
      jQuery(".s-slider-register").owlCarousel({
        loop: jQuery(".s-slider-register .item").length <= 1 ? false : true,
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false
      });
      //DotsProgress
      setTimeout(function(e){
        jQuery(".s-slider-register .owl-dot span").append("<div class='bar'></div>");
        jQuery(".s-slider-register").on("changed.owl.carousel", function(e){
          jQuery(".s-slider-register .owl-dot.active").prevAll().addClass("complete");
          jQuery(".s-slider-register .owl-dot.active").nextAll().removeClass("complete");
        });
      }, 100);
    }

  //Slider Releases
    function s_slider_releases(){
      jQuery(".s-slider-releases").owlCarousel({
        nav: false,
        dots: true,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-slider-releases .item").length <= 1 ? false : true,
            items: 1
          },
          540: {
            loop: jQuery(".s-slider-releases .item").length <= 1 ? false : true,
            items: 1
          },
          769: {
            loop: jQuery(".s-slider-releases .item").length <= 2 ? false : true,
            items: 2
          },
          1025: {
            loop: jQuery(".s-slider-releases .item").length <= 1 ? false : true,
            items: 1
          }
        }
      });
    }

  //Slider Scroll
    function s_slider_scroll(){
      jQuery(".s-slider-scroll").on("initialized.owl.carousel changed.owl.carousel", function(e){
          var carousel = e.relatedTarget;
          jQuery(".s-slider-scroll .counter-mobile").html("<span class='indexM'>" + (carousel.relative(carousel.current()) + 1) + "</span>" + " / " + "<span class='totalM'>" + carousel.items().length + "</span>");
        })
        .owlCarousel({
          nav: false,
          dots: true,
          margin: 10,
          rewind: false,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          responsiveClass: true,
          responsive:{
            0: {
              loop: jQuery(".s-slider-scroll article").length <= 1 ? false : true,
              items: 1
            },
            540: {
              loop: jQuery(".s-slider-scroll article").length <= 2 ? false : true,
              items: 2
            },
            769: {
              loop: jQuery(".s-slider-scroll article").length <= 2 ? false : true,
              items: 2
            },
            1025: {
              loop: false,
              items: 0
            }
          }
        });
    }

  //Slider Sustainability-ancles
    function s_slider_sust_ancles(){
      jQuery(".s-slider-sust-ancles").owlCarousel({
        loop: false,
        margin: 0,
        rewind: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        navText:[
          "<i class='demo-icon icon-icon-arrow-left'>&#xe80a;</i>",
          "<i class='demo-icon icon-icon-arrow-right'>&#xe80c;</i>",
        ],
        responsive:{
          0: {
            items: 1,
            nav: false,
            dots: true
          },
          540: {
            items: 3,
            nav: true,
            dots: false
          },
          769: {
            items: 4,
            nav: true,
            dots: false
          },
          1025: {
            items: 4,
            nav: true,
            dots: false
          }
        }
      });
      jQuery(".s-slider-sust-ancles .item").click(function(e){
        jQuery(".s-slider-sust-ancles .item").removeClass("active");
        jQuery(this).addClass("active");
      });
    }

  //Sustaibability Grid
    function s_sustainability_grid(){
      jQuery(".s-sustainability-grid1").owlCarousel({
        nav: false,
        margin: 10,
        rewind: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive:{
          0: {
            loop: jQuery(".s-sustainability-grid1 article").length <= 1 ? false : true,
            items: 1,
            dots: true
          },
          540: {
            loop: jQuery(".s-sustainability-grid1 article").length <= 2 ? false : true,
            items: 2,
            dots: true
          },
          769: {
            loop: jQuery(".s-sustainability-grid1 article").length <= 2 ? false : true,
            items: 2,
            dots: true
          },
          1025: {
            loop: false,
            items: 0,
            dots: false
          }
        }
      });
    }

  //AutoHeight
  function autoHeight(){
    //autoHeight
    var autoHeight = jQuery("section, header");
    jQuery.each(autoHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".autoHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });

    //labelHeight
    var labelHeight = jQuery("section");
    jQuery.each(labelHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".two-columns.strong-label label");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });

    //titleHeight
    var titleHeight = jQuery("section");
    jQuery.each(titleHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".titleHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });

    //textHeight
    var textHeight = jQuery("section");
    jQuery.each(textHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".textHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });

    //tableHeight
    var tableHeight = jQuery("section");
    jQuery.each(tableHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".tableHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });
  }

  //Call Functions
  s_recipe_description();
  s_recipe_ingredients();
  s_slider_axes();
  s_slider_cards_default();
  s_slider_cards_news3();
  s_slider_cards_news4();
  s_slider_cards_nutrition();
  s_slider_cards_pillars();
  s_slider_cards_products();
  s_slider_cards_programs();
  s_slider_cards_realities();
  s_slider_cards_recipes();
  s_slider_cards_related();
  s_slider_cards_sustainability1();
  s_slider_cards_sustainability2();
  s_slider_cards_sustainability3();
  s_slider_cards_tips();
  s_slider_cards_tom();
  s_slider_cards_valued();
  s_slider_full_img();
  s_slider_home1();
  s_slider_home2();
  s_slider_horizontal();
  s_slider_indicator1();
  s_slider_indicator2();
  s_slider_indicator3();
  s_slider_infographic_ods();
  s_slider_milks();
  s_slider_modules();
  s_slider_moments1();
  s_slider_moments2();
  s_slider_ods();
  s_slider_percentage2();
  s_slider_prehome();
  s_slider_pricing1();
  s_slider_pricing2();
  s_slider_products2();
  s_slider_register();
  s_slider_releases();
  s_slider_sust_ancles();

  //540
  if(jQuery(window).width() > 540){
    s_slider_products1();
    s_slider_infographic_cards();
    jQuery(".s-slider-grid-tags").owlCarousel("destroy");
    jQuery(".c-slider-products").removeClass("no-slider-products");
  }
  else{
    s_slider_imgSlider();
    s_slider_grid_tags();

    jQuery(".s-slider-products1").owlCarousel("destroy");
    jQuery(".s-slider-infographic-cards").owlCarousel("destroy");
    jQuery(".c-slider-products").addClass("no-slider-products");
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 540){
      s_slider_products1();
      s_slider_infographic_cards();
      jQuery(".s-slider-grid-tags").owlCarousel("destroy");
      jQuery(".c-slider-products").removeClass("no-slider-products");
    }
    else{
      s_slider_imgSlider();
      s_slider_grid_tags();
      jQuery(".s-slider-products1").owlCarousel("destroy");
      jQuery(".s-slider-infographic-cards").owlCarousel("destroy");
      jQuery(".c-slider-products").addClass("no-slider-products");
    }
  });

  //768
  if(jQuery(window).width() > 768){
    s_slider_timeline_desktop();
    jQuery(".s-slider-icons").owlCarousel("destroy");
    jQuery(".s-related-recipes").owlCarousel("destroy");
    jQuery(".s-slider-infographic-grid2").owlCarousel("destroy");
  }
  else{
    s_slider_icons();
    s_related_recipes();
    s_slider_timeline_mobile();
    s_slider_infographic_grid2();
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 768){
      s_slider_timeline_desktop();
      jQuery(".s-slider-icons").owlCarousel("destroy");
      jQuery(".s-related-recipes").owlCarousel("destroy");
      jQuery(".s-slider-infographic-grid2").owlCarousel("destroy");
    }
    else{
      s_slider_icons();
      s_related_recipes();
      s_slider_timeline_mobile();
      s_slider_infographic_grid2();
    }
  });

  //1024
  if(jQuery(window).width() > 1024){
    s_slider_knowUs();

    jQuery(".s-slider-scroll").owlCarousel("destroy");
    jQuery(".s-slider-anchors2").owlCarousel("destroy");
    jQuery(".s-slider-arequipe").owlCarousel("destroy");
    jQuery(".s-sustainability-grid1").owlCarousel("destroy");
  }
  else{
    s_slider_scroll();
    s_slider_anchors2();
    s_slider_arequipe();
    s_sustainability_grid();
    jQuery(".s-slider-knowUs").owlCarousel("destroy");
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 1024){
      s_slider_knowUs();
      jQuery(".s-slider-scroll").owlCarousel("destroy");
      jQuery(".s-slider-anchors2").owlCarousel("destroy");
      jQuery(".s-slider-arequipe").owlCarousel("destroy");
      jQuery(".s-sustainability-grid1").owlCarousel("destroy");
    }
    else{
      s_slider_scroll();
      s_slider_anchors2();
      s_slider_arequipe();
      s_sustainability_grid();
      jQuery(".s-slider-knowUs").owlCarousel("destroy");
    }
  });
  autoHeight();
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
