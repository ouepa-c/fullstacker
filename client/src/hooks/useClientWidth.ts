import { useEffect, useState } from 'react'

const useClientWidth = () => {
  const init = document.body.clientWidth
  const [clientW, setClientW] = useState<number>(init)

  function docResizeHandler(e: UIEvent) {
    setClientW(document.body.clientWidth)
  }

  window.addEventListener('resize', docResizeHandler)

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', docResizeHandler)
    }
  }, [])

  return clientW
}

export default useClientWidth
