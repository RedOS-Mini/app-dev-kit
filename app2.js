
/* @red-file-start */
// Required boilerplate. If you remove or modify this you won't get type definitions and your app may not build correctly!
require("./development/types");
const dev_AL = require("./development/types"); // dev environment aliases.
require("@turbowarp/types/types/scratch-vm-extension"); // While you do get typing for this, you can't actually use any of the functions here!
/* @red-init-end */

// While this file may be open source, if you are on a different OS Wars Mini team you can't use this code in your project!
dev_AL.backend.mkdir("/system/apps/local")
dev_AL.backend.writeFile("/system/apps/local/test.json", {
    "name": "aaaitguihrtguihrtgafreaky find ethan simulator 2024 ultimate gold plus",
    "thumbnail": "https://i.ibb.co/XJkjvpg/find-ethan.jpg",
    "description": "stick yadssddsour gyatt out for the rizzler 2",
    "data": {
        "code": "console.log('yay');",
        "desktopIcon": "https://i.ibb.co/XJkjvpg/find-ethan.jpg",
        "name": "f123123auck2222",
        "id": "shdasdikt22323123"
    }
})

console.log("Example test app");
const windowId = dev_AL.windowId;

async function fetchAPI(url) {
    const f = await fetch(url, {
        headers: {
            "ngrok-skip-browser-warning": true
        }
    })
    return await f.json()
}

/**
 * @typedef AppListing
 * @property {String} id
 * @property {String} name
 * @property {Date} time
 * @property {URL} thumbnail
 * @property {String} description
 * @property {String} author
 */
/**
 * @type {Array<AppListing>}
 */
let list = await fetchAPI("https://thankful-bass-caring.ngrok-free.app/list")
list = list.list
//list = list.concat(list).concat(list).concat(list)
let appButtons = []

function clmp(a,b,c) {
    return Math.min(Math.max(a,b),c)
}

function prect(x1,y1,x2,y2,x,y) {
    return clmp(x,x1,x2) === x && clmp(y,y1,y2) === y
}

/**
 * @type {"home" | "app" | "login" | "logout" | "create" | "projects" | "upload"}
 */
let state = "home"
let viewApp = {}
let isInstalled = false
let accountFlyout = false
let loginToken = "906c7b5bcfcb35819a803c56098a1026559c674e7622dd2dae0c48e25bffe6f9" // undefined
let username = "derpygamer2142" // undefined
let editingField1 = false
let field1Content = ""
let editingField2 = false
let field2Content = ""
let loading = false
let err = null
let userData = null
let lastState = "home"

const backButton = new dev_AL.backend.Button(250,-180,320,-140,3,224, 132, 126,1,windowId,dev_AL.backend,() => {
    state = "home"
    userData = null
    scrollY = 0
}, () => {})
const downloadButton = new dev_AL.backend.Button(-280,-15,-200,30,5,98, 209, 133,1,windowId,dev_AL.backend,() => {
    dev_AL.backend.loadApp(viewApp.data)
    console.log(dev_AL.backend.ls("/system/apps"))
    isInstalled = true
}, () => {})
const accountButton = new dev_AL.backend.Button(-320,-180,-320 + 45, -180 + 45, 3, 201, 201, 201, 1, windowId, dev_AL.backend, () => {
    accountFlyout = !accountFlyout
    console.log("doot")
}, () => {
})

const uploadButton = new dev_AL.backend.Button(260,150,320,180,3,54, 184, 28,1,windowId,dev_AL.backend,() => {
    console.log("upload")
    state = "upload"
},() => {})


const fieldInButton1 = new dev_AL.backend.Button(-100,35,100,80,3,186, 186, 186,1,windowId,dev_AL.backend,() => {
    editingField1 = true
}, () => {})

const fieldInButton2 = new dev_AL.backend.Button(-100,35 - 95,100,80 - 95,3,186, 186, 186,1,windowId,dev_AL.backend,() => {
    editingField2 = true
}, () => {})

const ydown = -35

