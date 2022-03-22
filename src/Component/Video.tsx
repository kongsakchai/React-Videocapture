import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { connect, DispatchProp } from 'react-redux';
import Player from 'react-player'
import Menu from './Menu';

const Video = styled('video')`
    pointer-events: none;
    height: 100%;
    max-width: 100%;
`

const Wrapper = styled('div')`
    background-color: #242424;
`

const VideoComponent = (props: DispatchProp & Source) => {

    const videoRef = useRef<any>(null);
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    useEffect(() => {
        const getVideo = async () => {
            if (!props.videoId) {
                videoRef.current.srcObject = null;
                return;
            }
            try {
                const option: MediaStreamConstraints = {
                    "video": {
                        "deviceId": props.videoId!,
                        "frameRate": 60,
                        "aspectRatio": 16 / 9,
                        width: 1920,
                        height: 1080,
                    }
                }
                if (props.audioId != "") option.audio = { "deviceId": props.audioId }
                const stream = await navigator.mediaDevices.getUserMedia(option);
                videoRef.current.srcObject = stream;
            } catch {
                console.log("error...");
            }
        }
        getVideo();
    }, [props]);

    return (
        <Wrapper sx={
            (fullscreen) ? {
                width: "100%",
                height: "100%",
            } : {
                width: "60%",
                height: "60%",
            }
        }>
            <Video ref={videoRef} autoPlay />
            <Menu fullscreen={fullscreen} setFullscreen={setFullscreen} />
        </Wrapper>

    );

}

const mapStateToProps = function (state: any) {
    return {
        videoId: state.source.videoId,
        audioId: state.source.audioId
    }
}

export default connect(mapStateToProps)(VideoComponent);