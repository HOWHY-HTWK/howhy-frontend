import React from 'react'

export default function EditQuestions() {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

  return (
    <>
        <div>EditQuestions</div>
        {/* <iframe id="iframe" src={`https://mediaserver.htwk-leipzig.de/permalink/${id}/iframe/#start=30`} allowFullScreen={false} ></iframe> */}
        <iframe id="iframe" src="https://mediaserver.htwk-leipzig.de/permalink/v12663c723847flqwp36/iframe/"></iframe>
    </>
  )
}
