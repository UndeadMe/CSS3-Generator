let toolBoxes = document.querySelectorAll(".tool-box")
toolBoxes.forEach(box => {
    box.addEventListener("mousemove" , (e) => {
        let targetWidth = getComputedStyle(box).width.substr(0, getComputedStyle(box).width.length - 2)
        let targetHeight = getComputedStyle(box).height.substr(0, getComputedStyle(box).height.length - 2)
        
        mouseX = e.offsetX / targetWidth
        mouseY = e.offsetY / targetHeight

        box.style.transform = `rotateY(${mouseX * 30}deg) rotateX(${mouseY * -30}deg) translateX(${mouseX * -40}px) translateY(${mouseY * -40}px)`

    })
    box.addEventListener("mouseleave" , (e) => {
        box.style.transform = `rotateY(0deg) rotateX(0deg) translateX(0px) translateY(0px)`
    })
})