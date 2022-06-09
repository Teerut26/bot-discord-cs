import axios from "axios";
import { Grid, ViuAPIResponse } from "./interface/ViuAPIResponse";
require("dotenv").config();

export default class Viu {
    private response: ViuAPIResponse | undefined = undefined;
    private base_url: string = process.env.VIU_BASE_URL!;

    public async excute() {
        const { data } = await axios(
            `${this.base_url}/home/index&platform_flag_label=phone&language_flag_id=4&ut=0&area_id=4`,
            {
                headers: {
                    Platform: "android",
                    Authorization: `Bearer ${process.env.VIU_TOKEN}`,
                    "Accept-Encoding": "gzip, deflate",
                    "User-Agent": "okhttp/3.12.1",
                },
            }
        );
        this.response = data;
    }

    public getRanking(): Grid {
        return this.response?.data.grid.filter(
            (item) => item.grid_id === "180806"
        )[0]!;
    }
}
