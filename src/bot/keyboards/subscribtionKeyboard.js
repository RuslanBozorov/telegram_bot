import { Markup } from "telegraf";
export const subscribtionKeyboard = Markup.inlineKeyboard([
        [Markup.button.url("Kanalga o'tish", "https://t.me/CodeBro2025")],
        [Markup.button.callback("✅ Tasdiqlash", "check_sub")],
      ])