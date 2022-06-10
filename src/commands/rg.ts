import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import duoController from "../controller/rg/duo.controller";
import groupController from "../controller/rg/group.controller";



module.exports = {
    data: new SlashCommandBuilder()
        .setName("rg")
        .setDescription("สุ่มจับคู่")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("duo")
                .setDescription("duo")
                .addStringOption((option) =>
                    option
                        .setName("middle-word")
                        .setDescription("middle word")
                        .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("group")
                .setDescription("group")
                .addIntegerOption((option) =>
                    option
                        .setName("group-amout")
                        .setDescription("จำนวนกลุ่ม")
                        .setRequired(false)
                )
                .addIntegerOption((option) =>
                    option
                        .setName("member-amout-in-group")
                        .setDescription("จำนวนสมาชิกในกลุ่ม")
                        .setRequired(false)
                )
        ),
    async execute(interaction: CommandInteraction, client: Client) {
        if (interaction.options.getSubcommand() === "duo") {
            return duoController(interaction, client);
        } else if (interaction.options.getSubcommand() === "group") {
            return groupController(interaction, client);
        }
    },
};
