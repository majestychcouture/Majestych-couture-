const WHATSAPP_NUMBER="573244031690";const products=[{name:"Prenda 01",image:"00f64e7e7bddb7e089292d505ea36360.jpeg"}
{name:"Prenda 02",image:"0202a8a8c31727f8827e15d0c7bd9828.jpeg"}
{name:"Prenda 03",image:"073f311d29a0006e18a7eb0ea2517d1a.jpeg"}
{name:"Prenda 04",image:"437698d6dc23929c30b24b9927afdba2.jpeg"}
{name:"Prenda 05",image:"631d2a1c8731e8f9c5562db96131e931.jpeg"}
{name:"Prenda 06",image:"68f1b3fa169687ad3c5a8d54312b9c8a.jpeg"}
{name:"Prenda 07",image:"844d43f2-ad15-4136-af0e-71177fb7b9ce.jpeg"}
{name:"Prenda 08",image:"8ebd8237fc805674d9975e8ab8830603.jpeg"}
{name:"Prenda 09",image:"a9598c06bee895805e527fbdf6f42d22.jpeg"}
{name:"Prenda 10",image:"b5d4e421f6946d69a8895df61d3621a0.jpeg"}
{name:"Prenda 11",image:"bc5221980047b5992b13f6f51655ac89.jpeg"}
{name:"Prenda 12",image:"d519ba7729b89030aab8fa387ff93357.jpeg"}];
function wa(n){return "https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent("Hola, Majestych Couture. Estoy interesado(a) en "+n+". ¿Me indican precio, tallas y disponibilidad?");}
const grid=document.getElementById("productGrid");products.forEach(p=>{const c=document.createElement("article");c.className="card";c.innerHTML='<div class="card-image"><img src="'+p.image+'" alt="'+p.name+'" loading="lazy"></div><div class="card-body"><p class="tag">ROPA · CONSULTAR</p><h3>'+p.name+'</h3><p class="muted">Consulta precio, tallas y disponibilidad.</p><div class="card-actions"><span class="price">COP · CONSULTAR</span><a class="btn small" href="'+wa(p.name)+'" target="_blank">WHATSAPP</a></div></div>';grid.appendChild(c)});document.getElementById("waMain").href=wa("una de sus prendas");document.getElementById("waFloat").href=wa("una de sus prendas");window.addEventListener("load",()=>setTimeout(()=>document.getElementById("splash").classList.add("hide"),1400));