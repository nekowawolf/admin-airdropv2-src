'use client'
import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  words: string[]
}

export default function AnimatedText({ words }: AnimatedTextProps) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[index]
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
      if (!deleting && subIndex === currentWord.length) {
        setTimeout(() => setDeleting(true), 1500)
      } else if (deleting && subIndex === 0) {
        setDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
      }
    }, deleting ? 50 : 70)

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, words])

  return (
    <p className="mt-4 text-white">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </p>
  )
}
