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

/* ===== V7 DIRECT CART: simple, independent path ===== */
(function(){
  const KEY="majestych_direct_cart";
  let cart=JSON.parse(localStorage.getItem(KEY)||"[]");
  const money=n=>new Intl.NumberFormat("es-CO").format(n);

  function render(){
    const count=document.getElementById("cartCount");
    const items=document.getElementById("cartItems");
    const totalEl=document.getElementById("cartTotal");
    const wa=document.getElementById("cartWhatsapp");
    if(count) count.textContent=cart.reduce((a,x)=>a+x.qty,0);
    if(!items)return;
    if(!cart.length){items.innerHTML='<div class="cart-empty">Tu carrito está vacío.<br>Agrega un producto desde su tarjeta.</div>'}
    else items.innerHTML=cart.map((x,i)=>`
      <div class="cart-item">
        <img src="${x.image}" alt="${x.name}">
        <div><h3 class="cart-item-name">${x.name}</h3>
        <div class="cart-item-meta">Talla: ${x.size}</div>
        <div class="cart-item-price">$${money(x.price)} COP</div>
        <div class="cart-qty"><button data-m="${i}">−</button><span>${x.qty}</span><button data-p="${i}">+</button></div></div>
        <button class="cart-remove" data-r="${i}">×</button>
      </div>`).join("");
    const total=cart.reduce((a,x)=>a+x.price*x.qty,0);
    totalEl.textContent="$"+money(total)+" COP";
    const lines=cart.map(x=>`${x.name} — Talla ${x.size} — x${x.qty} — $${money(x.price*x.qty)} COP`);
    wa.href="https://wa.me/573244031690?text="+encodeURIComponent("Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+lines.join("\n")+"\n\nTotal: $"+money(total)+" COP");
    items.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{let i=+b.dataset.m;if(cart[i].qty>1)cart[i].qty--;else cart.splice(i,1);save()});
    items.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{cart[+b.dataset.p].qty++;save()});
    items.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.r,1);save()});
  }
  function save(){localStorage.setItem(KEY,JSON.stringify(cart));render()}
  function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("open");render()}
  function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("open")}
  document.getElementById("cartButton").onclick=openCart;
  document.getElementById("cartClose").onclick=closeCart;
  document.getElementById("cartOverlay").onclick=closeCart;

  function add(product,size){
    const found=cart.find(x=>x.id===product.id&&x.size===size);
    if(found)found.qty++;else cart.push({id:product.id,name:product.name,image:product.image,price:product.price,size,qty:1});
    save();openCart();
  }

  // Inject two actions directly into each product card: WhatsApp + Cart.
  const cards=document.querySelectorAll(".product,.product-card,.card");
  cards.forEach((card,i)=>{
    if(!window.products||!products[i]||card.querySelector(".direct-cart-row"))return;
    const p=products[i];
    const row=document.createElement("div");
    row.className="direct-cart-row";
    row.innerHTML='<button type="button" class="direct-cart-btn">🛒 AGREGAR AL CARRITO</button><a class="direct-wa-btn" target="_blank" rel="noopener" aria-label="WhatsApp">⌕</a>';
    const wa=row.querySelector(".direct-wa-btn");
    wa.href="https://wa.me/573244031690?text="+encodeURIComponent("Hola, Majestych Couture. Estoy interesado en "+p.name+" por $"+money(p.price)+" COP.");
    row.querySelector(".direct-cart-btn").onclick=()=>{
      // First click chooses size with a tiny native prompt. This avoids the broken modal entirely.
      const size=window.prompt("Selecciona tu talla: S, M, L o XL","M");
      if(!size)return;
      const normalized=size.trim().toUpperCase();
      if(!["S","M","L","XL"].includes(normalized)){window.alert("Talla no válida. Usa S, M, L o XL.");return}
      add(p,normalized);
    };
    card.appendChild(row);
  });
  render();
})();
