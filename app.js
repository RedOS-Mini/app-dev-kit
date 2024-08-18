
/* @red-file-start */
// Required boilerplate. If you remove or modify this you won't get type definitions and your app may not build correctly!
const dev_AL = require("./development/types"); // dev environment aliases.
require("@turbowarp/types/types/scratch-vm-extension"); // While you do get typing for this, you can't actually use any of the functions here!
/* @red-init-end */

console.log("Example test app");
const windowId = dev_AL.windowId;
const backend = dev_AL.windowId;
dev_AL.backend.onEvent("tick",() => {
    dev_AL.backend.clearShapes(dev_AL.windowId);

    dev_AL.backend.drawRect(-100,-100,100,100,5,0,0,255,1,windowId)
    dev_AL.backend.drawCircle(0,Math.sin(Date.now() / 100) * 50,100,255,0,0,255,dev_AL.windowId);
},dev_AL.windowId);