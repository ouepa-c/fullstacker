import { useEffect, useState } from 'react'

const useClientWidth = () => {
  const [clientW, setClientW] = useState<number>(0)

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
