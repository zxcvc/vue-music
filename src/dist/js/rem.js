function rem() {
  const width = document.querySelector('html').clientWidth
  const fs = width / 23.4375
  if (!document.querySelector('#rem')) {
    const style = document.createElement('style')
    style.id = 'rem'
    style.type = 'text/css'
    style.innerHTML = `
            html{
                font-size:${fs}px
            }
        `
    document.head.appendChild(style)
  } else {
    document.querySelector('#rem').innerHTML = `
        html{
            font-size:${fs}px
        }
    `
  }
}
rem()
window.onresize = rem
