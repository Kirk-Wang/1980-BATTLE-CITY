import _ from "lodash";
import { connect } from "react-redux";
import { GameScene as GameSceneCompnent } from "../components/GameScene";
import { State } from "../reducers";

export const GameScene = connect<State>(_.identity)(GameSceneCompnent);
