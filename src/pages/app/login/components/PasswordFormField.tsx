import { IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
    HowhyTextField,
    HowhyTextFieldProps
} from "../../components/HowhyTextField"
import React, { useState } from "react"

export const PasswordFormField = (props: HowhyTextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <HowhyTextField
            {...props}
            required
            id={props.label}
            type={showPassword ? "text" : "password"}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        ></HowhyTextField>
    )
}
