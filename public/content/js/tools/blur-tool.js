const elemClassNameInp = document.querySelector(".element-class-name-input")
const blurInp = document.querySelector(".blur-inp")
const validationBlurElem = document.querySelector(".blur-validation-elem")
const previewImage = document.querySelector(".img-left")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

let Blur = {
    elemClass: null,
    isInit: false,
    blur : 3,
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
const disableAllInputs = () =>
    blurInp.disabled = true

disableAllInputs()

//? active all inputs
const activeAllinputs = () =>
    blurInp.disabled = false

//? upload blur data in inputs
const uploadBlurDataInInputs = () =>
    blurInp.value = Blur.blur

//? remove blur data from inputs
const removeBlurDataFromInputs = () =>
    blurInp.value = ""

//? check validation
const checkValidateInputs = (value) => {
    const regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g // FIXME
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

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Blur.isInit) {
        if (Blur.blurValidate) {
            generateWrapBox.classList.add("active")
            StyleText = `.${Blur.elemClass} { filter: blur(${Blur.blur}px); }`
            codePennel.innerHTML = `.${Blur.elemClass} { <br>
                &nbsp;&nbsp;&nbsp; filter: blur(${Blur.blur}px); <br>
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
    previewImage.style.filter = `blur(${Blur.blur}px)`

addStyleToImage()

elemClassNameInp.addEventListener("keyup", checkInit)
blurInp.addEventListener("keyup", (e) => checkValidateInputs(e.target.value))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)