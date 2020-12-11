$(function() {
    // Logic to make the POST to the db
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        let newDog = {
          name: $("#dog-name").val().trim(),
          age: $("#dog-age").val().trim(),
          breed: $("#dog-breed").val().trim(),
          bio: $("#dog-bio").val().trim(),
          gender: $("[name=gender]:checked").val().trim(),
          size: $("[name=size]:checked").val().trim(),
          energy_level: $("[name=energy]:checked").val().trim(),
        };
        console.log(newDog);

        // Send the POST request.
        $.ajax("/api/dogs", {
          type: "POST",
          data: newDog
        }).then(
          function() {
            console.log("created new dog");
            console.log(newDog);
            // Reload the page to get the updated list
            location.reload();
          
        }
        );
      });
})