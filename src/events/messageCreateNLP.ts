import { Client, CommandInteraction, Message } from "discord.js";
import * as googleTTS from "google-tts-api";
import { ObjectData } from "../interface/ObjectData";
const { NlpManager } = require("node-nlp");
import { promises } from "fs";
import fs from "fs";
const manager = new NlpManager({
    languages: ["th"],
    forceNER: true,
});

fs.readFile("model.nlp", "utf8", function (err, data) {
    manager.import(data);
});

require("dotenv").config();

module.exports = {
    name: "messageCreate",
    async execute(message: Message, client: Client) {
        try {
            let oldData: ObjectData[] = JSON.parse(
                await (await promises.readFile("dataNLP.json")).toString()
            );
            let result_filter = oldData.filter(
                (item) =>
                    item.channelID === message.channelId &&
                    item.guildID === message.guildId
            );
            if (result_filter.length > 0) {
                if (message.author.id === process.env.CLIENT_ID) {
                    return;
                }

                if (message.content.length <= 0) {
                    return;
                }

                const response = await manager.process("th", message.content);

                if (!response.answer) {
                    return;
                }
                

                message.reply(response.answer);
            }
        } catch (error) {
            return message.reply("มีข้อผิดพลาดบางอย่าง");
        }
    },
};
