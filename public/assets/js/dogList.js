document.addEventListener("DOMContentLoaded", function () {
  /* SIGN UP MODAL JAVASCRIPT */
  console.log("JS is linked");

  class BulmaModal {
    constructor(selector) {
      this.elem = document.querySelector(selector);
      this.close_data();
    }

    show() {
      this.elem.classList.toggle("is-active");
      this.on_show();
    }

    close() {
      this.elem.classList.toggle("is-active");
      this.on_close();
    }

    close_data() {
      var modalClose = this.elem.querySelectorAll(
        "[data-bulma-modal='close'], .modal-background"
      );
      var that = this;
      modalClose.forEach(function (e) {
        e.addEventListener("click", function () {
          that.elem.classList.toggle("is-active");

          var event = new Event("modal:close");

          that.elem.dispatchEvent(event);
        });
      });
    }

    on_show() {
      var event = new Event("modal:show");

      this.elem.dispatchEvent(event);
    }

    on_close() {
      var event = new Event("modal:close");

      this.elem.dispatchEvent(event);
    }

    addEventListener(event, callback) {
      this.elem.addEventListener(event, callback);
    }
  }

  var dogBtn = document.querySelector("#dogBtn");
  var closeBtn = document.querySelector("#closeBtn");
  var signUpBtn = document.querySelector("#dogBtn");
  var mdl = new BulmaModal("#signUpModal");

  dogBtn.addEventListener("click", function () {
    $('#modal-dog-name').text(this.dataset.name);
    mdl.show();
  });

  signUpBtn.addEventListener("click", function () {
    // script needed to go to sign up page
  });

  closeBtn.addEventListener("click", function () {
    mdl.close();
  });

  mdl.addEventListener("modal:show", function () {
    console.log("opened");
  });

  mdl.addEventListener("modal:close", function () {
    console.log("closed");
  });
});