const accountFlyout1 = new dev_AL.backend.Button(-270, -115 + ydown, -320 + 45 + 75, -95 + ydown, 3, 191, 191, 191, 1, windowId, dev_AL.backend, () => {
    console.log("button 1")
    field1Content = ""
    field2Content = ""
    err = null
    if (!loginToken) {
        // login button functionality
        state = "login"
    }
    else {
        state = "projects"
        tryRefreshData()
    }
}, () => {})

const accountFlyout2 = new dev_AL.backend.Button(-270, -140 + ydown, -320 + 45 + 75, -120 + ydown, 3, 191, 191, 191, 1, windowId, dev_AL.backend, () => {
    field2Content = ""
    if (!loginToken) {
        // creat account functionality
        state = "create"
    }
    else {
        state = "logout"
    }
},() => {})

let isWidget = false
const widgetButton = new dev_AL.backend.Button(-100,-50,100,0,3,23, 176, 64,1,windowId,dev_AL.backend,() => {
    isWidget = !isWidget
},()=>{})



const fieldEnterButton = new dev_AL.backend.Button(-80,35 - 175,80,80 - 175,3,72, 201, 46,1,windowId,dev_AL.backend,() => {
    if (state === "create") {
        loading = true
        fetch("https://thankful-bass-caring.ngrok-free.app/newaccount", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: field1Content,
                password: field2Content
            }),
            method: "POST"
        }).then((response) => {
            if (response.ok) {
                response.json().then((value) => {
                    loginToken = value.token
                    username = field1Content
                    loading = false
                    state = "home"
                })
            }
            else {
                response.json().then((value) => {
                    err = {
                        time: Date.now(),
                        message: value.error,
                        code: response.status
                    }
                    console.error(err)
                })
            }
        })
    }
    else if (state === "login") {
        loading = true
        fetch("https://thankful-bass-caring.ngrok-free.app/login", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: field1Content,
                password: field2Content
            }),
            method: "POST"
        }).then((response) => {
            if (response.ok) {
                response.json().then((value) => {
                    loginToken = value.token
                    username = field1Content
                    loading = false
                    state = "home"
                })
            }
            else {
                response.json().then((value) => {
                    err = {
                        time: Date.now(),
                        message: value.error,
                        code: response.status
                    }
                    console.error(err)
                })
            }
        })
    }
    else if (state === "upload") {
        let toUpload = dev_AL.backend.readFile("/system/apps/local/" + field1Content)
        console.log("/system/apps/local/" + field1Content)
        console.log(dev_AL.backend.fs)
        if (typeof toUpload !== "object") {
            try {
                toUpload = JSON.parse(toUpload)
            }
            catch {
                toUpload = undefined
            }
        }

        if ((!toUpload) || typeof toUpload !== "object") {
            err = {
                time: Date.now(),
                message: "Invalid path! Path must lead to a file of data type object, include full file name.",
                code: 404
            }
            console.error(err)
            return
        }
        if (
            !(typeof toUpload.name === "string" &&
            typeof toUpload.data === "object" &&
            typeof toUpload.thumbnail === "string" && 
            typeof toUpload.description === "string")
        ) {
            err = {
                time: Date.now(),
                message: "Invalid or missing properties in app json!",
                code: 400
            }
            return
        }
        const f = list.find((a) => a.name === toUpload.name)
        if (f) {
            fetch("https://thankful-bass-caring.ngrok-free.app/updateapp",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: loginToken,
                    id: a.id,
                    data: toUpload.data
                })
            }).then((response) => {
                if (response.ok) {
                    state = "projects" // should be uploaded
                    tryRefreshData()
                    reset()
                }
                else {
                    switch (response.status) {
                        case 401: {
                            err = {
                                time: Date.now(),
                                message: "Login expired",
                                code: 401
                            }
                            console.error(err)
                            state = "home"
                            break;
                        }
                        case 404: {
                            err = {
                                time: Date.now(),
                                message: "Someone logged into your account somewhere else",
                                code: 404
                            }
                            console.error(err)
                            state = "home"
                            break;
                        }
                        default: {
                            response.json().then((value) => {
                                err = {
                                    time: Date.now(),
                                    message: value.error,
                                    code: response.status
                                }
                                console.error(err)
                                state = "home"
                            })
                            
                        }
                        // there's another 404 and 401 respectively, but they shouldn't be encountered here so it's unnecessary
                    }
                }
            })
        }
        else {
            fetch("https://thankful-bass-caring.ngrok-free.app/add",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    token: loginToken,
                    name: toUpload.name,
                    thumbnail: toUpload.thumbnail,
                    description: toUpload.description,
                    data: toUpload.data,
                    type: isWidget ? "widget" : "app"
                })
            }).then((response) => {
                    if (response.ok) {
                        state = "projects"
                        tryRefreshData()
                        reset()
                    }
                    else {
                        switch (response.status) {
                            case 401: {
                                err = {
                                    time: Date.now(),
                                    message: "Login expired",
                                    code: 401
                                }
                                state = "home"
                                break;
                            }
                            case 404: {
                                err = {
                                    time: Date.now(),
                                    message: "Someone logged into your account somewhere else",
                                    code: 404
                                }
                                state = "home"
                                break;
                            }
                            case 429: {
                                err = {
                                    time: Date.now(),
                                    message: "You can only post an app every 5 minutes!",
                                    code: 429
                                }
                                state = "home"
                                break;
                            }
                        }
                    }
                })
        }
    }
}, () => {})

