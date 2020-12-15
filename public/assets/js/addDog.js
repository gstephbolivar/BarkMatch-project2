$(function() {

    // Logic to make the POST to the db
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        //Gather form data
        const formData = new FormData(this);
        console.log(formData.values());
        $.ajax({
          type: "POST",
          url: "/api/dogs",
          data: formData,
          contentType: false,
          processData: false         
        })
        .then(function(data) {      
           window.location.href = "/dashboard";
        })
        .catch(err => {
          console.log(err);
        });
      });

      // Cancel back to dashboard btn //

      var cancelBtn = document.querySelector("#cancelBtn");

      cancelBtn.addEventListener("click", function () {
        window.location.href = "/dashboard";
      });

      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('#profile-pic').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
      }
      
      $("#img_path").change(function() {
        let path = $(this).val();
        path = path.replace("C:\\fakepath\\", "");
        $('.file-name').text(path);
        readURL(this);
      });
})