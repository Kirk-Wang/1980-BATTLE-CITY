import { List } from "immutable";
import { StageConfig } from "../types/StageConfig";

const requireStage = (require as any).context("stages", false, /\.json/);
const filenames = List<string>(requireStage.keys());

let stages = filenames
    .map(requireStage)
    .map(StageConfig.fromRawStageConfig)
    // 按照关卡数字顺序排序
    .sortBy((s: any) => Number(s.name));

if (DEV.TEST_STAGE) {
    stages = stages.unshift(
        StageConfig.fromRawStageConfig({
            name: "test",
            custom: false,
            difficulty: 1,
            map: [
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  X  X  X  X  X  X  X  X  ",
                "X  X  X  X  X  Xf Tf Tf X  X  X  X  X  ",
                "X  X  X  X  X  X  E  Tf X  X  X  X  X  ",
            ],
            bots: ["1*basic"],
        }),
    );
}

export const firstStageName = stages.first().name;

export const defaultStages = stages;
