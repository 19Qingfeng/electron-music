const { app, BrowserWindow, ipcMain } = require("electron") 

/* 
  该文件下的都是main Process
  主进程 只有该文件下可以使用BrowserWindow创建渲染进程
 */

class AppWindow extends BrowserWindow {
  constructor(config,fileLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finallyConfig = { ...baseConfig ,...config}
    super(finallyConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}


app.on('ready', () => {
  const indexWindow = new AppWindow({},'./renderer/index.html')
  ipcMain.on('open-button', (event) => {
    new AppWindow({
      width: 500,
      height: 400,
      parent:indexWindow
    },'./renderer/add.html')
  })
})




// electron完全加载触发ready事件
// app.on('ready', () => {
//   // 主页面window
//   // 创建窗口 renderer
//   const mainWindow = new BrowserWindow({
//     // 宽口宽度和高度
//     width: 600,
//     height: 800,
//     webPreferences: {
//       // true mainWindow该渲染进程下可以使用nodejs api
//       nodeIntegration:true
//     }
//   })
//   mainWindow.loadFile('index.html')
//   // 运行在Main上的事件模块 通过事件监听机制实现通信
//   ipcMain.on('message', (event,arg) => {
//     // event 事件对象 arg 发送内容
//     console.log(arg, 'arg')
//     // event.sender 发送者 send()方法 发送事件回去
//     event.sender.send('reply', 'hello from main')
//     // 同理可以使用mainWindow发送信息 它和event.sender发送一个意思
//     // mainWindow.send('reply', 'hello from xxxxx')
//   })

  // const secondWindow = new BrowserWindow({
  //   // 宽口宽度和高度
  //   width: 400,
  //   height: 200,
  //   webPreferences: {
  //     // true mainWindow该渲染进程下可以使用nodejs api
  //     nodeIntegration:true
  //   },
  //   // 表示该窗口归属于的窗口 (父关闭 子也关闭)
  //   parent:mainWindow
  // })
  // secondWindow.loadFile('second.html')
// })