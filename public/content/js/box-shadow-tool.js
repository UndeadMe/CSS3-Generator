import { createPickr } from "./pickr.js";

//? get element form dom
const colorPickerBtn = document.querySelector(".color-picker")
const resizableBox = document.querySelector(".resizable")
const elemClassName = document.querySelector(".element-class-name-input")

const horizentalInp = document.querySelector(".horizental-inp")
const horizentalHoverInp = document.querySelector(".horizental-hover-inp")

const verticalInp = document.querySelector(".vertical-inp")
const verticalHoverInp = document.querySelector(".vertical-hover-inp")

const blurInp = document.querySelector(".blur-inp")
const blurHoverInp = document.querySelector(".blur-hover-inp")

const speardInp = document.querySelector(".speard-inp")
const speardHoverInp = document.querySelector(".speard-hover-inp")

const vhTools = document.querySelectorAll(".vh-tool")
const vhTool = document.querySelectorAll(".vh-tool")
const elemValidationInputs = document.querySelector(".valdiation-inputs-elem")

// resizableBox.style.boxShadow = "0 0 10px red"

//? shadow object
let Shadow = {
    elemClass: null,
    box: {
        noHover: {
            shadowColor: "#53535C",
            horizental: 0,
            vertical: 0,
            blur: 0,
            speard: 0
        },
        hover: {
            shadowColor: "#53535C",
            horizental: 0,
            vertical: 0,
            blur: 0,
            speard: 0
        }
    },
    isInit: false,
    isHover: false,
    Validation: {
        noHover: {
            horizentalValidate: true,
            verticalValidate: true,
            blurValidate: true,
            speardValidate: true
        },
        hover: {
            horizentalValidate: true,
            verticalValidate: true,
            blurValidate: true,
            speardValidate: true
        }
    }
}

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    let shadowColor = color.toHEXA().toString()
    Shadow.box.noHover.shadowColor = shadowColor
    colorPickerBtn.style.background = shadowColor
    addStyleToResizable(false)
})

//? disable inputs function 
const disableAllInputs = (isHover) => {
    if (!isHover) {
        horizentalInp.disabled = true
        verticalInp.disabled = true
        blurInp.disabled = true
        speardInp.disabled = true
        colorPickerBtn.style.pointerEvents = "none"
    } else {
        horizentalHoverInp.disabled = true
        verticalHoverInp.disabled = true
        blurHoverInp.disabled = true
        speardHoverInp.disabled = true
    }
}
disableAllInputs(false)
disableAllInputs(true)

//? remove shadow data from dom 
const removeShadowDataFromDom = (isHover) => {
    //? if hover is false upload shadow data in noHover 
    if (!isHover) {
        horizentalInp.value = ""
        verticalInp.value = ""
        blurInp.value = ""
        speardInp.value = ""
    } else {
        horizentalHoverInp.value = ""
        verticalHoverInp.value = ""
        blurHoverInp.value = ""
        speardHoverInp.value = ""
    }
}

//? active inputs function
const activeAllInputs = (isHover) => {
    if (!isHover) {
        horizentalInp.disabled = false
        verticalInp.disabled = false
        blurInp.disabled = false
        speardInp.disabled = false
        colorPickerBtn.style.pointerEvents = ""
    }
}

//? disable all vh tools function
const disableAllVhTool = () => { vhTool.forEach(tool => tool.classList.remove("active")) }  

//? upload shadow data in inputs
const uploadShadowDataInDom = (isHover) => {
    //? if hover is false upload shadow data in noHover 
    if (!isHover) {
        let {box: {noHover: { shadowColor,horizental,vertical,blur,speard }}} = Shadow
        horizentalInp.value = horizental
        verticalInp.value = vertical
        blurInp.value = blur
        speardInp.value = speard
    } else {
        let {box: {hover: { shadowColor,horizental,vertical,blur,speard }}} = Shadow
        horizentalHoverInp.value = horizental
        verticalHoverInp.value = vertical
        blurHoverInp.value = blur
        speardHoverInp.value = speard
    }
}

//? add style to resizable box
const addStyleToResizable = (isHover) => {
    if (isHover) {
        let {box: {hover: { shadowColor, horizental, vertical, blur, speard }}} = Shadow 
        resizableBox.style.boxShadow = `${horizental}px ${vertical}px ${blur}px ${speard}px ${shadowColor}`
    } else {
        let {box: {noHover: { shadowColor, horizental, vertical, blur, speard }}} = Shadow 
        resizableBox.style.boxShadow = `${horizental}px ${vertical}px ${blur}px ${speard}px ${shadowColor}`
    }
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
        activeAllInputs(false)
        uploadShadowDataInDom(false)
        addStyleToResizable(false)
    } else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"

        resizableBox.style.boxShadow = ""

        //? active inputs
        disableAllInputs(false)
        removeShadowDataFromDom(false)
    }
}

