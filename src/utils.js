import axiosClient from "../axios-client";

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