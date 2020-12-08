// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// render process can use node API or DOM API

const { ipcRenderer } = require("electron") 

// 通信机制：事件机制 通过ipcRenderer向main发送事件
window.addEventListener('DOMContentLoaded', () => {
  // 事件名称 内容
  ipcRenderer.send('message', 'Hello From Rendered')
  ipcRenderer.on('reply', (event, arg) => {
    document.getElementById('message').innerHTML = arg
  })
})


