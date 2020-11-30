const { app, BrowserWindow } = require("electron") 

/* 
  该文件下的都是main Process
  主进程 只有该文件下可以使用BrowserWindow创建渲染进程
 */

// electron完全加载触发ready事件
app.on('ready', () => {
  // 主页面window
  // 创建窗口 renderer
  const mainWindow = new BrowserWindow({
    // 宽口宽度和高度
    width: 600,
    height: 800,
    webPreferences: {
      // true mainWindow该渲染进程下可以使用nodejs api
      nodeIntegration:true
    }
  })
  mainWindow.loadFile('index.html')
  const secondWindow = new BrowserWindow({
    // 宽口宽度和高度
    width: 400,
    height: 200,
    webPreferences: {
      // true mainWindow该渲染进程下可以使用nodejs api
      nodeIntegration:true
    },
    // 表示该窗口归属于的窗口 (父关闭 子也关闭)
    parent:mainWindow
  })
  secondWindow.loadFile('second.html')
})