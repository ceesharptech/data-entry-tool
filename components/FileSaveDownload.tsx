'use client'

import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { useDataStore } from '@/store/useDataStore'
import { utils, write } from 'xlsx'

interface FileSaveDownloadProps {
  fileName: string
}

export default function FileSaveDownload({ fileName }: FileSaveDownloadProps) {
  const [isDownloadReady, setIsDownloadReady] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const getUpdatedData = useDataStore((state) => state.getUpdatedData)

  if (isDownloadReady) {
    console.log("File is ready to be downloaded")
  }

  const handleSaveAndDownload = () => {
    const data = getUpdatedData()
    const ws = utils.json_to_sheet(data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    const wbout = write(wb, { type: 'binary', bookType: 'xlsx' })

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `updated_${fileName}`
    a.click()

    URL.revokeObjectURL(url)
    setIsDownloadReady(true)
    setMessage('File has been downloaded successfully.')
  }

  // Convert string to ArrayBuffer
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
        setIsDownloadReady(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="space-y-4">
      <button
        onClick={handleSaveAndDownload}
        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Download className="mr-2 h-5 w-5" />
        Save and Download
      </button>
      {message && (
        <div className="text-sm text-green-600">
          {message}
        </div>
      )}
    </div>
  )
}

