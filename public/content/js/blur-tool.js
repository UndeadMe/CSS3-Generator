const elemClassNameInp = document.querySelector(".element-class-name-input")
const blurInp = document.querySelector(".blur-inp")
const validationBlurElem = document.querySelector(".blur-validation-elem")
const previewImage = document.querySelector(".preview-image-box img")

let Blur = {
    elemClass: null,
    isInit: false,
    blur : 1,
    blurValidate : true
}

//? check blur init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)
    
    if (regexResult) {
        Blur.isInit = true
        Blur.elemClass = e.target.value.split(" ").join("-")
        uploadBlurDataInInputs()
        activeAllinputs()
        checkValidateInputs(blurInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        Blur.isInit = false
        removeBlurDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable allInputs
const disableAllInputs = () => {
    blurInp.disabled = true
}
disableAllInputs()

//? active all inputs
const activeAllinputs = () => {
    blurInp.disabled = false
}

//? upload blur data in inputs
const uploadBlurDataInInputs = () => {
    blurInp.value = Blur.blur
}

//? remove blur data from inputs
const removeBlurDataFromInputs = () => {
    blurInp.value = ""
}

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    const regexResult = regexCode.test(value)

    if (regexResult) {
        Blur.blurValidate = true
        Blur.blur = Number(value)
        validationBlurElem.innerHTML = ""
        addStyleToImage()
    } else {
        Blur.blurValidate = false
        validationBlurElem.innerHTML = "Please select a positive number from 0 to 100"
    }
    
}

//? add style to image
const addStyleToImage = () => {
    previewImage.style.filter = `blur(${Blur.blur}px)`
}

elemClassNameInp.addEventListener("keyup", checkInit)
blurInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))