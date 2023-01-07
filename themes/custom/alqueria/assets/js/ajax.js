/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
jQuery(document).ready(function(e){
  //Comentarios
  function comments(){
    jQuery(".comments #btn-comment").click(function(e){
      var value_error = 0;
      var message = jQuery("#form-comments #msg-comment").val();
      var rating = jQuery("#form-comments .content-star input:checked").val();

      var elem = jQuery("body").find("section[data-nid]");
      var nid = elem.attr("data-nid");

      if(!jQuery("#form-comments .content-star input").is(":checked")){
        jQuery("#form-comments .content-star").find(".error").fadeIn();
        value_error = 1;
      }
      else{
        jQuery("#form-comments .content-star").find(".error").fadeOut();
      }

      if(message == ""){
        jQuery("#form-comments #msg-comment").parent().find(".error").fadeIn();
        value_error = 1;
      }
      else{
        jQuery("#form-comments #msg-comment").parent().find(".error").fadeOut();
      }

      if(value_error == 0){
        jQuery.ajax({
          type: "POST",
          url: "/insertar/comentario",
          data: { nid: nid, msg: message, rating: rating },
          success: function(data){
            if(data.status == 1){
              jQuery(".modal-successful .content-title p").text(data.msg);
              jQuery(".modal-successful").modal("show");

              jQuery(".modal-successful").on("hidden.bs.modal", function(e){
                jQuery("#form-comments #msg-comment").val("");
                jQuery("#form-comments .content-star input").prop("checked", false);
              });
            }
          },
        });
      }
    });
  }

  //Favoritos
  //Validate favorite ready
  if(jQuery(".user-logged-in.page-node-type-receta").length == 1 ||
    jQuery(".user-logged-in.page-node-type-blog-nutricion").length == 1){
    jQuery.ajax({
      type: "GET",
      url: "/obtener/listado/favoritos",
      dataType: "JSON",
      success: function(data){
        var favoritos=data[0].id_favoritos;
        nid=jQuery("body").find("section[data-nid]").attr("data-nid")
        if(favoritos.includes(nid)){
          jQuery("#favorite").prop("checked", true);
        }
      }
    });
  }
  //modal_msg
  function modal_msg(data){
    jQuery("<div class='modal-general'><div class='content-text'><p>" + data.msg + "</p></div></div>").appendTo("body").hide().fadeIn();
    setTimeout(function(e){
      jQuery(".modal-general").fadeOut("normal", function(e){
        jQuery(this).remove();
      });
    }, 2500);
  }
  //Add and delete favorite
  function favorites(){
    jQuery("#favorite").change(function(e){
      var operacion;
      var nid = jQuery("body").find("section[data-nid]").attr("data-nid")

      if(jQuery("#favorite").is(":checked")){
        operacion = "a";
        localStorage.setItem("favorite_id", nid);
      }
      else{
        operacion = "d";
        localStorage.removeItem("favorite_id");
      }

      jQuery.ajax({
        type: "POST",
        url: "/administrar/favoritos",
        data: { nid: nid, o: operacion },
        success: function(data){
          if(data.status === 1){
            modal_msg(data);
          }
          else{
            modal_msg(data);
          }
        },
      });
    });
  }

  //Megamenú Desktop
  function ajax_megamenu_desktop(){
    jQuery(".megamenu-desktop .collapse2 .a-item-collapse2").click(function(e){
      var tid = jQuery(this).attr("data-tid");
      var mode = jQuery(this).attr("data-mode");
      var url = jQuery(this).attr("data-url");
      var view = jQuery(this).attr("data-view");
      var dataID = jQuery(this).closest(".collapse1").find(".a-item-collapse1").attr("data-id");

      //Loading
      jQuery(".loading").remove();
      jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "']").addClass("load");
      jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .info").hide();
      jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .list-articles").hide();
      jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .button").hide();
      jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "']").append("<div class='loading'><img src='themes/custom/alqueria/assets/img/icons/loading.gif' alt='loading' title='loading' style='width: 80px !important;'/></div>");

      jQuery.ajax({
        type: "POST",
        url: "/obtener/contenido/menu",
        data: { tid: tid, tipo: view, modo: mode, url: url },
        success: function(data){
          //Loading
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "']").removeClass("load");
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .info").show();
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .list-articles").show();
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .button").show();
          jQuery(".loading").remove();

          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .title").text(data.titulo).css({ opacity: 0 }).fadeTo("normal", 1);
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .descripcion").html(data.descripcion).css({ opacity: 0 }).fadeTo("normal", 1);
          jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);

          if(data.results == 0){
            jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .button").css("display", "none");
          }
          else{
            jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .button").fadeIn();
            jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "'] .button a").attr("href", data.url);
          }

          //titleHeight
          var titleHeight = jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "']");
          jQuery.each(titleHeight, function(i, item){
            var arreglo = [];
            var items = jQuery(item).find(".titleHeight");

            jQuery(items).each(function(i, item){
              arreglo.push(jQuery(item).innerHeight());
            });
            jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
          });

          //textHeight
          var textHeight = jQuery(".megamenu-desktop .content-right[data-id='" + dataID + "']");
          jQuery.each(textHeight, function(i, item){
            var arreglo = [];
            var items = jQuery(item).find(".textHeight");

            jQuery(items).each(function(i, item){
              arreglo.push(jQuery(item).innerHeight());
            });
            jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
          });
        }
      });
    });
  }

  //Megamenú Mobile
  function ajax_megamenu_mobile(){
    jQuery(".nav-mobile .dropdown-mobile .dataid").click(function(e){
      var propiedades = {};
      var tid = jQuery(this).attr("data-tid");
      var mode = jQuery(this).attr("data-mode");
      var view = jQuery(this).attr("data-view");
      var dataID = jQuery(this).attr("data-id");

      if(tid == 0){
        var config = jQuery(this).attr("data-config");
        propiedades["tid"] = tid;
        propiedades["tipo"] = view;
        propiedades["modo"] = mode;
        propiedades["config"] = config;
      }
      else{
        var url = jQuery(this).attr("data-url");
        propiedades["tid"] = tid;
        propiedades["tipo"] = view;
        propiedades["modo"] = mode;
        propiedades["url"] = url;
      }

      //Loading
      jQuery(".loading").remove();
      jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "']").addClass("load");
      jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .info").hide();
      jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .list-articles").hide();
      jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .button").hide();
      jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "']").append("<div class='loading'><img src='themes/custom/alqueria/assets/img/icons/loading.gif' alt='loading' title='loading' style='width: 80px !important;'/></div>");

      jQuery.ajax({
        type: "POST",
        url: "/obtener/contenido/menu",
        data: propiedades,
        success: function(data){
          //Loading
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "']").removeClass("load");
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .info").show();
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .list-articles").show();
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .button").show();
          jQuery(".loading").remove();

          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .title").text(data.titulo).css({ opacity: 0 }).fadeTo("normal", 1);
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .descripcion").html(data.descripcion).css({ opacity: 0 }).fadeTo("normal", 1);
          jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);

          if(data.results == 0){
            jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .button").css("display", "none");
          }
          else{
            jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .button").fadeIn();
            jQuery(".megamenu-mobile .content-right[data-id='" + dataID + "'] .button a").attr("href", data.url);
          }
        }
      });
    });
  }

  //Listado Recetas
  //Guardar textos por defecto de los tags
  var tc_text_default = jQuery("#tc-tag-recipes .title-tag").text();
  var ip_text_default = jQuery("#ip-tag-recipes .title-tag").text();
  var nd_text_default = jQuery("#nd-tag-recipes .title-tag").text();
  var m_text_default = jQuery("#m-tag-recipes .title-tag").text();
  var type_text_default = jQuery("#type-recipe").text();

  //Click item sliderMomentos
  jQuery(".moment-item").click(function(e){
    //Agregar clase 'active' al item del sliderMomentos
    jQuery(".moment-item").removeClass("active");
    jQuery(this).addClass("active");

    //Actualizar el selectMomentos de acuerdo al item activo del sliderMomentos
    var tid_moment = jQuery(this).attr("data-tid");
    jQuery("#m-recipes").val(tid_moment).niceSelect("update");
  });

  //Change selectMomentos que aparece al hacer scroll
  jQuery("#m-recipes").change(function(e){
    var tid_select = jQuery(this).val();

    //Actualizar clase 'active' de acuerdo al select activo del momento
    jQuery(".moment-item").each(function(e){
      var tid_moment = jQuery(this).attr("data-tid");
      if(tid_select == tid_moment){
        jQuery(this).trigger("click");
      }
    });

    //Cambiar imagen del selectMomentos que aparece al hacer scroll
    var url_img = jQuery("#m-recipes option:selected").attr("data-icon");
    jQuery(".select.moment img").attr("src", url_img.replace("http://", "https://"));
  });

  //Validación data-tid actual que viene del prehome recetas
  //para actualizar la clase 'active' del sliderMomentos
  //y del selectMomentos que aparece al hacer scroll
  setTimeout(function(e){
    var tid_current = jQuery(".general-filter").attr("data-tid");
    if(tid_current){
      if(jQuery(window).width() > 1024){
        jQuery(".moment-item").each(function(e){
          var tid_moment = jQuery(this).attr("data-tid");
          if(tid_moment == tid_current){
            jQuery(this).trigger("click");
          }
        });
      }
      else{
        jQuery("#m-recipes").val(tid_current).niceSelect("update");
        jQuery(".btn-search.recipes button").trigger("click");
      }
    }
  }, 100);

  //filtro recetas con pollo
  setTimeout(function(e){
    if(window.location.pathname === '/recetas/recetas-con-pollo'){
      jQuery("#ip-recipes").val(1);
      jQuery("#ip-recipes").change();
    }
  }, 100);

  //Function Ajax
  function recipeList(){
    var m; //momento
    var search; //buscador
    var tc = jQuery("#tc-recipes").val(); //tipoCocina
    var ip = jQuery("#ip-recipes").val(); //tipoCocina
    var nd = jQuery("#nd-recipes").val(); //nivelDificultad
    var order = jQuery("#order-recipes").val(); //orden

    //Validar si el visible SearchD o SearchM para guardar variable
    if(jQuery("#searchD-recipes").is(":visible")){
      search = jQuery("#searchD-recipes").val(); //searchDesktop
    }
    else{
      search = jQuery("#searchM-recipes").val(); //searchMobile
    }

    //Validar si es visible sliderMomentos o selectMomentos para guardar variable
    if(jQuery(".s-slider-moments1").is(":visible")){
      m = jQuery(".moment-item.active").attr("data-tid"); //sliderMoment
    }
    else{
      m = jQuery("#m-recipes").val(); //selectMoment
    }

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/recetas",
      data: { tc: tc, ip: ip, m: m, nd: nd, n: search, o: order },
      dataType: "JSON",
      success: function(data){
        jQuery(".recipe-list .content-featured").html(data.featured).css({ opacity: 0 }).fadeTo("normal", 1);
        jQuery(".recipe-list .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-recipes'
        var data_max=parseInt(jQuery(".new-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-recipes").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-recipes").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max || !jQuery(".new-pager").length){
          jQuery(".btn-ajax-recipes").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-recipes").removeClass("hidden");
        }

        //AnimateScroll
        if(jQuery(".c-results").length == 1){
          var headerHeight = jQuery("header .container-header").outerHeight();
          var filtersHeight = jQuery(".general-filter.recipes .c-general-filter").outerHeight();

          if(jQuery(window).scrollTop() + headerHeight + filtersHeight >= jQuery(".c-results").offset().top){
            if(jQuery(window).width() > 1024){
              jQuery("html, body").animate({
                scrollTop: jQuery(".recipe-list").offset().top - jQuery(".c-results .result-items").outerHeight(),
              }, 1000);
            }
            else{
              jQuery("html, body").animate({
                scrollTop: jQuery(".recipe-list").offset().top,
              }, 1000);
            }
          }
          else{
            if(jQuery(window).width() > 1024){
              jQuery("html, body").animate({
                scrollTop: jQuery(".general-filter.recipes .c-general-filter.desktop").offset().top - jQuery(".c-results").outerHeight() - 20,
              }, 1000);
            }
            else{
              jQuery("html, body").animate({
                scrollTop: jQuery(".c-general-filter.mobile").offset().top - 160,
              }, 1000);
            }
          }
        }

        //Validación padding del articulo destacado
        if(jQuery(".featured-article article").length == 1){
          jQuery(".featured-article").css("padding-top", "35px");
        }
        else{
          jQuery(".featured-article").css("padding-top", "0");
        }
      }
    });
  }

  //Función cambio del texto de los tags de acuerdo al select o momento seleccionado
  function recipeTags(){
    var m_text; //momento
    var tc_text = jQuery("#tc-recipes option:selected").text(); //tipoCocina
    var ip_text = jQuery("#ip-recipes option:selected").text(); //ingredientePrincipal
    var nd_text = jQuery("#nd-recipes option:selected").text(); //nivelDificultad

    //Validar si el sliderMomentos es visible o no y tiene la clase active
    if(jQuery(".s-slider-moments1").is(":visible")){
      if(jQuery(".moment-item").hasClass("active")){
        m_text = jQuery(".moment-item.active .title").text(); //sliderMoment
      }
      else{
        m_text = m_text_default; //texto por defecto
      }
    }
    else{
      m_text = jQuery("#m-recipes option:selected").text(); //selectMoment
    }

    //Asignar textos
    jQuery("#tc-tag-recipes .title-tag").text(tc_text);
    jQuery("#ip-tag-recipes .title-tag").text(ip_text);
    jQuery("#nd-tag-recipes .title-tag").text(nd_text);
    jQuery("#m-tag-recipes .title-tag").text(m_text);
    jQuery("#type-recipe").text(type_text_default);
  }

  //Limpiar tags de #tc (tipo cocina)
  jQuery("#tc-tag-recipes .close-tag").click(function(e){
    jQuery("#tc-tag-recipes .title-tag").text(tc_text_default);
    jQuery("#tc-recipes").val("").trigger("change");
    recipeList();
  });
  //Limpiar tags de #ip (ingrediente principal)
  jQuery("#ip-tag-recipes .close-tag").click(function(e){
    jQuery("#ip-tag-recipes .title-tag").text(ip_text_default);
    jQuery("#ip-recipes").val("").trigger("change");
    recipeList();
  });
  //Limpiar tags de #nd (nivel dificultad)
  jQuery("#nd-tag-recipes .close-tag").click(function(e){
    jQuery("#nd-tag-recipes .title-tag").text(nd_text_default);
    jQuery("#nd-recipes").val("").niceSelect("update");
    recipeList();
  });
  //Limpiar tags de #m (momento)
  jQuery("#m-tag-recipes .close-tag").click(function(e){
    jQuery("#m-tag-recipes .title-tag").text(m_text_default);
    jQuery(".moment-item").removeClass("active");
    jQuery("#m-recipes").val("").niceSelect("update");
    jQuery("#type-recipe").text(type_text_default);
    recipeList();
  });
  //Limpiar todos los tags
  jQuery("#all-tags-recipes").click(function(e){
    jQuery("#tc-tag-recipes .title-tag").text(tc_text_default);
    jQuery("#ip-tag-recipes .title-tag").text(ip_text_default);
    jQuery("#nd-tag-recipes .title-tag").text(nd_text_default);
    jQuery("#m-tag-recipes .title-tag").text(m_text_default);
    jQuery("#type-recipe").text(type_text_default);

    jQuery("#nd-recipes, #m-recipes").val("").niceSelect("update");
    jQuery("#tc-recipes, #ip-recipes").val("").trigger("change");
    jQuery("#searchD-recipes, #searchM-recipes").val("");
    jQuery(".moment-item").removeClass("active");

    recipeList();
  });

  //Change select order
  jQuery("#order-recipes").change(function(e){
    recipeList();
  });

  //Llamado de funciones Desktop
  function filter_listRecipe_desktop(){
    //Change selects
    jQuery("#tc-recipes, #ip-recipes, #nd-recipes, #m-recipes").change(function(e){
      recipeList();
      recipeTags();
    });
    //Click sliderMomentos
    jQuery(".moment-item").click(function(e){
      recipeList();
      recipeTags();
    });
    //Search Desktop keypress
    jQuery("#searchD-recipes").keydown(function(e){
      var keycode = e.keyCode ? e.keyCode : e.which;
      if(keycode == 13){
        recipeList();
        return false;
      }
    });
  }

  //Llamado de funciones Mobile
  function filter_listRecipe_mobile(){
    //Search Mobile keypress
    jQuery(".general-filter #searchM-recipes").keydown(function(e){
      var keycode = e.keyCode ? e.keyCode : e.which;
      if(keycode == 13){
        recipeList();
        jQuery("#searchD-recipes").val(jQuery("#searchM-recipes").val());
        return false;
      }
    });

    //Btn SearchMobile
    jQuery(".general-filter .btn-search.recipes button").click(function(e){
      recipeList();
      recipeTags();

      //Validate Menú Mobile
      jQuery("body").removeClass("backdrop");
      jQuery("html, body").css("overflow", "auto");
      jQuery(".general-filter .c-general-filter.desktop").removeClass("right-0");
      jQuery("#searchM-recipes").val(jQuery("#searchD-recipes").val());
      jQuery("#searchM-recipes").fadeIn();
      jQuery("#searchD-recipes").fadeOut();
    });
  }

  //Click "Cargar más"
  jQuery(".btn-ajax-recipes").click(function(e){
    var m; //momento
    var search; //buscador
    var tc = jQuery("#tc-recipes").val(); //tipoCocina
    var ip = jQuery("#ip-recipes").val(); //ingredientePrincipal
    var nd = jQuery("#nd-recipes").val(); //nivelDificultad
    var order = jQuery("#order-recipes").val(); //orden

    //Validar si el visible SearchD o SearchM para guardar variable
    if(jQuery("#searchD-recipes").is(":visible")){
      search = jQuery("#searchD-recipes").val(); //searchDesktop
    }
    else{
      search = jQuery("#searchM-recipes").val(); //searchMobile
    }
    //Validar si es visible sliderMomentos o selectMomentos para guardar variable
    if(jQuery(".s-slider-moments1").is(":visible")){
      m = jQuery(".moment-item.active").attr("data-tid"); //sliderMoment
    }
    else{
      m = jQuery("#m-recipes").val(); //selectMoment
    }

    //Incrementar y asignar paginación
    var page = parseInt(jQuery(this).attr("data-page")) + 1;
    jQuery(this).attr("data-page", page);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/recetas",
      data: { tc: tc, ip: ip, m: m, nd: nd, n: search, o: order, p: page },
      dataType: "JSON",
      success: function(data){
        //jQuery(".recipe-list .content-featured").html(data.featured).css({ opacity: 0 }).fadeTo("normal", 1);
        jQuery(".recipe-list .list-articles").append(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-recipes'
        var data_max=parseInt(jQuery(".new-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-recipes").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-recipes").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max){
          jQuery(".btn-ajax-recipes").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-recipes").removeClass("hidden");
        }
      }
    });
  });

  //Prehome Recetas
  //Si localStorage 'prehome'
  if("prehome" in localStorage && window.location.pathname == "/recetas/listado-recetas"){
    jQuery("#type-recipe").text("para recetas"); //type
    jQuery("#tc-recipes").val(localStorage.getItem("tc_recipes")).trigger("change"); //tipoCocina
    if(localStorage.ip_recipes){
      jQuery("#ip-recipes").val(localStorage.getItem("ip_recipes")).trigger("change"); //ingredientePrincipal Filtro
    }
    if(localStorage.tid_recipes){
      jQuery("#ip-recipes").val(localStorage.getItem("tid_recipes")).trigger("change"); //ingredientePrincipal Slider
    }
    jQuery("#nd-recipes").val(localStorage.getItem("nd_recipes")).niceSelect("update"); //nivelDificultad

    //Validar si es visible SearchD o SearchM para guardar localStorage
    if(jQuery("#searchD-recipes").is(":visible")){
      jQuery("#searchD-recipes").val(localStorage.getItem("search_recipes")); //searchDesktop
    }
    else{
      jQuery("#searchM-recipes").val(localStorage.getItem("search_recipes")); //searchMobile
    }
    recipeList();
    recipeTags();
  }

  //Llamado de funciones desktop
  function filter_prehome(){
    //Click botón de buscar en el prehome de recetas
    jQuery(".general-filter.prehome .btn-search button").click(function(e){
      localStorage.setItem("prehome", "prehome"); //Is prehome
      //tipoCocina
      localStorage.setItem("tc_recipes", jQuery("#tc-recipes").val());
      //ingredientePrincipal
      localStorage.setItem("ip_recipes", jQuery("#ip-recipes").val());
      localStorage.setItem("tid_recipes", ""); //ingredientePrincipal Slider
      //nivelDificultad
      localStorage.setItem("nd_recipes", jQuery("#nd-recipes").val());

      //Validar si es visible SearchD o SearchM para guardar localStorage
      if(jQuery("#searchD-recipes").is(":visible")){
        localStorage.setItem("search_recipes", jQuery("#searchD-recipes").val()); //searchDesktop
      }
      else{
        localStorage.setItem("search_recipes", jQuery("#searchM-recipes").val()); //searchMobile
      }

      //Redirección al listado de recetas
      var url = window.location.protocol + "//" + window.location.host + "/recetas/listado-recetas";
      jQuery(location).attr("href", url);
    });

    //Click item sliderMomentos
    jQuery(".s-slider-moments2 .item").click(function(e){
      localStorage.setItem("prehome", "prehome"); //Is prehome
      localStorage.setItem("tc_recipes", "");
      localStorage.setItem("ip_recipes", "");
      localStorage.setItem("nd_recipes", "");
      localStorage.setItem("search_recipes", "");

      //Actualizar el selectMomentos de acuerdo al item activo del sliderMomentos
      var tid_moment = jQuery(this).attr("data-tid");
      var url_moment = jQuery(this).attr("data-url");
      localStorage.setItem("tid_recipes", tid_moment);

      var url;
      //Redirección al listado de recetas
      if(url_moment.includes('taxonomy')) {
        url = window.location.protocol + "//" + window.location.host + "/recetas/listado-recetas";
      }else {
        url = window.location.protocol + "//" + window.location.host + url_moment;
      }
      jQuery(location).attr("href", url);
    });

    //Search mobile keypress
    jQuery(".general-filter.prehome #searchM-recipes").keydown(function(e){
      var keycode = e.keyCode ? e.keyCode : e.which;
      if(keycode == "13"){
        localStorage.setItem("prehome", "prehome");

        if(jQuery("#searchD-recipes").is(":visible")){
          localStorage.setItem("search_recipes", jQuery("#searchD-recipes").val()); //searchDesktop
        }
        else{
          localStorage.setItem("search_recipes", jQuery("#searchM-recipes").val()); //searchMobile
        }

        //Redirección al listado de recetas
        var url = window.location.protocol + "//" + window.location.host + "/recetas/listado-recetas";
        jQuery(location).attr("href", url);
      }
    });
  }

  //Listado Noticias
  //Function Ajax
  function newsList(){
    var order = jQuery("#order-news").val(); //orden

    //Inicializar paginación al cambiar filtros
    jQuery(".btn-ajax-news").attr("data-page", 0);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/noticias",
      data: { o: order },
      dataType: "JSON",
      success: function(data){
        jQuery(".news-list .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-news'
        var data_max=parseInt(jQuery(".news-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-news").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-news").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max || !jQuery(".new-pager").length){
          jQuery(".btn-ajax-news").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-news").removeClass("hidden");
        }
      }
    });
  }

  //Change select order
  jQuery("#order-news").change(function(e){
    newsList();
  });

  //Click "Cargar más"
  jQuery(".btn-ajax-news").click(function(e){
    var order = jQuery("#order-news").val(); //orden

    //Incrementar y asignar paginación
    var page = parseInt(jQuery(this).attr("data-page")) + 1;
    jQuery(this).attr("data-page", page);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/noticias",
      data: { o: order, p: page },
      dataType: "JSON",
      success: function(data){
        jQuery(".news-list .list-articles").append(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-news'
        var data_max=parseInt(jQuery(".news-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-news").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-news").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max){
          jQuery(".btn-ajax-news").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-news").removeClass("hidden");
        }
      }
    });
  });

  //Listado Comunicados
  //Function Ajax
  function releasesList(){
    var order = jQuery("#order-releases").val(); //orden

    //Inicializar paginación al cambiar filtros
    jQuery(".btn-ajax-releases").attr("data-page", 0);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/comunicados",
      data: { o: order },
      dataType: "JSON",
      success: function(data){
        jQuery(".releases-list .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-releases'
        var data_max=parseInt(jQuery(".releases-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-releases").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-releases").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max || !jQuery(".new-pager").length){
          jQuery(".btn-ajax-releases").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-releases").removeClass("hidden");
        }
      }
    });
  }

  //Change select order
  jQuery("#order-releases").change(function(e){
    releasesList();
  });

  //Click "Cargar más"
  jQuery(".btn-ajax-releases").click(function(e){
    var order = jQuery("#order-releases").val(); //orden

    //Incrementar y asignar paginación
    var page = parseInt(jQuery(this).attr("data-page")) + 1;
    jQuery(this).attr("data-page", page);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/comunicados",
      data: { o: order, p: page },
      dataType: "JSON",
      success: function(data){
        jQuery(".releases-list .list-articles").append(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-releases'
        var data_max=parseInt(jQuery(".releases-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-releases").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-releases").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max){
          jQuery(".btn-ajax-releases").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-releases").removeClass("hidden");
        }
      }
    });
  });

  //Listado Tags
  //Function Ajax
  function tagsList(){
    var order = jQuery("#order-tags").val(); //orden

    //Inicializar paginación al cambiar filtros
    jQuery(".btn-ajax-tags").attr("data-page", 0);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/tags",
      data: { o: order },
      dataType: "JSON",
      success: function(data){
        jQuery(".tags-list .list-articles").html(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-tags'
        var data_max=parseInt(jQuery(".tags-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-tags").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-tags").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max || !jQuery(".new-pager").length){
          jQuery(".btn-ajax-tags").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-tags").removeClass("hidden");
        }
      }
    });
  }

  //Change select order
  jQuery("#order-tags").change(function(e){
    tagsList();
  });

  //Click "Cargar más"
  jQuery(".btn-ajax-tags").click(function(e){
    var order = jQuery("#order-tags").val(); //orden

    //Incrementar y asignar paginación
    var page = parseInt(jQuery(this).attr("data-page")) + 1;
    jQuery(this).attr("data-page", page);

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/listado/tags",
      data: { o: order, p: page },
      dataType: "JSON",
      success: function(data){
        jQuery(".tags-list .list-articles").append(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación clase 'hidden' del 'btn-ajax-tags'
        var data_max=parseInt(jQuery(".news-pager").attr("data-max"));
        var data_page=parseInt(jQuery(".btn-ajax-tags").attr("data-page"));
        var max_pager=parseInt(jQuery(".btn-ajax-tags").attr("max-pager"));
        if(data_page >= max_pager || data_page >= data_max){
          jQuery(".btn-ajax-tags").addClass("hidden");
        }
        else{
          jQuery(".btn-ajax-tags").removeClass("hidden");
        }
      }
    });
  });

  //'Cargar más' Listado sostenibilidad
  jQuery(".sustainability-list .btn-ajax-sustainability").click(function(e){
    var data_page = parseInt(jQuery(this).attr("data-page")) + 1; //incremento de pagina
    var max_pager = parseInt(jQuery(this).attr("max-pager")); //pagina máxima

    jQuery(this).attr("data-page", page); //asignación de incremento

    //Ajax
    jQuery.ajax({
      type: "POST",
      url: "/obtener/vista/paginada",
      data: { tipo: "home_blog_sostenibilidad", p: page },
      dataType: "JSON",
      success: function(data){
        jQuery(".sustainability-list .list-articles").append(data.html).css({ opacity: 0 }).fadeTo("normal", 1);
        textHeight();
        titleHeight();

        //Validación btn 'cargar más'
        if(data_page == max_pager){
          jQuery(".sustainability-list .btn-ajax-sustainability").hide();
        }
      }
    });
  });

  //autoHeight
  function autoHeight(){
    var autoHeight = jQuery("section, header");
    jQuery.each(height, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".autoHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });
  }
  function labelHeight(){
    var labelHeight = jQuery("section");
    jQuery.each(labelHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".two-columns.strong-label label");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });
  }
  function textHeight(){
    var textHeight = jQuery("section");
    jQuery.each(textHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".textHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });
  }
  function titleHeight(){
    var titleHeight = jQuery("section");
    jQuery.each(titleHeight, function(i, item){
      var arreglo = [];
      var items = jQuery(item).find(".titleHeight");

      jQuery(items).each(function(i, item){
        arreglo.push(jQuery(item).innerHeight());
      });
      jQuery(items).css("height", Math.max.apply(Math, arreglo) + "px");
    });
  }
  function tableHeight(){
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

  jQuery(document).ajaxComplete(function(e){
    if(jQuery(".cooking-tips").length == 1){
      titleHeight();
      textHeight();
    }
  });

  //LLamado de funciones
  comments();
  favorites();
  filter_prehome();
  if(jQuery(window).width() > 1024){
    ajax_megamenu_desktop();
    filter_listRecipe_desktop();
  }
  else{
    ajax_megamenu_mobile();
    filter_listRecipe_mobile();
  }
  jQuery(window).resize(function(e){
    if(jQuery(window).width() > 1024){
      ajax_megamenu_desktop();
      filter_listRecipe_desktop();
    }
    else{
      ajax_megamenu_mobile();
      filter_listRecipe_mobile();
    }
  });
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
