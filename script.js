const TAX_RATE = 0.07;
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
    }
    let subtotal = 0;
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
                : "No toppings") + 
            " - $" + (drink.price * drink.quantity).toFixed(2);
        subtotal += drink.price * drink.quantity;

        // Add the drink to the order list
        orderList.appendChild(orderLine);
    });
    const tax = subtotal * TAX_RATE;
    document.getElementById("subtotalAmount").textContent = subtotal.toFixed(2);
    document.getElementById("taxAmount").textContent = tax.toFixed(2);
    document.getElementById("finalTotal").textContent = (subtotal + tax).toFixed(2);
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayOrder();

    const form = document.getElementById("pickupForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const order - JSON.parse(localStorage.getItem("order")) || [];
        if (order.length === 0) {
            alert("Your order is empty. Add a drink first.");
            return;
        }
        alert("Thanks, " + document.getElementById("firstName").value +"! Your order has been placed."); localStorage.removeItem("order");
        form.reset();
        displayOrder();
    };
};
