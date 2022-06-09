import axios from "axios";
import FormData from "form-data";
import {
    Client,
    Message,
    MessageAttachment,
    MessageEmbed,
    TextChannel,
} from "discord.js";
require("dotenv").config();

const sendToRemoveBG = async (url: string): Promise<any> => {
    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_url", url);

    let res = await axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        responseType: "stream",
        headers: {
            ...formData.getHeaders(),
            "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
        },
        data: formData,
    });

    return res.data;
};

module.exports = {
    name: "messageCreate",
    async execute(message: Message, client: Client) {
        if (message.content !== ">rm.bg") {
            return;
        }

        if (message.member?.user.bot) {
            return;
        }

        if (!message.attachments) {
            return message.reply("ไม่ได้แนบไฟล์รูปภาพ");
        }

        let fileAllow = ["image/png", "image/jpeg"];

        if (!fileAllow.includes(message.attachments.first()?.contentType!)) {
            return message.reply("ไม่ใช่ไฟล์รูปภาพ");
        }

        let channel = client.channels.cache.get(
            message.channelId
        ) as TextChannel;

        await message.delete();

        let messessLoading = await channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Loading...")
                    .setImage(message.attachments.first()?.url!),
            ],
        });

        let resultImage = await sendToRemoveBG(
            message.attachments.first()?.url!
        );

        const attachment = new MessageAttachment(resultImage, "result.png");

        return await messessLoading.edit({
            files: [attachment],
            embeds: [
                new MessageEmbed()
                    .setTitle("Success")
                    .setImage('attachment://result.png'),
            ],
        });
    },
};
