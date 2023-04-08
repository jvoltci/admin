import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '18.68vw',
        height: '100vh',
        background: '#3344FF',
        borderRadius: '0px 20px 20px 0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        padding: '37.5px',
        paddingBottom: '10px'
    },
    title: {
        color: 'white',
        fontWeight: 'bolder',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '12px'
    },
    icon: {
        marginRight: -26,
        marginLeft: -5,
        color: 'white',
        transform: 'scale(.8)'
    },
    listWrapper: {
        color: 'white',
        fontSize: '12px'
    },
    item: {
        paddingTop: 0,
        paddingBottom: 0
    },
}))