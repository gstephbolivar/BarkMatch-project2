document.addEventListener("DOMContentLoaded", function () {
  /* SIGN UP MODAL JAVASCRIPT */
  console.log("JS is linked");

  $(".create-form").on("submit", function(event){
  event.preventDefault();

  console.log(this);
  const formData = new FormData(this);
  let gender = $("#filter-gender").val();
  let size = $("#filter-size").val();
  let energy = $("#filter-energy_level").val();

  $.ajax({
    type: "GET",
    url: `/dogs/${gender}/${size}/${energy}`,
  }).then((data) => {
    window.location.href = `/dogs/${gender}/${size}/${energy}`
  }).catch(err => {
    console.log(err);
  });
  })

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

  var closeBtn = document.querySelector("#closeBtn");
  var signUpBtn = document.querySelector("#signUpBtn");
  var mdl = new BulmaModal("#signUpModal");

  document.addEventListener('click', function(event){
    if(event.target.classList.contains("dogBtn")){
      $('#signUpBtn').attr("data-id", event.target.dataset.dogid);
      $("#modal-dog-name").text(event.target.dataset.name);
      mdl.show();
    }
  });

  signUpBtn.addEventListener("click", function () {
    // script needed to go to sign up page
    window.location.href = `/volunteers/signup/${this.dataset.id}`;
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

