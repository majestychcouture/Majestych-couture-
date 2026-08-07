// MAJESTYCH COUTURE — V1.1
// WhatsApp Colombia: código 57 + número, sin +, espacios ni guiones.
const WHATSAPP_NUMBER = "573244031690";

const products = [
  {id:1, name:"Prenda destacada 01", image:"assets/producto-01.jpeg"},
  {id:2, name:"Prenda destacada 02", image:"assets/producto-02.jpeg"},
  {id:3, name:"Prenda destacada 03", image:"assets/producto-03.jpeg"},
  {id:4, name:"Prenda destacada 04", image:"assets/producto-04.jpeg"},
  {id:5, name:"Prenda destacada 05", image:"assets/producto-05.jpeg"},
  {id:6, name:"Prenda destacada 06", image:"assets/producto-06.jpeg"},
  {id:7, name:"Prenda destacada 07", image:"assets/producto-07.jpeg"},
  {id:8, name:"Prenda destacada 08", image:"assets/producto-08.jpeg"},
  {id:9, name:"Prenda destacada 09", image:"assets/producto-09.jpeg"},
  {id:10, name:"Prenda destacada 10", image:"assets/producto-10.jpeg"},
  {id:11, name:"Prenda destacada 11", image:"assets/producto-11.jpeg"}
];

function waLink(productName="una prenda"){
  const text = encodeURIComponent(
    `Hola, Majestych Couture. Estoy interesado(a) en ${productName}. ¿Me pueden indicar precio, tallas y disponibilidad?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const grid = document.getElementById("productGrid");

products.forEach((product) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="card-body">
      <p class="tag">ROPA · CONSULTAR</p>
      <h3>${product.name}</h3>
      <p class="muted">Consulta precio, tallas y disponibilidad.</p>
      <div class="card-actions">
        <span class="price">COP · CONSULTAR</span>
        <a class="btn small" href="${waLink(product.name)}" target="_blank" rel="noopener">WHATSAPP</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

document.querySelectorAll(".card-image img").forEach(img => {
  if (img.complete) img.classList.add("loaded");
  img.addEventListener("load", () => img.classList.add("loaded"));
  img.addEventListener("error", () => {
    img.parentElement.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:#777;font-size:11px;letter-spacing:1px">IMAGEN NO DISPONIBLE</div>';
  });
});

const mainWa = document.getElementById("waMain");
const floatWa = document.getElementById("waFloat");
const generalWa = waLink("una de sus prendas");
mainWa.href = generalWa;
floatWa.href = generalWa;

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("splash").classList.add("hide"), 1400);
});
