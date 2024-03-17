import React, { useEffect, useState } from "react"
import styles from "./Question.module.css"
import { useStateContext } from "../../../../contexts/ContextProvider"
import { checkAnswers, getQuestionData } from "../../../../utils/api/api"
import Loader from "../../../shared/components/Loader"

/**
 * This Component can display a question based on the questionId. It gets the questionData from the
 * api with the question id and displays it. When the user answers the answers get checked with the
 * api again and a feedback is given.
 *
 * @param {int} questionId
 * @param {func} setQuestionId
 * @param {func} refreshData
 * @returns
 */
export default function Question({ questionId, setQuestionId, refreshData }) {
    const { user, setUser } = useStateContext()

    const [questionData, setQuestionData] = useState({
        data: null,
        selected: []
    })
    const [answerCorrect, setAnswerCorrect] = useState(null)

    const answers = questionData.data ? getAnswers(questionData.data) : null

    useEffect(() => {
        getQuestionData(questionId).then((response) => {
            let data = response.data
            let selected = Array.from(
                { length: data.answers.length },
                () => false
            )
            setQuestionData({ data: data, selected: selected })
        })
    }, [questionId])

    function getAnswers(data) {
        return data.answers.map((answer, index) => (
            <div
                key={answer.id}
                className={[
                    styles.questionElement,
                    styles.answer,
                    questionData.selected[index] ? styles.whiteborder : null
                ].join(" ")}
                onClick={() => selectAnswer(index)}
            >
                {answer.text}
            </div>
        ))
    }

    function selectAnswer(answerIndex) {
        if (questionData.data.type == "singlechoice") {
            let arr = questionData.selected.map((element, index) => {
                return answerIndex == index ? !element : false
            })
            setQuestionData({ ...questionData, selected: arr })
        } else {
            let arr = questionData.selected.map((element, index) => {
                return answerIndex == index ? !element : element
            })
            setQuestionData({ ...questionData, selected: arr })
        }
    }

    function calcAnswerIndexes() {
        let answers = questionData.data.answers.map((answer, index) => ({
            id: answer.id,
            correct: questionData.selected[index]
        }))
        processAnswer(answers)
    }

    function processAnswer(answers) {
        if (answers.length != 0) {
            var request = {
                questionId: questionId,
                answers: answers
            }
            checkAnswers(request)
                .then((response) => {
                    setAnswerCorrect(response.data.success)
                    refreshData()
                    setTimeout(function () {
                        setAnswerCorrect(null)
                        setQuestionId(null)
                    }, 3000)
                })
                .catch((error) => {
                    alert(JSON.stringify(error.response.data))
                })
        }
    }

    return questionData.data ? (
        <div className={[styles.wrap].join()}>
            {answerCorrect != null ? (
                <div className={[styles.question, "center"].join(" ")}>
                    <div
                        className={["centerVertical", styles.feedback].join(
                            " "
                        )}
                    >
                        {answerCorrect ? "Richtig!" : "Leider Falsch"}
                        <div className={[styles.logInPrompt].join(" ")}>
                            {!user && answerCorrect
                                ? "Bitte Einloggen um den Fortschritt zu speichern."
                                : null}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={[styles.question].join(" ")}>
                    <div
                        className={[
                            styles.questionElement,
                            styles.questionText
                        ].join(" ")}
                    >
                        {questionData.data.questionText}
                        <div className={[styles.type].join(" ")}>
                            {questionData.data.type}
                        </div>
                    </div>
                    <div className={[styles.answersWrapper].join(" ")}>
                        {answers}
                    </div>
                    <div
                        className={[styles.answerButtonWrapper, "center"].join(
                            " "
                        )}
                    >
                        <div
                            className={["button", styles.answerButton].join(
                                " "
                            )}
                            onClick={calcAnswerIndexes}
                        >
                            Antwort abschicken
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <Loader></Loader>
    )
}
