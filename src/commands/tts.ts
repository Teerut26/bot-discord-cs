import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";
import { promises } from "fs";
import { LangType, ObjectData } from "../interface/ObjectData";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tts")
        .setDescription("tts")
        .addStringOption((option) =>
            option
                .setName("on-off")
                .setDescription("on-off")
                .setRequired(true)
                .addChoice("on", "on")
                .addChoice("off", "off")
        )
        .addStringOption((option) =>
            option
                .setName("lang")
                .setDescription("lang")
                .setRequired(false)
                .addChoice("Thai (Thailand)", "th-TH")
                .addChoice("English (United States)", "en-US")
                .addChoice("Korean (South Korea)", "ko-KR")
                .addChoice("Japanese (Japan)", "ja-JP")
                .addChoice("Hindi (India)", "hi-IN")
        ),
    async execute(interaction: CommandInteraction, client: Client) {
        interaction.member
        const resutl = interaction.options.getString("on-off");
        const lang = interaction.options.getString("lang") as LangType | null;
        if (resutl === "on") {
            let oldData: ObjectData[] = JSON.parse(
                await (await promises.readFile("dataTTS.json")).toString()
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
                    lang: lang ? lang : "th-TH",
                });
                await promises.writeFile("dataTTS.json", JSON.stringify(oldData));
                await interaction.reply(
                    `เปิดใช้งาน TTS ภาษา \`\`${
                        lang ? lang : "th-TH"
                    }\`\` สำหรับ channel นี้แล้ว`
                );
            } else {
                let dataWithoutOldData = oldData.filter(
                    (item) => item.channelID !== interaction.channelId && item.guildID !== interaction.guildId
                );
                await promises.writeFile(
                    "dataTTS.json",
                    JSON.stringify([
                        ...dataWithoutOldData,
                        {
                            channelID: interaction.channel?.id as string,
                            guildID: interaction.guild?.id as string,
                            lang: lang ? lang : "th-TH",
                        },
                    ])
                );
                await interaction.reply(
                    `เปิดใช้งาน TTS ภาษา \`\`${
                        lang ? lang : "th-TH"
                    }\`\` สำหรับ channel นี้แล้ว`
                );
                // await interaction.reply(`channel นี้เปิดใช้งาน TTS ภาษา \`\`${result_filter[0].lang}\`\` อยู่แล้ว`);
            }
        }
        if (resutl === "off") {
            let oldData2: ObjectData[] = JSON.parse(
                await (await promises.readFile("dataTTS.json")).toString()
            );
            let result_filter2 = oldData2.filter(
                (item) =>
                    item.channelID !== interaction.channelId &&
                    item.guildID !== interaction.guildId
            );

            await promises.writeFile(
                "dataTTS.json",
                JSON.stringify(result_filter2)
            );
            await interaction.reply("ปิดใช้งาน TTS สำหรับ channel นี้");
        }
    },
};
