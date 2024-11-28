import DataEntryTool from '@/components/DataEntryTool'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">CeeSharp Data Entry Tool</h1>
        <DataEntryTool />
      </div>
    </main>
  )
}

