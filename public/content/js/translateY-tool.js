import { makeResizableElem } from "./resizer.js"

//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const translateY_inp = document.querySelector(".translateY-inp")
const translateX_inp = document.querySelector(".translateX-inp")
const valdiationTranslateY_elem = document.querySelector(".translateY-validation-elem")
const valdiationTranslateX_elem = document.querySelector(".translateX-validation-elem")
const resizableBox = document.querySelector(".resizable")
const translateXPlusIcon = document.querySelector(".translateX-plus-icon")
const wrapTranslateBoxs = document.querySelector(".translate-x-y-box")
const propertiesTranslateY = document.querySelector(".properties-translateY-box")
const propertiesTranslateX = document.querySelector(".properties-translateX-box")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")

//? shadow object
let Translate = {
    elemClass: null,
    isInit: false,
    initTranslateX: false,
    nowTranslate: "translateY",
    box: {
        translateY : 0 ,
        translateX : 0 ,
    },
    validation: {
        translateY_validate: true,
        translateX_validate: true,
    }
}

makeResizableElem(".resizable")

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Translate.isInit = true
        Translate.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        if (Translate.initTranslateX) {
            translateXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            if (Translate.nowTranslate === "translateY") {
                activeAllInputs(false)
                uploadTranslateDomInInputs(false)
                checkValidateInput(translateY_inp.value , false)
                append_TX_TY_Box("translateY")
            } else {
                activeAllInputs(true)
                uploadTranslateDomInInputs(true)
                checkValidateInput(translateX_inp.value , true)
                append_TX_TY_Box("translateX")
            }
        } else {
            activeAllInputs(false)
            uploadTranslateDomInInputs(false)
            checkValidateInput(translateY_inp.value , false)
        }

    } else {
        Translate.isInit = false
        disableAllInputs(false)
        removeTranslateDataFromInputs(false)
        removeStyleFromResizable(false)
        disableAllInputs(true)
        removeTranslateDataFromInputs(true)
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapTranslateBoxs.innerText = ""
        translateXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? disable all inputs 
const disableAllInputs = (initTranslateX) => {
    if (initTranslateX) {
        translateX_inp.disabled = true
    } else {
        translateY_inp.disabled = true
    }
}

disableAllInputs(true)
disableAllInputs(false)

//? active all inputs
const activeAllInputs = (initTranslateX) => {
    if (initTranslateX) {
        translateX_inp.disabled = false
    } else {
        translateY_inp.disabled = false
    }
}

//? upload translate data in inputs
const uploadTranslateDomInInputs = (initTranslateX) => {
    if (initTranslateX) {
        translateX_inp.value = Translate.box.translateX
    } else {
        translateY_inp.value = Translate.box.translateY
    }
}

//? remove translate data from inputs
const removeTranslateDataFromInputs = (initTranslateX) => {
    if (initTranslateX) {
        translateX_inp.value = ""
    } else {
        translateY_inp.value = ""
    }
}

//? check translateX and translateY validation
const checkValidateInput = (value, initTranslateX) => {
    let regexCode = /^(0|-[1-9]{1,2}|-[1-9]{1}0|\+?[1-9]{1,2}|\+?[1-9]{1}0)$/
    let regexResult = regexCode.test(value)
    
    if (initTranslateX) {
        if (regexResult) {
            Translate.validation.translateX_validate = true
            
            valdiationTranslateX_elem.innerHTML = ""
            
            Translate.box.translateX = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateX_validate = false
            valdiationTranslateX_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    } else {
        if (regexResult) {
            Translate.validation.translateY_validate = true
            
            valdiationTranslateY_elem.innerHTML = ""
            
            Translate.box.translateY = Number(value)

            addStyleToResizable()
        } else {
            Translate.validation.translateY_validate = false
            valdiationTranslateY_elem.innerHTML = "Please select a negative number from -100 to 0 or a positive number from 0 to 100"
        }
    }
}

//? add style to resizable box
const addStyleToResizable = () => {
    resizableBox.style.transform = `translateX(${Translate.box.translateX}px) translateY(${Translate.box.translateY}px)`
}

//? remove style from resizable box
const removeStyleFromResizable = (initTranslateX) => {
    if (initTranslateX) {
        resizableBox.style.transform = `translateX(0)`
    } else {
        resizableBox.style.transform = `translateY(0)`
    }
}

//? create translateX box and translateY box and append them in wrap box
const append_TX_TY_Box = (typeOfTranslate = "translateY") => {
    let translateValidate = null
    typeOfTranslate === "translateX" ? translateValidate = Translate.validation.translateX_validate : translateValidate = Translate.validation.translateY_validate

    let activeTranslateY = null
    let activeTranslateX = null

    if (typeOfTranslate === "translateY") {
        activeTranslateY = true
        activeTranslateX = false
    } else {
        activeTranslateX = true
        activeTranslateY = false
    }

    if (Translate.isInit) {
        if (translateValidate) {
            Translate.initTranslateX = true

            wrapTranslateBoxs.innerText = ""

            const TY_Box = createTY_Box(activeTranslateY)
            const TX_Box = createTX_Box(activeTranslateX)

            wrapTranslateBoxs.append(TY_Box,TX_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? create translateY box
const createTY_Box = (isActive = false) => {
    const TY_Box = document.createElement("div")
    TY_Box.className = "translateY-box"
    isActive ? TY_Box.classList.add("active") : TY_Box.classList.remove("active")
    TY_Box.innerHTML = "translateY"
    TY_Box.addEventListener("click" , () => switchToTranslateBox(TY_Box.innerHTML))
    return TY_Box
}

//? create translateX box
const createTX_Box = (isActive = false) => {
    const TX_Box = document.createElement("div")
    TX_Box.className = "translateX-box"
    isActive ? TX_Box.classList.add("active") : TX_Box.classList.remove("active")
    TX_Box.innerHTML = "translateX"
    TX_Box.addEventListener("click" , () => switchToTranslateBox(TX_Box.innerHTML))
    return TX_Box
}

//? switch to translate boxes
const switchToTranslateBox = (nameBox) => {
    const TY_Box = document.querySelector(".translateY-box")
    const TX_Box = document.querySelector(".translateX-box")

    if (Translate.nowTranslate !== nameBox) {
        if (nameBox === "translateY") {
            let translateValidate = Translate.validation.translateX_validate
            if (translateValidate) {
                propertiesTranslateY.style.transform = "translateX(0)"
                propertiesTranslateX.style.transform = "translateX(318px)"

                TY_Box.classList.add("active")
                TX_Box.classList.remove("active")
        
                Translate.nowTranslate = "translateY"
                
                uploadTranslateDomInInputs(false)
                activeAllInputs(false)
            } else 
                alert("you need to enter the information correctly")
        } else {
            let translateValidate = Translate.validation.translateY_validate
            if (translateValidate) {
                propertiesTranslateY.style.transform = "translateX(-318px)"
                propertiesTranslateX.style.transform = "translateX(-318px)"
        
                TY_Box.classList.remove("active")
                TX_Box.classList.add("active")
        
                Translate.nowTranslate = "translateX"
        
                uploadTranslateDomInInputs(Translate.initTranslateX)
                activeAllInputs(Translate.initTranslateX)
            } else {
                alert("you need to enter the information correctly")
            }
        }
    }
}

//? open generate pannel
const openGeneratePannel = () => {
    if (Translate.isInit) {
        if (Translate.initTranslateX) {
            
        } else {
            if (Translate.validation.translateY_validate) {
                generateWrapBox.classList.add("active")
            } else 
                alert("please enter the information correctly")
        }
    } else
        alert("please complete the fields above")
}

elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)

translateXPlusIcon.addEventListener("click", () => {
    if (Translate.isInit) {
        if (Translate.initTranslateX) {
            Translate.initTranslateX = false
            wrapTranslateBoxs.innerText = ""
            
            Translate.box.translateX = 0
            Translate.validation.translateX_validate = true
            valdiationTranslateX_elem.innerHTML = ""

            if (Translate.nowTranslate !== "translateY") {
                propertiesTranslateY.style.transform = "translateX(0)"
                propertiesTranslateX.style.transform = "translateX(318px)"
            }
    
            uploadTranslateDomInInputs(false)
            activeAllInputs(false)
            checkValidateInput(translateY_inp.value , false)

            Translate.nowTranslate = "translateY"
            translateXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
        } else {
            if (Translate.validation.translateY_validate) {
                append_TX_TY_Box(Translate.nowTranslate)
                translateXPlusIcon.innerHTML = '<i class="bi bi-dash-square"></i>'
            } else 
                alert("please enter the information corrcetly")
        }
    } else 
        alert("please complete the fields")
})

translateY_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, false))
translateX_inp.addEventListener("keyup", (e) => checkValidateInput(e.target.value, true))
cssCodeBtn.addEventListener("click", openGeneratePannel)