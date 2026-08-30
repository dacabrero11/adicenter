import { NextRequest, NextResponse } from "next/server";
import { systemPrompt } from "@/data/jimmy-prompt";
import { responderJimmy } from "@/data/jimmy-guion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODELO = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 400;
const MAX_TURNOS = 12; // recorta el historial: una conversación de venta no necesita más
const MAX_LARGO = 1000; // caracteres por mensaje

/**
 * Límite por IP en memoria. No sobrevive a un redeploy ni se comparte entre
 * instancias de Vercel, pero frena el caso real que importa: alguien pegándole
 * al endpoint desde una pestaña para quemarnos la cuenta.
 */
const golpes = new Map<string, number[]>();
const VENTANA = 60_000;
const MAX_POR_VENTANA = 8;

function permitido(ip: string) {
  const ahora = Date.now();
  const previos = (golpes.get(ip) ?? []).filter((t) => ahora - t < VENTANA);
  previos.push(ahora);
  golpes.set(ip, previos);
  if (golpes.size > 500) {
    for (const [k, v] of golpes) if (!v.some((t) => ahora - t < VENTANA)) golpes.delete(k);
  }
  return previos.length <= MAX_POR_VENTANA;
}

type Turno = { rol: "bot" | "user"; texto: string };

type Lead = Record<string, string>;

/**
 * J1MMY marca los datos de contacto con un bloque [[LEAD]]...[[/LEAD]] al final
 * de su respuesta. Acá lo separamos: el bloque se va al correo de ventas y el
 * visitante solo ve el texto limpio.
 */
function extraerLead(texto: string): { limpio: string; lead: Lead | null } {
  const m = texto.match(/\[\[LEAD\]\]([\s\S]*?)\[\[\/LEAD\]\]/);
  if (!m) return { limpio: texto, lead: null };

  const limpio = texto.replace(m[0], "").trim();
  try {
    const lead = JSON.parse(m[1].trim()) as Lead;
    // Sin nombre ni forma de contacto no sirve de nada: lo descartamos.
    if (!lead.nombre || (!lead.telefono && !lead.correo)) return { limpio, lead: null };
    return { limpio, lead };
  } catch {
    return { limpio, lead: null };
  }
}

/** Envía el lead a Web3Forms. Nunca lanza: si falla, el chat sigue igual. */
async function enviarLead(lead: Lead, historial: Turno[], ultimo: string) {
  const key = process.env.WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) return;

  const conversacion = [...historial, { rol: "user" as const, texto: ultimo }]
    .map((t) => `${t.rol === "user" ? "Cliente" : "J1MMY"}: ${t.texto.replace(/<[^>]*>/g, " ")}`)
    .join("\n");

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Lead desde J1MMY — ${lead.nombre}`,
        from_name: "J1MMY · Sitio web ADICENTER",
        origen: "Chat de J1MMY",
        nombre: lead.nombre,
        telefono: lead.telefono || "no proporcionado",
        correo: lead.correo || "no proporcionado",
        superficie: lead.superficie || "no especificada",
        area: lead.area || "no especificada",
        ubicacion: lead.ubicacion || "no especificada",
        resumen: lead.resumen || "",
        conversacion,
      }),
    });
  } catch (e) {
    console.error("Jimmy/lead", e);
  }
}


export async function POST(req: NextRequest) {
  let historial: Turno[] = [];
  let ultimo = "";

  try {
    const body = await req.json();
    historial = Array.isArray(body?.historial) ? body.historial : [];
    ultimo = typeof body?.mensaje === "string" ? body.mensaje.slice(0, MAX_LARGO).trim() : "";
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (!ultimo) return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!permitido(ip)) {
    // No es un error para el visitante: le respondemos con el guion.
    return NextResponse.json({ texto: responderJimmy(ultimo), fuente: "guion" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ texto: responderJimmy(ultimo), fuente: "guion" });
  }

  const messages = [
    ...historial
      .slice(-MAX_TURNOS)
      .filter((t) => t && typeof t.texto === "string" && t.texto.trim())
      .map((t) => ({
        role: t.rol === "user" ? ("user" as const) : ("assistant" as const),
        content: t.texto.slice(0, MAX_LARGO),
      })),
    { role: "user" as const, content: ultimo },
  ];

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 20_000);

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODELO,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);

    if (!r.ok) {
      console.error("Jimmy/Anthropic", r.status, await r.text().catch(() => ""));
      return NextResponse.json({ texto: responderJimmy(ultimo), fuente: "guion" });
    }

    const data = await r.json();
    const texto = (data?.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    if (!texto) return NextResponse.json({ texto: responderJimmy(ultimo), fuente: "guion" });

    const { limpio, lead } = extraerLead(texto);
    if (lead) {
      // No bloqueamos la respuesta del chat esperando al correo.
      void enviarLead(lead, historial, ultimo);
    }

    return NextResponse.json({ texto: limpio, fuente: "ia", lead: Boolean(lead) });
  } catch (e) {
    console.error("Jimmy/error", e);
    return NextResponse.json({ texto: responderJimmy(ultimo), fuente: "guion" });
  }
}
