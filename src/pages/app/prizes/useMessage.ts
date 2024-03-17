import useAsync from "../../../utils/useAsync"
import { getMessage } from "../../../utils/api/api"

interface MessageProp {
    message: string
    isLoadingMessage: boolean
    messageError: Error
}

async function getMessages() {
    return (await getMessage()).data.text as string
}

export const useMessage = (): MessageProp => {
    const { value, loading, error } = useAsync<string>(() => getMessages(), [])

    return {
        message: value ?? "",
        isLoadingMessage: loading,
        messageError: error
    }
}
