
// While this file may be open source, if you are a member of a seperate OS Wars Mini team you can't use this code for the competition!

const canv = document.getElementById("canv")
const ctx = canv.getContext("2d")
canv.width = window.innerWidth
canv.height = window.innerHeight


let _scratchMouseX = 0
let _scratchMouseY = 0
document.addEventListener("mousemove",(e) => {
    _scratchMouseX = e.clientX
    _scratchMouseY = e.clientY
})

class _Rtc {
    constructor() {
        this.stageWidth = 640
        this.stageHeight = 360
    }


}

const runtime = new _Rtc()

/**
 * A window ID used by the backend
 * @typedef {String} WindowId
 */

/**
 * Backend class.
 */
class Backend {
    constructor() {
        this.windows = {}
        this.windowIds = []
        this.nextWindowIds = []

        this.events = {
            tick: []
        }

        this.fs = this.newDirPoint()

        
        this.mkdir("/system/apps")
        
        this.apps = {}

        this.mkdir("/system/settings")
        this.writeFile("/system/settings/settings.json",{
            ligma: "balls",
            skibidi: "ohio",
            aaa: "bbb"
        })

        this.settings = this.readFile("/system/settings/settings.json")
        this._devEnvImages = {}
        this.Button = class {
            /**
             * 
             * @param {Number} x1 Left
             * @param {Number} y1 Bottom
             * @param {Number} x2 Right
             * @param {Number} y2 Top
             * @param {Number} radius Rectangle bezel
             * @param {Number} r Red
             * @param {Number} g Green
             * @param {Number} b Blue
             * @param {Number} a Alpha. 0-1, unlike the rgb which is 0-255
             * @param {WindowId} id The window ID to draw to
             * @param {Backend} backend Backend object
             * @param {Function} onTrigger Function to be triggered when the button is clicked
             * @param {Function} offTrigger Function to be triggered after the button is released.
             */
            constructor(x1, y1, x2, y2, radius, r, g, b, a, id, backend, onTrigger, offTrigger) {
                this.x1 = x1
                this.y1 = y1
                this.x2 = x2
                this.y2 = y2
                this.radius = radius
                this.r = r
                this.g = g
                this.b = b
                this.a = a
                this.id = id

                this.backend = backend

                this.triggered = false
                this.onTrigger = onTrigger
                this.offTrigger = offTrigger

                this.lastMouse = false
            }
            /**
             * 
             * @param {Number} x Value to be converted.
             * @param {Number} wx  Absolute pos
             * @param {Number} ww Scale for value to be converted to
             * @param {Number} dim Scale x uses
             * @returns {Number}
             */
            toLocal(x, wx, ww, dim) {
                return wx + ((x / (runtime[dim] / 2)) * ww)
            }
            /**
             * Updates the button's trigger states and events as needed.
             */
            update(/*mouseX, mouseY, mouseDown*/) {
                const mouseX =  _scratchMouseX// vm.runtime.ioDevices["mouse"]._scratchX;
                const mouseY =  _scratchMouseY//vm.runtime.ioDevices["mouse"]._scratchY;
                const mouseDown = vm.runtime.ioDevices["mouse"]._isDown
                const t = ((clamp(mouseX, this.toLocal(this.x1, this.backend.windows[this.id].x, this.backend.windows[this.id].width, "stageWidth"), this.toLocal(this.x2, this.backend.windows[this.id].x, this.backend.windows[this.id].width, "stageWidth")) === mouseX) && (clamp(mouseY,this.toLocal(this.y1, this.backend.windows[this.id].y, this.backend.windows[this.id].height, "stageHeight"),this.toLocal(this.y2, this.backend.windows[this.id].y, this.backend.windows[this.id].height, "stageHeight")) === mouseY) && mouseDown && !this.lastMouse && !this.triggered)
                if (t) {
                    this.onTrigger(this)
                    this.triggered = true
                }
                else if (!t && this.triggered) {
                    this.offTrigger(this)
                    this.triggered = false
                }
                else {
                    this.triggered = false
                }

                this.lastMouse = mouseDown
            }
            /**
             * Renders the button.
             */
            render() {
                this.backend.drawRect(this.x1, this.y1, this.x2, this.y2, this.radius, this.r, this.g, this.b, this.a, this.id)
            }
        }
    }
    /**
     * Creates a new window
     * @param {Number} x X position
     * @param {Number} y Y position
     * @param {Number} width Window width
     * @param {Number} height Window height
     * @param {String | undefined} id Window ID to use, if undefined one will be created
     * @returns {WindowId} The ID of the window that was created
     */
    newWindow(x, y, width, height, id) {
        if (typeof id === "undefined") {
            let testid = 0
            while (Object.prototype.hasOwnProperty.call(this.windows, testid)) {
                testid += 1
            }
            id = String(testid)
        }
        this.windows[id] = {
            x: x,
            y: y,
            width: width,
            height: height,
            contents: [],
            commands: [],
            id: id,
            held: false,
            sizing: false,
            minimized: false,
            maximized: false,
            oldw: -1,
            oldh: -1
        }
        this.windowIds.unshift(id)
        //this.nextWindowIds = this.windowIds.slice()

        return id
    }
    /**
     * Resizes a window
     * @param {Number} dw Change in width
     * @param {Number} dh Change in height
     * @param {WindowId} id Window to change
     */
    resizeWindow(dw, dh, id) {
        this.windows[id].x += dw/2
        this.windows[id].y += dh/2

        this.windows[id].width += dw
        this.windows[id].height -= dh

        if (this.windows[id].width < 320) {
            this.windows[id].x += (320 - this.windows[id].width) / 2
            this.windows[id].width = 320
        }
        if (this.windows[id].height < 180) {
            this.windows[id].y -= (180 - this.windows[id].height) / 2
            this.windows[id].height = 180
        }
        // this.windows[id].width = Math.max(this.windows[id].width, 320)
        // this.windows[id].height = Math.max(this.windows[id].height, 180)
    }
    /**
     * Move a window
     * @param {Number} dx Change in x position
     * @param {Number} dy Change in y position
     * @param {WindowId} id Window to move
     */
    moveWindow(dx, dy, id) {
        this.windows[id].x += dx
        this.windows[id].y += dy
    }

