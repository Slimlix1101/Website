let formDatasList = []

const form = document.getElementById('inputs')
const warningDiv = document.getElementById('warning-div')
const leaderboard = document.getElementById('leaderboard')

function showWarning() {
    warningDiv.innerHTML = 'All fields is required!'
}

function generateDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
}


function updateLeaderboard(formDatas) {

    formDatasList.sort((a, b) => b[3]-a[3])

    leaderboard.innerHTML = ""
    formDatasList.forEach((formDatas) => {
        warningDiv.innerHTML = "";
        const leaderboardElement = document.createElement('div')
        const nameField = document.createElement('div')
        const countryField = document.createElement('div')
        const scoreField = document.createElement('div')

        const nameSpan = document.createElement('span')
        const timeSpan = document.createElement('span')

        nameSpan.innerHTML = formDatas[0] + " " + formDatas[1]
        timeSpan.innerHTML = generateDate()
        nameField.appendChild(nameSpan)
        nameField.appendChild(timeSpan)

        countryField.innerHTML = formDatas[2]
        scoreField.innerHTML = formDatas[3]

        leaderboardElement.appendChild(nameField)
        leaderboardElement.appendChild(countryField)
        leaderboardElement.appendChild(scoreField)

        leaderboardElement.className = 'leaderboard-element'
        leaderboard.appendChild(leaderboardElement)
    })
    

}

function getFormData(e) {
    if (e.preventDefault) e.preventDefault();
    const formDatas = [...e.target].map((inputField) => { return inputField.value })
    formDatas.pop() // remove button empty input

    if (formDatas.every((data) => data.length != 0)) {
        e.target.reset() // reset form
        formDatasList.push(formDatas)
        updateLeaderboard()
    } else showWarning() // check if all field is valid
}

if (form.attachEvent) {
    form.attachEvent("submit", getFormData);
} else {
    form.addEventListener("submit", getFormData);
}




