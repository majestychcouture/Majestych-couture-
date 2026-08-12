// Majestych Couture — Wompi secure signing endpoint
// Cloudflare Worker. Keep WOMPI_INTEGRITY_SECRET ONLY in Worker Secrets.
// Never place prod_integrity_... or prv_prod_... in GitHub.

function corsHeaders(origin, allowed) {
  return {
    "Access-Control-Allow-Origin": allowed || origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.ALLOWED_ORIGIN || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/sign" || request.method !== "POST") {
      return new Response(JSON.stringify({error:"Not Found"}), {
        status: 404, headers: corsHeaders(origin, allowed)
      });
    }

    if (allowed && origin !== allowed) {
      return new Response(JSON.stringify({error:"Forbidden"}), {
        status: 403, headers: corsHeaders(origin, allowed)
      });
    }

    let body;
    try { body = await request.json(); }
    catch {
      return new Response(JSON.stringify({error:"JSON inválido"}), {
        status:400, headers:corsHeaders(origin, allowed)
      });
    }

    const reference = String(body.reference || "");
    const amount = String(body.amountInCents || "");
    const secret = env.WOMPI_INTEGRITY_SECRET;

    if (!reference || !/^[A-Za-z0-9_-]{1,255}$/.test(reference)) {
      return new Response(JSON.stringify({error:"Referencia inválida"}), {
        status:400, headers:corsHeaders(origin, allowed)
      });
    }
    if (!/^\d+$/.test(amount) || Number(amount) <= 0) {
      return new Response(JSON.stringify({error:"Monto inválido"}), {
        status:400, headers:corsHeaders(origin, allowed)
      });
    }
    if (!secret) {
      return new Response(JSON.stringify({error:"Secret no configurado"}), {
        status:500, headers:corsHeaders(origin, allowed)
      });
    }

    const data = new TextEncoder().encode(reference + amount + "COP" + secret);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const signature = [...new Uint8Array(hash)]
      .map(b => b.toString(16).padStart(2,"0")).join("");

    return new Response(JSON.stringify({
      signature,
      publicKey: env.WOMPI_PUBLIC_KEY || ""
    }), {
      status:200,
      headers:corsHeaders(origin, allowed)
    });
  }
};
