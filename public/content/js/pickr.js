const colorPickerBtn = document.querySelector(".color-picker")
//? color picker
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic',
    useAsButton : true ,
    components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
            hex: true,
            rgba: true,
            input: true,
        }
    }
});
pickr.on('change', (color) => {
    colorPickerBtn.style.background = `${color.toHEXA().toString()}`
})