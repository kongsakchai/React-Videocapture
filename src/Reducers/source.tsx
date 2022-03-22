interface Action {
    type: string,
    value: Source
}

export default (state: Source = { audioId: "", videoId: "" }, action: Action): Source => {
    switch (action.type) {
        case 'SET_VIDEO':
            return {
                videoId: action.value.videoId,
                audioId: state.audioId
            };
        case 'SET_AUDIO':
            return {
                videoId: state.videoId,
                audioId: action.value.audioId
            };
        default:
            return state;
    }
}