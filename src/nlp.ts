const { NlpManager } = require("node-nlp");
import fs from "fs";
import path from "path";
// import { NlpManager } from "node-nlp"

const manager = new NlpManager({
    languages: ["th"],
    forceNER: true,
});

// const data = fs.readFileSync(path.join(__dirname, "model.nlp"), "utf8");
// manager.import(data);

type Intent =
    | "greetings.hello"
    | "greetings.bye"
    | "question.selfbot"
    | "question.handsome"
    | "question.luck"
    | "check.selfbot";

interface Documents {
    word: string[];
    intent: Intent;
}

let documents: Documents[] = [
    {
        word: ["สวัสดี", "ดีครับ", "หวัดดี"],
        intent: "greetings.hello",
    },
    {
        word: [
            "ไปละ",
            "เจอกัน",
            "แล้วเจอกัน",
            "บาย",
            "bye",
            "seeya",
            "cya",
            "เราไปแล้วนะ",
            "นอนละ",
            "ไปนอนละ",
            "ง่วง",
            "ง่วงละ",
            "จะไปละ",
            "จะไปละนะ",
            "ไปก่อนนะ",
            "ไปละนะ",
        ],
        intent: "greetings.bye",
    },
    {
        word: [
            "ใครหล่อสุดในนี้",
            "ในนี้ใครหล่อสุด",
            "คนหล่อ",
            "เหล่ท่อ",
            "หล่อ",
            "ใครหน้าตาดีที่สุด",
            "หน้าตาดี",
            "ใครหล่อ",
        ],
        intent: "question.handsome",
    },
    {
        word: [
            "คือใครอะ",
            "ใครอะ",
            "who",
            "นี้ใคร",
            "ใคร",
            "เป็นใคร",
            "คนนี้ใคร",
        ],
        intent: "question.selfbot",
    },
    {
        word: [
            "โม้ป่าว",
            "โม้",
            "ไม่เชื่อ",
            "เรื่องจริงไหม",
            "ไม่เชื่ออยู่ดี",
            "ทำไงก็ไม่เชื่อ",
            "เชื่อไม่ได้",
        ],
        intent: "check.selfbot",
    },
    {
        word: [
            "ดวง",
            "ดวงของวันนี้",
            "ดูดวง",
            "ดวงของวันนี้เป็นไงบ้าง",
            "ดวงวันนี้เป็นไงบ้าง",
        ],
        intent: "question.luck",
    },
];

let answers: Documents[] = [
    {
        intent: "question.luck",
        word: ["โชคดี", "โชคไม่ค่อยดี", "โชคดีมาก", "โชคไม่ดี"],
    },
    {
        intent: "greetings.hello",
        word: ["สวัสดีครับ", "สวัสดีค่ะ", "ดีค่ะ", "ดีค้าบ"],
    },
    {
        intent: "greetings.bye",
        word: ["บายบ่าย", "บายบุ่ย", "เจอกันค้าบบบ"],
    },
    {
        intent: "question.selfbot",
        word: ["เราคือบอท"],
    },
    {
        intent: "question.handsome",
        word: ["ปั้น", "เจ", "โฮป"],
    },
    {
        intent: "check.selfbot",
        word: ["จิง", "จริง", "จริงๆ", "จริงนะ", "เชื่อเถอะ"],
    },
];

documents.map((document) => {
    document.word.map((word) => {
        manager.addDocument("th", word, document.intent);
    });
});

answers.map((answer) => {
    answer.word.map((word) => {
        manager.addAnswer("th", answer.intent, word);
    });
});

// Train and save the model.
(async () => {
    await manager.train();
    manager.save();
    const response = await manager.process("th", "ใครหน้าตาดี");
    console.log(response);
})();
