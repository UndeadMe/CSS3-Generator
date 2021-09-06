import { createPickr } from "./pickr.js";

//? create pickr
let pickr = createPickr(".color-picker")
pickr.on('change', (color) => {
    const colorPickerBtn = document.querySelector(".color-picker")
    const resizableBox = document.querySelector(".resizable")
    
    colorPickerBtn.style.background = color.toHEXA().toString()
    resizableBox.style.background = color.toHEXA().toString()
})