$(function () {
  // The following variables and ajax GET call is to properly check the boxes in the edit form with the current data from the dog chosen.
  let dogID = $(".edit-form").data("id");
  let query = `/api/dogs/${dogID}`;

  $.ajax({
    type: "GET",
    url: query,
  }).then(function (dog) {
    console.log(dog[0].gender);
    if (dog[0].gender === "Male") {
      $("#dog-male").prop("selected", true);
    } else {
      $("#dog-female").prop("selected", true);
    }

    if (dog[0].size === "Small") {
      $("#dog-small").prop("selected", true);
    } else if (dog[0].size === "Medium") {
      $("#dog-medium").prop("selected", true);
    } else {
      $("#dog-large").prop("selected", true);
    }

    if (dog[0].energy_level === "Low") {
      $("#dog-low").prop("selected", true);
    } else if (dog[0].energy_level === "Moderate") {
      $("#dog-moderate").prop("selected", true);
    } else {
      $("#dog-high").prop("selected", true);
    }
  });
  // Logic to make the POST to the db
  $("#edit-dog").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    let dogID = $(".edit-form").data("id");

    //Gather form data
    const formData = new FormData(this);

    let query = `/api/dogs/${dogID}`;

    $.ajax({
      type: "PUT",
      url: query,
      data: formData,
      contentType: false,
      processData: false,
    })
      .then(function (data) {
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#profile-pic").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#img_path").change(function () {
    let path = $(this).val();
    path = path.replace("C:\\fakepath\\", "");
    $(".file-name").text(path);
    readURL(this);
  });

  // Cancel back to dashboard btn //

  var cancelBtn = document.querySelector("#cancelBtn");

  cancelBtn.addEventListener("click", function () {
    window.location.href = "/dashboard";
  });
});
