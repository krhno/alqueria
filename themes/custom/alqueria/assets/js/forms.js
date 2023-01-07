/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Document Ready
jQuery(document).ready(function (e) {
  //Validation Input Numbers
  jQuery("input.numeric").on("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
  //Validation Input Letters
  jQuery("input.letter").on("input", function (e) {
    this.value = this.value.replace(/[^a-zA-Z ]/g, "");
  });

  //Check Remember Login
  if (localStorage.remember == 1) {
    jQuery("#login-email").val(localStorage.login_email);
    jQuery("#login-password").val(localStorage.login_password);
    jQuery("#login-remember").prop("checked", true);
  }
  jQuery(".logout a").click(function (e) {
    sessionStorage.setItem("logueado", "0");
  });

  //btnCancel
  jQuery("#btn-user-cancel").click(function (e) {
    window.location.href = window.location.href;
  });

  //btnFacebook
  jQuery("#btn-facebook-login, #btn-facebook-register").click(function (e) {
    facebook_api();
  });

  //btnGoogle
  jQuery("#btn-gmail-login, #btn-gmail-register").click(function (e) {
    google_api();
  });

  //Btn Google Login-Register
  jQuery("#login, .btn-user.static").click(function (e) {
    var cont = 0;
    if (cont == 0) {
      setTimeout(function (e) {
        google_api();
      }, 200);
    }
    cont++;
  });

  //Img Profile Edit
  function modal_msg(msg) {
    jQuery("<div class='modal-general'><div class='content-text'><p>" + msg + "</p></div></div>").appendTo("body").hide().fadeIn();
    setTimeout(function (e) {
      jQuery(".modal-general").fadeOut("normal", function (e) {
        jQuery(this).remove();
      });
    }, 2500);
  }

  function formProfile() {
    //Validate modal-general
    if (localStorage.formProfile) {
      modal_msg(localStorage.getItem("msgProfile"));
      setTimeout(function (e) {
        localStorage.removeItem("formProfile");
        localStorage.removeItem("msgProfile");
      }, 5000);

      var dataid = jQuery(".profile .info-person .btn-edit").data("id");
      jQuery(".profile .column-right .div-content").hide();
      jQuery(".profile .column-right .div-content[data-id='" + dataid + "']").css("display", "block").hide().fadeIn();
    }
    //imgInput file-profile
    jQuery("#file-profile").change(function (e) {
      var uploadFile = this.files[0];

      if (!window.FileReader) {
        modal_msg("El navegador no soporta la lectura de archivos.");
        return;
      }

      if (!(/\.(jpg|jpeg|png)$/i).test(uploadFile.name)) {
        modal_msg("Formato no soportado: jpg, jpeg, png");
      } else {
        var img = new Image();
        img.onload = function () {
          if (this.width.toFixed(0) != 200 && this.height.toFixed(0) != 200) {
            modal_msg("Las dimensiones de la imagen debe ser de: 200px por 200px");
          } else if (uploadFile.size > 512000) {
            modal_msg("El archivo supera el límite de peso permitido: 500kb");
          } else {
            var myForm = document.getElementById("form-edit-register");
            var formData = new FormData(myForm);
            jQuery.ajax({
              type: "POST",
              url: "/editar/perfil",
              data: formData,
              contentType: false,
              processData: false,
              success: function (data) {
                if (data.status == 1) {
                  localStorage.setItem("formProfile", "1");
                  localStorage.setItem("msgProfile", data.msg);
                  window.location.href = window.location.href;
                }
              }
            });
          }
        };
        img.src = URL.createObjectURL(uploadFile);
      }
    });
  }

  //select update dpto-city
  function update_dpto_city() {
    jQuery("#register-department, #edit-departamento").change(function (e) {
      var dpto = jQuery(this).val();
      jQuery("#register-city, #edit-ciudad").parent().find(".nice-select").addClass("disabled");

      if (dpto == 0) {
        jQuery("#register-city, #edit-ciudad").empty();
        jQuery("#register-city, #edit-ciudad").append("<option value=''>Ciudad</option>");
        jQuery("#register-city, #edit-ciudad").niceSelect("update");
        jQuery("#register-city, #edit-ciudad").parent().find(".nice-select").addClass("disabled");
      } else {
        jQuery.ajax({
          type: "POST",
          url: "/obtener/ciudades",
          data: {dpto: dpto},
          dataType: "JSON",
          success: function (data) {
            jQuery("#register-city, #edit-ciudad").empty();
            jQuery("#register-city, #edit-ciudad").append("<option value=''>Ciudad</option>");

            for (var i = 0; i <= data.length - 1; i++) {
              jQuery("#register-city, #edit-ciudad").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
              jQuery("#register-city, #edit-ciudad").niceSelect("update");
              jQuery("#register-city, #edit-ciudad").parent().find(".nice-select").removeClass("disabled");

              //Height city
              var height_city = jQuery("#register-city, #edit-ciudad").parent().find(".nice-select .list").height();
              if (height_city < 250) {
                jQuery("#register-city, #edit-ciudad").parent().find(".nice-select .list").css("height", "auto");
              } else {
                jQuery("#register-city, #edit-ciudad").parent().find(".nice-select .list").css("height", 250);
              }
            }
          }
        });
      }
    });
  }

  //user_login
  function user_login() {
    jQuery("#btn-user-login").click(function (e) {
      var value_error = 0;
      var email = jQuery("#login-email").val();
      var password = jQuery("#login-password").val();
      var remember = jQuery("#login-remember").is(":checked");
      var btnReturn = "<span id='btn-return' class='btn-default back-red' data-toggle='modal' data-target='#modal-login' data-seo='btn-content'>Volver</span>";

      //Validations
      //email//
      var regex_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (email == "") {
        jQuery("#login-email").parent().find(".error").fadeIn();
        jQuery("#login-email").addClass("error-border");
        value_error = 1;
      } else if (!regex_email.test(email)) {
        jQuery("#login-email").parent().find(".error").html("Introduce una dirección de correo electrónico válida.");
        jQuery("#login-email").parent().find(".error").fadeIn();
        jQuery("#login-email").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#login-email").parent().find(".error").fadeOut();
        jQuery("#login-email").removeClass("error-border");
      }

      //password
      if (password.length < 8) {
        jQuery("#login-password").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
        jQuery("#login-password").parent().find(".error").fadeIn();
        jQuery("#login-password").addClass("error-border");
        value_error = 1;
      } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password) == false) {
        jQuery("#login-password").parent().find(".error").html("La contraseña debe ser alfanumérica.");
        jQuery("#login-password").parent().find(".error").fadeIn();
        jQuery("#login-password").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#login-password").parent().find(".error").fadeOut();
        jQuery("#login-password").removeClass("error-border");
      }

      //ajax login
      if (value_error == 0) {
        jQuery.ajax({
          type: "POST",
          url: "/iniciar/sesion",
          data: {
            username: email,
            password: password,
          },
          success: function (data) {
            if (data.status == 1) {
              if (remember) {
                localStorage.setItem("remember", "1");
                localStorage.setItem("login_email", email);
                localStorage.setItem("login_password", password);
              } else {
                localStorage.removeItem("remember");
              }
              sessionStorage.setItem("logueado", "1");
              window.location.href = window.location.href;
            } else {
              jQuery(".modal-login").modal("hide");
              jQuery(".modal-unsuccessful .content-title p").text(data.msg);
              jQuery(".modal-unsuccessful .content-title #btn-return").remove();
              jQuery(".modal-unsuccessful .content-title").append(btnReturn);
              jQuery(".modal-unsuccessful").modal("show");
              sessionStorage.setItem("logueado", "0");
              btn_return();
            }
          }
        });
      }
    });
  }

  //user_edit
  function user_edit() {
    jQuery("#btn-user-edit").click(function (e) {
      var value_error = 0;

      var name = jQuery("#register-name").val();
      var lastname = jQuery("#register-lastname").val();
      var telephone = jQuery("#register-telephone").val();
      var dpto = jQuery("#register-department").prop("selected", true).val();
      var city = jQuery("#register-city").prop("selected", true).val();
      var password1 = jQuery("#register-password1").val();
      var password2 = jQuery("#register-password2").val();

      var pre_recipes = jQuery("#pre-recipes").is(":checked");
      var pre_nutrition = jQuery("#pre-nutrition").is(":checked");
      var pre_sustainability = jQuery("#pre-sustainability").is(":checked");

      //Validations
      //name
      if (name == "") {
        jQuery("#register-name").parent().find(".error").fadeIn();
        jQuery("#register-name").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-name").parent().find(".error").fadeOut();
        jQuery("#register-name").removeClass("error-border");
      }

      //lastname
      if (lastname == "") {
        jQuery("#register-lastname").parent().find(".error").fadeIn();
        jQuery("#register-lastname").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-lastname").parent().find(".error").fadeOut();
        jQuery("#register-lastname").removeClass("error-border");
      }

      //telephone
      if (telephone.length == "") {
        jQuery("#register-telephone").parent().find(".error").fadeIn();
        jQuery("#register-telephone").addClass("error-border");
        value_error = 1;
      } else if (telephone.length < 7 || telephone.length > 10) {
        jQuery("#register-telephone").parent().find(".error").html("Campo entre 7 y 10 carácteres.");
        jQuery("#register-telephone").parent().find(".error").fadeIn();
        jQuery("#register-telephone").removeClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-telephone").parent().find(".error").fadeOut();
        jQuery("#register-telephone").removeClass("error-border");
      }

      //department
      if (dpto == 0) {
        jQuery("#register-department").parent().find(".error").fadeIn();
        jQuery("#register-department").parent().find(".nice-select").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-department").parent().find(".error").fadeOut();
        jQuery("#register-department").parent().find(".nice-select").removeClass("error-border");
      }

      //city
      if (city == 0) {
        jQuery("#register-city").parent().find(".error").fadeIn();
        jQuery("#register-city").parent().find(".nice-select").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-city").parent().find(".error").fadeOut();
        jQuery("#register-city").parent().find(".nice-select").removeClass("error-border");
      }

      //password
      if (password1.length != "" || password2.length != "") {
        //password1
        if (password1.length < 8) {
          jQuery("#register-password1").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
          jQuery("#register-password1").parent().find(".error").fadeIn();
          jQuery("#register-password1").addClass("error-border");
          value_error = 1;
        } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password1) == false) {
          jQuery("#register-password1").parent().find(".error").html("La contraseña debe ser alfanumérica.");
          jQuery("#register-password1").parent().find(".error").fadeIn();
          jQuery("#register-password1").addClass("error-border");
          value_error = 1;
        } else {
          jQuery("#register-password1").parent().find(".error").fadeOut();
          jQuery("#register-password1").removeClass("error-border");
        }

        //password2
        if (password2.length < 8) {
          jQuery("#register-password2").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else if (password2 == "" || password2 != password1) {
          jQuery("#register-password2").parent().find(".error").html("Las contraseñas no coinciden.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password2) == false) {
          jQuery("#register-password2").parent().find(".error").html("La contraseña debe ser alfanumérica.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else {
          jQuery("#register-password2").parent().find(".error").fadeOut();
          jQuery("#register-password2").removeClass("error-border");
        }
      }

      //ajax register
      if (value_error == 0) {
        var myForm = document.getElementById("form-edit-register");
        var formData = new FormData(myForm);
        jQuery.ajax({
          type: "POST",
          url: "/editar/perfil",
          data: formData,
          contentType: false,
          processData: false,
          success: function (data) {
            if (data.status == 1) {
              localStorage.setItem("formProfile", "1");
              localStorage.setItem("msgProfile", data.msg);
              window.location.href = window.location.href;
            }
          }
        });
      } else {
        jQuery("html, body").animate({
          scrollTop: jQuery(".error-border").offset().top - jQuery(".container-header").outerHeight() - 40,
        }, 1000);
      }
    });
  }

  var phrase = "";

  //user_register
  function user_register() {
    jQuery("#btn-user-register").click(function (e) {
      console.log("ejecut register bt");
      var value_error = 0;
      var name = jQuery("#register-name").val();
      var lastname = jQuery("#register-lastname").val();
      var telephone = jQuery("#register-telephone").val();
      var email = jQuery("#register-email").val();
      var dpto = jQuery("#register-department").prop("selected", true).val();
      var gender = jQuery("#register-gender").prop("selected", true).val();
      var city = jQuery("#register-city").prop("selected", true).val();
      var password1 = jQuery("#register-password1").val();
      var password2 = jQuery("#register-password2").val();
      var fbid = jQuery("#fbid").val();
      var gid = jQuery("#gid").val();
      var tyc = jQuery("#register-tyc").is(":checked");
      var newsletter = jQuery("#register-newsletter").is(":checked");
      var pre_recipes = jQuery("#pre-recipes").is(":checked");
      var pre_nutrition = jQuery("#pre-nutrition").is(":checked");
      var pre_sustainability = jQuery("#pre-sustainability").is(":checked");
      var preferences_group = jQuery(".preferences input");


      //Validations
      //name
      if (name == "") {
        jQuery("#register-name").parent().find(".error").fadeIn();
        jQuery("#register-name").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-name").parent().find(".error").fadeOut();
        jQuery("#register-name").removeClass("error-border");
      }

      //lastname
      if (lastname == "") {
        jQuery("#register-lastname").parent().find(".error").fadeIn();
        jQuery("#register-lastname").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-lastname").parent().find(".error").fadeOut();
        jQuery("#register-lastname").removeClass("error-border");
      }
      //telephone
      if (telephone.length == "") {
        jQuery("#register-telephone").parent().find(".error").fadeIn();
        jQuery("#register-telephone").addClass("error-border");
        value_error = 1;
      } else if (telephone.length < 7 || telephone.length > 10) {
        jQuery("#register-telephone").parent().find(".error").html("Campo entre 7 y 10 carácteres.");
        jQuery("#register-telephone").parent().find(".error").fadeIn();
        jQuery("#register-telephone").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-telephone").parent().find(".error").fadeOut();
        jQuery("#register-telephone").removeClass("error-border");
      }

      //email
      var regex_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (email == "") {
        jQuery("#register-email").parent().find(".error").fadeIn();
        jQuery("#register-email").addClass("error-border");
        value_error = 1;
      } else if (!regex_email.test(email)) {
        jQuery("#register-email").parent().find(".error").html("Introduce una dirección de correo electrónico válida.");
        jQuery("#register-email").parent().find(".error").fadeIn();
        jQuery("#register-email").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-email").parent().find(".error").fadeOut();
        jQuery("#register-email").removeClass("error-border");
      }

      //department
      if (dpto == 0) {
        jQuery("#register-department").parent().find(".error").fadeIn();
        jQuery("#register-department").parent().find(".nice-select").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-department").parent().find(".error").fadeOut();
        jQuery("#register-department").parent().find(".nice-select").removeClass("error-border");
      }

      //gender
      if (gender == 0) {
        jQuery("#register-gender").parent().find(".error").fadeIn();
        jQuery("#register-gender").parent().find(".nice-select").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-gender").parent().find(".error").fadeOut();
        jQuery("#register-gender").parent().find(".nice-select").removeClass("error-border");
      }

      //city
      if (city == 0) {
        jQuery("#register-city").parent().find(".error").fadeIn();
        jQuery("#register-city").parent().find(".nice-select").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-city").parent().find(".error").fadeOut();
        jQuery("#register-city").parent().find(".nice-select").removeClass("error-border");
      }

      //tyc
      if (!tyc) {
        jQuery("#register-tyc").parent().parent().find(".error").fadeIn();
        jQuery("#register-tyc").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#register-tyc").parent().parent().find(".error").fadeOut();
        jQuery("#register-tyc").removeClass("error-border");
      }

      if (fbid == "" && gid == "") {
        //password1
        if (password1.length < 8) {
          jQuery("#register-password1").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
          jQuery("#register-password1").parent().find(".error").fadeIn();
          jQuery("#register-password1").addClass("error-border");
          value_error = 1;
        } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password1) == false) {
          jQuery("#register-password1").parent().find(".error").html("La contraseña debe ser alfanumérica.");
          jQuery("#register-password1").parent().find(".error").fadeIn();
          jQuery("#register-password1").addClass("error-border");
          value_error = 1;
        } else {
          jQuery("#register-password1").parent().find(".error").fadeOut();
          jQuery("#register-password1").removeClass("error-border");
        }

        //password2
        if (password2.length < 8) {
          jQuery("#register-password2").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else if (password2 == "" || password2 != password1) {
          jQuery("#register-password2").parent().find(".error").html("Las contraseñas no coinciden.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password2) == false) {
          jQuery("#register-password2").parent().find(".error").html("La contraseña debe ser alfanumérica.");
          jQuery("#register-password2").parent().find(".error").fadeIn();
          jQuery("#register-password2").addClass("error-border");
          value_error = 1;
        } else {
          jQuery("#register-password2").parent().find(".error").fadeOut();
          jQuery("#register-password2").removeClass("error-border");
        }
      }

      //preferences
      // var chosen_preferences = [];
      //
      // preferences_group.each(function(index, element) {
      //
      //   if(element.checked){
      //     chosen_preferences.push(element);
      //   }
      //
      // });
      // if (!chosen_preferences.length > 0) {
      //   jQuery(".preferences input").closest(".preferences-group").find(".error").fadeIn();
      // }else{
      //   jQuery(".preferences input").closest(".preferences-group").find(".error").fadeOut();
      // }

      //preferences

      if (preferences_group) {
        value_error = 1;
        jQuery(preferences_group).each(function (indice, element) {
          // console.log(element.id);
          // console.log(jQuery('#' + element.id + ':checked').val());
          if (jQuery('#' + element.id + ':checked').val() == 'on') {
            value_error = 0;
          }
        });
        // console.log(value_error);
      }


      //ajax register
      if (value_error == 0) {
        jQuery.ajax({
          type: "POST",
          url: "/registrar/usuario",
          data: {
            nombres: name,
            apellidos: lastname,
            telefono: telephone,
            email: email,
            departamento: dpto,
            ciudad: city,
            genero: gender,
            password: password1,
            tyc: tyc,
            newsletter: newsletter,
            pre_recipes: pre_recipes,
            pre_nutrition: pre_nutrition,
            pre_sustainability: pre_sustainability,
            frase: phrase,
            fbid: fbid,
            gid: gid,
          },
          success: function (data) {
            if (data.status == 1) {
              jQuery(".modal-successful .content-title p").text(data.msg);
              jQuery(".modal-successful .content-title a").attr("href", data.redirect);
              jQuery(".modal-successful").modal("show");
              sessionStorage.setItem("logueado", "1");

              jQuery(".modal-successful").on("hidden.bs.modal", function (e) {
                window.location.href = data.redirect;
              });
            } else {
              jQuery(".modal-unsuccessful .content-title p").text(data.msg);
              jQuery(".modal-unsuccessful").modal("show");
              sessionStorage.setItem("logueado", "0");
            }
          }
        });
      } else {
        jQuery("html, body").animate({
          scrollTop: jQuery(".error-border").offset().top - jQuery(".container-header").outerHeight() - 40,
        }, 1000);
      }
    });
  }

  //recover_password
  function recover_password() {
    jQuery("#btn-recover-password").click(function (e) {
      var value_error = 0;
      var email = jQuery("#recover-email").val();
      var regex_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      var btnReturn = "<span id='btn-return' class='btn-default back-red' data-toggle='modal' data-target='#modal-recover' data-seo='btn-content'>Volver</span>";
      localStorage.setItem("recover_email", email);

      //Validations
      //email
      if (email == "") {
        jQuery("#recover-email").parent().find(".error").fadeIn();
        jQuery("#recover-email").addClass("error-border");
        value_error = 1;
      } else if (!regex_email.test(email)) {
        jQuery("#recover-email").parent().find(".error").html("Introduce una dirección de correo electrónico válida.");
        jQuery("#recover-email").parent().find(".error").fadeIn();
        jQuery("#recover-email").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#recover-email").parent().find(".error").fadeOut();
        jQuery("#recover-email").removeClass("error-border");
      }

      //ajax recover
      if (value_error == 0) {
        jQuery.ajax({
          type: "POST",
          url: "/olvidar/contrasena",
          data: {
            name: email,
          },
          success: function (data) {
            if (data.status == 1) {
              jQuery(".modal-recover").modal("hide");
              jQuery(".modal-email").modal("show");
            } else {
              jQuery(".modal-recover").modal("hide");
              jQuery(".modal-unsuccessful .content-title p").text(data.msg);
              jQuery(".modal-unsuccessful .content-title #btn-return").remove();
              jQuery(".modal-unsuccessful .content-title").append(btnReturn);
              jQuery(".modal-unsuccessful").modal("show");
              btn_return();
            }
          }
        });
      }
    });
  }

  //reset_password
  function reset_password() {
    jQuery("#btn-reset-password").click(function (e) {
      var value_error = 0;
      var password1 = jQuery("#reset-password1").val();
      var password2 = jQuery("#reset-password2").val();

      //Validations
      //password1
      if (password1.length < 8) {
        jQuery("#reset-password1").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
        jQuery("#reset-password1").parent().find(".error").fadeIn();
        jQuery("#reset-password1").addClass("error-border");
        value_error = 1;
      } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password1) == false) {
        jQuery("#reset-password1").parent().find(".error").html("La contraseña debe ser alfanumérica.");
        jQuery("#reset-password1").parent().find(".error").fadeIn();
        jQuery("#reset-password1").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#reset-password1").parent().find(".error").fadeOut();
        jQuery("#reset-password1").addClass("error-border");
      }

      //password2
      if (password2.length < 8) {
        jQuery("#reset-password2").parent().find(".error").html("La contraseña debe ser mínimo 8 caracteres.");
        jQuery("#reset-password2").parent().find(".error").fadeIn();
        jQuery("#reset-password2").addClass("error-border");
        value_error = 1;
      } else if (password2 == "" || password2 != password1) {
        jQuery("#reset-password2").parent().find(".error").html("Las contraseñas no coinciden.");
        jQuery("#reset-password2").parent().find(".error").fadeIn();
        jQuery("#reset-password2").addClass("error-border");
        value_error = 1;
      } else if (/^(?=.*[0-9])(?=.*[a-zA-ZñÑ])([a-zñA-ZÑ0-9]+)$/.test(password2) == false) {
        jQuery("#reset-password2").parent().find(".error").html("La contraseña debe ser alfanumérica.");
        jQuery("#reset-password2").parent().find(".error").fadeIn();
        jQuery("#reset-password2").addClass("error-border");
        value_error = 1;
      } else {
        jQuery("#reset-password2").parent().find(".error").fadeOut();
        jQuery("#reset-password2").revemoClass("error-border");
      }

      //ajax reset
      if (value_error == 0) {
        jQuery.ajax({
          type: "POST",
          url: "/restablecer/contrasena",
          data: {
            password1: password1,
            password2: password2,
          },
          success: function (data) {
            if (data.status == 1) {
              jQuery(".modal-successful .content-title p").text(data.msg);
              jQuery(".modal-successful").modal("show");
            } else {
              jQuery(".modal-unsuccessful .content-title p").text(data.msg);
              jQuery(".modal-unsuccessful").modal("show");
            }
          }
        });
      }
    });
  }

  //resend_email
  function resend_email() {
    jQuery("#resend-email").on("click", function (e) {
      if (localStorage.recover_email != "") {
        var email = localStorage.recover_email;

        jQuery.ajax({
          type: "POST",
          url: "/olvidar/contrasena",
          data: {
            name: email,
          },
          success: function (data) {
            if (data.status == 1) {
              jQuery(".modal-email").modal("hide");
            }
          }
        });
      }
    });
  }

  //Call Functions
  formProfile();
  update_dpto_city();

  user_edit();
  user_login();
  user_register();
  recover_password();
  resend_email();
  //reset_password();

  //show phrases

  jQuery("#pre-nutrition").change(function () {
    phrase = "";
    if (jQuery("#pre-recipes").is(":checked")) {
      jQuery("#pre-recipes").closest(".preferences-group").find(".list-phrases").removeClass("list-active");
    }
  });

  jQuery("#pre-sustainability").change(function () {
    phrase = "";
    if (jQuery("#pre-recipes").is(":checked")) {
      jQuery("#pre-recipes").closest(".preferences-group").find(".list-phrases").removeClass("list-active");
    }
  });

  jQuery("#pre-recipes").change(function () {
    if (jQuery(this).is(":checked")) {

      if (!jQuery("#pre-nutrition").is(":checked") && !jQuery("#pre-sustainability").is(":checked")) {
        jQuery(this).closest(".preferences-group").find(".list-phrases").addClass("list-active");
      }

    } else {
      jQuery(this).closest(".preferences-group").find(".list-phrases").removeClass("list-active");
    }
  });

  jQuery(".list-phrases input[name=register-phrase]").change(function () {
    phrase = "";

    if (jQuery(this).is(":checked")) {
      phrase = jQuery("input[name=register-phrase]:checked").val();
    }
  });
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Window onLoad
jQuery(window).on("load", function (e) {
  //select update dpto-city
  jQuery("#register-city, #edit-ciudad").parent().find(".nice-select").addClass("disabled");

  //Height NiceSelect
  jQuery("select").each(function (i, item) {
    var heigh = jQuery(item).parent().find(".nice-select .list").height();
    if (heigh < 250) {
      jQuery(item).parent().find(".nice-select .list").css("height", "auto");
      jQuery(item).parent().find(".nice-select .list").css("overflow", "hidden");
    } else {
      jQuery(item).parent().find(".nice-select .list").css("height", 250);
      jQuery(item).parent().find(".nice-select .list").css("overflow", "scroll");
    }
  });
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
//Facebook Api
window.fbAsyncInit = function (e) {
  FB.init({
    appId: "327370565122115",
    cookie: true,
    xfbml: true,
    version: "v8.0"
  });
  FB.AppEvents.logPageView();
};

/*(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if(d.getElementById(id)){
    return;
  }
  js = d.createElement(s);
  js.id = id;
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");*/

function facebook_api() {
  FB.login(
    function (response) {
      if (response.status === "connected") {
        if (response.authResponse) {
          var access_token = response.authResponse.accessToken;
          var userID = response.authResponse.userID;
          var btnReturn = "<span id='btn-return' class='btn-default back-red' data-toggle='modal' data-target='#modal-login' data-seo='btn-content'>Volver</span>";

          //dataResponsive FB
          FB.api("/me", {fields: "name, first_name, last_name, email, picture"},
            function (response) {
              if (window.location.pathname.indexOf("registrarse") == 1) {
                jQuery("#fbid").val(userID);
                jQuery("#register-name").val(response.first_name);
                jQuery("#register-lastname").val(response.last_name);
                jQuery("#register-email").val(response.email);
                jQuery("#register-email, #register-password1, #register-password2").addClass("disabled");
              }

              //Facebook Login Modal
              if (jQuery("#modal-login").is(":visible") == true) {
                jQuery.ajax({
                  type: "POST",
                  url: "/iniciar/sesion",
                  data: {
                    username: response.email,
                    password: "",
                    fbid: userID,
                    gid: "",
                  },
                  success: function (data) {
                    if (data.status == 1) {
                      sessionStorage.setItem("logueado", "1");
                      window.location.href = window.location.href;
                    } else {
                      jQuery(".modal-login").modal("hide");
                      jQuery(".modal-unsuccessful .content-title p").text(data.msg);
                      jQuery(".modal-unsuccessful .content-title #btn-return").remove();
                      jQuery(".modal-unsuccessful .content-title").append(btnReturn);
                      jQuery(".modal-unsuccessful").modal("show");
                      sessionStorage.setItem("logueado", "0");
                      btn_return();
                    }
                  }
                });
              }
            }
          );
        } else {
          //User presses the 'cancel' button
          jQuery(".modal-login").modal("hide");
          jQuery(".modal-unsuccessful .content-title p").text("Se cancelo el login o se cancelo la autorización de Facebook.");
          jQuery(".modal-unsuccessful .content-title #btn-return").remove();
          jQuery(".modal-unsuccessful .content-title").append(btnReturn);
          jQuery(".modal-unsuccessful").modal("show");
          btn_return();
        }
      } else {
        //User is not logged in
        jQuery(".modal-login").modal("hide");
        jQuery(".modal-unsuccessful .content-title p").text("Debes iniciar sesión en Facebook.");
        jQuery(".modal-unsuccessful .content-title #btn-return").remove();
        jQuery(".modal-unsuccessful .content-title").append(btnReturn);
        jQuery(".modal-unsuccessful").modal("show");
        btn_return();
      }
    },
    {
      scope: "email",
    }
  );

  function checkLoginState() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }
}

//Google Api
var auth2;
var googleUser = {};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
}

