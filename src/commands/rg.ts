import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";

const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rg")
        .setDescription("สุ่มจับคู่")
        .addStringOption((option) =>
            option
                .setName("middle-word")
                .setDescription("middle word")
                .setRequired(false)
        ),
    async execute(interaction: CommandInteraction, client: Client) {
        let middle_word = interaction.options.getString("middle-word") ? interaction.options.getString("middle word") : "&"
        let result = await interaction.guild?.members.fetch();
        let list_member = result
            ?.filter((member) => !member.user.bot)
            .map((member) => ({
                ...member,
            }));

        let random1 = randomNumber(list_member?.length!);
        let random2 = randomNumber(list_member?.length!);

        if (random1 === random2) {
            random2 = randomNumber(list_member?.length!);
        }

        let messageEmbed = new MessageEmbed().setTitle("Duo Random");
        messageEmbed.setDescription(
            `<@${list_member![random1].user.id}> ${middle_word} <@${
                list_member![random2].user.id
            }>`
        );

        await interaction.reply({ embeds: [messageEmbed] });
    },
};
