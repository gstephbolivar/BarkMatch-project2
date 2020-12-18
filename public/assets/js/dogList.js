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

  var closeBtn = document.querySelector("#closeBtn");
  var signUpBtn = document.querySelector("#signUpBtn");
  var mdl = new BulmaModal("#signUpModal");

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("dogBtn")) {
      $("#signUpBtn").attr("data-id", event.target.dataset.dogid);
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

$(document).ready(function(){

  $('#gender-select, #size-select, #energy-select').on('change', () => {
    
      const query = {};
      let url= "/api/dogs/filter?";

      const gender = $('#gender-select option:checked').val();
      const size = $('#size-select option:checked').val();
      const energy = $('#energy-select option:checked').val();

      if(gender){
        url += `gender=${gender}`;
      }
     
      if(size){
        url += `&size=${size}`;
      }

      if(energy){
        url += `&energy_level=${energy}`;
      }

      filterDogs(url);

  })

  $('#clearBtn').on('click', () => {
     $('#gender-select').val('');
     $('#size-select').val('');
     $('#energy-select').val('');

     filterDogs('/api/dogs/filter');
  })

  function filterDogs(url){
    $.ajax({
      type: 'GET',
      url: url
    }).then((data) => {
        $('.dog-container').empty();

        data.forEach(dog => {
          $('.dog-container').append(createDogCard(dog));
        })
    })
  }

  function createDogCard(dog){
    const html = `<div class='column is-4'>
    <div class="card" style="margin: 10px;">
        <div class="card-image">
            <figure class="image is-1by1">
                <img src="${dog.img_path}" alt="Picture of ${dog.name}" />
            </figure>
        </div>
        <div class="card-content is-centered">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4 has-text-dark" id="dog-name">${dog.name}</p>
                    <p class="subtitle is-6 has-text-dark">Age: ${dog.age}</p>
                    <p class="subtitle is-6 has-text-dark">Breed: ${dog.breed}</p>
                    <p class="subtitle is-6 has-text-dark">Gender: ${dog.gender}</p>
                    <p class="subtitle is-6 has-text-dark">Size: ${dog.size}</p>
                    <p class="subtitle is-6 has-text-dark">Energy Level: ${dog.energy_level}</p>
                </div>
            </div>
            <div class="content">
            ${dog.bio}
                <br />
            </div>
            <p class="subtitle is-6 has-text-dark">${dog.available ? 'Available' : 'Unavailable'}</p>
        </div>
        <footer class="card-footer">
            <button class="button card-footer-item is-success is-light dogBtn" ${dog.available ? "" : 'disabled style="background: #c7c4c4;' } data-name="${dog.name}" data-dogid="${dog.id}">Walk
                ${dog.name}!</button>
        </footer>
    </div>
</div>`;

return html;
  }
})

