import { createPickr } from "./pickr.js";

const colorPickerBtn = document.querySelector(".color-picker")
const resizableBox = document.querySelector(".resizable")
const elemClassName = document.querySelector(".element-class-name-input")
const horizentalInp = document.querySelector(".horizental-inp")
const verticalInp = document.querySelector(".vertical-inp")
const blurInp = document.querySelector(".blur-inp")
const speardInp = document.querySelector(".speard-inp")
const vhTools = document.querySelectorAll(".vh-tool")

//? disable inputs
const disableInputs = () => {
    horizentalInp.style.pointerEvents = "none"
    horizentalInp.value = ""

    verticalInp.style.pointerEvents = "none"
    verticalInp.value = ""

    blurInp.style.pointerEvents = "none"
    blurInp.value = ""

    speardInp.style.pointerEvents = "none"
    speardInp.value = ""
    
    colorPickerBtn.style.pointerEvents = "none"
    vhTools.forEach(tool => tool.style.pointerEvents = "none")
    resizableBox.style.boxShadow = ""
}

//? active inputs
const activeInputs = () => {
    horizentalInp.style.pointerEvents = ""
    verticalInp.style.pointerEvents = ""
    blurInp.style.pointerEvents = ""
    speardInp.style.pointerEvents = ""
    colorPickerBtn.style.pointerEvents = ""
    vhTools.forEach(tool => tool.style.pointerEvents = "")
}

//? check inputs 
const checkInputs = e => {
    if (e.target.value.trim().length !== 0) {
        e.target.parentElement.previousElementSibling.innerHTML = ""
        activeInputs()
    }else {
        e.target.parentElement.previousElementSibling.innerHTML = "please fill out the field below"
        disableInputs()
    }
}

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    colorPickerBtn.style.background = color.toHEXA().toString()
})

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

//? create activator for vh tool
const vhTool = document.querySelectorAll(".vh-tool")
vhTool.forEach(tool => {
    tool.addEventListener("click" , () => {
        vhTool.forEach(allTool => {
            allTool.classList.value === tool.className ?
                allTool.classList.add("active")
            : allTool.classList.remove("active")
        })
    })
})

window.addEventListener("load", disableInputs)
elemClassName.addEventListener("keyup", checkInputs)