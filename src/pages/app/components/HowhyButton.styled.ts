import { Button, ButtonProps, styled } from "@mui/material"

export const HowhyButton = styled(Button)<ButtonProps>(() => {
    return {
        borderRadius: "32px",
        backgroundColor: "#FF62D5",
        color: "white"
    }
})

export const HowhyOutlinedButton = styled(Button)<ButtonProps>(() => {
    return {
        borderRadius: "32px",
        color: "#FF62D5",
        borderColor: "#FF62D5",
        "&:hover": {
            color: "#1976d2"
        }
    }
})
