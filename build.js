const d={backend:w,windowId:n};console.log("Example test app");const n=d.windowId,w=d.windowId;d.backend.onEvent("tick",(()=>{d.backend.clearShapes(d.windowId),d.backend.drawRect(-100,-100,100,100,5,0,0,255,1,n),d.backend.drawCircle(0,50*Math.sin(Date.now()/100),100,255,0,0,255,d.windowId)}),d.windowId);