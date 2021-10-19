const elemClassNameInp = document.querySelector(".element-class-name-input")
const brightnessInp = document.querySelector(".brightness-inp")
const validationBrightnessElem = document.querySelector(".brightness-validation-elem")
const previewImage = document.querySelector(".img-left")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

let Brightness = {
    elemClass: null,
    isInit: false,
    brightness : 2,
    brightnessValidate : true
}

//? check brightness init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Brightness.isInit = true
        Brightness.elemClass = e.target.value.split(" ").join("-")
        uploadBrightnessDataInInputs()
        activeAllinputs()
        checkValidateInputs(brightnessInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Brightness.isInit = false
        removeBrightnessDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    brightnessInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    brightnessInp.disabled = false

//? upload brightness data in inputs
const uploadBrightnessDataInInputs = () =>
    brightnessInp.value = Brightness.brightness

//? remove brightness data from inputs
const removeBrightnessDataFromInputs = () => 
    brightnessInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    if (!isNaN(value) && Number(brightnessInp.value) <= 40 && Number(brightnessInp.value) >= 0) {
        Brightness.brightnessValidate = true
        Brightness.brightness = Number(value)
        validationBrightnessElem.innerHTML = ""
        addStyleToImage()
    } else {
        Brightness.brightnessValidate = false
        validationBrightnessElem.innerHTML = "Please select a positive number from 0 to 40"
    }
    
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Brightness.isInit) {
        if (Brightness.brightnessValidate) {
            generateWrapBox.classList.add("active")
            StyleText = `.${Brightness.elemClass} { filter: brightness(${Brightness.brightness}); }`
            codePennel.innerHTML = `.${Brightness.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; filter: brightness(${Brightness.brightness}); <br>
            }`
        } else 
            alert("please enter the information correctly")
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

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `brightness(${Brightness.brightness})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
brightnessInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)