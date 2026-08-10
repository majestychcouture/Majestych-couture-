const WHATSAPP = "573244031690";

const products = [
{name:"Conjunto NBA #1", image:"00f64e7e7bddb7e089292d505ea36360.jpeg", price:74999},
{name:"Conjunto NBA #2", image:"0202a8a8c31727f8827e15d0c7bd9828.jpeg", price:74999},
{name:"Conjunto NBA #3", image:"073f311d29a0006e18a7eb0ea2517d1a.jpeg", price:74999},
{name:"Conjunto NBA #4", image:"437698d6dc23929c30b24b9927afdba2.jpeg", price:74999},
{name:"Conjunto NBA #5", image:"631d2a1c8731e8f9c5562db96131e931.jpeg", price:74999},
{name:"Conjunto NBA #6", image:"68f1b3fa169687ad3c5a8d54312b9c8a.jpeg", price:74999},
{name:"Conjunto NBA #7", image:"844d43f2-ad15-4136-af0e-71177fb7b9ce.jpeg", price:74999},
{name:"Conjunto NBA #8", image:"8ebd8237fc805674d9975e8ab8830603.jpeg", price:74999},
{name:"Conjunto NBA #9", image:"a9598c06bee895805e527fbdf6f42d22.jpeg", price:74999},
{name:"Conjunto NBA #10", image:"b5d4e421f6946d69a8895df61d3621a0.jpeg", price:74999},
{name:"Conjunto NBA #11", image:"bc5221980047b5992b13f6f51655ac89.jpeg", price:74999},
{name:"Conjunto NBA #12", image:"d519ba7729b89030aab8fa387ff93357.jpeg", price:74999}
];

const money = new Intl.NumberFormat("es-CO");

