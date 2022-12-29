let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "yogawear",
    tag: "sports_wear1",
    price: 3400,
    inCart: 0,
  },
  {
    name: "sportswear",
    tag: "sports_wear2",
    price: 2400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear3",
    price: 1400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear4",
    price: 3400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear5",
    price: 2400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear6",
    price: 1400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear7",
    price: 3400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear8",
    price: 2400,
    inCart: 0,
  },
  {
    name: "yogawear",
    tag: "sports_wear9",
    price: 1400,
    inCart: 0,
  },
  {
    name: "sportswear",
    tag: "sports_wear10",
    price: 3400,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumber");

  if (productNumbers) {
    document.querySelector("#wish span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumber");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumber", productNumbers + 1);
    document.querySelector("#wish span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    document.querySelector("#wish span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }

    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  // console.log("the product price is ",product.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("my cartCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");

  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      let tagKey = item.tag;
      let countKey = item.inCart;
      let priceKey = item.price;
      productContainer.innerHTML += `
      
        <div class="product" id="${tagKey}">
        
        <button id="del" onclick="deleteFunc(${tagKey}, ${countKey}, ${priceKey})">&times</button>
        <img src="images/${item.tag}.jpg" width="200px" height="200px">
        <span><strong>${item.name}</strong></span>
        </div>
        <div id="prodDetails">
        <div id="price">RS ${item.price},00
        </div>
        <div id="quantity">
        <i class="fa-solid fa-less-than" onclick="decrease(${tagKey}, ${priceKey})"></i>
        <span id="num"><strong id="posit">${item.inCart}</strong></span>
        <i class="fa-solid fa-greater-than" onclick="increase(${tagKey}, ${priceKey})"></i>
        </div>
        <div id="total">
        RS ${+item.inCart * +item.price},00
        </div>
        </div>`;
      console.log(typeof item.inCart);
      console.log(typeof item.price);
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class=basketTotalTitle>
    Mobiles Total Cost
    </h4>
    <h4 class="basketTotal">
    RS ${cartCost},00
    </h4>
    
    `;
  }
}
onLoadCartNumbers();
displayCart();

function decrease(tag, price) {
  let keyId = tag.id;
  let keys = localStorage.getItem(`productsInCart`);
  let totalPrice = localStorage.getItem("totalCost");
  totalPrice = +totalPrice - price;
  localStorage.setItem("totalCost", totalPrice);
  keys = JSON.parse(keys);
  let data = keys[keyId];
  let inCart = data.inCart;
  inCart -= 1;
  if (inCart == 0) {
    delete keys[keyId];
  } else {
    console.log("hai");
    data.inCart = inCart;
    console.log(keys);
  }
  keys = JSON.stringify(keys);
  localStorage.setItem("productsInCart", keys);
  let cartNumber = localStorage.getItem("cartNumber");
  cartNumber = cartNumber - 1;
  localStorage.setItem("cartNumber", cartNumber);
  window.location.href = "cartpage.html";
}

function increase(tag, price) {
  let keyId = tag.id;
  let keys = localStorage.getItem(`productsInCart`);
  let totalPrice = localStorage.getItem("totalCost");
  totalPrice = +totalPrice + price;
  localStorage.setItem("totalCost", totalPrice);
  keys = JSON.parse(keys);
  let data = keys[keyId];
  let inCart = data.inCart;
  inCart += 1;
  if (inCart == 0) {
    delete keys[keyId];
  } else {
    console.log("hai");
    data.inCart = inCart;
    console.log(keys);
  }
  keys = JSON.stringify(keys);
  localStorage.setItem("productsInCart", keys);
  let cartNumber = localStorage.getItem("cartNumber");
  cartNumber = +cartNumber + 1;
  localStorage.setItem("cartNumber", cartNumber);
  window.location.href = "cartpage.html";
}

function deleteFunc(tag, count, price) {
  let keys = localStorage.getItem(`productsInCart`);
  let totalPrice = localStorage.getItem("totalCost");
  totalPrice = totalPrice - price * count;
  localStorage.setItem("totalCost", totalPrice);
  keys = JSON.parse(keys);
  delete keys[tag.id];
  localStorage.setItem("productsInCart", JSON.stringify(keys));
  let cartNumber = localStorage.getItem("cartNumber");
  cartNumber = cartNumber - count;
  localStorage.setItem("cartNumber", cartNumber);
  window.location.href = "cartpage.html";
}
