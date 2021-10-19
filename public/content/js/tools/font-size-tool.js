//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const fontSizeInp = document.querySelector('.font-size-inp')
const fontSizeValidation = document.querySelector(".font-size-validation-elem")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Font Size object
let Font_Size = {
    elemClass: null,
    isInit: false,
    size: 50,
    fontSizeValidation: true
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Font_Size.isInit = true
        Font_Size.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        activeAllInputs()
        uploadDataInInputs()
        addStyleToText()
        checkValidateInputs(fontSizeInp.value)
    } else {
        Font_Size.isInit = false
        disableAllInputs()
        removeDataFromInputs()
        removeStyleFromText()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? active inputs 
const activeAllInputs = () => 
    fontSizeInp.disabled = false

//? disable inputs
const disableAllInputs = () => 
    fontSizeInp.disabled = true

disableAllInputs()

//? upload data in inputs
const uploadDataInInputs = () => 
    fontSizeInp.value = Font_Size.size

//? remove data from inputs
const removeDataFromInputs = () => 
    fontSizeInp.value = ""

//? add style to Font Size box
const addStyleToText = () => 
    text.style.fontSize = `${Font_Size.size}px`

//? remove style from Font Size box
const removeStyleFromText = () =>
    text.style.fontSize = 4

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Font_Size.isInit) {
        if (Font_Size.fontSizeValidation) {
            generateWrapBox.classList.add('active')
            StyleText = `.${Font_Size.elemClass} { font-size: ${Font_Size.size}px; }`
            codePennel.innerHTML = `.${Font_Size.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; font-size: ${Font_Size.size}px; <br>
            }`
        } else 
            alert("please complete the filds correctly")
    } else
        alert("please complete the fields above")
}

//? copy to clipboard
const copyToClipboardText = () => {
    styleInp.value = StyleText
    navigator.clipboard.writeText(styleInp.value);
}

//? close generator pannel
const closeGeneratePannel = () => {
    generateWrapBox.classList.remove("active")
}

//? check validation
const checkValidateInputs = (value) => {
    if (!isNaN(value) && Number(fontSizeInp.value) <= 70 && Number(fontSizeInp.value) >= 0) {
        Font_Size.fontSizeValidation = true
        Font_Size.size = Number(value)
        fontSizeValidation.innerHTML = ""
        addStyleToText()
    } else {
        Font_Size.fontSizeValidation = false
        fontSizeValidation.innerHTML = "Please select a positive number from 0 to 70"
    }
    
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
cssCodeBtn.addEventListener("click", openGeneratePannel)
fontSizeInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)