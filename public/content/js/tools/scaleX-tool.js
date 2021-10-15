import * as functions from "./../modules/functions.js"

functions.disableAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
functions.disableAllInputs(true, ["scaleY-inp"], ["scaleX-inp"])

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const scaleX_inp = document.querySelector(".scaleX-inp")
const scaleY_inp = document.querySelector(".scaleY-inp")
const scaleX_elem = document.querySelector(".scaleX-validation-elem")
const scaleY_elem = document.querySelector(".scaleY-validation-elem")
const resizableBox = document.querySelector(".resizable")
const scaleYPlusIcon = document.querySelector(".scaleY-plus-icon")
const wrapScaleBoxs = document.querySelector(".scale-x-y-box")
const propertiesScaleX = document.querySelector(".properties-scaleX-box")
const propertiesScaleY = document.querySelector(".properties-scaleY-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Scale object
let Scale = {
    elemClass: null,
    isInit: false,
    initScaleY: false,
    nowScale : "scaleX",
    box: {
        scaleX : 1 ,
        scaleY : 1 ,
    },
    validation: {
        scaleX_validate: true,
        scaleY_validate: true,
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

        if (Scale.initScaleY) {
            scaleYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Scale.nowScale === "scaleX") {
                functions.activeAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
                functions.uploadDataInInputs(false, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleX)
                checkValidateInput(scaleX_inp.value , false)
                append_SX_SY_Box("scaleX")
            } else {
                functions.activeAllInputs(true, ["scaleY-inp"], ["scaleX-inp"])
                functions.uploadDataInInputs(true, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleY)
                checkValidateInput(scaleY_inp.value , true)
                append_SX_SY_Box("scaleY")
            }
        } else {
            functions.activeAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
            functions.uploadDataInInputs(false, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleX)
            checkValidateInput(scaleX_inp.value , false)
        }

    } else {
        Scale.isInit = false
        functions.disableAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
        functions.removeDataFromInputs(false, ["scaleY-inp"], ["scaleX-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true, ["scaleY-inp"], ["scaleX-inp"])
        functions.removeDataFromInputs(true, ["scaleY-inp"], ["scaleX-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapScaleBoxs.innerText = ""
        scaleYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? check scaleX and scaleY validation
const checkValidateInput = (value, initScaleY) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initScaleY) {
        if (regexResult) {
            Scale.validation.scaleY_validate = true
            
            scaleY_elem.innerHTML = ""
            
            Scale.box.scaleY = Number(value)

            addStyleToResizable()
        } else {
            Scale.validation.scaleY_validate = false
            scaleY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Scale.validation.scaleX_validate = true
            
            scaleX_elem.innerHTML = ""
            
            Scale.box.scaleX = Number(value)

            addStyleToResizable()
        } else {
            Scale.validation.scaleX_validate = false
            scaleX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `scaleX(${Scale.box.scaleX}) scaleY(${Scale.box.scaleY})`
}

//? remove style from resizable box
const removeStyleFromResizable = (initScaleY) => {
    initScaleY ? resizableBox.style.transform = `scaleY(1)` : resizableBox.style.transform = `scaleX(1)`
}

//? create scaleX box and scaleY box and append them in wrap box
const append_SX_SY_Box = (typeOfScale = "scaleX") => {
    let scaleValidate = null
    typeOfScale === "scaleY" ? scaleValidate = Scale.validation.scaleY_validate : scaleValidate = Scale.validation.scaleX_validate

    let activeScaleX = null
    let activeScaleY = null

    if (typeOfScale === "scaleX") {
        activeScaleX = true
        activeScaleY = false
    } else {
        activeScaleY = true
        activeScaleX = false
    }

    if (Scale.isInit) {
        if (scaleValidate) {
            Scale.initScaleY = true

            wrapScaleBoxs.innerText = ""

            const SX_Box = functions.createDataBox(activeScaleX, "scaleX-box", "scaleX", switchToScaleBox)
            const SY_Box = functions.createDataBox(activeScaleY, "scaleY-box", "scaleY", switchToScaleBox)

            wrapScaleBoxs.append(SX_Box,SY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? switch to scale boxes
const switchToScaleBox = (nameBox) => {
    const SX_Box = document.querySelector(".scaleX-box")
    const SY_Box = document.querySelector(".scaleY-box")

    if (Scale.nowScale !== nameBox) {
        if (nameBox === "scaleX") {
            let scaleValidate = Scale.validation.scaleY_validate
            if (scaleValidate) {
                propertiesScaleX.style.transform = "translateX(0)"
                propertiesScaleY.style.transform = "translateX(318px)"

                SX_Box.classList.add("active")
                SY_Box.classList.remove("active")
        
                Scale.nowScale = "scaleX"
                
                functions.uploadDataInInputs(false, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleX)
                functions.activeAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
            } else 
                alert("you need to enter the information correctly")
        } else {
            let scaleValidate = Scale.validation.scaleX_validate
            if (scaleValidate) {
                propertiesScaleX.style.transform = "translateX(-318px)"
                propertiesScaleY.style.transform = "translateX(-318px)"
        
                SX_Box.classList.remove("active")
                SY_Box.classList.add("active")
        
                Scale.nowScale = "scaleY"
        
                functions.uploadDataInInputs(Scale.initScaleY, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleY)
                functions.activeAllInputs(Scale.initScaleY, ["scaleY-inp"], ["scaleX-inp"])
            } else {
                alert("you need to enter the information correctly")
            }
        }
    }
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Scale.isInit) {
        if (Scale.initScaleY) {
            if (Scale.validation.scaleX_validate && Scale.validation.scaleY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Scale.elemClass} { transform: scaleX(${Scale.box.scaleX}px) scaleY(${Scale.box.scaleY}px); }`
                codePennel.innerHTML = `.${Scale.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; scaleX(${Scale.box.scaleX}px)<br>
                    &nbsp;&nbsp;&nbsp; scaleX(${Scale.box.scaleY}px);<br>
                }`
            } else 
                alert("please enter the information correctly")
        } else {
            if (Scale.validation.scaleX_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Scale.elemClass} { transform: scaleX(${Scale.box.scaleX}px); }`
                codePennel.innerHTML = `.${Scale.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; scaleX(${Scale.box.scaleX}px); <br>
                }`
            } else 
                alert("please enter the information correctly")
        }
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

scaleYPlusIcon.addEventListener("click", () => {
    if (Scale.isInit) {
        if (Scale.initScaleY) {
            Scale.initScaleY = false
            wrapScaleBoxs.innerText = ""
            
            Scale.box.scaleY = 1
            Scale.validation.scaleY_validate = true
            scaleY_elem.innerHTML = ""
            
            if (Scale.nowScale !== "scaleX") {
                propertiesScaleX.style.transform = "translateX(0)"
                propertiesScaleY.style.transform = "translateX(318px)"
            }
    
            functions.uploadDataInInputs(false, ["scaleY-inp"], ["scaleX-inp"], Scale.box.scaleX)
            functions.activeAllInputs(false, ["scaleY-inp"], ["scaleX-inp"])
            checkValidateInput(scaleX_inp.value , false)

            Scale.nowScale = "scaleX"
            scaleYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Scale.validation.scaleX_validate) {
                append_SX_SY_Box(Scale.nowScale)
                scaleYPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
scaleX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
scaleY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)