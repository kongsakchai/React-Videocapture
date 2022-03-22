import { FormControl, InputLabel, MenuItem, Select, SxProps, Theme } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
    title?: string,
    value?: string | undefined,
    setValue?: any,
    sx?: SxProps<Theme>,
    list?: any[],
    onClick?: MouseEventHandler<HTMLElement>
}

export default (props: Props) => {

    return (
        <FormControl sx={props.sx}>
            <InputLabel id="demo-simple-select-label" sx={{ height: "40px", fontSize: '14px', lineHeight: "10px" }}>{props.title}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.title}
                onChange={(e) => props.setValue(e.target.value)}
                sx={{ height: "40px" }}
                onClick={props.onClick}
            >
                <MenuItem key={0} value={""}>None</MenuItem>
                {props.list?.map((v, index) => (
                    <MenuItem key={index + 1} value={v.deviceId}>{v.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}