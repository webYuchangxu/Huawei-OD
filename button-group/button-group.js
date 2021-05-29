export class buttonGroup {
    /**
     * 按钮组配置参数
     * @param {object} config 
     */
    constructor(config) {
        if (!config.name) {
            console.error('必填参数name未配置')
            return
        }

        const nodeList = document.querySelectorAll('button-group');
        if (!nodeList.length) return {}

        let group = null;
        for (const el of nodeList) {
            if (config.name === el.getAttribute('data-name')) {
                group = el;
                break
            }
        }
        if (!group) return {}
        this.config = config;
        const NUM_10 = 10;
        const flag = Math.random().toFixed(NUM_10).toString().split('.')[1]
        const itemClass = `button-group-item-${flag}`
        const groupClass = `button-group-${flag}`
        const itemList = group.querySelectorAll('button-group-item')
        if (!itemList.length) return {}
        let itemStrList = ''
        for (const prop in itemList) {
            if (itemList.hasOwnProperty(prop))
                itemStrList += `<button class=${itemClass}>${config.title?.[prop] || itemList[prop].innerHTML || ''}</button>`
        }
        group.outerHTML = `<div class="${groupClass} ${config?.size || 'normal'}">${itemStrList}</div>`

        const elements = document.getElementsByClassName(`${groupClass}`)[0];
        this.childNodes = elements.childNodes
        elements.addEventListener('click', (e) => {
            const classList = e.target.classList
            if (classList.contains('disable')) return;
            if (!config.isMultiple) {
                // 单选处理
                let activeInd, disableInds = [];
                const childNodes = elements.childNodes
                for (let i = 0; i < childNodes.length; i++) {
                    if (childNodes[i].classList.contains('active')) activeInd = i;
                    if (childNodes[i].classList.contains('disable')) disableInds.push(i);
                }
                if (disableInds.includes(activeInd)) return
                for (const item of childNodes) {
                    if (item !== e.target) item.classList.remove('active')
                }
            }
            classList.toggle('active')
            config.handleClick && config.handleClick(e)
        })
        elements.addEventListener('contextmenu', (e) => {
            const classList = e.target.classList
            if (classList[0] === itemClass) {
                classList.toggle('disable')
                e.returnValue = false
            }
        })

    }
    getActiveItem() {
        let items = []
        for (let item of this.childNodes) {
            item.classList.contains('active') && items.push(item.innerHTML)
        }
        return items
    }
}
export function loadStyle() {
    const link = document.createElement('link')
    const head = document.getElementsByTagName('head')[0]
    link.rel = 'stylesheet';
    link.href = 'button-group/style.css';
    head.appendChild(link)
}