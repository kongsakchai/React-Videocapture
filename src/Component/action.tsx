export const addVideo = (id: string) => {
    return {
        type: 'SET_VIDEO',
        value: { videoId: id }
    }
}

export const addAudio = (id: string) => {
    return {
        type: 'SET_AUDIO',
        value: { audioId: id, }
    }
}