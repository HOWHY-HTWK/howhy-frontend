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