exports.$ = (id) => {
  return document.getElementById(id)
}

exports.converDuration = (time) => {
  // 计算分钟
  const minutes = '0' + Math.floor(time / 60)
  // 计算剩余秒数
  const seconds = '0' + Number.parseInt(time) % 60
  return `${minutes.substr(-2)}:${seconds.substr(-2)}`
}