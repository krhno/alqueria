/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Document Ready
jQuery(document).ready(function(e){
  //handle chat bottom
  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
      jQuery("iframe#launcher").css('bottom', '55px');
    } else {
      jQuery("iframe#launcher").css('bottom', '0');
    }
  });

  //ajaxComplete
  jQuery(document).ajaxComplete(function(e){
    jQuery("select").not("#tc-recipes, #ip-recipes").niceSelect();
    jQuery("[data-toggle='tooltip']").tooltip();

    //modalTips
    if(jQuery(".modal-tips").length == 1){
      jQuery(".click-modal-tips").click(function(e){
        jQuery(".modal-tips .c-modal-tips").remove();
        jQuery(this).closest("article").find(".c-modal-tips").clone().appendTo(".modal-tips-body");
        jQuery(".modal-tips-body .c-modal-tips").removeClass("hidden");
        jQuery(".modal-tips").modal("show");
      });
    }

    //Forms Recipe
    if(jQuery(".recipe-form").closest("form").hasClass("node-receta-form")){
      jQuery(".preparation-steps details").attr("open", "open");
      jQuery(".images-description details").attr("open", "open");
    }
    if(jQuery(".modal-delete-account1").length == 1){
      deleteAccount();
    }
  });

  //deleteAccount();
  var container = document.querySelector(".profile-title");
  if(container){
    const deleteAccountBtn = container.querySelector(".btn-link");
    deleteAccountBtn.addEventListener("click", function(e){
      deleteAccount();
    });
  }

  //Anchor General
  jQuery(".btn-anchor").click(function(e){
    e.preventDefault();
    var strAncla = jQuery(this).attr("href");
    jQuery("body, html").stop().animate({
      scrollTop: jQuery(strAncla).offset().top - 120,
    }, 1000);
  });
  //Anchor Footer
  jQuery(".btn-scroll-top").click(function(e){
    e.preventDefault();
    jQuery("body, html").animate({
      scrollTop: "0",
    }, 1000);
  });
  //Btn ModalSearch
  jQuery(".nav-desktop .btn-search").click(function(e){
    jQuery(".nav-desktop .btn-search .search").css("display", "none");
    jQuery(".nav-desktop .btn-search .close").css("display", "block");
  });
  jQuery(".modal-search").on("hidden.bs.modal", function(e){
    jQuery(".nav-desktop .btn-search .close").css("display", "none");
    jQuery(".nav-desktop .btn-search .search").css("display", "block");
  });

  //Accordion Arrow
  jQuery(".icon-icon-arrow").click(function(e){
    if(jQuery(this).hasClass("rotate-180")){
      jQuery(this).removeClass("rotate-180");
    }
    else{
      jQuery(".icon-icon-arrow").removeClass("rotate-180");
      jQuery(this).addClass("rotate-180");
    }
  });
  //Accordion FooterDesktop
  function accordionDesktop(){
    jQuery(".main-footer a.icon-icon-arrow").removeAttr("data-toggle");
    jQuery(".main-footer .accordion").removeClass("panel-collapse collapse");
  }
  //Accordion FooterMobile
  function accordionMobile(){
    jQuery(".main-footer a.icon-icon-arrow").attr("data-toggle", "collapse");
    jQuery(".main-footer .accordion").addClass("panel-collapse collapse");
  }

  //Header Animation
  function headerAnimation(){
    //Header Home
    if(jQuery(".page-view-frontpage").length == 1){
      if(jQuery(window).scrollTop() > 0){
        jQuery(".container-header").addClass("header-animation");
      }
      else{
        jQuery(".container-header").removeClass("header-animation");
      }
    }
    //Header Internal
    else{
      if(jQuery(window).scrollTop() > 0){
        jQuery(".container-header").css("position", "fixed");
      }
      else{
        jQuery(".container-header").css("position", "relative");
      }
    }
  }
  headerAnimation();
  jQuery(window).on("scroll", function(e){
    headerAnimation();
  });

  //Active Preferences - Register
  function active_preferences(){
    jQuery(".preferences .form-check input").on("click", function(e){
      if(jQuery(this).is(":checked")){
        jQuery(this).closest(".item").addClass("active");
      }
      else{
        jQuery(this).closest(".item").removeClass("active");
      }
    });
  }

  //Active Item - Profile
  function active_profile(){
    //Content column-right
    jQuery(".profile .item-dataid").click(function(e){
      jQuery("body").removeClass("backdrop");
      jQuery("#profile-menu.collapse").collapse("hide");

      jQuery(".profile .column-right .div-content").hide();
      jQuery(".profile .item-dataid").removeClass("active");
      jQuery(this).addClass("active");

      jQuery(".profile .column-right .div-content .full-list article").css("display", "flex")
      jQuery(".profile .column-right .div-content[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();

      //Select Favorites
      //empty option
      if(jQuery(".profile .column-right .div-content .full-list article.recipes").length == 0){
        jQuery(".profile .column-right .div-content .filters .nice-select .list .option[data-value='receta'").css("display", "none");
      }
      if(jQuery(".profile .column-right .div-content .full-list article.nutrition").length == 0){
        jQuery(".profile .column-right .div-content .filters .nice-select .list .option[data-value='blog_nutricion'").css("display", "none");
      }

      //Height NiceSelect
      jQuery("select").each(function (i, item){
        var heigh = jQuery(item).parent().find(".nice-select .list").height();
        if (heigh < 250) {
          jQuery(item).parent().find(".nice-select .list").css("height", "auto");
          jQuery(item).parent().find(".nice-select .list").css("overflow-y", "hidden");
        }
        else{
          jQuery(item).parent().find(".nice-select .list").css("height", 250);
          jQuery(item).parent().find(".nice-select .list").css("overflow-y", "scroll");
        }
      });
    });

    //Select Favorites
    //Content column-right
    if(jQuery(".profile .column-right .div-content .full-list article").length == 0){
      jQuery(".profile .column-right .div-content .filters").css("display", "none");
    }
    else{
      jQuery(".profile .column-right .div-content .filters").css("display", "flex");

      jQuery("#favorite-select").change(function(e){
        var option = jQuery("#favorite-select option:selected").val();
        if(option == "all"){
          jQuery(".profile .column-right .div-content .full-list article").hide();
          jQuery(".profile .column-right .div-content .full-list article").css("display", "flex").hide().fadeIn();
        }
        else{
          jQuery(".profile .column-right .div-content .full-list article").hide();
          jQuery(".profile .column-right .div-content .full-list article[favorite-type='" + option + "']").css("display", "flex").hide().fadeIn();
        }
      });
    }
  }

  //top-right profileMenu
  function profileMenu_right(){
    jQuery("header .btn-user.dropdown").click(function(e){
      if(jQuery("body").hasClass("backdrop")){
        jQuery("body").removeClass("backdrop");
      }
      else{
        jQuery("body").addClass("backdrop");
      }

      if(jQuery(window).width() <= 768){
        jQuery("#profile-menu").css("right", 0);
        var width_window = jQuery("body, html").width();
        var left_elem = jQuery("header .btn-user.dropdown").offset().left;
        var width_elem = jQuery("header .btn-user.dropdown").outerWidth();
        var headerHeight = jQuery("header .container-header").outerHeight();

        var total_right = left_elem + width_elem - width_window;
        jQuery("#profile-menu").css("right", total_right);
        jQuery("#profile-menu").css("top", headerHeight - 18);
      }
    });
  }

  //Active Infographics Tags - Desktop
  function infographic_tags_desktop(){
    jQuery(".infographic-tags ul.tags li").click(function(e){
      jQuery(".infographic-tags ul.tags li").removeClass("active");
      jQuery(this).addClass("active");

      jQuery(".infographic-tags .div-content .item-tags .panel-collapse").hide();
      jQuery(".infographic-tags .div-content .item-tags .panel-collapse[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();
    });
  }
  //Active Infographics Tags - Mobile
  function infographic_tags_mobile(){
    jQuery(".infographic-tags .div-content .item-tags .title").click(function(e){
      //Height text
      setTimeout(function(e){
        var textHeight = jQuery(".grid-tags");
        jQuery.each(textHeight, function(i, item){
          var arreglo = [];
          var items = jQuery(item).find(".item");

          jQuery(items).each(function(i, item){
            arreglo.push(jQuery(item).innerHeight());
          });
          jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
        });
      });
    });
  }

  //Forms Recipe
  if(jQuery(".recipe-form").closest("form").hasClass("node-receta-form")){
    jQuery(".recipe-form .accordion .item:first-child .panel-collapse").collapse("show");

    jQuery(".preparation-steps details").attr("open", "open");
    jQuery(".images-description details").attr("open", "open");
  }

  //Iframe Autoplay
  function iframe_play(){
    jQuery(".if-img-video .icon-play").click(function(e){
      var src = jQuery(this).closest(".if-img-video").find(".video-banner").data("src");

      jQuery(".if-img-video .banner").removeClass("play");
      jQuery(".if-img-video .iframe-yt").attr("src", "");

      jQuery(this).closest(".if-img-video").find(".banner").addClass("play");
      jQuery(this).closest(".if-img-video").find(".iframe-yt").attr("src", src + "?autoplay=1");
    });
  }

  //hover_recipe_banner
  function hover_recipe_banner(){
    jQuery(".recipe-banner .video-banner iframe").hover(
      function(e){
        jQuery(".recipe-banner .info-person .img").css("width", "50px");
      },
      function(e){
        jQuery(".recipe-banner .info-person .img").css("width", "8%");
      }
    );
  }
  //hover_corporate_banner
  function hover_corporate_banner(){
    jQuery(".corporate-banner .video-banner iframe").hover(
      function(e){
        jQuery(".corporate-banner .text").css("margin-top", "0");
      },
      function(e){
        if(jQuery(window).width() > 768){
          jQuery(".corporate-banner .text").css("margin-top", "-50px");
        }
        else{
          jQuery(".corporate-banner .text").css("margin-top", "-25px");
        }
      }
    );
  }
  //border_editorial_banner
  function border_editorial_banner(){
    if(jQuery(".editorial-banner .calification").length != 1){
      jQuery(".editorial-banner .info-calification .p-mobile").css("border-top", "1px solid #d9d9d9");
    }
  }

  //loadMore FQA
  function load_more_fqa(){
    if(jQuery(".load-more-faq").length == 1){
      jQuery(".item-faq:gt(9)").addClass("hidden");

      var items = jQuery(".item-faq").length;
      var shown = jQuery(".item-faq").length + 5;
      jQuery(".load-more-faq").on("click", function(e){
        if(shown < items){
          jQuery(".item-faq:lt(" + shown + ")").removeClass("hidden");
        }
        else{
          jQuery(".item-faq:lt(" + items + ")").removeClass("hidden");
          jQuery(".load-more-faq").addClass("hidden");
        }
      });
    }
  }
  //loadMore Offices
  function load_more_office(){
    if(jQuery(".load-more-office").length == 1){
      jQuery(".item-office:gt(8)").addClass("hidden");

      var items = jQuery(".item-office").length;
      var shown = jQuery(".item-office").length + 5;
      jQuery(".load-more-office").on("click", function(e){
        if(shown < items){
          jQuery(".item-office:lt(" + shown + ")").removeClass("hidden");
        }
        else{
          jQuery(".item-office:lt(" + items + ")").removeClass("hidden");
          jQuery(".load-more-office").addClass("hidden");
        }
      });
    }
  }
  //loadMore Product FQA
  function load_more_product_faq(){
    if(jQuery(".load-more-product-faq").length == 1){
      jQuery(".product-faq:gt(4)").addClass("hidden");

      var items = jQuery(".product-faq").length;
      var shown = jQuery(".product-faq").length + 5;
      jQuery(".load-more-product-faq").on("click", function(e){
        if(shown < items){
          jQuery(".product-faq:lt(" + shown + ")").removeClass("hidden");
        }
        else{
          jQuery(".product-faq:lt(" + items + ")").removeClass("hidden");
          jQuery(".load-more-product-faq").addClass("hidden");
        }
      });
    }
  }
  //loadMore Reports
  function load_more_report(){
    if(jQuery(".load-more-report").length == 1){
      jQuery(".item-report:gt(7)").addClass("hidden");

      var items = jQuery(".item-report").length;
      var shown = jQuery(".item-report").length + 8;
      jQuery(".load-more-report").on("click", function(e){
        if(shown < items){
          jQuery(".item-report:lt(" + shown + ")").removeClass("hidden");
        }
        else{
          jQuery(".item-report:lt(" + items + ")").removeClass("hidden");
          jQuery(".load-more-report").addClass("hidden");
        }
      });
    }
  }
  //loadMore Terms
  function load_more_term(){
    if(jQuery(".load-more-term").length == 1){
      jQuery(".item-term:gt(7)").addClass("hidden");

      var items = jQuery(".item-term").length;
      var shown = jQuery(".item-term").length + 8;
      jQuery(".load-more-term").on("click", function(e){
        if(shown < items){
          jQuery(".item-term:lt(" + shown + ")").removeClass("hidden");
        }
        else{
          jQuery(".item-term:lt(" + items + ")").removeClass("hidden");
          jQuery(".load-more-term").addClass("hidden");
        }
      });
    }
  }
  //readMore
  function readMore(){
    jQuery(".btn-more-list").click(function(e){
      jQuery(".more-list").slideToggle();
      if(jQuery(this).text() == "Leer más"){
        jQuery(this).text("Leer menos");
      }
      else{
        jQuery(this).text("Leer más");
      }
    });
  }

  //Modal deleteAccount
  var firstModal = document.getElementById("modal-delete-account1");
  function deleteAccount(){
    var continueBtn = firstModal.querySelector(".webform-button--submit");
    var form = firstModal.querySelector(".checkboxes--wrapper");
    continueBtn.addEventListener("click", function(e){
      var isChecked = false;
      //itera por todos los inputs del form y valida si hay alguno seleccionado
      for(let i = 0; i < form.elements.length; i++){
        var newItem = form.elements.item(i);
        if(newItem.checked){
          isChecked = true;
          firstModal.classList.add("delete-account2");
        }
        else{
          isChecked = false;
        }
      }
      if(isChecked){
        firstModal.classList.add("delete-account2");
      }
    });
  }
  jQuery(".modal-delete-account1").on("hidden.bs.modal", function(e){
    jQuery(".modal-delete-account1 form .alert-success").css("display", "none");
    jQuery(".modal-delete-account1 form .alert-danger").css("display", "none");
    firstModal.classList.remove("delete-account2");
  });

  //niceScroll Arequipe
  function niceScroll_arequipe(){
    var height_info_table = jQuery(".nutrition-info .div-info-table").outerHeight();
    var height_slider_arequipe = jQuery(".nutrition-info .s-slider-arequipe").outerHeight();
    if(height_slider_arequipe > height_info_table){
      jQuery(".nutrition-info .s-slider-arequipe").css("overflow-y", "scroll");
      jQuery(".nutrition-info .s-slider-arequipe").outerHeight(height_info_table);
    }
  }

  //Others
  jQuery(".full-text .containerGridp").eq(0).css("padding-top", "40px");
  if(window.location.pathname.indexOf("planeta-larga-vida") == 1){
    jQuery("ul.breadcrumbb").css("padding-bottom", "20px");
  }

  //sidebar_recipePreparation
  function sidebar_recipePreparation(){
    var sidebarHeight=jQuery(".recipe-preparation .sidebar").outerHeight();
    var contentSidebarHeight=jQuery(".recipe-preparation .content-sidebar").outerHeight();

    if(sidebarHeight > contentSidebarHeight){
      jQuery(".recipe-preparation .sidebar .s-related-recipes").addClass("overflow");
      jQuery(".recipe-preparation .sidebar .s-related-recipes").css("height", contentSidebarHeight);
    }
    if(contentSidebarHeight > sidebarHeight){
      jQuery(".recipe-preparation .content-sidebar").addClass("overflow");
      jQuery(".recipe-preparation .content-sidebar").css("height", sidebarHeight);
    }
  }

  //timeline_anchor
  function timeline_anchor(){
    jQuery(".steps-anchor .anchor").click(function(e){
      var link = jQuery(this);
      var anchor = link.attr("href");
      var header = jQuery("header .container-header").outerHeight();

      if(!jQuery(this).hasClass("active")){
        jQuery("a.anchor").removeClass("active");
        jQuery(this).addClass("active");
      }

      jQuery("html, body").animate({
        scrollTop: jQuery(anchor).offset().top - header
      }, 1000);
      return false;
    });
  }

  /*Download PDF*/
  function GetUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for(var i = 0; i < sURLVariables.length; i++){
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }
  if(window.location.pathname.indexOf('gracias-formato-declaracion-proveedor') == 1){
    var id = GetUrlParameter('i');
    var url = window.location.origin;
    window.location.href = url + "/cdi_pdf/pdf_download/formato2/" + id;
  }
  else if(window.location.pathname.indexOf('gracias-formato-declaracion-colaboradores') == 1){
    var id = GetUrlParameter('i');
    var url = window.location.origin;
    window.location.href = url + "/cdi_pdf/pdf_download/formato1/" + id;

  }

  //Call Functions
  active_preferences();
  active_profile();
  hover_corporate_banner();
  hover_recipe_banner();
  iframe_play();
  load_more_fqa();
  load_more_office();
  load_more_product_faq();
  load_more_report();
  load_more_term();
  profileMenu_right();
  readMore();
  timeline_anchor();

  //540
  if(jQuery(window).width() > 540){
    infographic_tags_desktop();
  }
  else{
    border_editorial_banner();
    infographic_tags_mobile();
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 540){
      infographic_tags_desktop();
    }
    else{
      border_editorial_banner();
      infographic_tags_mobile();
    }
  });

  //768
  if(jQuery(window).width() > 768){
    sidebar_recipePreparation();
  }
  else{

  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 768){
      sidebar_recipePreparation();
    }
    else{

    }
  });

  //1024
  if(jQuery(window).width() > 1024){
    accordionDesktop();
    niceScroll_arequipe();
  }
  else{
    accordionMobile();
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 1024){
      accordionDesktop();
      niceScroll_arequipe();
    }
    else{
      accordionMobile();
    }
  });
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Window onLoad
jQuery(window).on("load", function(e){
  jQuery("select").not("#tc-recipes, #ip-recipes").niceSelect();
  jQuery("[data-toggle='tooltip']").tooltip();

  //Height NiceSelect
  function height_niceSelect(){
    jQuery("select").each(function (i, item){
      var heigh = jQuery(item).parent().find(".nice-select .list").height();
      if (heigh < 250) {
        jQuery(item).parent().find(".nice-select .list").css("height", "auto");
        jQuery(item).parent().find(".nice-select .list").css("overflow-y", "hidden");
      }
      else{
        jQuery(item).parent().find(".nice-select .list").css("height", 250);
        jQuery(item).parent().find(".nice-select .list").css("overflow-y", "scroll");
      }
    });
  }

  //Infographics - AOS
  function infographics_aos(){
    if(jQuery(".infographics").length >= 1){
      if(jQuery(window).width() > 992){
        setTimeout(function(e){
          AOS.init({
            offset: 200,
          });
        }, 1000);
      }
      if(jQuery(window).width() < 992){
        AOS.init({
          offset: 300,
        });
      }
    }
  }

  //Megamenú Desktop
  function megamenu_desktop(){
    //mouseover itemsMenú
    jQuery(".nav-desktop .general-menu .item-menu").mouseenter(function(e){
      //show Megamenu
      jQuery(this).find(".megamenu-desktop").css("display", "flex").hide().fadeIn();

      //addClass Active
      jQuery(this).find(".a-item-menu").addClass("active");

      //displayBlock (first-child) - contentRight
      jQuery(".megamenu-desktop .content-right:first-child").css("display", "block");

      //displayBlock (first-child) - collapse2
      jQuery(".megamenu-desktop .collapse1 .item-collapse1:first-child .collapse2").addClass("show");

      //AddClass Active (first-child) - collapse1
      jQuery(".megamenu-desktop .collapse1 .item-collapse1:first-child .a-item-collapse1").addClass("active");

      //add Backdrop
      jQuery("body").addClass("backdrop");

      setTimeout(function(e){
        //textHeight
        var textHeight = jQuery(".megamenu-desktop");
        jQuery.each(textHeight, function(i, item){
          var arreglo = [];
          var items = jQuery(item).find(".textHeight").not(".content-tips .textHeight");

          jQuery(items).each(function(i, item){
            arreglo.push(jQuery(item).innerHeight());
          });

          var finalHeight = Math.max.apply(Math, arreglo);
          if(finalHeight === 0){
            jQuery(items).css("height", "auto");
          }
          else{
            jQuery(items).css("height", finalHeight + "px");
          }
        });

        //titleHeight
        var titleHeight = jQuery(".megamenu-desktop");
        jQuery.each(titleHeight, function(i, item){
          var arreglo = [];
          var items = jQuery(item).find(".titleHeight");

          jQuery(items).each(function(i, item){
            arreglo.push(jQuery(item).innerHeight());
          });

          var finalHeight = Math.max.apply(Math, arreglo);
          if(finalHeight === 0){
            jQuery(items).css("height", "auto");
          }
          else{
            jQuery(items).css("height", finalHeight + "px");
          }
        });
      }, 100);
    });
    //mouseover itemsMenú
    jQuery(".nav-desktop .general-menu .item-menu").mouseleave(function(e){
      //hide Megamenu
      jQuery(".megamenu-desktop").css("display", "none").hide().fadeOut();

      //removeClass Active
      jQuery(".nav-desktop .general-menu .item-menu .a-item-menu").removeClass("active");

      //displayNone (first-child) - contentRight
      jQuery(".megamenu-desktop .content-right").css("display", "none");

      //displayNone (first-child) - collapse2
      jQuery(".megamenu-desktop .collapse1 .item-collapse1 .collapse2").removeClass("show");

      //removeClass Active (first-child) - collapse1
      jQuery(".megamenu-desktop .collapse1 .item-collapse1 .a-item-collapse1").removeClass("active");

      //remove Backdrop
      jQuery("body").removeClass("backdrop");
    });

    //Click itemsCollapse1
    jQuery(".megamenu-desktop .collapse1 .item-collapse1 .a-item-collapse1").click(function(e){
      //Accordion Hide
      jQuery(".megamenu-desktop .collapse2").collapse("hide");

      //AddClass Active
      jQuery(this).closest(".collapse1").find(".a-item-collapse1").removeClass("active");
      jQuery(this).addClass("active");

      //DisplayBlock, None - contentRight
      jQuery(".megamenu-desktop .content-right").hide();
      jQuery(".megamenu-desktop .content-right[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();

      //titleHeight
      var titleHeight = jQuery(".megamenu-desktop .content-right[data-id='" + jQuery(this).data("id") + "']");
      jQuery.each(titleHeight, function(i, item){
        var arreglo = [];
        var items = jQuery(item).find(".titleHeight");

        jQuery(item).find(".titleHeight").css("height", "auto");
        jQuery(items).each(function(i, item){
          arreglo.push(jQuery(item).innerHeight());
        });
        jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
      });

      //textHeight
      var textHeight = jQuery(".megamenu-desktop .content-right[data-id='" + jQuery(this).data("id") + "']");
      jQuery.each(textHeight, function(i, item){
        var arreglo = [];
        var items = jQuery(item).find(".textHeight");

        jQuery(item).find(".textHeight").css("height", "auto");
        jQuery(items).each(function(i, item){
          arreglo.push(jQuery(item).innerHeight());
        });
        jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
      });
    });
    //Click itemsCollapse2
    jQuery(".megamenu-desktop .collapse2 .item-collapse2 .a-item-collapse2").click(function(e){
      //AddClass Active
      jQuery(this).closest(".collapse2").find(".a-item-collapse2").removeClass("active");
      jQuery(this).addClass("active");
    });

    //Hide Megamenu
    jQuery(document).on("click",function(e){
      var container = jQuery(".megamenu-desktop");
      if (!container.is(e.target) && container.has(e.target).length === 0){
        jQuery(".nav-desktop .megamenu-desktop").collapse("hide");
        jQuery("body").removeClass("backdrop");
      }
    });
  }
  //Megamenú Mobile
  function megamenu_mobile(){
    //Open, Close Menú
    jQuery(".nav-mobile .general-menu .menu-mobile").click(function(e){
      jQuery("body").addClass("backdrop");
      jQuery(".nav-mobile .dropdown-mobile").css("right", "0");
    });
    jQuery(".dropdown-mobile .btn-close").click(function(e){
      jQuery("body").removeClass("backdrop");
      jQuery(".nav-mobile .dropdown-mobile").css("right", "-1500px");
    });
    //Open, Close Menú and Megamenú
    jQuery(".nav-mobile .megamenu-mobile .btn-back").click(function(e){
      jQuery(".nav-mobile .megamenu-mobile").css("right", "-1500px");
    });
    jQuery(".nav-mobile .megamenu-mobile .btn-close").click(function(e){
      jQuery("body").removeClass("backdrop");
      jQuery(".nav-mobile .dropdown-mobile").css("right", "-1500px");
      jQuery(".nav-mobile .megamenu-mobile").css("right", "-1500px");
    });
    //Open dataid Megamenú
    jQuery(".nav-mobile .dropdown-mobile .dataid").click(function(e){
      jQuery(".nav-mobile .megamenu-mobile").css("right", "0");
      jQuery(".nav-mobile .megamenu-mobile .content-right").hide();
      jQuery(".nav-mobile .megamenu-mobile .content-right[data-id='" + jQuery(this).data("id") + "']").css("display", "block").hide().fadeIn();
    });

    //Active Items Menú
    jQuery(".nav-mobile .general-menu .item-menu .a-item-menu").click(function(e){
        //AddClass Active
        jQuery(".nav-mobile .general-menu .item-menu .a-item-menu").removeClass("active");
        jQuery(this).addClass("active");

        //Accordion Hide
        jQuery(".nav-mobile .collapse1").collapse("hide");
      }
    );
    //Active Items Collapse1
    jQuery(".nav-mobile .collapse1 .item-collapse1 .a-item-collapse1").click(function(e){
        //AddClass Active
        jQuery(".nav-mobile .collapse1 .item-collapse1 .a-item-collapse1").removeClass("active");
        jQuery(this).addClass("active");

        //Accordion Hide
        jQuery(".nav-mobile .collapse2").collapse("hide");
      }
    );
    //Active Items Collapse2
    jQuery(".nav-mobile .collapse2 .item-collapse2 .a-item-collapse2").click(function(e){
        //AddClass Active
        jQuery(".nav-mobile .collapse2 .item-collapse2 .a-item-collapse2").removeClass("active");
        jQuery(this).addClass("active");
      }
    );
  }

  //Modal Promotion
  if(jQuery(".modal-promotion").length == 1){
    jQuery(".modal-promotion").modal("show");
  }
  //Modal Question
  function modal_question(){
    jQuery(".click-btn-question").click(function(e){
      jQuery(".modal-question").modal("show");
    });
  }
  //Modal Tips - Clone info
  function modal_tips(){
    jQuery(".click-modal-tips").click(function(e){
      jQuery(".modal-tips .c-modal-tips").remove();
      jQuery(this).closest("article").find(".c-modal-tips").clone().appendTo(".modal-tips-body");
      jQuery(".modal-tips-body .c-modal-tips").removeClass("hidden");
      jQuery(".modal-tips").modal("show");
    });
  }

  //niceScroll recipeDescription
  function niceScroll_recipeDescription(){
    var height_slider = jQuery(".recipe-description .s-recipe-description").height();
    jQuery(".recipe-description .column-left .description").css("height", height_slider - 150);
  }

  //recipe-form click
  jQuery(".recipe-form .accordion .item").click(function(e){
    height_niceSelect();
  });

  //recipeFilter Desktop
  function recipeFilterDesktop(){
    if(jQuery(".general-filter .c-general-filter.desktop").length == 1){
      var sectionSlider = jQuery(".general-filter .c-general-filter.desktop .c-slider-moments1");
      var sectionFilter = jQuery(".general-filter .c-general-filter.desktop");

      var sectionFilterTop = sectionFilter.offset().top;
      var headerHeight = jQuery("header .container-header").outerHeight();

      jQuery(window).on("scroll", function(e){
        if(jQuery(window).scrollTop() + headerHeight * 2 >= sectionFilterTop){
          sectionSlider.css("display", "none");
          sectionFilter.addClass("scroll");
          sectionFilter.css("top", headerHeight);
          jQuery(".recipe-list").css("margin-top", headerHeight);
        }
        else{
          sectionSlider.slideDown();
          sectionFilter.removeClass("scroll");
          sectionFilter.css("top", "inherit");
          jQuery(".recipe-list").css("margin-top", 0);
        }
      });

      /*hast URL*/
      var hash = window.location.hash;
      if(hash){
        hash = hash.replace('#', '');
        hash = hash.replace(/-/g, ' ');

        jQuery("#ip-recipes option").each(function(i, item){
          if(jQuery(this).text().toLowerCase() == hash.toLowerCase()){
            jQuery("#ip-recipes").val(jQuery(this).val()).trigger("change");
          }
        });
      }
    }
  }
  //recipeFilter Mobile
  function recipeFilterMobile(){
    if(jQuery(".general-filter .c-general-filter.mobile").length == 1){
      var sectionFilter = jQuery(".general-filter .c-general-filter.mobile");
      var headerHeight = jQuery("header .container-header").outerHeight();

      var sectionFilterTop = sectionFilter.offset().top;

      jQuery(window).on("scroll", function(e){
        if(jQuery(window).scrollTop() + headerHeight * 2 >= sectionFilterTop){
          sectionFilter.addClass("scroll");
          sectionFilter.css("top", headerHeight);
          sectionFilter.css("margin-top", 0);
        }
        else{
          sectionFilter.removeClass("scroll");
          sectionFilter.css("top", "inherit");
          sectionFilter.css("margin-top", 75);
        }
      });

      /*hast URL*/
      var hash = window.location.hash;
      if(hash){
        hash = hash.replace('#', '');
        hash = hash.replace(/-/g, ' ');

        jQuery("#ip-recipes option").each(function(i, item){
          if(jQuery(this).text().toLowerCase() == hash.toLowerCase()){
            jQuery("#ip-recipes").val(jQuery(this).val()).trigger("change");
          }
        });
        jQuery(".btn-search.recipes button").trigger("click");
      }
    }
    jQuery(".general-filter .btn-tools").click(function(e){
      jQuery("body").addClass("backdrop");
      jQuery("html, body").css("overflow", "hidden");

      jQuery("#searchD-news, #searchD-recipes").fadeIn();
      jQuery("#searchM-news, #searchM-recipes").fadeOut(1500);
      jQuery(".general-filter .c-general-filter.desktop").addClass("right-0");
    });
    jQuery(".general-filter .btn-close").click(function(e){
      jQuery("body").removeClass("backdrop");
      jQuery("html, body").css("overflow", "auto");

      jQuery("#searchM-news, #searchM-recipes").fadeIn();
      jQuery("#searchD-news, #searchD-recipes").fadeOut();
      jQuery(".general-filter .c-general-filter.desktop").removeClass("right-0");
    });
  }

  //Select input search
  jQuery("#tc-recipes, #ip-recipes").select2();
  jQuery("#tc-recipes, #ip-recipes").one("select2:open", function(e){
    jQuery("input.select2-search__field").prop("placeholder", "Escriba aquí para buscar");
  });
  //language selectBootstrap
  jQuery("#tc-recipes, #ip-recipes").select2({
    language:{
      noResults: function(){
        return "Resultados no encontrados";
      },
      searching: function(){
        return "Buscando...";
      }
    }
  });

  /*scroll footer error*/
  function scroll_newsletter(){
    jQuery("footer form .section-newsletter input.form-submit").click(function(e){
      var positionFooter=jQuery("footer").offset().top;
      localStorage.setItem("positionFooter", positionFooter);
    });
    if(jQuery("footer .invalid-feedback").length == 1){
      jQuery("html, body").animate({
        scrollTop: localStorage.getItem("positionFooter"),
      }, 2000);
    }
  }

  //sliderScroll Desktop
  //add anchors
  jQuery(".s-slider-scroll article").each(function(i, item){
    var index = i + 1;
    jQuery(".c-slider-scroll .anchors").append("<span class='anchor' data-id='" + index + "'></span>");
    jQuery(".c-slider-scroll .anchors .anchor").eq(0).addClass("active");
  });
  function sliderScroll(){
    if(jQuery(".slider-scroll").length == 1){
      var isScroll;
      var indexArticle = 0;
      var articleActive = 0;
      var lastScrollTop = 0;
      var wH = jQuery(window).height();
      var sT = jQuery(".s-slider-scroll").offset();
      var sH = jQuery(".s-slider-scroll").height();
      var total_articles = jQuery(".s-slider-scroll article").length;

      jQuery(".s-slider-scroll").css(wH + "px");
      jQuery(window).on("scroll", function(e){
        var wS = jQuery(window).scrollTop();
        var aT;
        var aH;

        if(wS > sT.top && wS < sT.top + sH - wH){
          jQuery(".c-slider-scroll").addClass("fixed-dots");
          jQuery(".c-slider-scroll").removeClass("bottom-dots");

          jQuery(".s-slider-scroll").addClass("fixed-photo");
          jQuery(".s-slider-scroll").removeClass("bottom-photo");
        }
        else{
          jQuery(".c-slider-scroll").removeClass("fixed-dots");
          jQuery(".s-slider-scroll").removeClass("fixed-photo");
          if(wS > sT.top + sH - wH){
            jQuery(".c-slider-scroll").addClass("bottom-dots");
            jQuery(".s-slider-scroll").addClass("bottom-photo");
          }
        }

        if(wS > lastScrollTop){
          isScroll = "down";
        }
        else{
          isScroll = "up";
        }
        lastScrollTop = wS;

        jQuery(".s-slider-scroll article").each(function(i, item){
          aT = jQuery(this).offset().top;
          aH = jQuery(this).outerHeight();

          if(wS > aT + aH / 2 - wH){
            jQuery(this).addClass("visible");
            if(jQuery(this).attr("id") != articleActive){
              articleActive = jQuery(this).attr("id");
              indexArticle = jQuery(this).index();

              //active anchorScroll
              var anchors = jQuery(".c-slider-scroll .anchors .anchor");
              anchors.each(function(i, item){
                if(i == indexArticle){
                  jQuery(anchors).removeClass("active");
                  jQuery(this).addClass("active");
                }
              });
            }
          }
          else{
            jQuery(this).not("#article-1").removeClass("visible");
          }

          //pagination
          jQuery(".s-slider-scroll .counter-desktop .indexD").text(
            indexArticle + 1
          );
          jQuery(".s-slider-scroll .counter-desktop .totalD").text(
            total_articles
          );
        });
      });

      //dots animate and active
      jQuery(".c-slider-scroll .anchors .anchor").click(function(e){
        var data_id = jQuery(this).data("id") - 1;
        var positionTop = jQuery(".s-slider-scroll article").eq(data_id).offset().top;

        jQuery(".s-slider-scroll .anchors .anchor").removeClass("active");
        jQuery(this).addClass("active");
        jQuery("html, body").animate({
          scrollTop: positionTop,
        }, 1000);
      });
    }
  }

  //Call Functions
  height_niceSelect();
  infographics_aos();
  modal_tips();
  modal_question();
  scroll_newsletter();

  //540
  if(jQuery(window).width() > 540){
    setTimeout(function(e){
      niceScroll_recipeDescription();
    }, 100);
  }
  else{
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 540){
      setTimeout(function(e){
        niceScroll_recipeDescription();
      }, 100);
    }
    else{
    }
  });

  //768
  if(jQuery(window).width() >= 768){
  }
  else{
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() >= 768){
    }
    else{
    }
  });

  //1024
  if(jQuery(window).width() > 1024){
    megamenu_desktop();
    recipeFilterDesktop();
    sliderScroll();
  }
  else{
    megamenu_mobile();
    recipeFilterMobile();
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 1024){
      megamenu_desktop();
      recipeFilterDesktop();
      sliderScroll();
    }
    else{
      megamenu_mobile();
      recipeFilterMobile();
    }
  });
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
