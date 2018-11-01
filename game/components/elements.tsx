import React from "react";
import { Image } from "../hocs/Image";

interface PixelProps {
    x: number;
    y: number;
    fill: string;
}
export class Pixel extends React.PureComponent<PixelProps, {}> {
    public static displayName = "Pixel";
    public render() {
        const { x, y, fill } = this.props;
        return <rect x={x} y={y} width={1} height={1} fill={fill} />;
    }
}

interface BitMapProps {
    useImage?: boolean;
    x: number;
    y: number;
    d: string[];
    scheme: { [key: string]: string };
    style?: React.CSSProperties;
}

let nextImageKey: number = 1;
const imageKeyMap = new Map<any, number>();
function resolveImageKey(d: string[]) {
    if (!imageKeyMap.has(d)) {
        imageKeyMap.set(d, nextImageKey++);
    }
    return imageKeyMap.get(d);
}

// tslint:disable-next-line:max-classes-per-file
export class Bitmap extends React.PureComponent<BitMapProps> {
    public render() {
        const { x, y, d, scheme, style = {}, useImage } = this.props;
        const width = d[0].length;
        const height = d.length;
        const content = d.map((cs, dy) =>
            Array.from(cs).map((c, dx) => <Pixel key={dy * width + dx} x={dx} y={dy} fill={scheme[c]} />),
        );
        return (
            <Image
                disabled={!useImage}
                imageKey={`Bitmap/${resolveImageKey(d)}`}
                transform={`translate(${x},${y})`}
                width={width}
                height={height}
                style={style}
            >
                {content}
            </Image>
        );
    }
}