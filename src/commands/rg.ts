import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";

const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
};

module.exports = {
    data: new SlashCommandBuilder().setName("rg").setDescription("สุ่มจับคู่"),
    async execute(interaction: CommandInteraction, client: Client) {
        let result = await interaction.guild?.members.fetch();
        let list_member = result
            ?.filter((member) => !member.user.bot)
            .map((member) => ({
                ...member,
            }));

        let random1 = randomNumber(list_member?.length!)
        let random2 = randomNumber(list_member?.length!)

        if (random1 === random2) {
            random2 = randomNumber(list_member?.length!)
        }

        let messageEmbed = new MessageEmbed().setTitle("Duo Random")
        messageEmbed.setDescription(`<@${list_member![random1].user.id}> ❤️ <@${list_member![random2].user.id}>`)

        await interaction.reply({embeds:[messageEmbed]});
    },
};
