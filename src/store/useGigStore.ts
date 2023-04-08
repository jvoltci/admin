import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getGigs } from '../api'

type GigsType = {
    id: string
    type: string
    present: number
    total: number
    location: string
    giggers: string
    status: string
}

interface GigState {
  gigs: GigsType[]
  setGigs: (gigs: GigsType[]) => void
  loadData: () => void
}

export const useGigStore = create<GigState>()(
  devtools(
    persist(
      (set) => ({
        gigs: [],
        setGigs: (data) => set({ gigs: data }),
        loadData: async () => { const data = await getGigs(); set({gigs: data})}
      }),
      {
        name: 'gig-storage',
      }
    )
  )
)