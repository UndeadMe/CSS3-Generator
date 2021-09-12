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
const typeEffectIcon = document.querySelector(".type-effect-icon")
const propertiesNoHoverBox = document.querySelector(".properies-box-no-hover")
const propertiesHoverBox = document.querySelector(".properies-box-hover")
let typeEffectBox = document.querySelector(".type-effect-box")
const vhTools = document.querySelectorAll(".vh-tool")
const vhTool = document.querySelectorAll(".vh-tool")
const elemValidationInputs = document.querySelector(".valdiation-inputs-elem")

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
            horizental: 5,
            vertical: 5,
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
    } else {
        horizentalHoverInp.disabled = false
        verticalHoverInp.disabled = false
        blurHoverInp.disabled = false
        speardHoverInp.disabled = false
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

let typeBox = null

//? create default and hover box
const createDH_box = (nameBox) => {
    typeEffectBox.innerText = ""

    let defaultBox = document.createElement("div")
    defaultBox.className = "d-flex align-items-center default-box-type"
    defaultBox.innerHTML = "default"

    let hoverBox = document.createElement("div")
    hoverBox.className = "d-flex align-items-center hover-box-type"
    hoverBox.innerHTML = "hover"

    if (nameBox === "defaultBox") {
        defaultBox.classList.add("active")
    } else if (nameBox === "hoverBox") {
        hoverBox.classList.add("active")
    } else {
        defaultBox.classList.add("active")
    }

    defaultBox.addEventListener("click", () => {
        typeBox = "defaultBox"
        hoverBox.classList.remove("active")
        defaultBox.classList.add("active")
        propertiesNoHoverBox.style.marginLeft = "0"
        removeShadowDataFromDom(true)
        uploadShadowDataInDom(false)
        disableAllInputs(true)
        activeAllInputs(false)
    })

    hoverBox.addEventListener("click", () => {
        typeBox = "hoverBox"
        hoverBox.classList.add("active")
        defaultBox.classList.remove("active")
        propertiesNoHoverBox.style.marginLeft = "-318px"
        uploadShadowDataInDom(true)
        removeShadowDataFromDom(false)
        disableAllInputs(false)
        activeAllInputs(true)
    })

    typeEffectBox.append(defaultBox, hoverBox)
}

//? remove default and hover box 
const removeDH_box = () => {
    typeEffectBox.innerText = ""
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
        if (Shadow.isHover) { 
            createDH_box(typeBox)
            uploadShadowDataInDom(true)
            activeAllInputs(true)
            if (typeBox === "defaultBox") {
                propertiesNoHoverBox.style.marginLeft = 0
            } else if (typeBox === "hoverBox") {
                propertiesNoHoverBox.style.marginLeft = "-318px"
            } else {
                propertiesNoHoverBox.style.marginLeft = 0
            }
        }
        console.log(typeBox)
    } else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"

        resizableBox.style.boxShadow = ""

        //? active inputs
        disableAllInputs(false)
        removeShadowDataFromDom(false)
        if (Shadow.isHover) { 
            removeDH_box()
            disableAllInputs(true)
            removeShadowDataFromDom(true)
            propertiesNoHoverBox.style.marginLeft = 0
            typeEffectIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        }
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
typeEffectIcon.addEventListener("click", () => {
    if (Shadow.isInit) {
        if (Shadow.isHover) {
            Shadow.isHover = false
            removeDH_box()
            propertiesNoHoverBox.style.marginLeft = "0"
            typeEffectIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
            uploadShadowDataInDom(false)
            activeAllInputs(false)
        } else {
            Shadow.isHover = true
            typeBox ? createDH_box(typeBox) : createDH_box("defaultBox")
            typeEffectIcon.innerHTML = '<i class="bi bi-x-square"></i>'
        }
    } else 
        alert("Please fill in the field above")
})

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