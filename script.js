const WHATSAPP="573244031690";
const products=[
{id:1,name:"Conjunto NBA #1",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/00f64e7e7bddb7e089292d505ea36360.jpeg"},
{id:2,name:"Conjunto NBA #2",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/0202a8a8c31727f8827e15d0c7bd9828.jpeg"},
{id:3,name:"Conjunto NBA #3",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/073f311d29a0006e18a7eb0ea2517d1a.jpeg"},
{id:4,name:"Conjunto NBA #4",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/437698d6dc23929c30b24b9927afdba2.jpeg"},
{id:5,name:"Conjunto NBA #5",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/631d2a1c8731e8f9c5562db96131e931.jpeg"},
{id:6,name:"Conjunto NBA #6",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/68f1b3fa169687ad3c5a8d54312b9c8a.jpeg"},
{id:7,name:"Conjunto NBA #7",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/844d43f2-ad15-4136-af0e-71177fb7b9ce.jpeg"},
{id:8,name:"Conjunto NBA #8",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/8ebd8237fc805674d9975e8ab8830603.jpeg"},
{id:9,name:"Conjunto NBA #9",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/a9598c06bee895805e527fbdf6f42d22.jpeg"},
{id:10,name:"Conjunto NBA #10",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/b5d4e421f6946d69a8895df61d3621a0.jpeg"},
{id:11,name:"Conjunto NBA #11",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/bc5221980047b5992b13f6f51655ac89.jpeg"},
{id:12,name:"Conjunto NBA #12",price:74999,image:"https://raw.githubusercontent.com/majestychcouture/Majestych-couture-/main/d519ba7729b89030aab8fa387ff93357.jpeg"}];

const money=n=>new Intl.NumberFormat("es-CO").format(n);
const modal=document.getElementById("productModal");
const modalImage=document.getElementById("modalImage");
const modalName=document.getElementById("modalName");
const modalPrice=document.getElementById("modalPrice");
const modalWhatsapp=document.getElementById("modalWhatsapp");
const sizes=document.querySelectorAll("#modalSizes .size-option");
let current=null, selected=null;
let cart=JSON.parse(localStorage.getItem("maj_cart")||"[]");

function wa(p){
 return "https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hola, Majestych Couture. Estoy interesado en "+p.name+" por $"+money(p.price)+" COP.");
}
function openProduct(p){
 current=p; selected=null; sizes.forEach(b=>b.classList.remove("selected"));
 modalImage.src=p.image; modalImage.alt=p.name; modalName.textContent=p.name;
 modalPrice.textContent="$"+money(p.price)+" COP"; modalWhatsapp.href=wa(p);
 modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}
function closeProduct(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}

function renderProducts(){
 const box=document.getElementById("products");
 box.innerHTML=products.map((p,i)=>`
 <article class="product" data-index="${i}">
   <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
   <div class="product-info">
     <h3 class="product-name">${p.name}</h3>
     <p class="product-price">$${money(p.price)} COP</p>
     <button type="button" class="gold-button product-button">VER PRODUCTO</button>
   </div>
 </article>`).join("");
 box.querySelectorAll(".product").forEach(c=>{
   c.onclick=()=>openProduct(products[+c.dataset.index]);
   const b=c.querySelector(".product-button");
   if(b) b.onclick=e=>{e.stopPropagation();openProduct(products[+c.dataset.index]);};
 });
}

function renderCart(){
 const items=document.getElementById("cartItems"), count=document.getElementById("cartCount");
 if(count) count.textContent=cart.reduce((a,x)=>a+x.qty,0);
 if(!items)return;
 if(!cart.length) items.innerHTML='<div class="cart-empty">Tu carrito está vacío.<br>Agrega un producto desde la vista del producto.</div>';
 else items.innerHTML=cart.map((x,i)=>`
 <div class="cart-item"><img src="${x.image}" alt="${x.name}">
 <div><h3>${x.name}</h3><p>Talla: ${x.size}</p><p>$${money(x.price)} COP</p>
 <div class="cart-qty"><button data-m="${i}">−</button><span>${x.qty}</span><button data-p="${i}">+</button></div></div>
 <button class="cart-remove" data-r="${i}">×</button></div>`).join("");
 const total=cart.reduce((a,x)=>a+x.price*x.qty,0);
 document.getElementById("cartTotal").textContent="$"+money(total)+" COP";
 const lines=cart.map(x=>`${x.name} — Talla ${x.size} — x${x.qty} — $${money(x.price*x.qty)} COP`);
 document.getElementById("cartWhatsapp").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+lines.join("\n")+"\n\nTotal: $"+money(total)+" COP");
 items.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{let i=+b.dataset.m;if(cart[i].qty>1)cart[i].qty--;else cart.splice(i,1);save()});
 items.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{cart[+b.dataset.p].qty++;save()});
 items.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.r,1);save()});
}
function save(){localStorage.setItem("maj_cart",JSON.stringify(cart));renderCart()}

sizes.forEach(b=>b.onclick=()=>{selected=b.dataset.size;sizes.forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
document.getElementById("addCartModal").onclick=()=>{
 if(!current)return;
 if(!selected){alert("Selecciona una talla: S, M, L o XL");return}
 const f=cart.find(x=>x.id===current.id&&x.size===selected);
 if(f)f.qty++;else cart.push({id:current.id,name:current.name,image:current.image,price:current.price,size:selected,qty:1});
 save();closeProduct();
 document.getElementById("cartDrawer").classList.add("open");
 document.getElementById("cartOverlay").classList.add("open");
};
document.getElementById("modalClose").onclick=closeProduct;
document.getElementById("modalBack").onclick=closeProduct;
document.getElementById("modalBackdrop").onclick=closeProduct;
document.getElementById("cartButton").onclick=()=>{document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartOverlay").classList.add("open");renderCart()};
document.getElementById("cartClose").onclick=()=>{document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("open")};
document.getElementById("cartOverlay").onclick=()=>{document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartOverlay").classList.remove("open")};
document.getElementById("mainWhatsapp").href=wa({name:"la colección",price:0});
document.getElementById("floatWhatsapp").href=wa({name:"la colección",price:0});
renderProducts();renderCart();

/* V9 CHECKOUT */
(function(){
const f=document.getElementById("checkoutForm"); if(!f)return;
f.addEventListener("submit",function(e){
e.preventDefault();
if(!cart.length){alert("Tu carrito está vacío. Agrega un producto.");return;}
const g=id=>document.getElementById(id).value.trim();
const name=g("customerName"), ced=g("customerId"), phone=g("customerPhone"), city=g("customerCity"), addr=g("customerAddress");
if(!name||!ced||!phone||!city||!addr){alert("Completa todos los datos de envío.");return;}
const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
const money2=n=>Number(n).toLocaleString("es-CO");
const items=cart.map(x=>"• "+x.name+" — Talla "+(x.size||"—")+" — Cantidad: "+x.qty+" — $"+money2(x.price*x.qty)+" COP").join("\n");
const msg="Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+items+"\n\nTOTAL: $"+money2(total)+" COP\n\nDATOS DE ENVÍO\nNombre: "+name+"\nCédula: "+ced+"\nCelular: "+phone+"\nCiudad / municipio: "+city+"\nDirección: "+addr+"\n\nEnvío a todo el país — Pago contra entrega.";
window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg),"_blank");
});
})();


/* V9.1 — volver a editar/eliminar productos del carrito */
(function(){
  const back=document.getElementById("backToCart");
  const drawer=document.getElementById("cartDrawer");
  const items=document.getElementById("cartItems");
  if(!back || !drawer || !items) return;
  back.addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    drawer.scrollTo({top:0,behavior:"smooth"});
    items.scrollTo({top:0,behavior:"smooth"});
    setTimeout(function(){
      const first=items.querySelector(".cart-item");
      if(first) first.scrollIntoView({behavior:"smooth",block:"start"});
    },100);
  });
})();
