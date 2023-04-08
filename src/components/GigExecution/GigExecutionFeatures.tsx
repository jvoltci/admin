import React, { SVGProps } from 'react'
import { ReactComponent as Allocate } from '../../assets/allocate.svg'
import { ReactComponent as Attendance } from '../../assets/attendance.svg'
import { ReactComponent as Track } from '../../assets/track.svg'
import { ReactComponent as Payout } from '../../assets/payout.svg'
import { ReactComponent as History } from '../../assets/history.svg'

type Feature = {
    key: number
    name: string
    logo: React.FC<SVGProps<SVGSVGElement>>
}
export const features: Feature[] = [
    {
        key: 1,
        name: 'Gig Allocation',
        logo: Allocate
    },
    {
        key: 2,
        name: 'Attendance',
        logo: Attendance
    },
    {
        key: 3,
        name: 'Tracking',
        logo: Track
    },
    {
        key: 4,
        name: 'Payout',
        logo: Payout
    },
    {
        key: 5,
        name: 'History',
        logo: History
    }
]