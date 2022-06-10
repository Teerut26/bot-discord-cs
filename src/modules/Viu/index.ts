import axios from "axios";
import { ViuAPIResponse } from "./interface/ViuAPIResponse";
require("dotenv").config();

export default class Viu {
    private response: ViuAPIResponse | undefined = undefined;
    private base_url: string = process.env.VIU_BASE_URL!;

    public async excute() {
        const { data } = await axios.get("https://www.viu.com/ott/th/index.php?r=listing/ajax&platform_flag_label=web&area_id=4&language_flag_id=4&cpreference_id=&grid_id=180804");
        this.response = data;
    }

    public getRanking():ViuAPIResponse {
        return this.response!
    }
}
