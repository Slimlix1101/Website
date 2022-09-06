const iconSpan = document.getElementById('icon')
const textSpan = document.getElementById('text')
textList = ['NTU CSIE B11', 'Learning front-end development', 'Learning Unity']
iconList = ['📗', '💻', '🎮']
const textLen = textList.length, iconLen = iconList.length
let counter = 0

iconSpan.innerHTML = iconList[counter]
textSpan.innerHTML = textList[counter]

setInterval(() => {
    iconSpan.innerHTML = iconList[counter%iconLen]
    textSpan.innerHTML = textList[counter%textLen]
    counter++
}, 3000)