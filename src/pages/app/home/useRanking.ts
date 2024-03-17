import useAsync from "../../../utils/useAsync"
import { ranking } from "../../../utils/api/api"

interface RankingProps {
    ranking: Rank[]
    isLoading: boolean
    error: Error
}

async function getRanking() {
    return (await ranking()).data as Rank[]
}

export const useRanking = (): RankingProps => {
    const { value, loading, error } = useAsync<Rank[]>(() => getRanking(), [])

    return { ranking: value ?? [], isLoading: loading, error }
}

export interface Rank {
    id: number
    name: string
    score: number
}
