import svgSprite from "./rollup-plugin-svg-sprite";
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        svgSprite({
            path: 'src/assets'
        })
    ]
}
