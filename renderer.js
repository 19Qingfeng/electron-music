// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// render process can use node API or DOM API

alert(process.versions.node)

window.addEventListener('DOMContentLoaded', () => {
  alert('DOM Load')
})