//? check validation of inputs
const checkValidationInput = (inputValue, isHover, inputName) => {
    if (!isHover) {
        let validateObject = Shadow.Validation.noHover

        if (inputName === "horizental" || inputName === "vertical") {
            let regexCode = /^\+?-?\d{0,2}$/g
            let regexResult = regexCode.test(inputValue)

            if (inputName === "horizental") {
                if (regexResult) {
                    validateObject.horizentalValidate = true
                    Shadow.box.noHover.horizental = Number(horizentalInp.value)
                } else {
                    validateObject.horizentalValidate = false
                }
            } else {
                if (regexResult) {
                    validateObject.verticalValidate = true
                    Shadow.box.noHover.vertical = Number(verticalInp.value)
                } else {
                    validateObject.verticalValidate = false
                }
            }

            return regexResult
        } else if (inputName === "blur" || inputName === "speard") {
            let regexCode = /^\+?\d{0,2}$/g
            let regexResult = regexCode.test(inputValue)

            if (inputName === "blur") {
                if (regexResult) {
                    validateObject.blurValidate = true
                    Shadow.box.noHover.blur = Number(blurInp.value)
                } else {
                    validateObject.blurValidate = false
                }
            } else {
                if (regexResult) {
                    validateObject.speardValidate = true
                    Shadow.box.noHover.speard = Number(speardInp.value)
                } else {
                    validateObject.speardValidate = false
                }
            }
            
            return regexResult
        }
    }
}

// ? make resizable for resizable box
const makeResizableElem = elem => {
    const element  = document.querySelector(elem)
    const resizers = document.querySelector(`${elem} .resizers`)
    const resizer  = document.querySelectorAll(`${elem} .resizer`)
    
    //? dot clicked
    let currentDot = null

    resizer.forEach(dot => {
        dot.addEventListener("mousedown", (e) => {
            window.addEventListener("mousemove" , resize)
            //? put dot in currentDot
            currentDot = dot
            window.addEventListener("mouseup", stopResize)
        })
    })

    //? resize function for mousemove on window
    const resize = (e) => {        
        //? resizers dont has a active class ==> add class to resizers
        if (!resizers.classList.contains("active")) {
            resizers.classList.add("active")
        }

        if (currentDot.classList.contains("bottom-right")) {
            //? set width and height
            element.style.width = `${e.clientX - element.getBoundingClientRect().left}px`
            element.style.height = `${e.clientY - element.getBoundingClientRect().top}px`
        }else if (currentDot.classList.contains('bottom-left')) {
            //? set width and height
            element.style.width = `${element.getBoundingClientRect().right - e.clientX}px`
            element.style.height = `${e.clientY - element.getBoundingClientRect().top}px`
        }else if (currentDot.classList.contains("top-right")) {
            //? set width and height
            element.style.width = `${e.clientX - element.getBoundingClientRect().left}px`
            element.style.height = `${element.getBoundingClientRect().bottom - e.clientY}px`
        }else {
            //? set width and height
            element.style.width = `${element.getBoundingClientRect().right - e.clientX}px`
            element.style.height = `${element.getBoundingClientRect().bottom - e.clientY}px`
        }
    }
    
    const stopResize = () => {
        resizers.classList.remove("active")
        //? remove resizers active class
        window.removeEventListener("mousemove", resize)
    }
}
makeResizableElem(".resizable")

elemClassName.addEventListener("keyup", checkInputs)
horizentalInp.addEventListener("keyup", (e) => {
    let isValidateTrue = checkValidationInput(e.target.value, false, "horizental")

    if (isValidateTrue) {
        if (Shadow.Validation.noHover.verticalValidate && Shadow.Validation.noHover.blurValidate && Shadow.Validation.noHover.speardValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToResizable(false)
        }
    } else 
        elemValidationInputs.innerHTML = "Please select a negative number from 0 to 100 or a positive number from 0 to 100"

})

verticalInp.addEventListener("keyup", (e) => {
    let isValidateTrue = checkValidationInput(e.target.value, false, "vertical")

    if (isValidateTrue) {
        if (Shadow.Validation.noHover.horizentalValidate && Shadow.Validation.noHover.blurValidate && Shadow.Validation.noHover.speardValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToResizable(false)
        }
    } else 
        elemValidationInputs.innerHTML = "Please select a negative number from 0 to 100 or a positive number from 0 to 100"
})

blurInp.addEventListener("keyup", (e) => {
    let isValidateTrue = checkValidationInput(e.target.value, false, "blur")

    if (isValidateTrue) {
        if (Shadow.Validation.noHover.horizentalValidate && Shadow.Validation.noHover.verticalValidate && Shadow.Validation.noHover.speardValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToResizable(false)
        }
    } else 
        elemValidationInputs.innerHTML = "Please select a negative number from 0 to 100 or a positive number from 0 to 100"
})

speardInp.addEventListener("keyup", (e) => {
    let isValidateTrue = checkValidationInput(e.target.value, false, "speard")

    if (isValidateTrue) {
        if (Shadow.Validation.noHover.horizentalValidate && Shadow.Validation.noHover.verticalValidate && Shadow.Validation.noHover.speardValidate) {
            elemValidationInputs.innerHTML = ""
            addStyleToResizable(false)
        }
    } else 
        elemValidationInputs.innerHTML = "Please select a negative number from 0 to 100 or a positive number from 0 to 100"
})