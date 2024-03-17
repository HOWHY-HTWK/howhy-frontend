import { TextFieldProps } from "@mui/material"
import React from "react"
import { StyledHowhyTextField } from "./HowhyTextfield.styled"

export interface HowhyTextFieldProps
    extends Omit<TextFieldProps, "error" | "label"> {
    label: string
    endAdornment?: React.ReactNode
    error?: string
}

export const HowhyTextField = (props: HowhyTextFieldProps) => {
    return (
        <StyledHowhyTextField
            {...props}
            fullWidth
            variant="outlined"
            id={props.label}
            error={props.error?.length > 0}
            InputProps={{ endAdornment: props.endAdornment }}
            helperText={props.error}
        />
    )
}
