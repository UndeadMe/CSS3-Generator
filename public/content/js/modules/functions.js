//? disable all inputs function
export const disableAllInputs = (activate, elementsActivate, elements) => {
    if (activate) 
        elementsActivate.forEach(element => document.querySelector(`.${element}`).disabled = true)
    else
        elements.forEach(element => document.querySelector(`.${element}`).disabled = true)
}

//? active all inputs
export const activeAllInputs = (activate, elementsActivate, elements) => {
    if (activate)
        elementsActivate.forEach(element => document.querySelector(`.${element}`).disabled = false)
    else 
        elements.forEach(element => document.querySelector(`.${element}`).disabled = false)
}

//? remove translate data from inputs
export const removeDataFromInputs = (activate, elementsActivate, elements) => {
    if (activate) 
        elementsActivate.forEach(element => document.querySelector(`.${element}`).value = "")
    else 
        elements.forEach(element => document.querySelector(`.${element}`).value = "")
}

//? upload data in inputs
export const uploadDataInInputs = (activate , elementsActivate, elements, val) => {
    if (activate) {
        elementsActivate.forEach(element => document.querySelector(`.${element}`).value = val)
    } else 
        elements.forEach(element => document.querySelector(`.${element}`).value = val)
}

//? create data box
export const createDataBox = (activate = false , className , text , switchToBox) => {
    const dataBox = document.createElement("div")
    dataBox.className = className
    activate ? dataBox.classList.add("active") : dataBox.classList.remove("active")
    dataBox.innerHTML = text
    dataBox.addEventListener("click" , () => switchToBox(dataBox.innerHTML))
    return dataBox
}