function whatsappLink(product){
  const text = `Hola, Majestych Couture. Estoy interesado(a) en ${product.name} por $${money.format(product.price)} COP. ¿Me indican disponibilidad?`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

const container = document.getElementById("products");

products.forEach((product,index) => {
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="${index < 3 ? "eager" : "lazy"}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">$${money.format(product.price)} COP</p>
      <a class="gold-button product-button" href="${whatsappLink(product)}" target="_blank" rel="noopener">CONSULTAR POR WHATSAPP</a>
    </div>
  `;
  container.appendChild(card);
});

document.getElementById("mainWhatsapp").href = whatsappLink(products[0]);
document.getElementById("floatWhatsapp").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, Majestych Couture. Quiero información sobre la colección NBA.")}`;


/* ===== V6 · MODAL DE PRODUCTO ===== */
const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const modalClose = document.getElementById("modalClose");
const modalBack = document.getElementById("modalBack");
const modalBackdrop = document.getElementById("modalBackdrop");

function openProduct(product){
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalName.textContent = product.name;
  modalPrice.textContent = "$" + money.format(product.price) + " COP";
  modalWhatsapp.href = whatsappLink(product);
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}

function closeProduct(){
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}



modalClose.addEventListener("click",closeProduct);
modalBack.addEventListener("click",closeProduct);
modalBackdrop.addEventListener("click",closeProduct);
document.addEventListener("keydown",(event)=>{
  if(event.key === "Escape") closeProduct();
});


/* ===== V7 · TALLA + CARRITO ===== */
let cart = JSON.parse(localStorage.getItem("majestych_cart") || "[]");
let selectedProduct = null;
let selectedSize = null;

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartWhatsapp = document.getElementById("cartWhatsapp");
const addCartButton = document.getElementById("addCartButton");
const sizeError = document.getElementById("sizeError");
const sizeButtons = document.querySelectorAll(".size-option");

function saveCart(){
  localStorage.setItem("majestych_cart", JSON.stringify(cart));
}

function cartQuantity(){
  return cart.reduce((sum,item)=>sum + item.quantity,0);
}

function openCart(){
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  renderCart();
}

function closeCart(){
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

function addToCart(){
  if(!selectedProduct) return;
  if(!selectedSize){
    sizeError.classList.add("show");
    return;
  }
  sizeError.classList.remove("show");

  const existing = cart.find(item => item.productId === selectedProduct.id && item.size === selectedSize);
  if(existing){
    existing.quantity += 1;
  }else{
    cart.push({
      productId:selectedProduct.id,
      name:selectedProduct.name,
      image:selectedProduct.image,
      price:selectedProduct.price,
      size:selectedSize,
      quantity:1
    });
  }
  saveCart();
  updateCartCount();
  closeProduct();
  openCart();
}

function changeQty(index, delta){
  cart[index].quantity += delta;
  if(cart[index].quantity <= 0) cart.splice(index,1);
  saveCart();
  renderCart();
  updateCartCount();
}

function removeCartItem(index){
  cart.splice(index,1);
  saveCart();
  renderCart();
  updateCartCount();
}

function cartMessage(){
  if(!cart.length) return "Hola, Majestych Couture. Quiero información sobre la colección NBA.";
  let lines = cart.map(item =>
    `${item.name} — Talla ${item.size} — x${item.quantity} — $${money.format(item.price * item.quantity)} COP`
  );
  const total = cart.reduce((sum,item)=>sum + item.price * item.quantity,0);
  return `Hola, Majestych Couture. Quiero realizar este pedido:\n\n${lines.join("\n")}\n\nTotal: $${money.format(total)} COP`;
}

function renderCart(){
  cartItems.innerHTML = "";
  if(!cart.length){
    cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío.<br>Elige un conjunto y agrega tu talla.</div>';
  }else{
    cart.forEach((item,index)=>{
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-meta">Talla: <strong>${item.size}</strong></p>
          <p class="cart-item-price">$${money.format(item.price)} COP</p>
          <div class="qty">
            <button type="button" data-action="minus">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="plus">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" aria-label="Eliminar">×</button>
      `;
      row.querySelector('[data-action="minus"]').onclick = () => changeQty(index,-1);
      row.querySelector('[data-action="plus"]').onclick = () => changeQty(index,1);
      row.querySelector(".remove-item").onclick = () => removeCartItem(index);
      cartItems.appendChild(row);
    });
  }

  const total = cart.reduce((sum,item)=>sum + item.price * item.quantity,0);
  cartTotal.textContent = "$" + money.format(total) + " COP";
  cartWhatsapp.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(cartMessage());
}

function updateCartCount(){
  cartCount.textContent = cartQuantity();
}

sizeButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    selectedSize = button.dataset.size;
    sizeButtons.forEach(b=>b.classList.remove("selected"));
    button.classList.add("selected");
    sizeError.classList.remove("show");
  });
});

addCartButton.addEventListener("click",addToCart);
cartButton.addEventListener("click",openCart);
cartClose.addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);

const originalOpenProduct = openProduct;
openProduct = function(product){
  selectedProduct = product;
  selectedSize = null;
  sizeButtons.forEach(b=>b.classList.remove("selected"));
  sizeError.classList.remove("show");
  originalOpenProduct(product);
};

updateCartCount();
renderCart();

/* ===== V7 FIX · PRODUCT MODAL CLICK ===== */
document.addEventListener("click", (event) => {
  const card = event.target.closest(".product, .product-card, .card");
  if (!card || !productModal) return;
  if (event.target.closest("a, button, input, select")) return;

  const cards = Array.from(document.querySelectorAll(".product, .product-card, .card"));
  const index = cards.indexOf(card);
  if (index < 0 || !products[index]) return;

  selectedProduct = products[index];
  selectedSize = null;
  if (typeof sizeButtons !== "undefined") {
    sizeButtons.forEach(b => b.classList.remove("selected"));
  }
  if (typeof sizeError !== "undefined") sizeError.classList.remove("show");
  originalOpenProduct(products[index]);
});
