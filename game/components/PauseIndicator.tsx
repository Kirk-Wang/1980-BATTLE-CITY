import React from "react";
import Text from "./Text";

export default class PauseIndicator extends React.PureComponent<
    Partial<Point & { content: string; noflash: boolean }>,
    { visible: boolean }
> {
    public state = {
        visible: true,
    };
    private handle: any = null;

    public componentDidMount() {
        if (!this.props.noflash) {
            this.handle = setInterval(() => this.setState({ visible: !this.state.visible }), 250);
        }
    }

    public componentWillUnmount() {
        clearInterval(this.handle);
    }

    public render() {
        const { x = 0, y = 0, content = "pause" } = this.props;
        return (
            <Text
                content={content}
                x={x}
                y={y}
                fill="#db2b00"
                style={{ visibility: this.state.visible ? "visible" : "hidden" }}
            />
        );
    }
}
