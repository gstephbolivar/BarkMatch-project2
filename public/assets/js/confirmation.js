// buttons for location and call feature
var googleBtn = document.querySelector("#googleBtn");
var callBtn = document.querySelector("#callBtn");

googleBtn.addEventListener("click", function () {

    window.open( 
        "https://www.google.com/maps?q=981+Howell+Mill+Road+NW,+Atlanta,+GA+30318", "_blank"); 

  });

  callBtn.addEventListener("click", function () {

    window.open( 
        "tel:+1-303-499-7111", "_blank"); 

  });

  