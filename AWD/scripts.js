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