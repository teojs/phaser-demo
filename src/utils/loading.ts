/*
  一个loading插件，用于接口请求时自动显示loading
*/

interface Options {
  target?: string
  el?: HTMLElement
  background?: string
}

export interface LoadingCallBack {
  close: () => void
}

export default (options?: Options): LoadingCallBack => {
  const theme = document.documentElement.dataset.theme
  let background = 'rgba(255, 255, 255, 0.5)'
  if (theme && theme === 'dark') {
    background = 'rgba(0, 0, 0, 0.5)'
  }

  let el = document.body
  if (options?.target) {
    el = document.querySelector(options.target) as HTMLElement
  }
  if (options?.el) {
    el = options.el
  }

  const { position, pointerEvents } = window.getComputedStyle(el as HTMLElement)
  if (position === 'static') {
    el.style.position = 'relative'
  }
  el.style.pointerEvents = 'none'

  const loading = document.createElement('div')
  loading.style.position = 'absolute'
  loading.style.width = '100%'
  loading.style.height = '100%'
  loading.style.top = '0'
  loading.style.left = '0'
  // loading.style.backdropFilter = 'blur(1px)'
  loading.style.background = background
  loading.style.zIndex = '9999'
  loading.style.display = 'flex'
  loading.style.justifyContent = 'center'
  loading.style.alignItems = 'center'

  const loadingImage = document.createElement('img')
  loadingImage.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZT0iIzJmYTk2OCIgc3Ryb2tlLWRhc2hhcnJheT0iNDcuMTIzODg5ODAzODQ2ODkgNDcuMTIzODg5ODAzODQ2ODkiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxLjI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxOCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2U9IiMzNjhjZjEiIHN0cm9rZS1kYXNoYXJyYXk9IjMyLjk4NjcyMjg2MjY5MjgzIDMyLjk4NjcyMjg2MjY5MjgzIiBzdHJva2UtZGFzaG9mZnNldD0iMzIuOTg2NzIyODYyNjkyODMiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxLjI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MDstMzYwIDUwIDUwIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgPC9jaXJjbGU+Cjwvc3ZnPg=='
  loadingImage.width = Math.min(100, el.offsetWidth)
  loadingImage.height = Math.min(100, el.offsetHeight)

  loading.appendChild(loadingImage)

  el.appendChild(loading)

  return {
    close() {
      el.style.pointerEvents = pointerEvents || ''
      el.style.position = position || ''
      el.removeChild(loading)
    },
  }
}
