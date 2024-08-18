const fs = require("fs")
const path = require("path")
const terser = require("terser")

const replaceAt = function(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

let startTime = Date.now();
const actualStart = startTime
let app = fs.readFileSync(path.resolve("./app.js"),"utf-8")
console.log(`Fetched files in ${Date.now() - startTime}ms`)
startTime = Date.now()
const appStart = app.indexOf("/* @red-file-start */")
const appInitEnd = app.indexOf("/* @red-init-end */")

const aliases = `
const dev_AL = {
"backend": backend,
"windowId": windowId
};
`
app = aliases + "\n" + app.slice(0,appStart - 1) + app.slice(appInitEnd+1 + "/* @red-init-end */".length, app.length)

console.log(`Edited files in ${Date.now() - startTime}ms`)
startTime = Date.now()



const shouldMin = !process.argv.includes("--nominify")
if (shouldMin) {
    app = terser.minify_sync(app, {
        toplevel: true

    }).code

    console.log(`Minified in ${Date.now() - startTime}ms(You can disable this by using build -- --nominify instead of build)`)
}


fs.writeFileSync(path.resolve("./build.js"),app,"utf-8")




console.log(`Finished building in ${Date.now() - actualStart}ms. File is available at build.js.`)