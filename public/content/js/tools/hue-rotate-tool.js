const elemClassNameInp = document.querySelector(".element-class-name-input")
const hueRotateInp = document.querySelector(".hue-rotate-inp")
const validationHueRotateElem = document.querySelector(".hue-rotate-validation-elem")
const previewImage = document.querySelector(".img-left")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

let HueRotate = {
    elemClass: null,
    isInit: false,
    hueRotate : 30,
    hueRotateValidate : true
}

//? check heu rotate init and do validation for elem class name input
const checkInit = (e) => {
    const regexCode = /^[a-zA-Z" "]{1,30}$/g
    const regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        HueRotate.isInit = true
        HueRotate.elemClass = e.target.value.split(" ").join("-")
        uploadHueRotateDataInInputs()
        activeAllinputs()
        checkValidateInputs(hueRotateInp.value)
        e.target.parentElement.previousElementSibling.innerHTML = ""
    } else {
        HueRotate.isInit = false
        removeHueRotateDataFromInputs()
        disableAllInputs()
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? disable all inputs
const disableAllInputs = () => 
    hueRotateInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    hueRotateInp.disabled = false

//? upload hue rotate data in inputs
const uploadHueRotateDataInInputs = () =>
    hueRotateInp.value = HueRotate.hueRotate

//? remove hue rotate data from inputs
const removeHueRotateDataFromInputs = () => 
    hueRotateInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
    const regexResult = regexCode.test(value)

    if (regexResult) {
        HueRotate.hueRotateValidate = true
        HueRotate.hueRotate = Number(value)
        validationHueRotateElem.innerHTML = ""
        addStyleToImage()
    } else {
        HueRotate.hueRotateValidate = false
        validationHueRotateElem.innerHTML = "Please select a positive number"
    }
    
}

//? open generate pannel
const openGeneratePannel = () => {
    if (HueRotate.isInit) {
        if (HueRotate.hueRotateValidate) {
            generateWrapBox.classList.add("active")
            StyleText = `.${HueRotate.elemClass} { filter: hue-rotate(${HueRotate.hueRotate}deg); }`
            codePennel.innerHTML = `.${HueRotate.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; filter: hue-rotate(${HueRotate.hueRotate}deg); <br>
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
    previewImage.style.filter = `hue-rotate(${HueRotate.hueRotate}deg)`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
cssCodeBtn.addEventListener("click", openGeneratePannel)
hueRotateInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)