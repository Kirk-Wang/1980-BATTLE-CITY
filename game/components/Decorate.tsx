import cn from "classnames";
import React from "react";

export default class Decorate extends React.Component {
    public shouldComponentUpdate() {
        return false;
    }
    public render() {
        return (
            <div className="decorate">
                <div className="topBorder">
                    <span className={cn(["l", "mr"])} style={{ width: 40 }} />
                    <span className={cn(["l", "mr"])} />
                    <span className={cn(["l", "mr"])} />
                    <span className={cn(["l", "mr"])} />
                    <span className={cn(["l", "mr"])} />
                    <span className={cn(["r", "ml"])} style={{ width: 40 }} />
                    <span className={cn(["r", "ml"])} />
                    <span className={cn(["r", "ml"])} />
                    <span className={cn(["r", "ml"])} />
                    <span className={cn(["r", "ml"])} />
                </div>
                <h1>1980-BATTLE-CITY</h1>
                <div className="view">
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                </div>
                <div className={cn(["view", "l"])}>
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                </div>
            </div>
        );
    }
}
