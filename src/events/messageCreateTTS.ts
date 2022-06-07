import { Client, CommandInteraction, Message } from "discord.js";
import * as googleTTS from "google-tts-api";
import { promises } from "fs";
import {
    createAudioPlayer,
    createAudioResource,
    DiscordGatewayAdapterCreator,
    joinVoiceChannel,
} from "@discordjs/voice";
import { ObjectData } from "../interface/ObjectData";
require("dotenv").config()

module.exports = {
    name: "messageCreate",
    async execute(message: Message, client: Client) {
        try {
            let oldData: ObjectData[] = JSON.parse(
                await (await promises.readFile("dataTTS.json")).toString()
            );
            let result_filter = oldData.filter(
                (item) =>
                    item.channelID === message.channelId &&
                    item.guildID === message.guildId
            );
            if (result_filter.length > 0) {
                if (!message.member?.voice.channel) {
                    return;
                }

                if (message.author.id === process.env.CLIENT_ID) {
                    return;
                }

                if (message.content.length <= 0) {
                    return
                }

                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channelId as string,
                    guildId: message.guildId as string,
                    adapterCreator: message.guild
                        ?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
                });

                const player = createAudioPlayer();

                const audioURL = googleTTS.getAudioUrl(message.content, {
                    lang: result_filter[0].lang,
                    slow: false,
                    host: "https://translate.google.com",
                });

                const resource = createAudioResource(audioURL);

                connection.subscribe(player);

                player.play(resource);
            }
        } catch (error) {
            return message.reply("มีข้อผิดพลาดบางอย่าง")
        }
    },
};
