'use client'

import { useState, useEffect } from 'react'
import { useDataStore } from '@/store/useDataStore'

interface IndividualScoreEntryProps {
  selectedColumn: string | null
}

export default function IndividualScoreEntry({ selectedColumn }: IndividualScoreEntryProps) {
  const [matricNumber, setMatricNumber] = useState('')
  const [score, setScore] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const updateScore = useDataStore((state) => state.updateScore)
  const matricNumberExists = useDataStore((state) => state.matricNumberExists)

  const validateMatricNumber = (matricNumber: string) => {
    const regex = /^\d{2}\/\d{4,5}$/;
    return regex.test(matricNumber);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedColumn) {
      setMessage({ type: 'error', text: 'Please select a column to update first.' })
      return
    }
    if (!validateMatricNumber(matricNumber)) {
      setMessage({ type: 'error', text: 'Invalid matriculation number format. It should be YY/XXXXX or YY/XXXX.' })
      return
    }
    if (!matricNumberExists(matricNumber)) {
      setMessage({ type: 'error', text: 'Matriculation number does not exist in the file.' })
      return
    }
    updateScore(matricNumber, selectedColumn, score)
    setMessage({ type: 'success', text: `Score updated for ${matricNumber}` })
    setMatricNumber('')
    setScore('')
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Individual Score Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="matric-number" className="block text-sm font-medium text-gray-700">
            Matriculation Number
          </label>
          <input
            type="text"
            id="matric-number"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            placeholder="Enter matric number (e.g., 22/10674)"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score/Grade
          </label>
          <input
            type="text"
            id="score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter score or grade"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Score
        </button>
      </form>
      {message && (
        <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </div>
      )}
    </div>
  )
}