    /**
     * Draws a circle on the window.
     * @param {Number} x X position
     * @param {Number} y Y position
     * @param {Number} radius Radius
     * @param {Number} r Red
     * @param {Number} g Green
     * @param {Number} b Blue
     * @param {Number} a Alpha
     * @param {WindowId} id Window to draw the circle on
     */
    drawCircle(x, y, radius, r, g, b, a, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "CIRCLE",
            9,
            x,
            y,
            radius,
            r,
            g,
            b,
            a
        ])

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.beginPath();
        ctx.arc(((x / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, (radius / (runtime.stageHeight/2)) * (canv.height / 2), 0, 2 * Math.PI);
        ctx.fill();
        
    }
    /**
     * Draws a line
     * @param {Number} x1 x of point 1
     * @param {Number} y1 y of point 1
     * @param {Number} x2 x of point 2
     * @param {Number} y2 y of point 2
     * @param {Number} weight How thick the line should be
     * @param {Number} r Red
     * @param {Number} g Green
     * @param {Number} b Blue
     * @param {Number} a Alpha
     * @param {WindowId} id Window to draw the line to
     */
    drawLine(x1, y1, x2, y2, weight, r, g, b, a, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "LINE",
            11,
            //clamp(x1,this.windows[id].x - this.windows[id].width/2, this.windows[id].x - this.windows[id].width/2),
            //clamp(y1,this.windows[id].y - this.windows[id].height/2, this.windows[id].y - this.windows[id].height/2),
            //clamp(x2,this.windows[id].x - this.windows[id].width/2, this.windows[id].x - this.windows[id].width/2),
            //clamp(y2,this.windows[id].y - this.windows[id].height/2, this.windows[id].y - this.windows[id].height/2),
            clamp(x1,-320,320),
            clamp(y1,-180,180),
            clamp(x2,-320,320),
            clamp(y2,-180,180),
            weight,
            r,
            g,
            b,
            a
        ])

        ctx.lineWidth = ((weight / (runtime.stageWidth/2)) * (canv.width / 2))
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.beginPath();
        ctx.moveTo(((x1 / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y1 / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2);
        ctx.lineTo(((x2 / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y2 / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2);
        ctx.stroke();
    }
    
    /**
     * Draws a rectangle
     * @param {Number} x1 Left side
     * @param {Number} y1 Right side
     * @param {Number} x2 Right side
     * @param {Number} y2 Top side
     * @param {Number} radius Rect bezel
     * @param {Number} r Red
     * @param {Number} g Green
     * @param {Number} b Blue
     * @param {Number} a Alpha
     * @param {WindowId} id Window to draw to
     */
    drawRect(x1, y1, x2, y2, radius, r, g, b, a, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "RECT",
            11,
            clamp(x1,this.windows[id].x - this.windows[id].width/2, this.windows[id].x + this.windows[id].width/2),
            clamp(y1,this.windows[id].y - this.windows[id].height/2, this.windows[id].y + this.windows[id].height/2),
            clamp(x2,this.windows[id].x - this.windows[id].width/2, this.windows[id].x + this.windows[id].width/2),
            clamp(y2,this.windows[id].y - this.windows[id].height/2, this.windows[id].y + this.windows[id].height/2),
            r,
            g,
            b,
            a,
            radius
        ])

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fillRect(((((x1+x2) / 2) / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2,((((y1+y2)/2) / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, ((((x2-x1) / 2) / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2,((((y2-y1)/2) / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2)
    }
    /**
     * Draws an ellipse
     * @param {Number} x X position
     * @param {Number} y Y position
     * @param {Number} r1 Radius 1
     * @param {Number} r2 Radius 2
     * @param {Number} r Red
     * @param {Number} g Green
     * @param {Number} b Blue
     * @param {Number} a Alpha
     * @param {WindowId} id Window to draw to
     */
    drawEllipse(x, y, r1, r2, r, g, b, a, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "ELLIPSE",
            10,
            x,
            y,
            r1,
            r2,
            r,
            g,
            b,
            a
        ])

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`

        ctx.beginPath();
        ctx.ellipse(((x / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, ((r1 / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((r2 / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * Writes text
     * @param {String} text Text to write
     * @param {Number} x X position, what the text will be centered around
     * @param {Number} y Y position, starting y of the text
     * @param {Number} r Red
     * @param {Number} g Green
     * @param {Number} b Blue
     * @param {Number} a Alpha
     * @param {Number} size Size scale in scratch size. In this dev environment it's the size in pixels.
     * @param {Number} spacing Spacing multiplier. In this dev environment does nothing.
     * @param {Boolean} bold Whether the text will be bold
     * @param {"center" | "left" | "right"} align Alignment of the text
     * @param {Number} maxWidth Max width of text, will wrap if this is exceeded
     * @param {WindowId} id Window to draw to
     */
    drawText(text, x, y, r, g, b, a, size, spacing, bold, align, maxWidth, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "TEXT",
            14,
            text,
            x,
            y,
            r,
            g,
            b,
            a,
            size,
            spacing,
            Boolean(bold),
            align,
            maxWidth
        ])

        ctx.font = `${bold ? "bold " : ""}${size}px Comic Sans MS`
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.textAlign = align
        ctx.fillText(text, ((x / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, ((width / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2)
    }
    /**
     * Draws an image
     * @param {String} name Window name, must be loaded by backend.loadImage
     * @param {Number} x X position
     * @param {Number} y Y position
     * @param {Number} width Width
     * @param {Number} height Height
     * @param {WindowId} id Window to draw to
     */
    drawImage(name, x, y, width, height, id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "IMAGE",
            7,
            x,
            y,
            width,
            height,
            name
        ])

        ctx.drawImage(this._devEnvImages[name],((x / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((y / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2, ((width / (runtime.stageWidth/2)) * (canv.width / 2)) + canv.width/2, ((height / (runtime.stageHeight/2)) * (canv.height / 2)) + canv.height/2)
    }

    /**
     * Loads an image to be used by drawImage. WARNING: This is asynchronus in the dev environment, but not in the project! 
     * @param {URL} url Url to the image
     * @param {String} name Image name. Outside of the dev environment this adds the image to the pen+ library, but here it adds it to a json file.
     * @param {WindowId} id Window to draw to
     * @returns {Promise | void} Returns void in red os, returns a promise here! Make sure to convert your code
     */
    async loadImage(url, name,id) {
        this.windows[id].commands.push(this.windows[id].contents.length)
        this.windows[id].contents = this.windows[id].contents.concat([
            "LOAD",
            4,
            url,
            name
        ])

        return fetch(url).then((value) => {
            value.blob().then((final) => {
                this._devEnvImages[name] = new ImageBitmap(final)
                return 200
            })
        })
    }
    /**
     * Clears all shapes from the window
     * @param {WindowId} id Window to clear
     */
    clearShapes(id) {
        this.windows[id].contents = []
        this.windows[id].commands = []
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canv.width,canv.height)
    }

    /**
     * Adds an event listener
     * @param {"tick"} event Event type
     * @param {Function} func Function to be called when event is fired
     * @param {WindowId} id Window's id, must be provided so the process is stopped when the window closes!
     */
    onEvent(event, func, id) {
        switch (event) {
            case "tick": {
                this.events.tick.push({
                    func: func,
                    src: id
                })

                break;
            }
        }
    }
    /**
     * Reads the file contents from a path
     * @param {String} path Path to the file
     * @returns {*}
     */
    readFile(path) {
        if (path[0] === "/") path = path.slice(1)
        if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1)
        let section = this.fs
        try {
            path.split("/").forEach((p) => {
                if (Object.prototype.hasOwnProperty.call(section, p)) {
                    section = section[p]
                }
                else {
                    throw new Error("Invalid")
                }
            })
            return section?._content ?? section
        }
        catch {
            return "Invalid"
        }
        
    }
    /**
     * Writes to a file, will not create a path but will create the file if it doesn't exist
     * @param {String} path Path to write to
     * @param {*} content Content to write to the file
     * @returns {"Invalid" | void}
     */
    writeFile(path, content) {
        if (path[0] === "/") path = path.slice(1)
        if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1)
        let section = this.fs
        try {
            const apath = path.split("/")
            apath.pop()
            apath.forEach((p) => {
                if (Object.prototype.hasOwnProperty.call(section, p)) {
                    section = section[p]
                }
                else {
                    throw new Error("Invalid")
                }
            })
            section[path.split("/")[apath.length]] = this.newFilePoint(path, content)
        }
        catch {
            return "Invalid"
        }
    }
    /**
     * Recursively removes a directory
     * @param {String} path Directory to remove
     * @returns {void}
     */
    rm(path) {
        if (path[0] === "/") path = path.slice(1)
        if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1)
        let section = this.fs
        try {
            const apath = path.split("/")
            apath.pop()
            apath.forEach((p) => {
                if (Object.prototype.hasOwnProperty.call(section, p)) {
                    section = section[p]
                }
                else {
                    throw new Error("Invalid")
                }
            })
            if (path === "") {
                this.fs = this.newDirPoint() // :trol:
            }
            else {
                const s = path.split("/")
                delete section[s[s.length - 1]]
            }
            
        }
        catch {
            return
        }
    }
    /**
     * Will create a path and all roots up to the path if they don't exist
     * @param {String} path Path to create
     */
    mkdir(path) {
        if (path[0] === "/") path = path.slice(1)
        if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1)
        const apath = path.split("/")
        const object = this.fs[apath[0]] ?? this.newDirPoint()
        apath.shift()
        let bobject = object // ~~bob ject~~ b object
        apath.forEach((p) => {
            if (p[0] === "_") throw new Error("Invalid")
            if (!Object.prototype.hasOwnProperty.call(bobject,p)) bobject[p] = this.newDirPoint()
            bobject = bobject[p]
            
        })
        this.fs[path.split("/")[0]] = object
    }
    
    ls(path) {
        if (path[0] === "/") path = path.slice(1)
        if (path[path.length - 1] === "/") path = path.slice(0, path.length - 1)
        let section = this.fs
        try {
            path.split("/").forEach((p) => {
                if (Object.prototype.hasOwnProperty.call(section, p)) {
                    section = section[p]
                }
                else {
                    throw new Error("Invalid")
                }
            })
            const ignoreKeys = Object.keys(this.newDirPoint())
            return Object.keys(section).filter((i) => !ignoreKeys.includes(i))
        }
        catch {
            return "Invalid"
        }
    }
    /**
     * Directory point. Not for you!
     * @returns {Object}
     */
    newDirPoint() {
        return {
            _isDir: true // more stuff goes here
        }
    }
    /**
     * Creates a file point. Not for you!
     * @param {String} fileName File name, must include a file extension
     * @param {*} content Content to put in the file point
     * @returns {Object}
     */
    newFilePoint(fileName, content) {
        const split = fileName.split(".")
        const type = (split[split.length - 1] ?? "").includes(" ") ? "" : (split[split.length - 1] ?? "")
        const s = fileName.split("/")
        return {
            _isDir: false,
            _name: s[s.length - 1],
            _content: content,
            _type: type
        }
    }

    /**
     * Loads an app. Not for you!
     * @param {Object} appData App data object
     */
    loadApp(appData) {
        if (
            typeof appData?.name === "string" &&
            typeof appData?.desktopIcon === "string" &&
            typeof appData?.code === "string" &&
            typeof appData?.id === "string" &&
            (appData?.name ?? [0])[0] !== "_"// && // app won't conflict with reserved words
            //!Object.prototype.hasOwnProperty.call(this.fs.system.apps, appData?.id ?? "") // app doesn't already exist
        ) {
            // probably valid ¯\_(ツ)_/¯
            const appPath = "/system/apps/" + appData.id
            this.mkdir(appPath)
            this.writeFile(appPath + "/app.json", appData)
            // note to self: if we add assets in the future add it here

            this.apps[appData.id] = appData
        }
        else {
            throw new Error("Invalid app!")
        }
    }
    /**
     * Deletes an app. You shouldn't need to use this.
     * @param {String} id App id
     */
    deleteApp(id) {
        this.rm("/system/apps/" + id)
        delete this.apps[id]
    }
    /**
     * Loads the OS from a file system. Not for you!
     * @param {Object} fs File system
     */
    loadOsFromFs(fs) {
        this.windows = {}
        this.apps = {}
        this.fs = fs
        this.events = {
            tick: []
        }

    }
    /**
     * Sets a setting to a value
     * @param {String} setting Setting name
     * @param {*} value Value to set it to
     */
    updateSetting(setting, value) {
        this.settings[setting] = value
        this.writeFile("/system/settings/settings.json",this.settings)
    }
    /**
     * Moves a window to the top. You shouldn't need to use this.
     * @param {WindowId} id Window to focus
     */
    focusWindow(id) {
        this.nextWindowIds.splice(this.nextWindowIds.indexOf(id),1)
        this.nextWindowIds.unshift(id)
    }
    /**
     * Kills a window.
     * @param {WindowId} id Window to kill.
     */
    killWindow(id) {
        const i = this.nextWindowIds.indexOf(String(id))
        //console.log(this.nextWindowIds, this.windowIds, i)
        this.nextWindowIds.splice(i,1)
        //console.log(this.nextWindowIds, this.windowIds)
        //delete this.windows[id]
    }
}

const _newBcknd = new Backend()

setInterval(() => {
    _newBcknd.events.tick.forEach((e) => {
        e.func()
    })
}, (1 / 60) * 1000)

/* @red-module-exp */module.exports = /* @red-module-exp-end */{
    backend: _newBcknd,
    windowId: _newBcknd.newWindow(0,0,320,180)
}