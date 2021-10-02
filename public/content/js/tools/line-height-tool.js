//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const lineHeightInp = document.querySelector('.line-height-inp')
const lineHeightValidation = document.querySelector(".line-height-validation-elem")

//? line height object
let Line_Height = {
    elemClass: null,
    isInit: false,
    height: 70,
    lineHeightValidation: true
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Line_Height.isInit = true
        Line_Height.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
        addStyleToText()
        checkValidateInputs(lineHeightInp.value)
    } else {
        Line_Height.isInit = false
        disableAllInputs()
        removeDataFromInputs()
        removeStyleFromText()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => 
    lineHeightInp.disabled = false

//? disable inputs
const disableAllInputs = () => 
    lineHeightInp.disabled = true

disableAllInputs()

//? upload data in inputs
const uploadDataInInputs = () => 
    lineHeightInp.value = Line_Height.height

//? remove data from inputs
const removeDataFromInputs = () => 
    lineHeightInp.value = ""

//? add style to Font Size box
const addStyleToText = () => 
    text.style.lineHeight = `${Line_Height.height}px`

//? remove style from Font Size box
const removeStyleFromText = () =>
    text.style.lineHeight = 3

//? open generate pannel
const openGeneratePannel = () => {
    if (Line_Height.isInit) {
        if (Line_Height.lineHeightValidation) {
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
        Line_Height.lineHeightValidation = true
        Line_Height.height = Number(value)
        lineHeightValidation.innerHTML = ""
        addStyleToText()
    } else {
        Line_Height.lineHeightValidation = false
        lineHeightValidation.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
lineHeightInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))