window.onLoadCallback = function (e) {
  gapi.load("auth2", function (e) {
    auth2 = gapi.auth2.init({
      //dev
      //client_id: "207064269970-6r42erllskagdo3om0suai25bofmshtd.apps.googleusercontent.com",
      //Prod
      client_id: "529787098147-un6st2v2dkf82eehb6qp79j05hhcld3v.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
    });
    if (window.location.pathname == "/registrarse") {
      google_api();
    }
  });
};

var google_api = function (e) {
  var btnReturn = "<span id='btn-return' class='btn-default back-red' data-toggle='modal' data-target='#modal-login' data-seo='btn-content'>Volver</span>";
  if (jQuery("#modal-login").is(":visible") == true) {
    element = document.getElementById("btn-gmail-login");
  } else {
    element = document.getElementById("btn-gmail-register");
  }

  auth2.attachClickHandler(
    element, {},
    function (googleUser) {
      var profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;

      if (window.location.pathname.indexOf("registrarse") == 1) {
        jQuery("#gid").val(profile.getId());
        jQuery("#register-name").val(profile.getGivenName());
        jQuery("#register-lastname").val(profile.getFamilyName());
        jQuery("#register-email").val(profile.getEmail());
        jQuery("#register-email, #register-password1, #register-password2").addClass("disabled");
      }

      //Google Login Modal
      if (jQuery("#modal-login").is(":visible") == true) {
        jQuery.ajax({
          type: "POST",
          url: "/iniciar/sesion",
          data: {
            username: profile.getEmail(),
            password: "",
            fbid: "",
            gid: profile.getId(),
          },
          success: function (data) {
            if (data.status == 1) {
              sessionStorage.setItem("logueado", "1");
              window.location.href = window.location.href;
            } else {
              jQuery(".modal-login").modal("hide");
              jQuery(".modal-unsuccessful .content-title p").text(data.msg);
              jQuery(".modal-unsuccessful .content-title #btn-return").remove();
              jQuery(".modal-unsuccessful .content-title").append(btnReturn);
              jQuery(".modal-unsuccessful").modal("show");
              sessionStorage.setItem("logueado", "0");
              btn_return();
            }
          }
        });
      }
    },
    function (error) {
      jQuery(".modal-login").modal("hide");
      jQuery(".modal-unsuccessful .content-title p").text("Debes iniciar sesión en Google.");
      jQuery(".modal-unsuccessful .content-title #btn-return").remove();
      jQuery(".modal-unsuccessful .content-title").append(btnReturn);
      jQuery(".modal-unsuccessful").modal("show");
      btn_return();
    }
  );
};

/*btnReturn*/
function btn_return() {
  setTimeout(function (e) {
    jQuery("#btn-return").click(function (e) {
      jQuery(".modal-unsuccessful").modal("hide");
      jQuery("#btn-return").remove();
    });
    jQuery(".modal-unsuccessful").on("hidden.bs.modal", function (e) {
      jQuery("#btn-return").remove();
    });
  }, 100);
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
