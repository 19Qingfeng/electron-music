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
        <i class="iconfont icon-start mr-3"></i>
        <i class="iconfont icon-cangpeitubiao_shanchu mr-2"></i>
      </div>
    </li>`
    return html
  },"")
  const emptyHTML = '<div class="alert alert-primary">还没有添加音乐</div>'
  tracksList.innerHTML = tracks.length ? `<ul class='list-group'>${tracksHTML}</ul>` : emptyHTML
}

ipcRenderer.on('getTracks',(event,tracks) => {
  console.log(tracks,'tracks')
  renderListHtml(tracks)
})