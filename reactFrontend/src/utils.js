export function makeTimecodesList(questions) {
    let localtimecodes = [];
    for (let step = 0; step < questions.length; step++) {
        localtimecodes.push(questions[step].timecode)
    }
    //Das Anzeigen der Fragen wird gestartet 
    return localtimecodes;
}

export function setQuestion(time, localtimecodes, allVideoData) {
    for (let step = 0; step < localtimecodes.length; step++) {
        if (Math.floor(time) == localtimecodes[step]) {
            //Die Frage mit dem entsprechenden Index wird angezeigt
            var videoData = allVideoData.data[step]
            videoData.index = step;
            return videoData;
        }
    }
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

export function jumpToTime(iframe) {
    iframe.current.contentWindow.postMessage({ 'seek': time }, '*');
  }