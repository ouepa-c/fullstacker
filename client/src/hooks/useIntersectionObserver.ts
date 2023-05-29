import { useEffect, useRef } from 'react'

const useIntersectionObserver =
  <ElementType extends HTMLElement = HTMLDivElement>(
    callback: (isIntersecting: boolean) => void,
    options?: IntersectionObserverInit
  ) => {
    const targetRef = useRef<ElementType>(null)
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
        callback(isIntersecting)
      },
      {
        ...options
      })

    useEffect(() => {
      observer.observe(targetRef.current as ElementType)
      return () => {
        targetRef.current && observer.unobserve(targetRef.current as ElementType)
      }
    }, [])

    return targetRef
  }

export default useIntersectionObserver
