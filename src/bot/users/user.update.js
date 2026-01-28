import { bot } from "../bot.js";
import { getAllUsers } from "./user.service.js";

bot.hears("👥 Userlarni ko'rish", async ctx => {
    const data = await getAllUsers(ctx)

    if(data){
        return ctx.reply(`✅ Barcha userlar ruyxati : \n\n  ${data}`)

       
    }else{
         ctx.reply("Userlar yo'q")
    }  

})
