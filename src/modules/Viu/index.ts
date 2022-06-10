import axios from "axios";
import { ViuAPIResponse } from "./interface/ViuAPIResponse";
require("dotenv").config();

export default class Viu {
    private response: ViuAPIResponse | undefined = undefined;
    private base_url: string = process.env.VIU_BASE_URL!;

    public async excute() {
        const { data } = await axios({
            method: "get",
            url: "https://www.viu.com/ott/th/index.php?r=listing/ajax&platform_flag_label=web&area_id=4&language_flag_id=4&cpreference_id=&grid_id=180804",
            headers: {
                authority: "www.viu.com",
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
                referer:
                    "https://www.viu.com/ott/th/th/listing/180804/TOP-10-%E0%B8%8B%E0%B8%B5%E0%B8%A3%E0%B8%B5%E0%B8%AA%E0%B9%8C%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%99%E0%B8%B4%E0%B8%A2%E0%B8%A1/",
                "sec-ch-ua":
                    '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
                "x-requested-with": "XMLHttpRequest",
            },
        });
        this.response = data;
    }

    public getRanking(): ViuAPIResponse {
        return this.response!;
    }
}
