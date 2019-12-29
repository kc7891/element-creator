window.onload = () => {
    const elementCreator = new ElementCreator()
    const elementRoot = document.querySelector('#root')

    const button = () => {
        return {
            type: 'button',
            options: {
                innerText: 'button',
                onclick: () => console.log('test')
            }
        }
    }

    const div = ( {options, children} ) => {
        return {
            type: 'div',
            options,
            children
        }
    }

    const inputText = ( {options} ) => {
        return {
            type: 'input',
            options: {
                type: 'text',
                ...options
            }
        }
    }

    elementCreator.createElement(elementRoot, {
        type: 'div',
        options: {
            innerText: 'parent'
        },
        children: [
            button(),
            div({ 
                options: {
                    innerText: 'child',
                    style: 'background-color: pink;',
                },
                children: [
                    inputText({
                        options: {
                            onkeydown: (e) => console.log(e.currentTarget.value)
                        },

                    })
                ]
            }),
        ]
    })
}