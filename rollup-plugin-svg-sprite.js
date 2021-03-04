import fs from 'fs'
import path from 'path'

export default function svgSprite(pluginOptions) {
    return {
        name: 'svg-sprite',
        buildStart(inputOptions) {
            const files = fs.readdirSync(pluginOptions.path).filter(file => path.extname(file) === '.svg').map(fileName => ({
                path: path.join(pluginOptions.path, fileName),
                fileName: path.basename(fileName, path.extname(fileName))
            }))
            const icons = files.map(file => {
                const str = fs.readFileSync(file.path, 'utf8')
                return sanitize(str)
                    .replace('<svg', `<symbol id="${file.fileName}"`)
                    .replace('</svg', '</symbol')
                    .replace(/[\r\n]+/g, '')
                    .replace(/[\t]+/g, ' ')
            })
            const result = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">` +
                icons.reduce((str, icon) => str = str + icon, '') + `</svg>`
            console.log(result)
        },
        resolveId(source) {
            return null
        },
        load(id) {
            return null
        }
    }
}

function sanitize(str) {
    const tags = ['version', 'id', 'xmlns', 'xmlns:xlink']
    return tags.reduce((acc, tag) => {
        const regEx = new RegExp(`\s?${tag}=["][^"]*"?`, 'gm')
        return acc.replace(regEx, '')
    }, str)
}