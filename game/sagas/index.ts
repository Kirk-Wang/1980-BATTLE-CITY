export function* rootSaga() {
    DEV.LOG && console.log("root saga started");

    yield "unknown";
}
