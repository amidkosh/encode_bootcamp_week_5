'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AnimalClassifier() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleClassify = async () => {
    if (!image) return

    setLoading(true)
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        throw new Error('Failed to classify image')
      }

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error(error)
      setResult("An error occurred while processing the image.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs" />
      {image && (
        <div className="relative w-64 h-64">
          <Image src={image} alt="Uploaded animal" fill style={{objectFit: 'cover'}} />
        </div>
      )}
      <button onClick={handleClassify} disabled={!image || loading}>
        {loading ? 'Processing...' : 'Classify Animal'}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

