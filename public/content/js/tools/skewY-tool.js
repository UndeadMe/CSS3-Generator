import { makeResizableElem } from "./../modules/resizer.js";
import * as functions from "./../modules/functions.js";

makeResizableElem(".resizable")
functions.disableAllInputs(true , ["skewX-inp"] , ["skewY-inp"])
functions.disableAllInputs(false, ["skewX-inp"] , ["skewY-inp"])

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const skewY_inp = document.querySelector(".skewY-inp")
const skewX_inp = document.querySelector(".skewX-inp")
const valdiationSkewY_elem = document.querySelector(".skewY-validation-elem")
const valdiationSkewX_elem = document.querySelector(".skewX-validation-elem")
const resizableBox = document.querySelector(".resizable")
const skewXPlusIcon = document.querySelector(".skewX-plus-icon")
const wrapSkewBoxs = document.querySelector(".skew-x-y-box")
const propertiesSkewY = document.querySelector(".properties-skewY-box")
const propertiesSkewX = document.querySelector(".properties-skewX-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Skew object
let Skew = {
    elemClass: null,
    isInit: false,
    initSkewX: false,
    nowSkew : "skewY",
    box: {
        skewY : 0 ,
        skewX : 0 ,
    },
    validation: {
        skewY_validate: true,
        skewX_validate: true,
    }
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Skew.isInit = true
        Skew.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Skew.initSkewX) {
            skewXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Skew.nowSkew === "skewY") {
                functions.activeAllInputs(false , ["skewX-inp"] , ["skewY-inp"])
                functions.uploadDataInInputs(false, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewY)
                checkValidateInput(skewY_inp.value , false)
                append_SX_SY_Box("skewY")
            } else {
                functions.activeAllInputs(true , ["skewX-inp"] , ["skewY-inp"])
                functions.uploadDataInInputs(true, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewX)
                checkValidateInput(skewX_inp.value , true)
                append_SX_SY_Box("skewX")
            }
        } else {
            functions.activeAllInputs(false , ["skewX-inp"] , ["skewY-inp"])
            functions.uploadDataInInputs(false, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewY)
            checkValidateInput(skewY_inp.value , false)
        }
    } else {
        Skew.isInit = false
        functions.disableAllInputs(false , ["skewX-inp"] , ["skewY-inp"])
        functions.removeDataFromInputs(false, ["skewX-inp"] , ["skewY-inp"])
        removeStyleFromResizable(false)
        functions.disableAllInputs(true , ["skewX-inp"] , ["skewY-inp"])
        functions.removeDataFromInputs(true, ["skewX-inp"] , ["skewY-inp"])
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapSkewBoxs.innerText = ""
        skewXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? check skewY and skewX validation
const checkValidateInput = (value, initSkewX) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initSkewX) {
        if (regexResult) {
            Skew.validation.skewX_validate = true
            
            valdiationSkewX_elem.innerHTML = ""
            
            Skew.box.skewX = Number(value)

            addStyleToResizable()
        } else {
            Skew.validation.skewX_validate = false
            valdiationSkewX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Skew.validation.skewY_validate = true
            
            valdiationSkewY_elem.innerHTML = ""
            
            Skew.box.skewY = Number(value)

            addStyleToResizable()
        } else {
            Skew.validation.skewY_validate = false
            valdiationSkewY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `skewY(${Skew.box.skewY}deg) skewX(${Skew.box.skewX}deg)`
}

//? remove style from resizable box
const removeStyleFromResizable = (initSkewX) => {
    initSkewX ? resizableBox.style.transform = `skewX(0)` : resizableBox.style.transform = `skewY(0)`
}

//? create skewY box and skewX box and append them in wrap box
const append_SX_SY_Box = (typeOfSkew = "skewY") => {
    let skewValidate = null
    typeOfSkew === "skewX" ? skewValidate = Skew.validation.skewX_validate : skewValidate = Skew.validation.skewY_validate

    let activeSkewY = null
    let activeSkewX = null

    if (typeOfSkew === "skewY") {
        activeSkewY = true
        activeSkewX = false
    } else {
        activeSkewX = true
        activeSkewY = false
    }

    if (Skew.isInit) {
        if (skewValidate) {
            Skew.initSkewX = true

            wrapSkewBoxs.innerText = ""

            const SX_Box = functions.createDataBox(activeSkewY , "skewY-box", "skewY", switchToSkewBox)
            const SY_Box = functions.createDataBox(activeSkewX , "skewX-box", "skewX", switchToSkewBox)

            wrapSkewBoxs.append(SX_Box,SY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? switch to skew boxes
const switchToSkewBox = (nameBox) => {
    const SX_Box = document.querySelector(".skewY-box")
    const SY_Box = document.querySelector(".skewX-box")

    if (Skew.nowSkew !== nameBox) {
        if (nameBox === "skewY") {
            let skewValidate = Skew.validation.skewX_validate
            if (skewValidate) {
                propertiesSkewY.style.transform = "translateX(0)"
                propertiesSkewX.style.transform = "translateX(318px)"
                    
                SX_Box.classList.add("active")
                SY_Box.classList.remove("active")
        
                Skew.nowSkew = "skewY"
                
                functions.uploadDataInInputs(false, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewY)
                functions.activeAllInputs(false , ["skewX-inp"] , ["skewY-inp"])
            } else 
                alert("you need to enter the information correctly")
        } else {
            let skewValidate = Skew.validation.skewY_validate
            if (skewValidate) {
                propertiesSkewY.style.transform = "translateX(-318px)"
                propertiesSkewX.style.transform = "translateX(-318px)"
        
                SX_Box.classList.remove("active")
                SY_Box.classList.add("active")
        
                Skew.nowSkew = "skewX"
        
                functions.uploadDataInInputs(Skew.initSkewX, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewX)
                functions.activeAllInputs(Skew.initSkewX , ["skewX-inp"] , ["skewY-inp"])
            } else 
                alert("you need to enter the information correctly")
        }
    }
}

let StyleText = undefined
//? open generate pannel
const openGeneratePannel = () => {
    if (Skew.isInit) {
        if (Skew.initSkewX) {
            if (Skew.validation.skewX_validate && Skew.validation.skewY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Skew.elemClass} { transform: skewY(${Skew.box.skewY}px) skewX(${Skew.box.skewX}px); }`
                codePennel.innerHTML = `.${Skew.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; skewY(${Skew.box.skewY}px)<br>
                    &nbsp;&nbsp;&nbsp; skewX(${Skew.box.skewX}px);<br>
                }`
            } else 
                alert("please enter the information correctly")
        } else {
            if (Skew.validation.skewY_validate) {
                generateWrapBox.classList.add("active")
                StyleText = `.${Skew.elemClass} { transform: skewY(${Skew.box.skewY}px); }`
                codePennel.innerHTML = `.${Skew.elemClass} { <br>
                    &nbsp;&nbsp;&nbsp; transform: <br>
                    &nbsp;&nbsp;&nbsp; skewY(${Skew.box.skewY}px); <br>
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

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)

skewXPlusIcon.addEventListener("click", () => {
    if (Skew.isInit) {
        if (Skew.initSkewX) {
            Skew.initSkewX = false
            wrapSkewBoxs.innerText = ""
            
            Skew.box.skewX = 0
            Skew.validation.skewX_validate = true
            valdiationSkewX_elem.innerHTML = ""

            if (Skew.nowSkew !== "skewY") {
                propertiesSkewY.style.transform = "translate(0)"
                propertiesSkewX.style.transform = "translate(318px)"
            }
    
            functions.uploadDataInInputs(false, ["skewX-inp"] , ["skewY-inp"], Skew.box.skewY)
            functions.activeAllInputs(false , ["skewX-inp"] , ["skewY-inp"])
            checkValidateInput(skewY_inp.value , false)

            Skew.nowSkew = "skewY"
            skewXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Skew.validation.skewY_validate) {
                append_SX_SY_Box(Skew.nowSkew)
                skewXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

skewY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
skewX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)