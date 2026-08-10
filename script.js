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
