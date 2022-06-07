import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping a Pong !"),
    async execute(interaction: CommandInteraction, client: Client) {
        await interaction.reply("pong");
    },
};
