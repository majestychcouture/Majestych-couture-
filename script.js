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

document.querySelectorAll(".product").forEach((card,index)=>{
  card.addEventListener("click",(event)=>{
    if(event.target.closest("a")) return;
    openProduct(products[index]);
  });
});

modalClose.addEventListener("click",closeProduct);
modalBack.addEventListener("click",closeProduct);
modalBackdrop.addEventListener("click",closeProduct);
document.addEventListener("keydown",(event)=>{
  if(event.key === "Escape") closeProduct();
});

/* ===== V7 CLEAN · CART ===== */
(() => {
  const CART_KEY = "majestych_cart_v7";
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  let currentProduct = null;
  let currentSize = null;
  let currentQty = 1;

  const $ = id => document.getElementById(id);
  const modal = $("productModal");
  const addBtn = $("addCartButton");
  const sizeBtns = document.querySelectorAll(".size-option");
  const qtyText = $("modalQty");
  const qtyMinus = $("modalQtyMinus");
  const qtyPlus = $("modalQtyPlus");
  const error = $("sizeError");

  function save(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function totalQty(){ return cart.reduce((n,x)=>n+x.quantity,0); }
  function total(){ return cart.reduce((n,x)=>n+x.price*x.quantity,0); }
  function moneyValue(n){ return new Intl.NumberFormat("es-CO").format(n); }

  function render(){
    const count = $("cartCount"), items = $("cartItems"), sum = $("cartTotal"), wa = $("cartWhatsapp");
    if(count) count.textContent = totalQty();
    if(!items) return;
    if(!cart.length){
      items.innerHTML = '<div class="cart-empty">Tu carrito está vacío.<br>Elige un conjunto y agrega una talla.</div>';
    } else {
      items.innerHTML = cart.map((x,i) => `
        <div class="cart-item">
          <img src="${x.image}" alt="${x.name}">
          <div>
            <h3 class="cart-item-name">${x.name}</h3>
            <p class="cart-item-meta">Talla: <strong>${x.size}</strong></p>
            <p class="cart-item-price">$${moneyValue(x.price)} COP</p>
            <div class="qty-control">
              <button type="button" data-minus="${i}">−</button>
              <span>${x.quantity}</span>
              <button type="button" data-plus="${i}">+</button>
            </div>
          </div>
          <button type="button" class="remove-item" data-remove="${i}">×</button>
        </div>`).join("");
      items.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>change(+b.dataset.minus,-1));
      items.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>change(+b.dataset.plus,1));
      items.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>remove(+b.dataset.remove));
    }
    sum.textContent = "$" + moneyValue(total()) + " COP";
    const lines = cart.map(x=>`${x.name} — Talla ${x.size} — x${x.quantity} — $${moneyValue(x.price*x.quantity)} COP`);
    const msg = cart.length
      ? "Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+lines.join("\n")+"\n\nTotal: $"+moneyValue(total())+" COP"
      : "Hola, Majestych Couture. Quiero información sobre la colección NBA.";
    wa.href = "https://wa.me/573244031690?text="+encodeURIComponent(msg);
  }

  function change(i,d){
    cart[i].quantity += d;
    if(cart[i].quantity < 1) cart.splice(i,1);
    save(); render();
  }
  function remove(i){ cart.splice(i,1); save(); render(); }

  // Capture product selection without relying on card class names.
  document.addEventListener("click", e => {
    const card = e.target.closest("[data-product-index]");
    if(!card || e.target.closest("a,button")) return;
    const index = Number(card.dataset.productIndex);
    if(!Number.isInteger(index) || !window.products || !products[index]) return;
    currentProduct = products[index];
    currentSize = null; currentQty = 1;
    sizeBtns.forEach(b=>b.classList.remove("selected"));
    error.classList.remove("show");
    if(qtyText) qtyText.textContent = "1";
    if(typeof openProduct === "function") openProduct(currentProduct);
  });

  // Also support existing cards if they don't have data-product-index.
  const cards = document.querySelectorAll(".product, .product-card, .card");
  cards.forEach((card,index)=>{
    card.dataset.productIndex = index;
    card.addEventListener("click", e=>{
      if(e.target.closest("a,button")) return;
      if(!window.products || !products[index]) return;
      currentProduct=products[index]; currentSize=null; currentQty=1;
      sizeBtns.forEach(b=>b.classList.remove("selected"));
      error.classList.remove("show");
      if(qtyText) qtyText.textContent="1";
      if(typeof openProduct==="function") openProduct(currentProduct);
    });
  });

  sizeBtns.forEach(b=>b.addEventListener("click",()=>{
    currentSize=b.dataset.size;
    sizeBtns.forEach(x=>x.classList.remove("selected"));
    b.classList.add("selected");
    error.classList.remove("show");
  }));

  if(qtyMinus) qtyMinus.onclick=()=>{currentQty=Math.max(1,currentQty-1);qtyText.textContent=currentQty};
  if(qtyPlus) qtyPlus.onclick=()=>{currentQty++;qtyText.textContent=currentQty};

  addBtn.onclick=()=>{
    if(!currentProduct) return;
    if(!currentSize){error.classList.add("show");return;}
    const found=cart.find(x=>x.productId===currentProduct.id && x.size===currentSize);
    if(found) found.quantity += currentQty;
    else cart.push({productId:currentProduct.id,name:currentProduct.name,image:currentProduct.image,price:currentProduct.price,size:currentSize,quantity:currentQty});
    save(); render();
    if(typeof closeProduct==="function") closeProduct();
    $("cartDrawer").classList.add("open");
    $("cartOverlay").classList.add("open");
  };

  $("cartButton").onclick=()=>{
    $("cartDrawer").classList.add("open");
    $("cartOverlay").classList.add("open");
    render();
  };
  $("cartClose").onclick=()=>{
    $("cartDrawer").classList.remove("open");
    $("cartOverlay").classList.remove("open");
  };
  $("cartOverlay").onclick=()=>{
    $("cartDrawer").classList.remove("open");
    $("cartOverlay").classList.remove("open");
  };

  render();
})();
