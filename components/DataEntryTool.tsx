'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import ColumnSelection from '@/components/ColumnSelection'
import IndividualScoreEntry from '@/components/IndividualScoreEntry'
import GroupScoreEntry from '@/components/GroupScoreEntry'
import FileSaveDownload from '@/components/FileSaveDownload'
import { useDataStore } from '@/store/useDataStore'

export default function DataEntryTool() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  const setFileData = useDataStore((state) => state.setFileData)
  const fileData = useDataStore((state) => state.fileData)

  return (
    <div className="space-y-8">
      <FileUpload
        onFileUpload={(file, data) => {
          setUploadedFile(file)
          setFileData(data)
          const matricColumn = Object.keys(data[0]).find(key => key.toLowerCase().includes('matric'))
          if (matricColumn) {
            setSelectedColumn(matricColumn)
          }
        }}
      />
      {uploadedFile && fileData && (
        <>
          <ColumnSelection
            columns={Object.keys(fileData[0])}
            onColumnSelect={setSelectedColumn}
          />
          <IndividualScoreEntry selectedColumn={selectedColumn} />
          <GroupScoreEntry selectedColumn={selectedColumn} />
          <FileSaveDownload fileName={uploadedFile.name} />
        </>
      )}
    </div>
  )
}

