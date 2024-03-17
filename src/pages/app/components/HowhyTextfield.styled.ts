import { styled, TextField, TextFieldProps } from "@mui/material"

export const StyledHowhyTextField = styled(TextField)<TextFieldProps>(() => {
    return {
        "&.Mui-focused fieldset": {
            borderStyle: "solid"
        },
        "& input": {
            zIndex: 1
        },
        "& .MuiInputAdornment-root": {
            zIndex: 1
        },
        "& fieldset": {
            zIndex: 0,
            background: "white",
            boxShadow: "0px 2px 10px 0px rgba(135, 135, 135, 0.25)",
            borderRadius: "32px",
            borderStyle: "none"
        }
    }
})
