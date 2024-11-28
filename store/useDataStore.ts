import { create } from 'zustand'

interface RowData {
  [key: string]: string | number;
}

interface DataState {
  fileData: RowData[] | null
  setFileData: (data: RowData[]) => void
  updateScore: (matricNumber: string, column: string, score: number | string) => void
  getUpdatedData: () => RowData[]
  matricNumberExists: (matricNumber: string) => boolean;
}

export const useDataStore = create<DataState>((set, get) => ({
  fileData: null,
  setFileData: (data) => set({ fileData: data }),
  updateScore: (matricNumber, column, score) => {
    set((state) => ({
      fileData: state.fileData?.map((row) => {
        const matricColumn = Object.keys(row).find(key => key.toLowerCase().includes('matric'))
        return matricColumn && row[matricColumn] === matricNumber
          ? { ...row, [column]: score }
          : row
      }) || null
    }))
  },
  getUpdatedData: () => get().fileData || [],
  matricNumberExists: (matricNumber: string) => {
    const fileData = get().fileData;
    if (!fileData) return false;

    const matricColumn = Object.keys(fileData[0]).find(key => key.toLowerCase().includes('matric'));
    return matricColumn ? fileData.some(row => row[matricColumn] !== undefined && row[matricColumn] === matricNumber) : false;
  },
}))

