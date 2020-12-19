// Sign up page for volunteer
$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    let name = $("#volunteer-name").val().trim();
    let email = $("#volunteer-email").val().trim();
    let phone = $("#volunteer-number").val().trim();
    let id = $("#id").val();

    $.ajax({
      type: "POST",
      url: "/api/volunteers/signup",
      data: {
        name,
        email,
        phone,
        dogId: id,
      },
    })
      .then(function (data) {
        window.location.href = `/volunteers/confirmation/${data.volunteerId}/${data.dog.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
