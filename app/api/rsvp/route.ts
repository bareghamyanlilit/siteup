import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { form, code } = await req.json();

    const text = `
      📩 Նոր պատվեր

      🎫 Հրավիրատոմսի կոդ: ${code}
      👤 Անուն: ${form.name}
      📞 Հեռախոս: ${form.phone}
      📧 Email: ${form.email || "-"}

      💬 Մեկնաբանություն:
      ${form.message || "-"}

      ━━━━━━━━━━━━━━
      💍 ՀՐԱՎԵՐԻ ՏՎՅԱԼՆԵՐ
      ━━━━━━━━━━━━━━

      👩‍❤️‍👨 Անուններ: ${form.names || "-"}
      📅 Առիթի օրը: ${form.day || "-"}

      🏠 Փեսայի տուն
      ⏰ Ժամ: ${form.time1 || "-"}
      📍 Հասցե: ${form.addres1 || "-"}

      🏠 Հարսի տուն
      ⏰ Ժամ: ${form.time2 || "-"}
      📍 Հասցե: ${form.addres2 || "-"}

      ⛪ Եկեղեցի
      ⏰ Ժամ: ${form.time3 || "-"}
      📍 Հասցե: ${form.addres3 || "-"}

      🍽 Ռեստորան
      ⏰ Ժամ: ${form.time4 || "-"}
      📍 Հասցե: ${form.addres4 || "-"}

      🎵 Երգ: ${form.music || "-"}

      Կազմը։
            ${form.data},


      Գինը։ ${form.price}
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