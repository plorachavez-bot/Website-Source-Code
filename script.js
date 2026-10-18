
function displayOrder() {
    // Only run this function on order.html
    const orderList = document.getElementById("orderList");

    if (!orderList) {
        return;
    }

    // Retrieve the saved drinks from localStorage
    const order = JSON.parse(localStorage.getItem("order")) || [];

    // Clear the current order list
    orderList.innerHTML = "";

    // Check if the order is empty
    if (order.length === 0) {
        orderList.textContent = "Your order is empty.";
        return;
    }

    // Loop through each saved drink
    order.forEach(function(drink) {
        const orderLine = document.createElement("div");
        orderLine.className = "order-line";

        // Display drink information
        orderLine.textContent =
            drink.quantity + "× " +
            drink.drink + " (" + drink.size + ") — " +
            drink.sweetness + " sweetness, " +
            drink.ice + ", " +
            (drink.toppings.length > 0
                ? drink.toppings.join(", ")
                : "No toppings");

        // Add the drink to the order list
        orderList.appendChild(orderLine);
    });
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", displayOrder);
