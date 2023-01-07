var taxRate = 0.03;
var shipping = 1.0;
$(function() {
  var jsonData = [
    {
      image: "rice.png",
      title: "Rice",
      metrics: "Kg",
      price: 5,
      quantity: 0,
      total: 0
    },
    {
      image: "Wheat.png",
      title: "Wheat",
      metrics: "Kg",
      price: 8,
      quantity: 0,
      total: 0
    },
    {
      image: "Sugar.png",
      title: "Sugar",
      metrics: "Kg",
      price: 14,
      quantity: 0,
      total: 0
    },
    {
      image: "Kerosene.png",
      title: "Kerosene",
      metrics: "L",
      price: 15,
      quantity: 0,
      total: 0
    },
    {
      image: "Toor Dhal.png",
      title: "ToorDhal",
      metrics: "Kg",
      price: 20,
      quantity: 0,
      total: 0
    },
    {
      image: "Urid Dhal.jpg",
      title: "UridDhal",
      metrics: "Kg",
      price: 30,
      quantity: 0,
      total: 0
    },
    {
      image: "Palm Oil.png",
      title: "PalmOil",
      metrics: "L",
      price: 25,
      quantity: 0,
      total: 0
    },
    {
      image: "Salt.png",
      title: "Salt",
      metrics: "Kg",
      price: 20,
      quantity: 0,
      total: 0
    }
  ];
  var html = "<tbody>";
  $.each(jsonData, function() {
    html +=
      '<tr class="cart-item" style="border-bottom:1pt solid black;height:200px;">' +
      "        <td>" +
      '          <input type="checkbox" class="cart-item-check" checked />' +
      "        </td>" +
      "        <td>" +
      '          <img src="' + this.image + '" height="150px" width="150px">' +
      "        </td>" +

      "        <td>" +
      "          " +
      this.title +
      "        </td>" +
      "        <td>₹ " +
      this.price +
      "</td>" +
      "<td>"+ this.metrics +"</td>"+
      "        <td>" +
      '          <input class="input is-primary cart-item-qty" style="width:60px;height:40px;border-radius:20%; text-align:center;" type="number" min="0" max="10" id="'+this.title+'" name="'+this.title+'" value="' +
      this.quantity +
      '" data-price="' +
      this.price + 
      '">' +
      "        </td>" +
      '        <td class="cart-item-total">₹ ' +
      this.total +
      "</td>" +
      "        <td>" +
      '          <a class="button is-small"><button style="background-color:orange;border-radius:30%;width:90%;height:50px;">Remove</button</a>' +
      "        </td>" +
      "      </tr>";
  });
  html += "</tbody>";
  $(".shopping-cart").append(html);
  
  recalculateCart();

  $(".cart-item-check").change(function() {
    recalculateCart();
  });

  $(".cart-item-qty").change(function() {
    var $this = $(this);
    var parent = $this.parent().parent();
    parent.find(".cart-item-check").prop("checked", "checked");
    var price = $this.attr("data-price");
    var quantity = $this.val();
    var total = price * quantity;
    parent.find(".cart-item-total").html(total.toFixed(2));
    recalculateCart();
  });

  $(".button").click(function() {
    var parent = $(this)
      .parent()
      .parent();
    parent.remove();
    recalculateCart();
  });
  cart-total
});
function recalculateCart() {
  var subTotal = 0;
  var grandTotal = 0;
  var tax = 0;
  var items = $(".cart-item");
  $.each(items, function() {
    var itemCheck = $(this).find(".cart-item-check");
    var itemQuantity = $(this).find(".cart-item-qty");
    if (itemCheck.prop("checked")) {
      var itemTotal = itemQuantity.val() * itemQuantity.attr("data-price");
      subTotal += itemTotal;
    }
  });
  if (subTotal > 0) {
    tax = subTotal * taxRate;
    grandTotal = subTotal + tax + shipping;
    $(".totals,.checkout").show();
  } else {
    $(".totals,.checkout").hide();
  }
  $("#cart-subtotal").html(subTotal.toFixed(2));
  $("#carttotal").html(grandTotal.toFixed(2));
  $("#cart-tax").html(tax.toFixed(2));
  $("#cart-shipping").html(shipping.toFixed(2));
}

