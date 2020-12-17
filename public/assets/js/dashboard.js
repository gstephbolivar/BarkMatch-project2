
$('#yesBtn').on('click', function(){

        $.ajax({
            url: "/api/dogs/" + $(this).data('id'),
            type: "DELETE",
        }).then(() => {
            window.location.reload();
        })
  })

$(".availableBtn").on('click', function() {
  if (this.name === "false"){
    let dogID = $(this).data('id');
    let query = `/api/dogs/${dogID}`;
    
    $.ajax({
      type: "PUT",
      url: query,
      data: {
        available: true,
        flag: true,
      }
    }).then((data) => {
      window.location.reload();
    })
  }
})

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

  var deleteBtn = document.querySelector(".deleteBtn");
  var closeBtn = document.querySelector("#closeBtn");
  var addBtn = document.querySelector("#addBtn");
  var noBtn = document.querySelector("#noBtn");
  var yesBtn = document.querySelector("#yesBtn");
  var mdl = new BulmaModal("#deleteModal");

  addBtn.addEventListener("click", function () {
    window.location.href = "/dashboard/add";
  });

  document.addEventListener('click', function(event){
    if(event.target.classList.contains("deleteBtn")){
        $('#yesBtn').attr("data-id", event.target.dataset.id);
        $("#modal-dog-name").text(event.target.dataset.dogname);
        mdl.show();
    }
  });

  yesBtn.addEventListener("click", function () {
    const btn = $(this);

    $.ajax({
      url: "/api/dogs/" + $deleteBtn.data("id"),
      type: "DELETE",
    }).then(() => {
      window.location.reload();
    });
  });

  closeBtn.addEventListener("click", function () {
    mdl.close();
  });

  noBtn.addEventListener("click", function () {
    mdl.close();
  });

  mdl.addEventListener("modal:show", function () {
    console.log("opened");
  });

  mdl.addEventListener("modal:close", function () {
    console.log("closed");
  });
});
