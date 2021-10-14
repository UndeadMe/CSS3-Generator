//? get elements
const elemClassNameInp = document.querySelector(".element-class-name-input")
const cssCodeBtn = document.querySelector(".css-code-btn")
const generateWrapBox = document.querySelector(".generate-wrap-box")
const text = document.querySelector(".text")
const transformBox = document.querySelector(".transform-box")
const transformMenuItems = document.querySelectorAll(".transform-menu-item-box")
const codePennel = document.querySelector(".code-pannel")
const styleInp = document.querySelector("#styleInp")
const copyToClipboard = document.querySelector(".clipboard-btn")
const cssCodeCloseBtn = document.querySelector(".close-generate-pannel-btn")

//? Transform object
let Transform = {
    elemClass: null,
    isInit: false,
    transform: "none"
}

const checkElemClassNameInput = (e) => {
    let regexCode = /^[a-zA-Z" "]{1,30}$/g
    let regexResult = regexCode.test(e.target.value)

    if (regexResult) {
        Transform.isInit = true
        Transform.elemClass = e.target.value.split(" ").join("-")
        e.target.parentElement.previousElementSibling.innerHTML = ""

        addStyleToText()
    } else {
        Transform.isInit = false
        e.target.parentElement.previousElementSibling.innerHTML = "Please complete the field below. You are allowed to enter up to 30 letters"
    }
}

//? add style to color box
const addStyleToText = () => 
    text.style.textTransform = `${Transform.transform}`

//? open generate pannel
const openGeneratePannel = () => {
    if (Transform.isInit) {
        generateWrapBox.classList.add("active")
        StyleText = `.${Transform.elemClass} { text-transform: ${Transform.transform}; }`
        codePennel.innerHTML = `.${Transform.elemClass} { <br>
            &nbsp;&nbsp;&nbsp; text-transform: ${Transform.transform}; <br>
        }`
    } else
        alert("please complete the field above")
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


//? check init
const checkInit = () => {
    return Transform.isInit ? true : false
}

//? active align box
const activeAlignBox = () => 
    transformBox.classList.contains("active") ? transformBox.classList.remove("active") : transformBox.classList.add("active")


elemClassNameInp.addEventListener("keyup", checkElemClassNameInput)
elemClassNameInp.addEventListener("focus", () => transformBox.classList.remove("active"))
cssCodeBtn.addEventListener("click", openGeneratePannel)
transformBox.addEventListener("click", () => checkInit() ? activeAlignBox() : alert("please complete the fields correctly"))
cssCodeCloseBtn.addEventListener("click", closeGeneratePannel)
copyToClipboard.addEventListener("click", copyToClipboardText)

transformMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => {
        transformMenuItems.forEach(allMenuItems => {
            if (allMenuItems.innerText === menuItem.innerText) {
                allMenuItems.classList.add('active')
                transformBox.children[0].innerText = allMenuItems.innerText
                Transform.transform = allMenuItems.innerText.toLowerCase()
                addStyleToText()
            } else
                allMenuItems.classList.remove("active")
        })
    })
})