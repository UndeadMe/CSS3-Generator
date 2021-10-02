//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const letterSpacingInp = document.querySelector('.letter-spacing-inp')
const letterSpacingValidation = document.querySelector(".letter-spacing-validation-elem")

//? letter spacing object
let letter_spacing = {
    elemClass: null,
    isInit: false,
    space: 3,
    letterSpacingValidation: true
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        letter_spacing.isInit = true
        letter_spacing.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
        addStyleToText()
        checkValidateInputs(letterSpacingInp.value)
    } else {
        letter_spacing.isInit = false
        disableAllInputs()
        removeDataFromInputs()
        removeStyleFromText()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => 
    letterSpacingInp.disabled = false

//? disable inputs
const disableAllInputs = () => 
    letterSpacingInp.disabled = true

disableAllInputs()

//? upload data in inputs
const uploadDataInInputs = () => 
    letterSpacingInp.value = letter_spacing.space

//? remove data from inputs
const removeDataFromInputs = () => 
    letterSpacingInp.value = ""

//? add style to Font Size box
const addStyleToText = () => 
    text.style.letterSpacing = `${letter_spacing.space}px`

//? remove style from Font Size box
const removeStyleFromText = () =>
    text.style.letterSpacing = 3

//? open generate pannel
const openGeneratePannel = () => {
    if (letter_spacing.isInit) {
        if (letter_spacing.letterSpacingValidation) {
            generateWrapBox.classList.add('active')
        } else 
            alert("please complete the filds correctly")
    } else
        alert("please complete the fields above")
}

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        letter_spacing.letterSpacingValidation = true
        letter_spacing.space = Number(value)
        letterSpacingValidation.innerHTML = ""
        addStyleToText()
    } else {
        letter_spacing.letterSpacingValidation = false
        letterSpacingValidation.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
letterSpacingInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))