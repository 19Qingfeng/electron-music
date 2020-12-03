const Store = require('electron-store')
const { v4: uuidv4 } = require('uuid');
const path = require('path')


class DataStore extends Store {
  constructor(setting) {
    super(setting)
    this.tracks =  this.get('tracks') || []
  }
  saveTracks() {
    this.set('tracks',this.tracks)
    return this
  }
  getTracks() {
    return this.get('tracks') || []
  }
  addTracks(tracks) {
    const tracksWithProps = tracks.map(track => {
      return {
        id: uuidv4(),
        fileName: path.basename(track),
        path:track
      }
    })
    .filter(track => {
      const currentTracksPath = this.getTracks().map(track => track.path)
      return currentTracksPath.indexOf(track.path) < 0
    })
    this.tracks = [ ...this.tracks, ...tracksWithProps ]
    return this.saveTracks()
  }
}

module.exports = DataStore



/* 
  const Store = require('electron-store');
  常用方法store实例
   创建实例
  const store = new Store('wanghaoyu');
   set 设置
  store.set('unicorn', '🦄');
   get 获取
  console.log(store.get('unicorn'));
  => '🦄'

   Use dot-notation to access nested properties
   设置多层数据结构 foo.bar 为true
  store.set('foo.bar', true);
  console.log(store.get('foo'));
  => {bar: true}

  store.delete('unicorn');
  console.log(store.get('unicorn'));
   undefined


  store 存在哪里 (存放文件路径)
  console.log(app.getPath('userData'))

*/