function elementCreator(parent, { type, params = {}, children = [] }) {
    const element = document.createElement(type)

    // apply params
    for ([key, value] of Object.entries(params)) {
        if (value !== undefined) element[key] = value
    }

    parent.appendChild(element)

    // create children
    children.forEach((child) => {
        child && elementCreator(element, child)
    })
}

window.onload = () => {
    const rootElement = document.querySelector('#root')

    const createButton = (label) => {
        return {
            type: 'button',
            params: {
                innerText: label,
                onclick: () => {
                    console.log('example')
                }
            }
        }
    }

    elementCreator(rootElement, {
        type: 'div',
        params: {
            style: 'background-color: pink; padding: 10px;',
            innerText: 'parent div'
        },
        children: [
            {
                type: 'div',
                params: {
                    style: 'background-color: yellow;',
                    innerText: 'child div'
                },
                children: [
                    createButton('button1'),
                    createButton('button2')
                ]
            }
        ]
    })

}