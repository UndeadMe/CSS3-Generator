const elemClassNameInp = document.querySelector(".element-class-name-input")
const opacityInp = document.querySelector(".opacity-inp")
const validationOpacityElem = document.querySelector(".opacity-validation-elem")
const previewImage = document.querySelector(".preview-image-box img")

let Opacity = {
    elemClass: null,
    isInit: false,
    opacity : 1,
    opacityValidate : true
}

//? check Opacity init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Opacity.isInit = true
        Opacity.elemClass = e.target.value.split(" ").join("-")
        uploadOpacityDataInInputs()
        activeAllinputs()
        checkValidateInputs(opacityInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Opacity.isInit = false
        removeOpacityDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    opacityInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    opacityInp.disabled = false

//? upload hue rotate data in inputs
const uploadOpacityDataInInputs = () =>
    opacityInp.value = Opacity.opacity

//? remove hue rotate data from inputs
const removeOpacityDataFromInputs = () => 
    opacityInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Opacity.opacityValidate = true
        Opacity.opacity = Number(value)
        validationOpacityElem.innerHTML = ""
        addStyleToImage()
    } else {
        Opacity.opacityValidate = false
        validationOpacityElem.innerHTML = "Please select a positive from 0 to 1"
    }
    
}

//? add style to image
const addStyleToImage = () =>
    previewImage.style.filter = `opacity(${Opacity.opacity})` // FIXME

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
opacityInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))