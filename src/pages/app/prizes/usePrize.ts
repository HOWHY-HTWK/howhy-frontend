import useAsync from "../../../utils/useAsync"
import { getPrizes } from "../../../utils/api/api"

interface PrizeProps {
    prizes: any[]
    isLoadingPrizes: boolean
    prizesError: Error
}

async function getPrizeList() {
    return (await getPrizes()).data as any[]
}

export const usePrize = (): PrizeProps => {
    const { value, loading, error } = useAsync<any[]>(() => getPrizeList(), [])

    return { prizes: value ?? [], isLoadingPrizes: loading, prizesError: error }
}

export interface Prize {
    id: number
    name: string
    score: number
}
