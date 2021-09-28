const elemClassNameInp = document.querySelector(".element-class-name-input")
const brightnessInp = document.querySelector(".brightness-inp")
const validationBrightnessElem = document.querySelector(".brightness-validation-elem")
const previewImage = document.querySelector(".preview-image-box img")

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

//? disable allInputs
const disableAllInputs = () => 
    brightnessInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    brightnessInp.disabled = false

//? upload blur data in inputs
const uploadBrightnessDataInInputs = () =>
    brightnessInp.value = Brightness.brightness

//? remove blur data from inputs
const removeBrightnessDataFromInputs = () => 
    brightnessInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Brightness.brightnessValidate = true
        Brightness.brightness = Number(value)
        validationBrightnessElem.innerHTML = ""
        addStyleToImage()
    } else {
        Brightness.brightnessValidate = false
        validationBrightnessElem.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `brightness(${Brightness.brightness})`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
brightnessInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))