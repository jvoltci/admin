import axios from "axios"
const BASE = 'https://admin-api-0l7m.onrender.com/api/v1'

export const getGigs = async () => {
    const response = await axios(`${BASE}/gigs`)
    return response.data.data || []
}
export const getGiggers = async (gigId: string) => {
    const response = await axios(`${BASE}/gigs/${gigId}`)
    return response.data.data || []
}
export const getUnAssignedGiggers = async () => {
    const response = await axios(`${BASE}/giggers?assign=false`)
    return response.data.data || []
}
export const assignGigger = async (gigId: string, gigger: string) => {
    const response = await axios.post(`${BASE}/gigger`, {
        assign: true,
        gig: gigId,
        gigger: gigger
    })
    return response.data.data
}
export const unassignGigger = async (gigger: string, gig: string) => {
    const response = await axios.post(`${BASE}/gigger`, {
        assign: false,
        gig: gig,
        gigger: gigger
    })
    return response.data.data
}