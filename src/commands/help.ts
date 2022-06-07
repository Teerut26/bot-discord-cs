import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Help Command"),
    async execute(interaction: CommandInteraction, client: Client) {
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle("Commands");
        messageEmbed
            .addField("/help", "``help command``")
            .addField("/tts", "``text to speech``")
            .addField("/ping", "``ping pong``");

        return await interaction.reply({ embeds: [messageEmbed] });
    },
};
