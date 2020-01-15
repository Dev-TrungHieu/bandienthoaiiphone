let dem = 0;

function dangnhap() {
    if (dem % 2 == 1) {
        var element = document.getElementById("menu-user");
        element.classList.add("menu-user");
    }
    if (dem % 2 == 0) {
        var element = document.getElementById("menu-user");
        element.classList.remove("menu-user");
    }
    dem = dem + 1;
}

function show() {
    var element = document.getElementById("show");
    element.setAttribute("hidden", "hidden");
    var element1 = document.getElementById("hidden");
    element1.removeAttribute("hidden");
    var element1 = document.getElementById("hidden1");
    element1.removeAttribute("hidden");
    var element2 = document.getElementById("my-input1");
    element2.removeAttribute("disabled");
    var element2 = document.getElementById("my-input2");
    element2.removeAttribute("disabled");
    var element2 = document.getElementById("my-input3");
    element2.removeAttribute("disabled");
    var element2 = document.getElementById("my-input4");
    element2.removeAttribute("disabled");
    var element2 = document.getElementById("my-input");
    element2.removeAttribute("disabled");
}

function hide() {
    var element = document.getElementById("show");
    element.removeAttribute("hidden");
    var element1 = document.getElementById("hidden");
    element1.setAttribute("hidden", "hidden");
    var element1 = document.getElementById("hidden1");
    element1.setAttribute("hidden", "hidden");
    var element2 = document.getElementById("my-input");
    element2.setAttribute("disabled", "disabled");
    var element2 = document.getElementById("my-input1");
    element2.setAttribute("disabled", "disabled");
    var element2 = document.getElementById("my-input2");
    element2.setAttribute("disabled", "disabled");
    var element2 = document.getElementById("my-input3");
    element2.setAttribute("disabled", "disabled");
    var element2 = document.getElementById("my-input4");
    element2.setAttribute("disabled", "disabled");
}

function check_password() {
    document.addEventListener("change", () => {
        var old_password = document.getElementsByName("password")[0].value;
        var new_password = document.getElementsByName("new_password")[0].value;
        var entry_password = document.getElementsByName("entry_password")[0].value;
        console.log(old_password);
        console.log(new_password);
        console.log(entry_password);
        if (entry_password == "") {
            document.getElementById("notify").classList.add("hidden");
            document.getElementById("hidden").setAttribute("disabled", "disabled");
        } else if (new_password == entry_password) {
            var notify = document.getElementById("notify");
            notify.classList.remove("hidden");
            notify.style.color = "green";
            notify.innerHTML = "Password matched !";
            document.getElementById("hidden").removeAttribute("disabled");
        } else {
            var notify = document.getElementById("notify");
            notify.classList.remove("hidden");
            notify.style.color = "red";
            notify.innerHTML = "Password doesn't match, try it !";
            document.getElementById("hidden").setAttribute("disabled", "disabled");
        }
    })
}

function quantity_change() {
    document.addEventListener("change", () => {
        var element = document.getElementById("order_item");
        var value = element.value;
        if (value >= 20) {
            element.value = 20;
        }
    })
}

document.addEventListener("DOMContentLoaded", (Event) => {
    check_password();
    quantity_change();
});