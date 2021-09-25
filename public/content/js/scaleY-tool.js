import * as functions from "./functions.js"

functions.disableAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
functions.disableAllInputs(true, ["scaleX-inp"], ["scaleY-inp"])

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const scaleY_inp = document.querySelector(".scaleY-inp")
const scaleX_inp = document.querySelector(".scaleX-inp")
const scaleY_elem = document.querySelector(".scaleY-validation-elem")
const scaleX_elem = document.querySelector(".scaleX-validation-elem")
const resizableBox = document.querySelector(".resizable")
const scaleXPlusIcon = document.querySelector(".scaleX-plus-icon")
const wrapScaleBoxs = document.querySelector(".scale-x-y-box")
const propertiesScaleY = document.querySelector(".properties-scaleY-box")
const propertiesScaleX = document.querySelector(".properties-scaleX-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")

//? Scale object
let Scale = {
    elemClass: null,
    isInit: false,
    initScaleX: false,
    nowScale : "scaleY",
    box: {
        scaleY : 1 ,
        scaleX : 1 ,
    },
    validation: {
        scaleY_validate: true,
        scaleX_validate: true,
    }
}

//? check element class name input
const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Scale.isInit = true
        Scale.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Scale.initScaleX) {
            scaleXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Scale.nowScale === "scaleY") {
                functions.activeAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
                functions.uploadDataInInputs(false, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleY)
                checkValidateInput(scaleY_inp.value , false)
                append_SX_SY_Box("scaleY")
            } else {
                functions.activeAllInputs(true, ["scaleX-inp"], ["scaleY-inp"])
                functions.uploadDataInInputs(true, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleX)
                checkValidateInput(scaleX_inp.value , true)
                append_SX_SY_Box("scaleX")
            }
        } else {
            functions.activeAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
            functions.uploadDataInInputs(false, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleY)
            checkValidateInput(scaleY_inp.value , false)
        }

    } else {
        Scale.isInit = false
        functions.disableAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
        functions.removeDataFromInputs(false, ["scaleX-inp"], ["scaleY-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true, ["scaleX-inp"], ["scaleY-inp"])
        functions.removeDataFromInputs(true, ["scaleX-inp"], ["scaleY-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapScaleBoxs.innerText = ""
        scaleXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? check scaleX and scaleY validation
const checkValidateInput = (value, initScaleX) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initScaleX) {
        if (regexResult) {
            Scale.validation.scaleX_validate = true
            
            scaleX_elem.innerHTML = ""
            
            Scale.box.scaleX = Number(value)

            addStyleToResizable()
        } else {
            Scale.validation.scaleX_validate = false
            scaleX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Scale.validation.scaleY_validate = true
            
            scaleY_elem.innerHTML = ""
            
            Scale.box.scaleY = Number(value)

            addStyleToResizable()
        } else {
            Scale.validation.scaleY_validate = false
            scaleY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `scaleX(${Scale.box.scaleX}) scaleY(${Scale.box.scaleY})`
}

//? remove style from resizable box
const removeStyleFromResizable = (initScaleX) => {
    initScaleX ? resizableBox.style.transform = `scaleX(1)` : resizableBox.style.transform = `scaleY(1)`
}

//? create scaleX box and scaleY box and append them in wrap box
const append_SX_SY_Box = (typeOfScale = "scaleY") => {
    let scaleValidate = null
    typeOfScale === "scaleX" ? scaleValidate = Scale.validation.scaleX_validate : scaleValidate = Scale.validation.scaleY_validate

    let activeScaleY = null
    let activeScaleX = null

    if (typeOfScale === "scaleY") {
        activeScaleY = true
        activeScaleX = false
    } else {
        activeScaleX = true
        activeScaleY = false
    }

    if (Scale.isInit) {
        if (scaleValidate) {
            Scale.initScaleX = true

            wrapScaleBoxs.innerText = ""

            const SY_Box = functions.createDataBox(activeScaleY, "scaleY-box", "scaleY", switchToScaleBox)
            const SX_Box = functions.createDataBox(activeScaleX, "scaleX-box", "scaleX", switchToScaleBox)

            wrapScaleBoxs.append(SY_Box,SX_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? switch to scale boxes
const switchToScaleBox = (nameBox) => {
    const SY_Box = document.querySelector(".scaleY-box")
    const SX_Box = document.querySelector(".scaleX-box")

    if (Scale.nowScale !== nameBox) {
        if (nameBox === "scaleY") {
            let scaleValidate = Scale.validation.scaleX_validate
            if (scaleValidate) {
                propertiesScaleY.style.transform = "translateX(0)"
                propertiesScaleX.style.transform = "translateX(318px)"

                SY_Box.classList.add("active")
                SX_Box.classList.remove("active")
        
                Scale.nowScale = "scaleY"
                
                functions.uploadDataInInputs(false, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleY)
                functions.activeAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
            } else 
                alert("you need to enter the information correctly")
        } else {
            let scaleValidate = Scale.validation.scaleY_validate
            if (scaleValidate) {
                propertiesScaleY.style.transform = "translateX(-318px)"
                propertiesScaleX.style.transform = "translateX(-318px)"
        
                SY_Box.classList.remove("active")
                SX_Box.classList.add("active")
        
                Scale.nowScale = "scaleX"
        
                functions.uploadDataInInputs(Scale.initScaleX, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleX)
                functions.activeAllInputs(Scale.initScaleX, ["scaleX-inp"], ["scaleY-inp"])
            } else {
                alert("you need to enter the information correctly")
            }
        }
    }
}

//? open generate pannel
const openGeneratePannel = () => {
    if (Scale.isInit) {
        if (Scale.initScaleX) {
            
        } else {
            if (Scale.validation.scaleY_validate) {
                generateWrapBox.classList.add("active")
            } else 
                alert("please enter the information correctly")
        }
    } else
        alert("please complete the fields above")
}


scaleXPlusIcon.addEventListener("click", () => {
    if (Scale.isInit) {
        if (Scale.initScaleX) {
            Scale.initScaleX = false
            wrapScaleBoxs.innerText = ""
            
            Scale.box.scaleX = 1
            Scale.validation.scaleX_validate = true
            scaleX_elem.innerHTML = ""
            
            if (Scale.nowScale !== "scaleY") {
                propertiesScaleY.style.transform = "translateX(0)"
                propertiesScaleX.style.transform = "translateX(318px)"
            }
    
            functions.uploadDataInInputs(false, ["scaleX-inp"], ["scaleY-inp"], Scale.box.scaleY)
            functions.activeAllInputs(false, ["scaleX-inp"], ["scaleY-inp"])
            checkValidateInput(scaleY_inp.value , false)

            Scale.nowScale = "scaleY"
            scaleXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Scale.validation.scaleY_validate) {
                append_SX_SY_Box(Scale.nowScale)
                scaleXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
scaleY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
scaleX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)