var counter = 0;
var input = document.getElementById("wrap");


function showInput(){
    counter++
    if(counter > 5){
        input.style.visibility = 'visible';
    }
}

function navigate(){
    let code = document.getElementById("input").value
    window.location.replace(`https://www.howhy.htwk-leipzig.de/${code}`);

}