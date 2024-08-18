const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()

const port = 8567

app.get('/', (req, res) => {
    let startTime = Date.now()
    const actualStart = startTime
    let htmlapp = fs.readFileSync(path.resolve("./development/app.html"),"utf-8")
    let app = fs.readFileSync(path.resolve("./app.js"),"utf-8")
    let types = fs.readFileSync(path.resolve("./development/types.js"),"utf-8")
    console.log(`Fetched files in ${Date.now() - startTime}ms`)
    startTime = Date.now()
    types = types.replace("/* @red-module-exp */module.exports = /* @red-module-exp-end */","const dev_AL = ")
    const appStart = app.indexOf("/* @red-file-start */")
    const appInitEnd = app.indexOf("/* @red-init-end */")
    app = app.slice(0,appStart - 1) + app.slice(appInitEnd+1 + "/* @red-init-end */".length, app.length)
    app = types + app
    htmlapp = htmlapp.replace("//app",app)
    console.log(`Compiled text in ${Date.now() - startTime}ms`)
    startTime = Date.now()
    res.contentType = "text/html"
    res.send(htmlapp)
    console.log(`Finished constructing testing app in ${Date.now() - startTime}ms`)
})
  
app.listen(port, () => {
    console.log(`RedOS app development server listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})