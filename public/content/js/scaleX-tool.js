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
                activeAllInputs(false)
                uploadScaleDomInInputs(false)
                checkValidateInput(scaleX_inp.value , false)
                append_SX_SY_Box("scaleX")
            } else {
                activeAllInputs(true)
                uploadScaleDomInInputs(true)
                checkValidateInput(scaleY_inp.value , true)
                append_SX_SY_Box("scaleY")
            }
        } else {
            activeAllInputs(false)
            uploadScaleDomInInputs(false)
            checkValidateInput(scaleX_inp.value , false)
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
        scaleYPlusIcon.innerHTML = '<i class="bi bi-plus-square"></i>'
    }
}

//? disable all inputs 
const disableAllInputs = (initScaleY) => {
    initScaleY ? scaleY_inp.disabled = true : scaleX_inp.disabled = true
}

disableAllInputs(true)
disableAllInputs(false)

//? active all inputs
const activeAllInputs = (initScaleY) => {
    initScaleY ? scaleY_inp.disabled = false : scaleX_inp.disabled = false
}

//? upload scale data in inputs
const uploadScaleDomInInputs = (initScaleY) => {
    initScaleY ? scaleY_inp.value = Scale.box.scaleY : scaleX_inp.value = Scale.box.scaleX
}

//? remove scale data from inputs
const removeScaleDataFromInputs = (initScaleY) => {
    initScaleY ? scaleY_inp.value = "" : scaleX_inp.value = ""
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

            const SX_Box = createSX_Box(activeScaleX)
            const SY_Box = createSY_Box(activeScaleY)

            wrapScaleBoxs.append(SX_Box,SY_Box)

        } else 
            alert("please enter the information correctly")
    } else 
        alert("please complete the fields")
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

//? create scaleY box
const createSY_Box = (isActive = false) => {
    const SY_Box = document.createElement("div")
    SY_Box.className = "scaleY-box"
    isActive ? SY_Box.classList.add("active") : SY_Box.classList.remove("active")
    SY_Box.innerHTML = "scaleY"
    SY_Box.addEventListener("click" , () => switchToScaleBox(SY_Box.innerHTML))
    return SY_Box
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
                
                uploadScaleDomInInputs(false)
                activeAllInputs(false)
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
        
                uploadScaleDomInInputs(Scale.initScaleY)
                activeAllInputs(Scale.initScaleY)
            } else {
                alert("you need to enter the information correctly")
            }
        }
    }
}

//? open generate pannel
const openGeneratePannel = () => {
    if (Scale.isInit) {
        if (Scale.initScaleY) {
            
        } else {
            if (Scale.validation.scaleX_validate) {
                generateWrapBox.classList.add("active")
            } else 
                alert("please enter the information correctly")
        }
    } else
        alert("please complete the fields above")
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
    
            uploadScaleDomInInputs(false)
            activeAllInputs(false)
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