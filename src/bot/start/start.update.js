import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { setName, setPhone } from "./start.service.js";
import { userModel } from "../../models/user.model.js";
import { checkSubscription } from "../subscription/subscription.js";
import { keyboardUser } from "../keyboards/keyboard.user.js";
import { subscribtionKeyboard } from "../keyboards/subscribtionKeyboard.js";
import { selectRegion } from "../keyboards/selectRegion.js";
import { superAdminKeyboard } from "../keyboards/superAdminKeyboard.js";
const SUPERADMINS = [6574284966];
bot.start(async (ctx) => {
  const chatId = Number(ctx.message.from.id);

  let existUser= await userModel.findOne({chat_id:chatId})

  if(!existUser){
    existUser = await userModel.create({chat_id:chatId})
  }
  await userModel.updateMany({}, { $set: { role: "USER" } });

  if (SUPERADMINS.includes(chatId) && existUser.role !== "SUPERADMIN") {
    await userModel.updateOne(
      { chat_id: chatId },
      { $set: { role: "SUPERADMIN" } }
    );
    existUser.role = "SUPERADMIN";
  }
  
  if(existUser.role == "SUPERADMIN"){
    return ctx.reply("Admin menyudan tanlang",superAdminKeyboard)
  }


  const isSubscription = await checkSubscription(ctx);
  if (!isSubscription) {
    return ctx.reply(
      "Botdan to'liq foydalanish uchun kanalga azo bo'ling",
      subscribtionKeyboard
    ); 
  }
  await userModel.create({ chat_id: chatId });
  ctx.reply(`Assalomu alaykum😊\n\nIsmingizni kiriting:`);
});


bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  if(text.length > 300){
    ctx.reply("📝 Juda uzun xabar. Qisqaroq yozing.")
  }
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



  ctx.reply("Viloyatingizni tanlang :",selectRegion)

});

bot.action("samarqand",async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply("Viloyatingiz" + ctx.update.callback_query.data)
})

bot.action("toshkent",async (ctx) => {
  ctx.reply("Sizning viloyatingiz Toshkent")
})


bot.action("check_sub", async (ctx) => {  
  const isSub = await checkSubscription(ctx);

  if (!isSub) {
    return ctx.reply(
      "Iltimos, kanalga a'zo bu'ling",
      subscribtionKeyboard
    );
  }

  ctx.reply(`Botdan foydalanishingiz mumkin:\n\nIsmingizni kiriting:`);
});
