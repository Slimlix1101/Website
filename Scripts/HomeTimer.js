const displayNum = document.querySelector("#elapsedTime")
const numSpan = document.createElement("span")
let newNum, i=1

displayNum.textContent = "The total time you spend on the Home page is 00:00:00"

function zeroPadding(value) {
    return ('00'+value).slice(-2)
}

function updateSecond()
{
    numSpan.textContent = i
    displayNum.innerHTML = "The total time you spend on the Home page is " 
                            + zeroPadding(Math.floor(i/3600)) + ":" + zeroPadding(Math.floor(i/60)) + ":" + zeroPadding(i%60)
    i++
}

setInterval(updateSecond, 1000)

    



    