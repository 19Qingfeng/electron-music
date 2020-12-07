const { $ } = require("./helper");
// 主窗口
const { ipcRenderer } = require("electron");

document.getElementById("button-1").addEventListener("click", () => {
  ipcRenderer.send("open-button");
});

const renderListHtml = (tracks) => {
  const tracksList = $("tracksList");
  const tracksHTML = tracks.reduce((html, track) => {
    html += `<li class='music-track list-group-item d-flex justify-content-between align-items-center row'>
      <div class='col-10'>
        <i class='iconfont icon-music-note mr-2 text-secondary'></i>
        <b>${track.fileName}</b>
      </div>
      <div class='col-2'>
        <i data-id="${track.id}" class="iconfont icon-start mr-3 hover-icon"></i>
        <i data-id="${track.id}" class="iconfont icon-cangpeitubiao_shanchu mr-2 hover-icon"></i>
      </div>
    </li>`;
    return html;
  }, "");
  const emptyHTML = '<div class="alert alert-primary">还没有添加音乐</div>';
  tracksList.innerHTML = tracks.length
    ? `<ul class='list-group'>${tracksHTML}</ul>`
    : emptyHTML;
};

let allTracks = [];

ipcRenderer.on("getTracks", (event, tracks) => {
  allTracks = tracks;
  renderListHtml(tracks);
});

const audio = new Audio();
let music; // 播放歌曲
$("tracksList").addEventListener("click", (event) => {
  event.preventDefault();

  const { dataset, classList } = event.target;
  if (dataset && dataset.id && classList.contains("icon-start")) {
    if (music && music.id === dataset.id) {
      // 点击播放当前暂停的音乐 继续播放当前音乐
      audio.play() // 继续播放
      classList.replace("icon-start", "icon-zanting");
    }
    if (music && music.id !== dataset.id) {
      // 点击播放新的音乐 关闭之前暂停音乐状态 重新赋值src进行播放
      music = allTracks.find((i) => i.id == dataset.id);
      if (music && music.path) {
        audio.src = music.path;
        const resetIconEle = document.querySelector('.icon-zanting')
        if(resetIconEle) resetIconEle.classList.replace('icon-zanting','icon-start')
        classList.replace("icon-start", "icon-zanting");
        audio.play();
      }

    }
    if (!music) {
      // 点击播放新的音乐 当前没有任何旧的音乐
      // 播放之前没有音乐处于播放状态
      music = allTracks.find((i) => i.id == dataset.id);
      if (music && music.path) {
        audio.src = music.path;
        audio.play();
        classList.replace("icon-start", "icon-zanting");
      }
    }
  } else if (dataset && dataset.id && classList.contains("icon-zanting")) {
    // 点击暂停按钮
    audio.pause()
    classList.replace('icon-zanting','icon-start')
  } else if (
    dataset &&
    dataset.id &&
    classList.contains("icon-cangpeitubiao_shanchu")
  ) {
    // 处理删除按钮 发送事件 main.js-electron-stroe删除库中存储
    ipcRenderer.send('delete-tracks',dataset.id)
  }
});

const renderPlayerHTML = (name,duration) => {
  const player =$('player-status')
  const html = `
      <div class="col font-weight-bold">${name}</div>
      <div class="col">
        <span id="current-seeker">00:00</span>
        /
        <span>${duration}</span>
      </div>
  `
  player.innerHTML = html
}

const updateProgressHTML = (duration) => {
  const progressEle = $('current-seeker')
  progressEle.innerHTML = duration
}


/* 音频元数据加载完成事件 开始渲染播放器(开始播放)事件 */
audio.addEventListener('loadedmetadata',() => {
  renderPlayerHTML(music.fileName,audio.duration)
})

/* 当currentTime更新时会触发timeupdate事件。监听播放时常改变事件 */
audio.addEventListener('timeupdate',() => {
  updateProgressHTML(audio.currentTime)
})
