$(document).ready(function () {
    $('.close_menu').click(function () {
        Click_menu();
    });

    $('.close_add').click(function () {
        $('.add').addClass("hide");
        $('.add').removeClass("show");
    })

    $('.category_add').click(() => {
        $('.add').addClass("show");
        $('.add').removeClass("hide");
    })

    $('#sl').change(function () {
        document.forms[name = "search"].submit();
    })

    $('.create_New').click(function () {
        
    })
});

// Function CLick nav-Menu

var n = 0;
function Click_menu() {
    if (n % 2 == 0) {
        $('.menu_admin').addClass("divao");
        $('.close_menu').addClass("nav-menu");
        $('.nav_admin').addClass("nav-divao");
        $('.content').addClass("resize");
    }
    if (n % 2 == 1) {
        $('.menu_admin').removeClass("divao");
        $('.close_menu').removeClass("nav-menu");
        $('.nav_admin').removeClass("nav-divao");
        $('.content').removeClass("resize");
    }
    n = n + 1;
}

// End --------------------
