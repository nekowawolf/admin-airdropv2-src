'use client'

import '@/styles/globals.css'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const textArray = ['access denied', 'you are not allowed', 'please go back']
const images = ['/img/blue1.png', '/img/blue2.png', '/img/blue3.png']

export default function ForbiddenPage() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    const typingSpeed = 70
    const deletingSpeed = 50
    const delayBetweenWords = 3000
    let timeout: NodeJS.Timeout

    function type() {
      const currentText = textArray[textIndex]
      if (textRef.current) {
        textRef.current.textContent = isDeleting
          ? currentText.substring(0, charIndex--)
          : currentText.substring(0, charIndex++)
      }

      if (!isDeleting && charIndex === currentText.length + 1) {
        timeout = setTimeout(() => {
          isDeleting = true
          type()
        }, delayBetweenWords / 2)
        return
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % textArray.length
      }

      timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed)
    }

    type()
    return () => clearTimeout(timeout)
  }, [])

  const changeImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const checkImageClick = () => {
    if (images[currentIndex] === '/img/blue2.png') {
      router.push('/login')
    }
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">:(</h1>
        <br />
        <h1 className="text-9xl font-bold text-blue-300">403</h1>

        <p
          ref={textRef}
          className="mt-4 text-white blinking-cursor typing"
          style={{ display: 'inline-block', minHeight: '30px' }}
        />

        <img
          src="/img/nww.png"
          alt="wolf-logo"
          className="w-10 bg-center mb-4 mt-6 h-auto mx-auto cursor-pointer"
          onClick={changeImage}
        />

        <img
          src={images[currentIndex]}
          alt="blue-image"
          width={256}
          height={256}
          onClick={checkImageClick}
          className="w-64 bg-center h-auto mx-auto fixed top-[75%] left-1/2 -translate-x-1/2 cursor-pointer"
        />
      </div>
    </div>
  )
}
