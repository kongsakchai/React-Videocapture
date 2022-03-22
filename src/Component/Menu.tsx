import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dropdown from "./Dropdown";

import { addAudio, addVideo } from './action';
import { Dispatch } from "redux";

interface Props extends PropsFromeRedux {
    fullscreen: boolean,
    setFullscreen: CallableFunction
}

const Menu = (props: Props) => {

    const [videoList, setVideoList] = useState<any[]>(["1"]);
    const [audiList, setAudioList] = useState<any[]>(["1"]);
    const [visible, setVisible] = useState<string>("visible");

    const escFunction = useCallback((ev: KeyboardEvent) => {
        if (!props.fullscreen) return;
        if (ev.key === "Escape") {
            props.setFullscreen(false);
        }
    }, [props.fullscreen]);

    const onVisible = useCallback(() => {
        if (visible == "visible")
            setVisible("hidden");
        else if (visible == "hidden")
            setVisible("visible")
    }, [visible]);

    useEffect(() => {
        const loadDevices = async () => {
            console.log("Load");
            const _videos: any[] = [];
            const _audios: any[] = [];

            try {
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                const devices = await navigator.mediaDevices.enumerateDevices();
                console.log('Devices ', devices.length);
                devices.forEach((v) => {
                    if (v.kind === 'videoinput')
                        _videos.push(v);
                    if (v.kind === 'audioinput')
                        _audios.push(v);
                });

                setVideoList(_videos);
                setAudioList(_audios);
            } catch {
                console.log("Error");
                loadDevices();
            }

        }
        loadDevices();
    }, []);

    document.addEventListener("keydown", escFunction, false);

    return (
        <Box sx={{
            position: (props.fullscreen) ? "absolute" : "relative",
            backgroundColor: (props.fullscreen) ? "white" : "none",
            bottom: '0px',
            width: '100%',
            height: '100px',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            alignItems: 'center',
            opacity: (props.fullscreen) ? 0 : 1
        }}>
            <Button sx={{ mr: "auto", width: "40px", height: "40px" }} onClick={onVisible}><VisibilityIcon sx={{ width: "100%", height: "100%", color: "#757575" }} /></Button>
            <Dropdown sx={{ ml: "10px", width: "150px", height: "40px", visibility: visible }} title={"Video"} value={props.videoId} setValue={(id: string) => props.addVideo(id)} list={videoList} />
            <Dropdown sx={{ ml: "10px", width: "150px", height: "40px", visibility: visible }} title={"Audio"} value={props.audioId} setValue={(id: string) => props.addAudio(id)} list={audiList} />
            <Button sx={{ ml: "10px", width: "40px", height: "40px", visibility: visible }} onClick={() => props.setFullscreen(!props.fullscreen)}><ZoomOutMapIcon sx={{ width: "100%", height: "100%", color: "#757575" }} /></Button>
        </Box>
    );
}

const mapStateToProps = (state: any) => {
    return {
        videoId: state.source.videoId,
        audioId: state.source.audioId
    }
}

const mapDispatch = (dispatch: Dispatch) => {
    return {
        addAudio: (id: string) => dispatch(addAudio(id)),
        addVideo: (id: string) => dispatch(addVideo(id))
    }
}

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromeRedux = ConnectedProps<typeof connector>;

export default connector(Menu);