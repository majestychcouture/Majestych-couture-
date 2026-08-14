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
 const cartWhatsapp=document.getElementById("cartWhatsapp"); if(cartWhatsapp) cartWhatsapp.href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+lines.join("\n")+"\n\nTotal: $"+money(total)+" COP");
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

/* V10.3 CHECKOUT ESTABLE */
(function(){
const f=document.getElementById("checkoutForm"); if(!f)return;
const dept=document.getElementById("customerDepartment");
const city=document.getElementById("customerCity");
const shippingSummary=document.getElementById("shippingSummary");

function shippingFor(department, municipality){
 const d=(department||"").trim().toLowerCase();
 const c=(municipality||"").trim().toLowerCase();
 if(d!=="antioquia") return 22000;
 if(c==="medellín" || c==="medellin") return 13000;
 if(["bello","envigado","sabaneta","la estrella"].includes(c)) return 15000;
 return 20000;
}
function cartSubtotal(){ return cart.reduce((s,x)=>s+x.price*x.qty,0); }
function updateShipping(){
 const dep=dept.value, mun=city.value;
 if(!dep || !mun){shippingSummary.innerHTML='Envío: <strong>Selecciona tu departamento y municipio</strong>';return;}
 const ship=shippingFor(dep,mun), sub=cartSubtotal(), total=sub+ship;
 shippingSummary.innerHTML='Subtotal: <strong>$'+money(sub)+' COP</strong><br>Envío: <strong>$'+money(ship)+' COP</strong><br>Total: <strong>$'+money(total)+' COP</strong>';
}
dept.addEventListener("change",updateShipping);
city.addEventListener("input",updateShipping);
f.addEventListener("submit",function(e){
 e.preventDefault();
 if(!cart.length){alert("Tu carrito está vacío. Agrega un producto.");return;}
 const g=id=>document.getElementById(id).value.trim();
 const name=g("customerName"), ced=g("customerId"), phone=g("customerPhone"), department=g("customerDepartment"), municipality=g("customerCity"), addr=g("customerAddress");
 if(!name||!ced||!phone||!department||!municipality||!addr){alert("Completa todos los datos de envío.");return;}
 const sub=cartSubtotal(), ship=shippingFor(department,municipality), total=sub+ship;
 const items=cart.map(x=>"• "+x.name+" — Talla "+(x.size||"—")+" — Cantidad: "+x.qty+" — $"+money(x.price*x.qty)+" COP").join("\n");
 const msg="Hola, Majestych Couture. Quiero realizar este pedido:\n\n"+items+"\n\nSUBTOTAL: $"+money(sub)+" COP\nENVÍO: $"+money(ship)+" COP\nTOTAL: $"+money(total)+" COP\n\nDATOS DE ENVÍO\nNombre: "+name+"\nCédula: "+ced+"\nCelular: "+phone+"\nDepartamento: "+department+"\nCiudad / municipio: "+municipality+"\nDirección: "+addr+"\n\nPago contra entrega.";
 window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg),"_blank");
});
updateShipping();
})();

/* V9.2 — EDITAR CARRITO FUNCIONAL */
(function(){
  function initEditCart(){
    const btn = document.getElementById("backToCart");
    const drawer = document.getElementById("cartDrawer");
    const items = document.getElementById("cartItems");
    const checkout = document.querySelector(".checkout-box");
    const form = document.getElementById("checkoutForm");
    if(!btn || !drawer || !items || !checkout || !form) return;

    btn.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();

      const editing = drawer.classList.toggle("editing-cart");

      if(editing){
        btn.textContent = "✓ VOLVER A DATOS DE ENVÍO";
        form.style.display = "none";
        const note = checkout.querySelector(".checkout-note");
        const payments = checkout.querySelector(".checkout-payments");
        if(note) note.style.display = "none";
        if(payments) payments.style.display = "none";

        items.scrollTop = 0;
        const first = items.querySelector(".cart-item");
        if(first) first.scrollIntoView({behavior:"smooth", block:"start"});
      } else {
        btn.textContent = "← EDITAR MI CARRITO";
        form.style.display = "grid";
        const note = checkout.querySelector(".checkout-note");
        const payments = checkout.querySelector(".checkout-payments");
        if(note) note.style.display = "";
        if(payments) payments.style.display = "";
        checkout.scrollIntoView({behavior:"smooth", block:"nearest"});
      }
    };
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initEditCart);
  }else{
    initEditCart();
  }
})();

