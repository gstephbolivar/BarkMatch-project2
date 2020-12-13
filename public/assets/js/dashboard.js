$(function(){
    $('#addBtn').on('click', function(){
        window.location.href = "/dashboard/add";
    });

    $('.deleteBtn').on('click', function(){
        $('.modal').addClass('is-active');
    })

    $('.yesBtn').on('click', function(){
        const btn = $(this);

        $.ajax({
            url: "/api/dogs/" + $('.deleteBtn').data('id'),
            type: "DELETE",
        }).then(() => {
            window.location.reload();
        })
    })

    $('.noBtn').on('click', function(){
        $('.modal').removeClass("is-active");
    })
})
