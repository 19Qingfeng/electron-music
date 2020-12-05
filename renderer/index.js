const { $ } = require("./helper")
// 主窗口
const { ipcRenderer } = require('electron')

document.getElementById('button-1').addEventListener('click', () => {
  ipcRenderer.send('open-button')
})

const renderListHtml = (tracks) => {
  const tracksList = $('tracksList')
  const tracksHTML = tracks.reduce((html,track) => {
    html += `<li class='music-track list-group-item d-flex justify-content-between align-items-center row'>
      <div class='col-10'>
        <i class='iconfont icon-music-note mr-2 text-secondary'></i>
        <b>${track.fileName}</b>
      </div>
      <div class='col-2'>
        <i data-id="${track.id}" class="iconfont icon-start mr-3 hover-icon"></i>
        <i data-id="${track.id}" class="iconfont icon-cangpeitubiao_shanchu mr-2 hover-icon"></i>
      </div>
    </li>`
    return html
  },"")
  const emptyHTML = '<div class="alert alert-primary">还没有添加音乐</div>'
  tracksList.innerHTML = tracks.length ? `<ul class='list-group'>${tracksHTML}</ul>` : emptyHTML
}

let allTracks = []

ipcRenderer.on('getTracks',(event,tracks) => {
  allTracks = tracks
  renderListHtml(tracks)
})

const audio = new Audio()

$('tracksList').addEventListener('click',(event) => {
  event.preventDefault()
  const { dataset , classList } = event.target
  if(dataset && dataset.id && classList.contains('icon-start')) {
    const music = allTracks.find(i => i.id == dataset.id)
    if(music && music.path) {
      audio.src = music.path
      audio.play()
      classList.replace('icon-start','icon-stop')
    }
  }
})