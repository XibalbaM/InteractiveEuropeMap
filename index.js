
window.onload = function () {
    let countries = {
        "#c2d234": "France",
        "#49bea1": "Allemagne",
        "#fcd828": "Espagne",
        "#f9f027": "Portugale",
        "#6183c2": "Russie",
        "#fdb350": "Italie",
        "#d5c651": "Suisse",
        "#77b866": "Royaumes-Unis",
        "#84c665": "Irlande",
        "#90c2c9": "Pologne (la vraie)"
    }
    const realImageWidth = 520
    const realImageHeight = 520
    const image = document.querySelector('#image');
    const tooltip = document.querySelector('#tooltip');
    const tooltip_text = document.querySelector('#tooltip_text');

    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);


    function generateGetBoundingClientRect(x = 0, y = 0) {
        return () => ({
            width: 0,
            height: 0,
            top: y,
            right: x,
            bottom: y,
            left: x,
        });
    }

    const virtualElement = {
        getBoundingClientRect: generateGetBoundingClientRect(),
    };

    const popperInstance = Popper.createPopper(virtualElement, tooltip, {
        placement: 'top',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
    tooltip.removeAttribute('data-show');

    let currentColor = "";
    window.addEventListener("mousemove", (event) => {
        let boundings = image.getBoundingClientRect()
        if (event.clientX < boundings.right && event.clientX >= boundings.left && event.clientY < boundings.bottom && event.clientY >= boundings.top) {
            let x = Math.floor((event.clientX - boundings.left) / image.width * realImageWidth)
            let y = Math.floor((event.clientY - boundings.top) / image.height * realImageHeight)
            let color = canvas.getContext('2d').getImageData(x, y, 1, 1).data
            color = "#" + color[0].toString(16) + color[1].toString(16) + color[2].toString(16)
            if (color !== currentColor) {
                currentColor = color;
                if (countries[color]) {
                    tooltip_text.innerHTML = countries[color];
                    tooltip.setAttribute('data-show', '');
                } else {
                    tooltip.removeAttribute('data-show');
                }
            }
            if (tooltip.hasAttribute('data-show')) {
                virtualElement.getBoundingClientRect = generateGetBoundingClientRect(event.clientX, event.clientY);
                popperInstance.update();
            }
        }
    })

    window.addEventListener("mousedown", (event) => {
        let boundings = image.getBoundingClientRect()
        if (event.clientX < boundings.right && event.clientX >= boundings.left && event.clientY < boundings.bottom && event.clientY >= boundings.top) {
            let x = Math.floor((event.clientX - boundings.left) / image.width * realImageWidth)
            let y = Math.floor((event.clientY - boundings.top) / image.height * realImageHeight)
            let color = canvas.getContext('2d').getImageData(x, y, 1, 1).data
            color = "#" + color[0].toString(16) + color[1].toString(16) + color[2].toString(16)
            console.log(color)
            console.log(x, event.clientX, image.clientLeft)
            console.log(y, event.clientY, image.clientTop)
        }
    })
}