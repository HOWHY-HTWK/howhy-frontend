import React from 'react'
import styles from './Help.module.css'
import UserSubPageLayout from 'src/sharedComponents/UserSubPageLayout'

export default function Help() {
    return (
        <UserSubPageLayout title={'FAQ'}>
            <div className={[styles.textWrap].join(' ')} >
                <div className={[].join(' ')} >
                    <h4>Wie finde ich Videos zu einem bestimmten Thema ?</h4>
                    In der App gibt es eine Suchfunktion.Im Suchfeld kannst du das gewünschte Thema eingeben, die App zeigt dann eine Liste der relevanten Videos an.
                    <h4>Wie funktioniert das Frage - Antwort - System während der Videos ?</h4>
                    Während der Videos werden dir Fragen gestellt, die Fragen werden eingeblendet und du hast mehrere Antwortoptionen zur Auswahl.Du kannst auch während des Videos zur nächsten Frage springen.
                    <h4>Wie erhalte ich Punkte und wo sehe ich meine Gesamtpunktzahl ?</h4>
                    Jedes Mal, wenn du eine Frage während eines Videos richtig beantwortest, erhältst du 100 Punkte.Deine erreichte Punktzahl siehst du rechts oben.Auf der Home - Seite siehst du außerdem eine Liste der User mit der höchsten Gesamtpunktzahl.
                    <h4>Wie erhalte ich Preise und komme ins nächste Level ?</h4>
                    Wenn du eine bestimmte Punktzahl erreicht hast, erhältst du einen Preis in Form eines Snacks, den du dir immer mittwochs von 14 - 15 Uhr im Raum TC 1.56 abholen kannst.Den ersten Preis gibt es bei erreichten 500 Punkten.In der Kategorie Preise in der App findest du eine Übersicht aller bereits eingelösten Preise und wie viele Punkte du noch benötigst, um den nächsten Preis zu erhalten.
                    <h4>Kann ich meine Antworten in den Videos nachträglich ändern ?</h4>
                    Nein, das ist leider nicht mehr möglich.Die erste gewählte Antwort zählt für den Punktestand.Du kannst die Videos aber beliebig oft ansehen.
                </div>
            </div>
        </UserSubPageLayout>
    )
}