/* V10.6 — Wompi conectado al Worker seguro */
(function(){
  const WOMPI_PUBLIC_KEY = "pub_prod_1Ey0CFFaJIlSqFMPAXiorvFjOuvYetmP";
  const WOMPI_SIGNING_ENDPOINT = "https://majestych.bedoyaalvarezandresfelipe.workers.dev/";

  function shippingFor(department, municipality){
    const d=(department||"").trim().toLowerCase();
    const c=(municipality||"").trim().toLowerCase();
    if(d!=="antioquia") return 22000;
    if(c==="medellín" || c==="medellin") return 13000;
    if(["bello","envigado","sabaneta","la estrella"].includes(c)) return 15000;
    return 20000;
  }

  function cartSubtotal(){
    return cart.reduce((s,x)=>s+x.price*x.qty,0);
  }

  function getCustomerData(){
    const g=id=>{const el=document.getElementById(id); return el ? el.value.trim() : "";};
    return {
      name:g("customerName"),
      ced:g("customerId"),
      phone:g("customerPhone"),
      department:g("customerDepartment"),
      municipality:g("customerCity"),
      address:g("customerAddress")
    };
  }

  function makeReference(){
    const now=Date.now().toString(36).toUpperCase();
    const rnd=Math.random().toString(36).slice(2,8).toUpperCase();
    return "MJC-"+now+"-"+rnd;
  }

  async function getIntegritySignature(reference, amountInCents){
    const response=await fetch(WOMPI_SIGNING_ENDPOINT,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({reference,amountInCents})
    });
    let data={};
    try{data=await response.json();}catch(e){}
    if(!response.ok || !data.signature){
      throw new Error(data.error || "No se pudo generar la firma de Wompi.");
    }
    return data.signature;
  }

  function openWompi(reference, amountInCents, signature, customer){
    if(typeof WidgetCheckout==="undefined"){
      throw new Error("No se pudo cargar el checkout de Wompi. Recarga la página e inténtalo nuevamente.");
    }

    const checkout=new WidgetCheckout({
      currency:"COP",
      amountInCents:amountInCents,
      reference:reference,
      publicKey:WOMPI_PUBLIC_KEY,
      signature:{integrity:signature},
      customerData:{
        fullName:customer.name,
        phoneNumber:customer.phone,
        phoneNumberPrefix:"+57",
        legalId:customer.ced,
        legalIdType:"CC"
      },
      shippingAddress:{
        addressLine1:customer.address,
        city:customer.municipality,
        phoneNumber:customer.phone,
        region:customer.department,
        country:"CO",
        name:customer.name
      }
    });

    checkout.open(function(result){
      console.log("Resultado Wompi:", result);
    });
  }

  async function startOnlinePayment(){
    if(!cart.length){
      alert("Tu carrito está vacío. Agrega un producto antes de pagar.");
      return;
    }

    const customer=getCustomerData();
    if(!customer.name||!customer.ced||!customer.phone||!customer.department||!customer.municipality||!customer.address){
      alert("Completa primero todos los datos de envío para continuar con el pago.");
      return;
    }

    const subtotal=cartSubtotal();
    const shipping=shippingFor(customer.department,customer.municipality);
    const total=subtotal+shipping;
    const amountInCents=total*100;
    const reference=makeReference();

    const btn=document.getElementById("payOnlineBtn");
    const original=btn ? btn.textContent : "PAGAR AHORA";
    if(btn){
      btn.disabled=true;
      btn.textContent="CONECTANDO CON WOMPI...";
    }

    try{
      const signature=await getIntegritySignature(reference,amountInCents);
      openWompi(reference,amountInCents,signature,customer);
    }catch(error){
      console.error("Wompi:",error);
      alert("No se pudo iniciar el pago en línea. Verifica la conexión con Wompi e inténtalo nuevamente.");
    }finally{
      if(btn){
        btn.disabled=false;
        btn.textContent=original;
      }
    }
  }

  function wireOnlinePayment(){
    const btn=document.getElementById("payOnlineBtn");
    if(!btn)return;
    btn.addEventListener("click",startOnlinePayment);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",wireOnlinePayment);
  }else{
    wireOnlinePayment();
  }
})();



/* V10.8.1 — Valores de marca funcionales. Basado directamente en V10.8 HOMEPAGE LUXURY. */
(function(){
  const modal=document.getElementById("valueModal");
  const closeBtn=document.getElementById("valueModalClose");
  const backdrop=document.getElementById("valueModalBackdrop");
  const title=document.getElementById("valueModalTitle");
  const text=document.getElementById("valueModalText");
  const icon=document.getElementById("valueModalIcon");
  const action=document.getElementById("valueModalAction");
  if(!modal) return;

  const data={
    elegancia:{title:"ELEGANCIA",icon:'<svg viewBox="0 0 64 64"><path d="M12 24h40L32 56 12 24Z"/><path d="M12 24 22 10h20l10 14M22 10l10 46M42 10 32 56"/></svg>',text:"Una estética cuidada en cada detalle. Diseños pensados para proyectar presencia, personalidad y confianza sin perder la esencia de Majestych Couture.",target:"#catalogo"},
    exclusividad:{title:"EXCLUSIVIDAD",icon:'<svg viewBox="0 0 64 64"><path d="M32 8 52 24 32 56 12 24 32 8Z"/><path d="M12 24h40M22 24l10 32 10-32M22 24l10-16 10 16"/></svg>',text:"Piezas seleccionadas para quienes buscan diferenciarse. Una colección con identidad propia y una propuesta que no pasa desapercibida.",target:"#catalogo"},
    calidad:{title:"CALIDAD",icon:'<svg viewBox="0 0 64 64"><path d="M19 9c0 10 4 15 13 19 9-4 13-9 13-19"/><path d="M32 28v14M18 42h28M12 52h40"/><path d="M18 42c-4 0-7 3-7 7v3M46 42c4 0 7 3 7 7v3"/></svg>',text:"Cuidamos la elección visual y la presentación de cada producto para que la experiencia de compra esté a la altura de la marca.",target:"#catalogo"},
    global:{title:"ESTILO GLOBAL",icon:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="23"/><path d="M9 32h46M32 9c7 7 10 15 10 23s-3 16-10 23M32 9c-7 7-10 15-10 23s3 16 10 23M13 19h38M13 45h38"/></svg>',text:"Inspiración deportiva y urbana con una estética contemporánea. Majestych Couture une actitud, moda y una visión que trasciende fronteras.",target:"#galeria"}
  };

  function openValue(key){
    const item=data[key]||data.elegancia;
    title.textContent=item.title; icon.innerHTML=item.icon; text.textContent=item.text; action.href=item.target;
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
  }
  function closeValue(){
    modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".value-item[data-value]").forEach(btn=>btn.addEventListener("click",()=>openValue(btn.dataset.value)));
  closeBtn.addEventListener("click",closeValue); backdrop.addEventListener("click",closeValue);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeValue();});
  action.addEventListener("click",closeValue);
})();
