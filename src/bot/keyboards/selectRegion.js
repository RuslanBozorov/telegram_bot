import { Markup } from "telegraf";

export const selectRegion  = Markup.inlineKeyboard([[
    Markup.button.callback("Samarqand","samarqand"),
    Markup.button.callback("Toshkent","toshkent"),
]])