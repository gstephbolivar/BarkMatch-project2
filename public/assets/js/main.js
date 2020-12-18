$(function() {
    $(".navbar-item").on("click", function(){
        window.location.href = "/volunteers/dogalog";
    });

    $.ajax({
        type: "GET",
        url: "/api/user_data"
    }).then((data) => {
        if(data.username){
            $('#logout').show();
            $('#username').text(data.name);
            $('#username').parent().show();
        }
    })

    $('#logout').on('click', () => {
        $('#logout').hide();
        $('#username').parent().hide();
    })
})