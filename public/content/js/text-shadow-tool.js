import { createPickr } from "./pickr.js";

//? get element form dom
const colorPicker = document.querySelector(".color-picker")
const generatorTxt = document.querySelector(".generator-text")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const vhTools = document.querySelectorAll(".vh-tool")
const elemValidationInputs = document.querySelector(".valdiation-inputs-elem")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")

//? shadow object
let Shadow = {
    isInit: false,
    elemClass: null,
    style: {
        shadowColor: "#53535C",
        horizental: 0,
        vertical: 0,
        blur: 0
    },
    Validation: {
        horizentalValidate: true,
        verticalValidate: true,
        blurValidate: true
    }
}

//? create pickr
let pickr = createPickr(".color-picker")

pickr.on('change', (color) => {
    let shadowColor = color.toHEXA().toString()
    Shadow.style.shadowColor = shadowColor
    colorPicker.style.background = shadowColor
    addStyleToResizable()
})

//? disable inputs function 
const disableAllInputs = () => {
    horizentalInp.disabled = true
    verticalInp.disabled = true
    blurInp.disabled = true
    colorPicker.disabled = true
}
disableAllInputs()

//? remove shadow data from dom 
const removeShadowDataFromDom = () => {
    horizentalInp.value = ""
    verticalInp.value = ""
    blurInp.value = ""
}

//? active inputs function
const activeAllInputs = () => {
    horizentalInp.disabled = false
    verticalInp.disabled = false
    blurInp.disabled = false
    colorPicker.disabled = false
}

//? disable all vh tools function
const disableAllVhTool = () => { vhTools.forEach(tool => tool.classList.remove("active")) }  

//? upload shadow data in inputs
const uploadShadowDataInDom = () => {
    horizentalInp.value = Shadow.style.horizental
    verticalInp.value = Shadow.style.vertical
    blurInp.value = Shadow.style.blur
}

//? add style to resizable box
const addStyleToResizable = () => {
    let {style: { shadowColor, horizental, vertical, blur } } = Shadow 
    generatorTxt.style.textShadow = `${horizental}px ${vertical}px ${blur}px ${shadowColor}`
}

//? check inputs 
const checkInputs = e => {
    if (e.target.value.trim().length !== 0) {
        //? active shadow init
        Shadow.isInit = true

        //? empty msg box
        e.target.parentElement.previousElementSibling.innerHTML = ""

        //? put class name in shadow elem class
        Shadow.elemClass = `.${e.target.value.split(" ").join("-")}`

        //? call to another functions
        activeAllInputs()
        uploadShadowDataInDom()
        addStyleToResizable()
        callCheckValidateInput(horizentalInp.value, "horizental")
        callCheckValidateInput(verticalInp.value, "vertical")
        callCheckValidateInput(blurInp.value, "blur")
    } else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"

        generatorTxt.style.textShadow = ""

        //? disable all inputs
        disableAllInputs()
        removeShadowDataFromDom()        
        disableAllVhTool()
    }
}

//? check validation of inputs
const checkValidationInput = (inputValue, inputName) => {
    let validateObject = Shadow.Validation

    if (inputName === "horizental" || inputName === "vertical") {
        let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
        let regexResult = regexCode.test(inputValue)

        if (inputName === "horizental") {
            if (regexResult) {
                validateObject.horizentalValidate = true
                Shadow.style.horizental = Number(horizentalInp.value)
            } else {
                validateObject.horizentalValidate = false
            }
        } else {
            if (regexResult) {
                validateObject.verticalValidate = true
                Shadow.style.vertical = Number(verticalInp.value)
            } else {
                validateObject.verticalValidate = false
            }
        }

        return regexResult
    } else {
        let regexCode = /^(0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/g
        let regexResult = regexCode.test(inputValue)

        if (regexResult) {
            validateObject.blurValidate = true
            Shadow.style.blur = Number(blurInp.value)
        } else {
            validateObject.blurValidate = false
        }
        
        return regexResult
    }
}

//? call to checkValidation inputs function
const callCheckValidateInput = (value, inputName) => {
    disableAllVhTool()
    let isValidateTrue = checkValidationInput(value, inputName)
    let validateObject = Shadow.Validation
    if (isValidateTrue) {
        if (validateObject.horizentalValidate && validateObject.blurValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToResizable()
        }
    } else {
        if (inputName === "horizental" || inputName === "vertical") {
            elemValidationInputs.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        } else {
            elemValidationInputs.innerHTML = "Please select positive number from 0 to 100"
        }
    }
}

//? active vh tool
const activeVhTool = (vhTool) => 
    vhTools.forEach(allVhtools => allVhtools.className.includes(vhTool.className) ? allVhtools.classList.add("active") : allVhtools.classList.remove("active"))

//? vh tools 
vhTools.forEach(vhTool => {
    vhTool.addEventListener('click', (e) => {
        if (Shadow.isInit) {
            let validateObj = Shadow.Validation
            let shadowStyleObj = Shadow.style
            if (validateObj.horizentalValidate && validateObj.verticalValidate && validateObj.blurValidate) {
                if (e.target.className.includes("top-right")) {
                    
                    shadowStyleObj.horizental = Math.abs(shadowStyleObj.horizental)
                    if (shadowStyleObj.vertical > 0) { shadowStyleObj.vertical = -Math.abs(shadowStyleObj.vertical) }
                    uploadShadowDataInDom()
                    addStyleToResizable()

                } else if (e.target.className.includes("top-left")) {
                    
                    if (shadowStyleObj.horizental > 0) { shadowStyleObj.horizental = -Math.abs(shadowStyleObj.horizental) }
                    if (shadowStyleObj.vertical > 0) { shadowStyleObj.vertical = -Math.abs(shadowStyleObj.vertical) }
                    uploadShadowDataInDom()
                    addStyleToResizable()

                } else if (e.target.className.includes("bottom-right")) {

                    shadowStyleObj.horizental = Math.abs(shadowStyleObj.horizental)
                    shadowStyleObj.vertical = Math.abs(shadowStyleObj.vertical)
                    uploadShadowDataInDom()
                    addStyleToResizable()
                    
                } else {

                    if (shadowStyleObj.horizental > 0) { shadowStyleObj.horizental = -Math.abs(shadowStyleObj.horizental) }
                    shadowStyleObj.vertical = Math.abs(shadowStyleObj.vertical)
                    uploadShadowDataInDom()
                    addStyleToResizable()

                }
                activeVhTool(e.target)
            } else 
                alert("Please enter the information correctly")
        } else 
            alert("please fill out the fields")
    })
})

//? check all inputs and other elements validation is true 
const checkAllElementIsTrue = () => {
    if (Shadow.isInit) {
        let validateObj = Shadow.Validation
        if (validateObj.horizentalValidate && validateObj.verticalValidate && validateObj.blurValidate) {
            generateWrapBox.classList.add("active")
        } else 
            alert("Enter the information correctly")
    } else
        alert("Please enter the fields above")
}

elemClassName.addEventListener("keyup", checkInputs)

horizentalInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "horizental"))
verticalInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "vertical"))
blurInp.addEventListener("keyup", (e) => callCheckValidateInput(e.target.value, "blur"))

cssCodeBtn.addEventListener("click", checkAllElementIsTrue)