import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from "@mui/material/OverridableComponent"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import BuildIcon from '@mui/icons-material/Build'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

type Route = {
    key: number
    title: string
    icon?: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>
}

export const routes: Route[] = [
    {
        key: 1,
        title: 'Dashboard',
        icon: HomeRoundedIcon
    },
    {
        key: 2,
        title: 'Gig Execution',
        icon: AssignmentTurnedInOutlinedIcon
    },
    {
        key: 3,
        title: 'Companies',
        icon: ApartmentOutlinedIcon
    },
    {
        key: 4,
        title: 'Giggers',
        icon: PeopleAltIcon
    },
    {
        key: 5,
        title: 'Gig Config',
        icon: BuildIcon
    }
]

export const footerRoutes: Route[] = [
    {
        key: 6,
        title: 'Admin@gigchain.ai',
        icon: AccountCircleIcon
    },
    {
        key: 7,
        title: 'Users & Priviliges',
        icon: PersonSearchIcon
    },
    {
        key: 8,
        title: 'Profile & Settings',
        icon: ManageAccountsIcon
    },
    {
        key: 9,
        title: 'Logout',
        icon: LogoutIcon
    }
]