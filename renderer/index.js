// 主窗口
const { ipcRenderer } = require('electron')

document.getElementById('button-1').addEventListener('click', () => {
  ipcRenderer.send('open-button')
})
