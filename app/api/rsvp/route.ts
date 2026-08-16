import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { form } = await req.json();

    const text = `
📩 Նոր պատվեր

👤 Անուն: ${form.name}
📞 Հեռախոս: ${form.phone}
📧 Email: ${form.email || "-"}
🎫 Կոդ: ${form.invitationCode}

💬 Մեկնաբանություն:
${form.message || "-"}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Telegram error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}