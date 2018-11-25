import cn from "classnames";
import React from "react";
import { transform } from "../utils/common";

export default class Button extends React.Component<any, any> {
    public dom: HTMLElement;
    public shouldComponentUpdate(nextProps: any) {
        return nextProps.active !== this.props.active;
    }
    public render() {
        const { active, color, size, top, left, label, position, arrow } = this.props;
        return (
            <div className={cn({ button: true, [color]: true, [size]: true })} style={{ top, left }}>
                <i
                    className={cn({ [active]: active })}
                    ref={c => {
                        this.dom = c;
                    }}
                />
                {size === "s1" && (
                    <em
                        style={{
                            [transform]: `${arrow} scale(1,2)`,
                        }}
                    />
                )}
                <span className={cn({ [position]: position })}>{label}</span>
            </div>
        );
    }
}
