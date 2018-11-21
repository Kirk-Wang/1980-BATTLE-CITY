function* players() {
    try {
        let action;
        while (true) {
            action = yield call(playersChannel);
            console.log(action);
        }
    } finally {
        // console.log()
    }
}
