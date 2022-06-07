require("dotenv").config();

import { Client, VoiceState } from "discord.js";
import db from "../config/firestore";
import { voiceCollect } from "../interface/voiceCollect";

module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState: VoiceState, newState: VoiceState, client: Client) {
        const user = await client.users.fetch(newState.id);
        const member = await newState.guild.members.fetch(user.id);
        try {
            const voiceChannelID: string = "983768244148117504"; // ตัวอย่างห้อง test

            // user เข้ามาในห้อง 
            if (!oldState.channel && newState.channel?.id === voiceChannelID) {
                const channel = await newState.guild.channels.create(user.tag, {
                    type: 'GUILD_VOICE',
                    parent: newState.channel.parent!,
                });
                channel.permissionOverwrites.create(user.id, {
                    MANAGE_CHANNELS: true,
                    MUTE_MEMBERS: true,
                    DEAFEN_MEMBERS: true,
                    MANAGE_ROLES: true,
                    MOVE_MEMBERS: true,
                });
                member.voice.setChannel(channel);

                //เก็บข้อมูลห้องที่สร้างมาใหม่โดยบอทลงใน database
                let data: voiceCollect = {
                    user_ID: user.id,
                    channel_ID: channel.id,
                };
                const res = await db.collection("voiceCollectDB").add(JSON.parse(JSON.stringify(data)));

                //user ออกจากห้องเสียง
            } else if(!newState.channel){ 
                // Get ข้อมูลห้องใน db
                const resultData = await db.collection("voiceCollectDB").where("channel_ID","==",oldState.channel?.id).get();
                if (resultData.size === 0) return;

                let dataFromFirebase:voiceCollect[] = []
                resultData.forEach((doc)=>{
                    dataFromFirebase.push({
                        ...doc.data(),
                        id:doc.id
                    } as voiceCollect)
                })
                if (oldState.channel?.id === dataFromFirebase[0]?.channel_ID) {
                    if (oldState.channel.members.size < 1) {
                      oldState.channel.delete();
                      // ลบข้อมูลออกจาก database
                    await db.collection("voiceCollectDB").doc(dataFromFirebase[0].id!).delete()
                    }
                  }
            }
        } catch (e) {
            console.log(e);
        }
    },
};