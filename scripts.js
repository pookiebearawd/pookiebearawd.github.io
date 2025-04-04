document.addEventListener("DOMContentLoaded", function () {
  var  cartTable = document.querySelector("#cartModal table");
  var totalPriceElement = document.querySelector("#cartModal .price");

  // Function to update the total price
  function updateTotal() {
    var total = 0;
    var rows = cartTable.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      var price = parseFloat(row.querySelector("td:nth-child(3)").textContent.replace("$", ""));
      var quantity = parseInt(row.querySelector("input").value, 10);
      var rowTotal = price * quantity;
      row.querySelector("td:nth-child(5)").textContent = `$${rowTotal.toFixed(2)}`;
      total += rowTotal;
    });
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  // Event listener for quantity input changes
  cartTable.addEventListener("input", function (event) {
    if (event.target.matches("input[type='text']")) {
      var input = event.target;
      var quantity = parseInt(input.value, 10);
      if (isNaN(quantity) || quantity < 1) {
        input.value = 1; // Set minimum quantity to 1
      }
      updateTotal();
    }
  });

  // Event listener for remove button
  cartTable.addEventListener("click", function (event) {
    if (event.target.closest(".btn-danger")) {
      var row = event.target.closest("tr");
      row.remove();
      updateTotal();
    }
  });

  // Initial total calculation
  updateTotal();
});


document.addEventListener("DOMContentLoaded", function () {

  const cartTable = document.querySelector("#cartTable");
  const subtotalElement = document.querySelector("#subtotal");
  const totalElement = document.querySelector("#total");

  // Simple function to update cart totals
  function updateCartTotal() {
    let subtotal = 0;
    
    const rows = cartTable.querySelectorAll("tbody tr");
    
    // For each row, calculate price × quantity
    rows.forEach((row) => {
      const price = parseFloat(row.querySelector(".price").textContent.replace("$", ""));
      const quantity = parseInt(row.querySelector("input").value, 10) || 1;
      
      // Calculate row total
      const rowTotal = price * quantity;
      row.querySelector(".row-total").textContent = `$${rowTotal.toFixed(2)}`;
      
      subtotal += rowTotal;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + 5).toFixed(2)}`;
  }

  cartTable.addEventListener("input", function(event) {
    if (event.target.matches("input")) {
      updateCartTotal();
    }
  });

  // Listen for quantity button clicks
  cartTable.addEventListener("click", function(event) {
    if (event.target.classList.contains("qty-up")) {
      const input = event.target.parentNode.querySelector("input");
      input.value = parseInt(input.value, 10) + 1 || 1;
      updateCartTotal();
    }
    else if (event.target.classList.contains("qty-down")) {
      const input = event.target.parentNode.querySelector("input");
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
      updateCartTotal();
    }
    // Remove item
    else if (event.target.closest(".btn-danger")) {
      event.target.closest("tr").remove();
      updateCartTotal();
    }
  });

  updateCartTotal();
});


document.addEventListener("DOMContentLoaded", function () {
  let shoppingLink = document.querySelector("a[data-bs-target='#cartModal']");
  let cartModalEl = document.getElementById("cartModal");
  let cartModal = new bootstrap.Modal(cartModalEl);

  shoppingLink.addEventListener("mouseenter", function () {
      cartModal.show();
  });

  cartModalEl.addEventListener("mouseleave", function (event) {
      // Ensure the mouse is not moving into the modal before hiding
      if (!cartModalEl.contains(event.relatedTarget)) {
          cartModal.hide();
      }
  });
});
