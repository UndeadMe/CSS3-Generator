const userNameInp = document.querySelector(".user-name-inp")
const emailInp = document.querySelector(".email-inp")
const form = document.forms[0]
const userNameValidate = document.getElementById("user-name-validate")
const emailValidate = document.getElementById("email-validate")
const submitBtn = document.querySelector(".send-btn")

//* validate user name value 
const checkUserNameValue = (value) => {
    const userNameRegexPat =  /^[a-zA-Z0-9]+$/
    const emailRegexPat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexChecked = userNameRegexPat.test(value)
    
    if (regexChecked) {
        if (emailInp.value.match(emailRegexPat))
            checkInputs(true, true)
        else
            checkInputs(true, false)
    } else {
        if (emailInp.value.match(emailRegexPat))
            checkInputs(false, true)
        else
            checkInputs(false, false)
    }
}

//* validate email
const checkEmail = (value) => {
    const emailRegexPat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const userNameRegexPat = /^[a-zA-Z0-9]+$/
    const regexChecked = emailRegexPat.test(value)

    if (regexChecked) {
        if (userNameInp.value.match(userNameRegexPat))
            checkInputs(true, true)
        else
            checkInputs(false, true)
    } else {
        if (userNameInp.value.match(userNameRegexPat))
            checkInputs(true, false)
        else
            checkInputs(false, false)
    }
}

//* check all of inputs
const checkInputs = (username, email) => {
    if (username && email) {
        submitBtn.disabled = false
    } else {
        submitBtn.disabled = true
    }
    
    if (username) {
        userNameValidate.innerHTML = ""
    } else {
        userNameValidate.innerHTML = "Please don't use inappropriate spaces and characters"
    }

    if (email) {
        emailValidate.innerHTML = ""
    } else {
        emailValidate.innerHTML = "Please enter the email correctly"
    }
}

userNameInp.addEventListener("keyup", (e) => checkUserNameValue(e.target.value))
emailInp.addEventListener("keyup", (e) => checkEmail(e.target.value))