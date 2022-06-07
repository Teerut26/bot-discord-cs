import { GuildMember, User } from "discord.js";

export interface Poll {
    topic: string;
    description?: string;
    guildID: string;
    owner: GuildMember;
    choice: Choice[];
}

export interface Choice {
    name: string;
    vote_value: number;
    id: string;
}

export interface MemberVote {
    voteChoiceId: string;
    voteChoiceName: string;
    memberID: string;
    user: GuildMember;
}
