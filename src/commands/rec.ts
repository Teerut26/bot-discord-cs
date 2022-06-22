import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rec")
        .setDescription("record voice channel"),
    async execute(interaction: CommandInteraction, client: Client) {
        if (interaction.member?.user) {
            
        }
        
    },
};
