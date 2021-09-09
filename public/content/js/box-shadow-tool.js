import { createPickr } from "./pickr.js";

//? get element form dom
const colorPickerBtn = document.querySelector(".color-picker")
const resizableBox = document.querySelector(".resizable")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const speardInp = document.querySelector(".speard-inp")
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
            horizental: 0,
            vertical: 0,
            blur: 0,
            speard: 0
        }
    },
    isInit: false,
    isHover: false,
    Validation : {
        horizentalValidate: true,
        verticalValidate: true,
        blurValidate: true,
        speardValidate: true
    }
}

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    let shadowColor = color.toHEXA().toString()
    Shadow.box.noHover.shadowColor = shadowColor
    colorPickerBtn.style.background = shadowColor
    addStyleToResizable()
})

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
    }
}

//? add style to resizable box
const addStyleToResizable = (isHover) => {
    if (isHover) {
        let {box: {noHover: { shadowColor, horizental, vertical, blur, speard }}} = Shadow 
        resizableBox.style.boxShadow = `${horizental}px ${vertical}px ${blur}px ${speard}px ${shadowColor}`
    } else {
        let {box: {hover: { shadowColor, horizental, vertical, blur, speard }}} = Shadow 
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
        uploadShadowDataInDom(false)
        addStyleToResizable(false)
    } else {
        //? disable shadow init
        Shadow.isInit = false

        //? put this msg in msg box
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"
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