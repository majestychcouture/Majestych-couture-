// Majestych Couture — Wompi secure signing endpoint
// Deploy this file as a Cloudflare Worker (or equivalent serverless function).
// Store WOMPI_INTEGRITY_SECRET as a server-side secret. NEVER put it in GitHub/frontend.
export default {
  async fetch(request, env) {
    if (request.method !== "POST") return new Response("Method Not Allowed", {status:405});
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "";
    if (allowed && origin !== allowed) return new Response("Forbidden", {status:403});
    const body = await request.json();
    const reference = String(body.reference || "");
    const amount = String(body.amountInCents || "");
    const currency = "COP";
    if (!reference || !/^\d+$/.test(amount)) return new Response("Datos inválidos", {status:400});
    const secret = env.WOMPI_INTEGRITY_SECRET;
    if (!secret) return new Response("Secret no configurado", {status:500});
    const data = new TextEncoder().encode(reference + amount + currency + secret);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const signature = [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,"0")).join("");
    return new Response(JSON.stringify({signature, publicKey: env.WOMPI_PUBLIC_KEY}), {
      headers: {"content-type":"application/json","access-control-allow-origin": allowed || "*"}
    });
  }
};