document.addEventListener("keydown", (e) => {
    let oldText = editingField1 ? field1Content : (editingField2 ? field2Content : "")

    if (e.key === "Backspace") {
        oldText = oldText.slice(0,oldText.length - 1)
    }
    else if (e.key.length <= 1) {
        oldText += e.key
    }

    if (editingField1) field1Content = oldText
    else if (editingField2) field2Content = oldText
})


function tryRefreshData() {
    fetch("https://thankful-bass-caring.ngrok-free.app/userdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: loginToken
        })
    }).then((response) => {
        response.json().then((data) => {
            if (response.ok) {
                userData = data.data
            }
            else {
                // if (response.status === 401) { // we shouldn't get a 404 so why both adding functionality to it
                    
                // }
                loginToken = undefined
                username = undefined
                state = "home"
                err = {
                    err: "Logged out",
                    time: Date.now(),
                    code: -1
                }
                console.warn("logged out")
            }
        })
    })
}




// const accountFlyout0 = new dev_AL.backend.Button(-270, -90 + ydown, -320 + 45 + 75, -70 + ydown, 3, 191, 191, 191, 1, windowId, dev_AL.backend, () => {
//     
// },() => {})




console.log(list)

list.forEach( async (a) => {
    await dev_AL.backend.loadImage(a.thumbnail,a.id,windowId)
    appButtons.push(new dev_AL.backend.Button(-320/4,-180/4,320/4,180/4,0,0,0,0,1,windowId,dev_AL.backend,async () => {
        state = "app"
        console.log(a.id)
        let f = await fetch("https://thankful-bass-caring.ngrok-free.app/app", {
            body: JSON.stringify({
                name: a.id
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        viewApp = (await f.json()).app
        isInstalled = dev_AL.backend.ls("system/apps").includes(viewApp.data.id)
        console.log(viewApp)
    }, () => {}))
})

async function reset() {
    list = await fetchAPI("https://thankful-bass-caring.ngrok-free.app/list")
     list = list.list

    list.forEach(async (a,i) => {
        await dev_AL.backend.loadImage(a.thumbnail,a.id,windowId)
        appButtons = []
        appButtons.push(new dev_AL.backend.Button(-320/4,-180/4,320/4,180/4,0,0,0,0,1,windowId,dev_AL.backend,async () => {
            state = "app"
            console.log(a.id)
            let f = await fetch("https://thankful-bass-caring.ngrok-free.app/app", {
                body: JSON.stringify({
                    name: a.id
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            viewApp = (await f.json()).app
            isInstalled = dev_AL.backend.ls("system/apps").includes(viewApp.data.id)
            console.log(viewApp)
        }, () => {}))
    })
    

}
await dev_AL.backend.loadImage("https://i.ibb.co/5RYXSJd/person-150dp-000000-FILL0-wght400-GRAD0-opsz48.png","account",windowId)
await dev_AL.backend.loadImage("https://i.ibb.co/h9YJqW5/upload-2-100dp-E8-EAED-FILL0-wght400-GRAD0-opsz48.png","upload",windowId)

let scrollY = 0
document.addEventListener("wheel", (e) => {
    scrollY += e.deltaY/8
    
    scrollY = Math.max(scrollY, 0)
})



dev_AL.backend.onEvent("tick",async () => {
    dev_AL.backend.clearShapes(dev_AL.windowId
    );

    if (state !== lastState) {
        tryRefreshData()
        field1Content = ""
        field2Content = ""
    }

    if (state === "home") {
        dev_AL.backend.drawCircle(0,Math.sin(Date.now() / 100) * 50,100,255,0,0,255,dev_AL.windowId);
        let xOff = -1
        let yOff = 0

        list.forEach((a, i) => {
            const w = 640/4
            const h = 360/4
            const x = xOff * 185
            const y = ((yOff * 100) + 100) + scrollY
            appButtons[i].x1 = x - w/2
            appButtons[i].y1 = y - h/2
            appButtons[i].x2 = x + w/2
            appButtons[i].y2 = y + h/2
            // console.log(appButtons[i].x1,
            //     appButtons[i].y1,
            //     appButtons[i].x2,
            //     appButtons[i].y2)
            appButtons[i].update()
            dev_AL.backend.drawRect(x - (w/2 + 2.5),y - (h/2 + 2.5),x + (w/2 + 2.5),y + (h/2 + 2.5),3,0,0,0,1,windowId)
            dev_AL.backend.drawImage(a.id,x,y,w,h,windowId);
            dev_AL.backend.drawText(a.name,x,y - (h*0.4),255,0,0,1,25,1,true,"center",w,windowId)
            xOff++
            if (xOff > 1) {
                xOff = -1
                yOff--
            }
        })

        let hw = 45
        let hh = 45
        accountButton.update()
        accountFlyout = prect(-320,-180,-320+hw+100,-75,accountButton.mx,accountButton.my) && accountFlyout
        if (accountFlyout) {
            dev_AL.backend.drawRect(-320 + hw,-180,-320 + hw + 80,-90,2,161, 161, 161,1,windowId)
            //if (!loginToken) accountFlyout0.update()
            accountFlyout1.update()
            accountFlyout2.update()
            // 191, 191, 191
            accountFlyout1.r = 191*(accountFlyout1.held ? 0.9 : 1)
            accountFlyout1.g = 191*(accountFlyout1.held ? 0.9 : 1)
            accountFlyout1.b = 191*(accountFlyout1.held ? 0.9 : 1)

            accountFlyout2.r = 191*(accountFlyout2.held ? 0.9 : 1)
            accountFlyout2.g = 191*(accountFlyout2.held ? 0.9 : 1)
            accountFlyout2.b = 191*(accountFlyout2.held ? 0.9 : 1)

            /*(if (!loginToken) {
                accountFlyout0.render()
                dev_AL.backend.drawText("Your apps",-235,(-115 + -95 - 25)/2,0,0,0,1,20,1,false,"center",100,windowId)
            }*/
            
            accountFlyout1.render()
            dev_AL.backend.drawText(!loginToken ? "Login" : "Account",-235,(-115 + -95 + ydown + ydown)/2,0,0,0,1,20,1,false,"center",100,windowId)
            accountFlyout2.render()
            dev_AL.backend.drawText(!loginToken ? "Create" : "Logout",-235,(-115 + -95 + ydown + ydown)/2 - 25,0,0,0,1,20,1,false,"center",100,windowId)
            

            if (loginToken) dev_AL.backend.drawText(username,-235,(-115 + -45 + ydown)/2,0,0,0,1,17.5,1,true,"center",80,windowId)
        }
        accountButton.r = 201*(accountButton.held ? 0.9 : 1)
        accountButton.g = 201*(accountButton.held ? 0.9 : 1)
        accountButton.b = 201*(accountButton.held ? 0.9 : 1)
        
        accountButton.render()

        dev_AL.backend.drawImage("account",-320 + (hw/2),-180 + (hh/2),hw,hh,windowId)
       
        if (err) {
            dev_AL.backend.drawText(err.message,0,-160,255,0,0,1,35,1,true,"center",300,windowId)
            if (Date.now() - err.time > 7500) {
                err = null
            }
        }
    } 
    else if (state === "app") {
        dev_AL.backend.drawImage(viewApp.id,160,90,640/2,360/2,windowId)
        dev_AL.backend.drawRect(-320,-180,320,180,0,0,0,0,0.6,windowId)

        dev_AL.backend.drawText(viewApp.name,-300,140,255,255,255,1,55,1,true,"left",200,windowId)

        dev_AL.backend.drawText("By @" + viewApp.author,-300,110,132, 173, 240,1,35,1,true,"left",200,windowId)

        dev_AL.backend.drawText("Last updated " + viewApp.time,-300,90,185, 235, 228,1,25,1,false,"left",200,windowId)

        dev_AL.backend.drawText(viewApp.id,-300,80,185, 235, 228,1,10,1,false,"left",200,windowId)

        dev_AL.backend.drawText(viewApp.description,-300,60,255,255,255,1,15,1,false,"left",200,windowId)

        dev_AL.backend.drawText(isInstalled ? "Installed" : "Not installed",-185,140,93, 195, 199,1,25,1,true,"left",200,windowId)




        downloadButton.update()
        downloadButton.r = 98*(downloadButton.held ? 0.8 : 1)
        downloadButton.g = 209*(downloadButton.held ? 0.8 : 1)
        downloadButton.b = 133*(downloadButton.held ? 0.8 : 1)
        downloadButton.render()
        dev_AL.backend.drawText("Download",-240,7.5,0,0,0,1,25,1,true,"center",80,windowId)
    }
    else if (state === "login") {
        dev_AL.backend.drawText("Login",0,130,0,0,0,1,55,1,true,"center",1000,windowId)
        dev_AL.backend.drawText("Username:",0,100,0,0,0,1,40,1,true,"center",1000,windowId)
        dev_AL.backend.drawText("Password:",0,100 - 95,0,0,0,1,40,1,true,"center",1000,windowId)
        
        fieldInButton1.update()
        fieldInButton2.update()
        fieldEnterButton.update()

        if (!fieldInButton1.hover  && fieldInButton1.lastMouse) editingField1 = false
        if (!fieldInButton2.hover  && fieldInButton2.lastMouse) editingField2 = false

        dev_AL.backend.drawRect(-102.5,32.5,102.5,82.5,3,135, 135, 135,1,windowId)
        dev_AL.backend.drawRect(-102.5,32.5 - 95,102.5,82.5 - 95,3,135, 135, 135,1,windowId)
        dev_AL.backend.drawRect(fieldEnterButton.x1 - 2.5,fieldEnterButton.y1 - 2.5,fieldEnterButton.x2 + 2.5,fieldEnterButton.y2 + 2.5,3,41, 125, 24,1,windowId)

        fieldInButton1.r = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.g = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.b = 186*(editingField1 ? 0.9 : 1)
        fieldInButton2.r = 186*(editingField2 ? 0.9 : 1)
        fieldInButton2.g = 186*(editingField2 ? 0.9 : 1)
        fieldInButton2.b = 186*(editingField2 ? 0.9 : 1)

        fieldInButton2.render()
        fieldInButton1.render()
        fieldEnterButton.render()
        //dev_AL.backend.drawRect(-100,35,100,80,3,186, 186, 186,1,windowId)
        dev_AL.backend.drawText(field1Content, -90,57.5,0,0,0,1,35,1,false,"left",180,windowId)
        dev_AL.backend.drawText(field2Content, -90,57.5 - 95,0,0,0,1,35,1,false,"left",180,windowId)
        dev_AL.backend.drawText("Login", 0,57.5 - 175,0,0,0,1,35,1,false,"center",180,windowId)

        if (err) {
            console.log(err.message)
            dev_AL.backend.drawText(err.message,0,-160,255,0,0,1,35,1,true,"center",300,windowId)
            if (Date.now() - err.time > 7500) {
                err = null
            }
        }
    }




    else if (state === "create") {
        dev_AL.backend.drawText("Create",0,130,0,0,0,1,55,1,true,"center",1000,windowId)
        dev_AL.backend.drawText("Username:",0,100,0,0,0,1,40,1,true,"center",1000,windowId)
        dev_AL.backend.drawText("Password:",0,100 - 95,0,0,0,1,40,1,true,"center",1000,windowId)
        
        fieldInButton1.update()
        fieldInButton2.update()
        fieldEnterButton.update()

        if (!fieldInButton1.hover  && fieldInButton1.lastMouse) editingField1 = false
        if (!fieldInButton2.hover  && fieldInButton2.lastMouse) editingField2 = false

        dev_AL.backend.drawRect(-102.5,32.5,102.5,82.5,3,135, 135, 135,1,windowId)
        dev_AL.backend.drawRect(-102.5,32.5 - 95,102.5,82.5 - 95,3,135, 135, 135,1,windowId)
        dev_AL.backend.drawRect(fieldEnterButton.x1 - 2.5,fieldEnterButton.y1 - 2.5,fieldEnterButton.x2 + 2.5,fieldEnterButton.y2 + 2.5,3,41, 125, 24,1,windowId)

        fieldInButton1.r = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.g = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.b = 186*(editingField1 ? 0.9 : 1)
        fieldInButton2.r = 186*(editingField2 ? 0.9 : 1)
        fieldInButton2.g = 186*(editingField2 ? 0.9 : 1)
        fieldInButton2.b = 186*(editingField2 ? 0.9 : 1)
        fieldInButton1.y1 = 35
        fieldInButton1.y2 = 80


        fieldInButton2.render()
        fieldInButton1.render()
        fieldEnterButton.render()
        //dev_AL.backend.drawRect(-100,35,100,80,3,186, 186, 186,1,windowId)
        dev_AL.backend.drawText(field1Content, -90,57.5,0,0,0,1,35,1,false,"left",180,windowId)
        dev_AL.backend.drawText(field2Content, -90,57.5 - 95,0,0,0,1,35,1,false,"left",180,windowId)
        dev_AL.backend.drawText("Create", 0,57.5 - 175,0,0,0,1,35,1,false,"center",180,windowId)

        if (err) {
            dev_AL.backend.drawText(err.message,0,-160,255,0,0,1,35,1,true,"center",300,windowId)
            if (Date.now() - err.time > 7500) {
                err = null
            }
        }
    }

    else if (state === "logout") {
        loginToken = undefined
        state = "home"
        accountFlyout = false
    }

    else if (state === "projects") {
        dev_AL.backend.drawText("Your account",0, 150,0,0,0,1,35,1,true,"center",200,windowId)

        let xOff = -1
        let yOff = 0
        Object.values(userData.apps).forEach((a) => {
            const w = 640/4
            const h = 360/4
            const x = xOff * 185
            const y = ((yOff * 100) + 60) + scrollY 
            dev_AL.backend.drawRect(x - (w/2 + 2.5),y - (h/2 + 2.5),x + (w/2 + 2.5),y + (h/2 + 2.5),3,0,0,0,1,windowId)
            dev_AL.backend.drawImage(a.id,x,y,w,h,windowId);
            dev_AL.backend.drawText(a.name,x,y - (h*0.4),255,0,0,1,25,1,true,"center",w,windowId)
            xOff++
            if (xOff > 1) {
                xOff = -1
                yOff--
            }
        })

        uploadButton.update()

        uploadButton.render()
        dev_AL.backend.drawImage("upload",290,165,25,25,windowId) // 260,150,320,180
    }

    else if (state === "upload") {
        fieldInButton1.update()
        //fieldInButton2.update()
        fieldEnterButton.update()
        widgetButton.update()

        if (!fieldInButton1.hover  && fieldInButton1.lastMouse) editingField1 = false
        //if (!fieldInButton2.hover  && fieldInButton2.lastMouse) editingField2 = false

        if (isWidget) {
            // 23, 176, 64
            widgetButton.r = 23 // * (widgetButton.hover && widgetButton.lastMouse ? 0.9 : 1)
            widgetButton.g = 176
            widgetButton.b = 64
        }
        else {
            // 23, 125, 176
            widgetButton.r = 23
            widgetButton.g = 125
            widgetButton.b = 176
        }

        dev_AL.backend.drawRect(fieldInButton1.x1 - 2.5,fieldInButton1.y1 - 2.5,fieldInButton1.x2 + 2.5,fieldInButton1.y2 + 2.5,3,135, 135, 135,1,windowId)
        //dev_AL.backend.drawRect(fieldInButton2.x1 - 2.5,fieldInButton2.y1 - 2.5,fieldInButton2.x2 + 2.5,fieldInButton2.y2 + 2.5,3,135, 135, 135,1,windowId)
        dev_AL.backend.drawRect(widgetButton.x1 - 2.5,widgetButton.y1 - 2.5,widgetButton.x2 + 2.5,widgetButton.y2 + 2.5,3,widgetButton.r*0.8,widgetButton.g*0.8,widgetButton.b*0.8,1,windowId)
        dev_AL.backend.drawRect(fieldEnterButton.x1 - 2.5,fieldEnterButton.y1 - 2.5,fieldEnterButton.x2 + 2.5,fieldEnterButton.y2 + 2.5,3,41, 125, 24,1,windowId)

        fieldInButton1.r = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.g = 186*(editingField1 ? 0.9 : 1)
        fieldInButton1.b = 186*(editingField1 ? 0.9 : 1)
        // fieldInButton2.r = 186*(editingField1 ? 0.9 : 1)
        // fieldInButton2.g = 186*(editingField1 ? 0.9 : 1)
        // fieldInButton2.b = 186*(editingField1 ? 0.9 : 1)
        // fieldInButton1.y1 = 35 + 15
        // fieldInButton1.y2 = 80 + 15


        fieldInButton1.render()
        fieldEnterButton.render()
        widgetButton.render()
        dev_AL.backend.drawText(field1Content, -90,(fieldInButton1.y1+fieldInButton1.y2)/2,0,0,0,1,35,1,false,"left",180,windowId)
        //dev_AL.backend.drawText(field2Content, -90,57.5 + 15,0,0,0,1,35,1,false,"left",180,windowId)
        dev_AL.backend.drawText("App type: " + (isWidget ? "widget" : "app"),0,(widgetButton.y1+widgetButton.y2) / 2,0,0,0,1,35,1,false,"center",200,windowId)

        dev_AL.backend.drawText("File name in /system/apps/local",0,115,0,0,0,1,35,1,false,"center",300,windowId)
        dev_AL.backend.drawText("Upload",0,(fieldEnterButton.y1+fieldEnterButton.y2)/2,0,0,0,1,35,1,false,"center",200,windowId)
        /* 
        note to self:
        local app file will contain 
        name(displayed on the desktop, different from the othe name)
        (the path will contain the app type, will either be in system/apps/widgets or system/apps)
        code
        desktop icon
        an id which will be used in the app's code, but nowhere else

        full app file will contain all of the above
        author username
        thumbnail(only for the app store)
        description(only for the app store)
        name(only for the app store)
        most recent upload time
        */
        //dev_AL.backend.drawText("File name in /system/apps/local",0,115,0,0,0,1,35,1,false,"center",300,windowId)

        if (err) {
            dev_AL.backend.drawText(err.message,100,0,255,0,0,1,35,1,true,"left",200,windowId)
            if (Date.now() - err.time > 5000) {
                err = null
            }
        }
    }


    if (state !== "home") {
        backButton.update()
        backButton.render()// doesn't need color changing because you'll just get redirected
        dev_AL.backend.drawText("Back",285,-165.5,0,0,0,1,25,1,true,"center",200,windowId) 
    }

    lastState = state
        
},dev_AL.windowId);