$(document).ready(function () {
  $(".register-users").validate({
    rules: {
      name: {
        required: true,
        lettersonly: true
      },
    }
  });

  jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
  }, "Solo caracteres A-Z");
});
