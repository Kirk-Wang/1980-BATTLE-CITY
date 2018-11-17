import { Record } from "immutable";

const TextRecordBase = Record({
    textId: 0,
    content: "",
    fill: "#000000",
    x: 0,
    y: 0,
});

export default class TextRecord extends TextRecordBase {
    public static fromJS(object: any) {
        return new TextRecord(object);
    }
}
