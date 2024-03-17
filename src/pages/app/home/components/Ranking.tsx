import React from "react"
import styles from "./Ranking.module.css"
import { RANKING_TITLE } from "../../../../constants/strings"
import { Rank, useRanking } from "../useRanking"
import Loader from "../../../shared/components/Loader"

/**
 * shows the top 5 users of the platform
 */
export const Ranking = () => {
    const { ranking, isLoading, error } = useRanking()

    return (
        <div className={[styles.list].join(" ")}>
            <div className={[styles.title].join(" ")}>{RANKING_TITLE}</div>
            {isLoading ? (
                <Loader />
            ) : (
                ranking?.map((item) => <RankingItem item={item} />)
            )}
        </div>
    )
}

const RankingItem = ({ item }: { item: Rank }) => {
    return (
        <div key={item.id} className={[styles.listItem].join(" ")}>
            <div>{item.name}</div>
            <div>{item.score}</div>
        </div>
    )
}
