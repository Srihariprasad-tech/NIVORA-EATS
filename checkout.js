const API_BASE = "http://localhost:5000/api";

// Backend actual Place Order endpoint 
const PLACE_ORDER_ENDPOINT = "";

const addressList = document.getElementById("address-list");
const cartItems = document.getElementById("cart-items");
const pageMessage = document.getElementById("page-message");
const orderMessage = document.getElementById("order-message");
const placeOrderButton = document.getElementById("place-order");

let checkoutData = null;
let savedAddresses = [];
let selectedAddressId = null;

function getAddressId(address) {
  return address._id ?? address.id;
}

function money(value) {
  return "₹" + Number(value ?? 0).toFixed(2);
}

function showPageMessage(message, isError = false) {
  pageMessage.textContent = message;
  pageMessage.className = isError ? "message error" : "message";
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// GET checkout details and saved addresses.
async function loadCheckout() {
  showPageMessage("Loading checkout details...");

  try {
    const [checkoutResponse, addressResponse] = await Promise.all([
      fetch(`${API_BASE}/checkout/`, {
        credentials: "include"
      }),
      fetch(`${API_BASE}/address/`, {
        credentials: "include"
      })
    ]);

    if (!checkoutResponse.ok || !addressResponse.ok) {
      throw new Error(
        "Could not load checkout details. Please log in and try again."
      );
    }

    checkoutData = await checkoutResponse.json();
    const addressData = await addressResponse.json();

    // Adjust these keys if your backend uses a different response format.
    savedAddresses = Array.isArray(addressData)
      ? addressData
      : addressData.addresses ?? addressData.data ?? [];

    renderCart(checkoutData);
    renderBill(checkoutData);

    const checkoutAddress =
      checkoutData.defaultAddress ??
      checkoutData.address ??
      checkoutData.deliveryAddress;

    selectedAddressId = checkoutAddress
      ? getAddressId(checkoutAddress)
      : null;

    if (!selectedAddressId) {
      const defaultAddress = savedAddresses.find(
        address => address.isDefault === true || address.isDefault === "true"
      );

      if (defaultAddress) {
        selectedAddressId = getAddressId(defaultAddress);
      }
    }

    renderAddresses();

    showPageMessage("");
    pageMessage.hidden = true;

    if (!selectedAddressId) {
      showOrderMessage("Please add or select a delivery address.", true);
    }
  } catch (error) {
    showPageMessage(error.message, true);
    addressList.replaceChildren(
      makeElement("p", "muted", "Address details could not be loaded.")
    );
    cartItems.replaceChildren(
      makeElement("p", "muted", "Cart details could not be loaded.")
    );
    placeOrderButton.disabled = true;
  }
}

function renderAddresses() {
  addressList.replaceChildren();

  if (savedAddresses.length === 0) {
    addressList.append(
      makeElement("p", "muted", "No saved addresses found.")
    );
    return;
  }

  savedAddresses.forEach(address => {
    const id = getAddressId(address);
    const label = document.createElement("label");
    label.className = "address-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "deliveryAddress";
    radio.value = id;
    radio.checked = String(id) === String(selectedAddressId);

    radio.addEventListener("change", () => {
      selectedAddressId = id;
      renderAddresses();
      showOrderMessage("");
    });

    const content = makeElement("div", "address-content");
    const titleRow = makeElement("div", "address-title");
    titleRow.append(makeElement("strong", "", address.label || "Delivery Address"));

    if (address.isDefault === true || address.isDefault === "true") {
      titleRow.append(makeElement("span", "default-badge", "Default"));
    }

    const person = makeElement("p", "", address.fullName || address.name || "");
    const house = address.houseNo ?? address.house ?? "";
    const street = address.street ?? address.area ?? "";
    const city = address.city ?? "";
    const pincode = address.pincode ?? address.pinCode ?? "";

    const addressText = [house, street, city, pincode]
      .filter(Boolean)
      .join(", ");

    content.append(
      titleRow,
      person,
      makeElement("p", "muted", addressText)
    );

    label.append(radio, content);
    addressList.append(label);
  });

  placeOrderButton.disabled = !selectedAddressId;
}

function renderCart(data) {
  cartItems.replaceChildren();

  // Expected: items or cartItems, each containing name, quantity and price.
  const items = data.items ?? data.cartItems ?? data.cart?.items ?? [];

  if (items.length === 0) {
    cartItems.append(makeElement("p", "muted", "Your cart is empty."));
    return;
  }

  items.forEach(item => {
    const row = makeElement("article", "food-item");
    const icon = makeElement("div", "food-icon", "🍲");
    const info = makeElement("div", "food-info");

    info.append(
      makeElement("h3", "", item.name ?? item.foodName ?? "Food item"),
      makeElement("p", "", `Quantity: ${item.quantity ?? 1}`)
    );

    const price = Number(item.price ?? item.food?.price ?? 0);
    const quantity = Number(item.quantity ?? 1);

    row.append(
      icon,
      info,
      makeElement("strong", "food-price", money(price * quantity))
    );

    cartItems.append(row);
  });
}

function renderBill(data) {
  // Use backend-calculated totals where available.
  const total = data.total ?? data.totalAmount ?? data.cartTotal ??
    data.cart?.total ?? 0;

  const itemTotal = data.itemTotal ?? data.subtotal ?? total;
  const deliveryFee = data.deliveryFee ?? data.deliveryCharge ?? 0;
  const taxes = data.taxes ?? data.tax ?? 0;

  document.getElementById("item-total").textContent = money(itemTotal);
  document.getElementById("delivery-fee").textContent = money(deliveryFee);
  document.getElementById("taxes").textContent = money(taxes);

  const finalTotal = data.totalAmount ?? data.total ??
    (Number(itemTotal) + Number(deliveryFee) + Number(taxes));

  document.getElementById("grand-total").textContent = money(finalTotal);
  placeOrderButton.textContent = `Place Order · ${money(finalTotal)}`;
}

function showOrderMessage(message, isError = false) {
  orderMessage.textContent = message;
  orderMessage.className = isError
    ? "order-message error"
    : "order-message success";
}

placeOrderButton.addEventListener("click", async () => {
  if (!selectedAddressId) {
    showOrderMessage("Please select a delivery address.", true);
    return;
  }

  if (!PLACE_ORDER_ENDPOINT) {
    showOrderMessage(
      "UI is ready. Add the correct Place Order API endpoint to enable ordering.",
      true
    );
    return;
  }

  placeOrderButton.disabled = true;
  showOrderMessage("Submitting your order...");

  try {
    const response = await fetch(PLACE_ORDER_ENDPOINT, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        addressId: selectedAddressId
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Could not place the order.");
    }

    showOrderMessage("Order placed successfully!");
  } catch (error) {
    showOrderMessage(error.message, true);
  } finally {
    placeOrderButton.disabled = false;
  }
});

loadCheckout();