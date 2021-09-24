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
                activeAllInputs(false)
                uploadScaleDomInInputs(false)
                checkValidateInput(scaleY_inp.value , false)
                append_SX_SY_Box("scaleY")
            } else {
                activeAllInputs(true)
                uploadScaleDomInInputs(true)
                checkValidateInput(scaleX_inp.value , true)
                append_SX_SY_Box("scaleX")
            }
        } else {
            activeAllInputs(false)
            uploadScaleDomInInputs(false)
            checkValidateInput(scaleY_inp.value , false)
        }

    } else {
        Scale.isInit = false
        disableAllInputs(false)
        removeScaleDataFromInputs(false)
        removeStyleFromResizable(false)
        disableAllInputs(true)
        removeScaleDataFromInputs(true)
        removeStyleFromResizable(true)
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
        wrapScaleBoxs.innerText = ""
        scaleXPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? disable all inputs 
const disableAllInputs = (initScaleX) => {
    initScaleX ? scaleX_inp.disabled = true : scaleY_inp.disabled = true
}

disableAllInputs(true)
disableAllInputs(false)

//? active all inputs
const activeAllInputs = (initScaleX) => {
    initScaleX ? scaleX_inp.disabled = false : scaleY_inp.disabled = false
}

//? upload scale data in inputs
const uploadScaleDomInInputs = (initScaleX) => {
    initScaleX ? scaleX_inp.value = Scale.box.scaleX : scaleY_inp.value = Scale.box.scaleY
}

//? remove scale data from inputs
const removeScaleDataFromInputs = (initScaleX) => {
    initScaleX ? scaleX_inp.value = "" : scaleY_inp.value = ""
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

            const SY_Box = createSY_Box(activeScaleY)
            const SX_Box = createSX_Box(activeScaleX)

            wrapScaleBoxs.append(SY_Box,SX_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
}

//? create scaleY box
const createSY_Box = (isActive = false) => {
    const SY_Box = document.createElement("div")
    SY_Box.className = "scaleY-box"
    isActive ? SY_Box.classList.add("active") : SY_Box.classList.remove("active")
    SY_Box.innerHTML = "scaleY"
    SY_Box.addEventListener("click" , () => switchToScaleBox(SY_Box.innerHTML))
    return SY_Box
}

//? create scaleX box
const createSX_Box = (isActive = false) => {
    const SX_Box = document.createElement("div")
    SX_Box.className = "scaleX-box"
    isActive ? SX_Box.classList.add("active") : SX_Box.classList.remove("active")
    SX_Box.innerHTML = "scaleX"
    SX_Box.addEventListener("click" , () => switchToScaleBox(SX_Box.innerHTML))
    return SX_Box
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
                
                uploadScaleDomInInputs(false)
                activeAllInputs(false)
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
        
                uploadScaleDomInInputs(Scale.initScaleX)
                activeAllInputs(Scale.initScaleX)
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
    
            uploadScaleDomInInputs(false)
            activeAllInputs(false)
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