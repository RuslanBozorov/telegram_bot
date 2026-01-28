export const checkSubscription = async (ctx) => {
  try {
    const chatId = ctx.from.id;
  const channel = "@CodeBro2025";

  const member = await ctx.telegram.getChatMember(channel, chatId);

  return ["adminstrator", "creator", "member"].includes(member.status);
  } catch (error) {
    console.log(error);
    return false  
  }
};
