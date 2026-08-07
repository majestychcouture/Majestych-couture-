// CAMBIA SOLO ESTA LÍNEA:
// Colombia: 57 + número, sin +, espacios ni guiones.
// Ejemplo: 573001234567
const WHATSAPP_NUMBER = "57XXXXXXXXXX";
const text = encodeURIComponent("Hola, Majestyc Couture. Estoy interesado(a) en una de sus prendas.");
const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
document.getElementById("waMain").href = wa;
document.getElementById("waFloat").href = wa;
