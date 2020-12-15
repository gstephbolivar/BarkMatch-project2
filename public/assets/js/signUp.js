$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    
    let name = $("#volunteer-name").val().trim();
    let email = $("#volunteer-email").val().trim();
    let phone = $("#volunteer-number").val().trim();
    let id = $("#id").val();
   
    console.log(id);
    

    $.ajax({
      type: "POST",
      url: "/api/volunteers/signup",
      data: {
          name, email, phone, dogId: id
      },
    })
      .then(function (data) {
        // window.location.href = "/volunteers/confirmation/:id";
        console.log(data);
        console.log("Inputted volunteer information");
      })
      .catch((err) => {
        console.log(err);
      });

  });
});
