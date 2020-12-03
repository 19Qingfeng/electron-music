// 添加文件
const { $ } = require('./helper')
const { ipcRenderer } = require('electron')
const path = require('path')

let musicFilePath = []

$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})

$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-tracks',musicFilePath)
})

const renderListHTML = (paths) => {
  const ele = $('musicList')
  const html = paths.reduce((pre,cur) => { 
    pre = `<li class='list-group-item'>${path.basename(cur)}</li>`
    return pre
  }, "")
  ele.innerHTML = `<ul class='list-group'>${html}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
  if (Array.isArray(path)) {
    renderListHTML(path)
    musicFilePath = path
  }
})
