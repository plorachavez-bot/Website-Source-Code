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
       // Loop through each saved drink (index is its spot in the saved order)
    order.forEach(function(drink, index) {
        const orderLine = document.createElement("div");
        orderLine.className = "order-line";

        // Display drink information
        const info = document.createElement("span");
        info.textContent =
            drink.drink + " (" + drink.size + ") — " +
            drink.sweetness + " sweetness, " +
            drink.ice + ", " +
            (drink.toppings.length > 0
                ? drink.toppings.join(", ")
                : "No toppings") + 
            " - $" + (drink.price * drink.quantity).toFixed(2);
        subtotal += drink.price * drink.quantity;

        // Quantity stepper and Remove button for this line
        const controls = document.createElement("span");
        controls.className = "line-controls";
        controls.innerHTML =
            '<button type="button" data-change="-1" aria-label="Decrease quantity">&minus;</button>' +
            '<span>' + drink.quantity + '</span>' +
            '<button type="button" data-change="1" aria-label="Increase quantity">+</button>' +
            '<button type="button" class="remove-btn">Remove</button>';

        controls.querySelectorAll("[data-change]").forEach(function(button) {
            button.addEventListener("click", function() {
                changeQuantity(index, Number(button.dataset.change));
            });
        });
        controls.querySelector(".remove-btn").addEventListener("click", function() {
            removeDrink(index);
        });

        orderLine.appendChild(info);
        orderLine.appendChild(controls);

        // Add the drink to the order list
        orderList.appendChild(orderLine);
    });
    const tax = subtotal * TAX_RATE;
    document.getElementById("subtotalAmount").textContent = subtotal.toFixed(2);
    document.getElementById("taxAmount").textContent = tax.toFixed(2);
    document.getElementById("finalTotal").textContent = (subtotal + tax).toFixed(2);
}
function changeQuantity(index, amount) {
    const order = JSON.parse(localStorage.getItem("order")) || [];
    const newQty = order[index].quantity + amount;
    if (newQty < 1 || newQty > 20) return;
    order[index].quantity = newQty;
    localStorage.setItem("order", JSON.stringify(order));
    displayOrder();
}

function removeDrink(index) {
    const order = JSON.parse(localStorage.getItem("order")) || [];
    order.splice(index, 1);
    localStorage.setItem("order", JSON.stringify(order));
    displayOrder();
}

function showMessage(text, color) {
    const confirmMessage = document.getElementById("confirmMessage");
    confirmMessage.textContent = text;
    confirmMessage.style.color = color;
}

// Run the function when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayOrder();

    const form = document.getElementById("pickupForm");
    if (!form) return;
     const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById("pickupTime").min = now.toISOString().slice(0, 16);

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const order = JSON.parse(localStorage.getItem("order")) || [];
        
        if (order.length === 0) {
            alert("Your order is empty. Add a drink first.");
            return;
        }
        alert("Thanks, " + document.getElementById("firstName").value +"! Your order has been placed."); localStorage.removeItem("order");
        form.reset();
        displayOrder();
    });
});
            showMessage("Your order is empty. Add a drink first.", "#b3261e");
        ...
        showMessage("Thanks, " + document.getElementById("firstName").value + "! Your order has been placed.", "#2e7d32");
