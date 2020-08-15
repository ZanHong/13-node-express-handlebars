$(function () {
    $(".burger-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger-input").val().trim()
        };

        // Sends POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("A new burger for you to devour!");
            // reload the page to get updated list
            location.reload();
        });
    });

    $(".devourBtn").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredBurger = {
            // this changes devoured to "true"
            devoured: 1
        };

        // Sends PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredBurger
        }).then(function () {
            console.log("Omnomnom");
            // reload the page to get updated list
            location.reload();
        })
    })
});