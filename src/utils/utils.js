import axiosClient from "./api/axios-client";

/**
 * @param {*} questions 
 * @returns 
 */
export function makeTimecodesList(questions) {
    let localtimecodes = [];
    for (let step = 0; step < questions.length; step++) {
        localtimecodes.push(questions[step].timecode)
    }
    //Das Anzeigen der Fragen wird gestartet 
    return localtimecodes;
}

export function findQuestionIndex(time, timecodes) {
    for (let step = 0; step < timecodes.length; step++) {
        if (Math.floor(time) == timecodes[step]) {
            //Die Frage mit dem entsprechenden Index wird angezeigt
            return step;
        }
    }
    return null
}

export function playVideo(iframe) {
    if (iframe.current != null) {
        iframe.current.contentWindow.postMessage('play', '*');
    }
}
export function pauseVideo(iframe) {
    if (iframe.current != null) {
        iframe.current.contentWindow.postMessage('pause', '*');
    }
}

export function jumpToTime(iframe, time) {
    iframe.current.contentWindow.postMessage({ 'seek': time }, '*');
}

export function getTimeInReadable(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor((time % 60));
    let milliSecons = Math.floor((time % 1) * 1000)
    return (hours != 0 ? hours + "h " : "") + minutes + "m " + seconds + "s " + milliSecons + 'ms'
}

export function getHoursMinutesSeconds(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    return { hours: hours, minutes: minutes, seconds: seconds };
}

export function logout(setUser) {
    axiosClient.get('/sanctum/csrf-cookie')
        .then(response => {
            axiosClient.post('/logout').then(response => {
                if (response.status === 204) {
                    console.log('logout' + response)
                    setUser(null);
                    window.location.reload();
                }
            }).catch(error => {
                console.log(error)
            })
        })
}

export const levels = [500, 1000, 2500, 4000, 6000]

export function getLevel(score) {
    if (score < levels[0]) {
        return "1";
    }
    if (score < levels[1]) {
        return "2";
    }
    if (score < levels[2]) {
        return "3";
    }
    if (score < levels[3]) {
        return "4";
    }
    if (score < levels[4]) {
        return "5";
    }
    if (score > levels[4] - 1) {
        return "6";
    }
}

export function dateTimeToUnixTime(dateTime) {
    const [datePart, timePart] = dateTime.split('T');
    const [year, month, day] = datePart.split('-');
    const [time, junk] = timePart.split('.');
    const [hours, minutes, seconds] = time.split(':');
    const jsDate = new Date(year, month - 1, day, hours, minutes, seconds);

    const localJsDate = new Date(jsDate.getTime() - jsDate.getTimezoneOffset() * 60000);

    const unixTimeMs = localJsDate.getTime()
    return Math.floor(unixTimeMs / 1000);

    // return dateTime
}