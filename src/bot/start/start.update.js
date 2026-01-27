import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { setName, setPhone } from "./start.service.js";
import { userModel } from "../../models/user.model.js";

bot.start(async (ctx) => {
  const chatId = Number(ctx.from.id);
  console.log(chatId);

  await userModel.create({ chat_id: chatId });
  ctx.reply(`Assalomu alaykum😊\n\nIsmingizni kiriting:`);
});
const keyboardUser = [
  [
    {
      text: "📲Telefon raqam",
      request_contact: true,
    },
  ],
];

bot.on("text", async (ctx) => {
  console.log(ctx.message);
  const name = ctx.message.text;
  if (name.startsWith("/")) return;
  const chatId = Number(ctx.from.id);
  const res = await setName(chatId, name);

  if (res.modifiedCount > 0 || res.matchedCount > 0) {
    ctx.reply(
      `Rahmat! 😊 ${name}\n\nTelefon raqamni kiriting📲`,
      Markup.keyboard(keyboardUser).resize().oneTime(),
    );
  }
});

bot.on("contact", async (ctx) => {
  const phone = ctx.message.contact.phone_number;
  const chatId = Number(ctx.from.id);
  await setPhone(chatId, phone);
  ctx.reply("Sizning raqamingiz 📲 : " + phone);
});
