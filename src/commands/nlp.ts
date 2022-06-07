import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";
import { promises } from "fs";
import { NLP } from "../interface/NLP";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nlp")
        .setDescription("chatbot")
        .addStringOption((option) =>
            option
                .setName("on-off")
                .setDescription("on-off")
                .setRequired(true)
                .addChoice("on", "on")
                .addChoice("off", "off")
        ),
    async execute(interaction: CommandInteraction, client: Client) {
        const resutl = interaction.options.getString("on-off");

        if (resutl === "on") {
            let oldData: NLP[] = JSON.parse(
                await (await promises.readFile("dataNLP.json")).toString()
            );
            let result_filter = oldData.filter(
                (item) =>
                    item.channelID === interaction.channelId &&
                    item.guildID === interaction.guildId
            );

            if (result_filter.length === 0) {
                oldData.push({
                    channelID: interaction.channel?.id as string,
                    guildID: interaction.guild?.id as string,
                });
                await promises.writeFile(
                    "dataNLP.json",
                    JSON.stringify(oldData)
                );
                await interaction.reply(`เปิดใช้งาน chatbot แล้ว`);
            } else {
                let dataWithoutOldData = oldData.filter(
                    (item) =>
                        item.channelID !== interaction.channelId &&
                        item.guildID !== interaction.guildId
                );
                await promises.writeFile(
                    "dataNLP.json",
                    JSON.stringify([
                        ...dataWithoutOldData,
                        {
                            channelID: interaction.channel?.id as string,
                            guildID: interaction.guild?.id as string,
                        },
                    ])
                );
                await interaction.reply(`เปิดใช้งาน chatbot แล้ว`);
            }
        }
        if (resutl === "off") {
            let oldData2: NLP[] = JSON.parse(
                await (await promises.readFile("dataNLP.json")).toString()
            );
            let result_filter2 = oldData2.filter(
                (item) =>
                    item.channelID !== interaction.channelId &&
                    item.guildID !== interaction.guildId
            );

            await promises.writeFile(
                "dataNLP.json",
                JSON.stringify(result_filter2)
            );
            await interaction.reply("ปิดใช้งาน chatbot สำหรับ channel นี้");
        }
    },
};
