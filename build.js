
const dev_AL = {
"backend": backend,
"windowId": windowId
};



console.log("Example test app");
const windowId = dev_AL.windowId;
const backend = dev_AL.windowId;
dev_AL.backend.onEvent("tick",() => {
    dev_AL.backend.clearShapes(dev_AL.windowId);
    dev_AL.backend.drawCircle(0,Math.sin(Date.now() / 100) * 50,100,255,0,0,255,dev_AL.windowId);
},dev_AL.windowId);
