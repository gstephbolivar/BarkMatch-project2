$(function() {
    // Logic to make the POST to the db
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        //Gather form data
        const formData = new FormData(this);
    
        $.ajax({
          type: "POST",
          url: "/api/dogs",
          data: formData,
          contentType: false,
          processData: false         
        })
        .then(function(data) {
           console.log(data.id);       
        })
        .catch(err => {
          console.log(err);
        });


        // let newDog = {
        //   name: $("#dog-name").val().trim(),
        //   age: $("#dog-age").val().trim(),
        //   breed: $("#dog-breed").val().trim(),
        //   bio: $("#dog-bio").val().trim(),
        //   gender: $("input[name=gender]:checked").data('name'),
        //   size: $("input[name=size]:checked").data('name'),
        //   energy_level: $("input[name=energy]:checked").data('name'),
        // };
        // console.log(newDog);

        // Send the POST request.
        // $.ajax("/api/dogs", {
        //   type: "POST",
        //   data: newDog
        // }).then(
        //   function() {
        //     console.log("created new dog");
        //     console.log(newDog);
        //     // Reload the page to get the updated list
        //     location.reload();
          
        // }
        // );
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
        readURL(this);
      });
})