import React, { SVGProps } from 'react'
import { ReactComponent as Allocate } from '../../assets/allocate.svg'
import { ReactComponent as Attendance } from '../../assets/attendance.svg'
import { ReactComponent as Track } from '../../assets/track.svg'
import { ReactComponent as Payout } from '../../assets/payout.svg'
import { ReactComponent as History } from '../../assets/history.svg'
import { AllocationHead, GigAllocation } from './components/GitAllocation'
import { Tracking, TrackingHead } from './components/Tracking'

type Feature = {
    key: number
    name: string
    logo: React.FC<SVGProps<SVGSVGElement>>
    head?: React.FC
    body?: React.FC
}
export const features: Feature[] = [
    {
        key: 0,
        name: 'Gig Allocation',
        logo: Allocate,
        head: AllocationHead,
        body: GigAllocation
    },
    {
        key: 1,
        name: 'Attendance',
        logo: Attendance
    },
    {
        key: 2,
        name: 'Tracking',
        logo: Track,
        head: TrackingHead,
        body: Tracking
    },
    {
        key: 3,
        name: 'Payout',
        logo: Payout
    },
    {
        key: 4,
        name: 'History',
        logo: History
    }
]