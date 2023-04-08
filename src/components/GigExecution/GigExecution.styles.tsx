import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        background: '#F9F9F9',
        padding: '36px'
    },
    title: {
        fontWeight: '300',
        fontSize: '18px',
        color: '#808080',
    },
    description: {
        fontWeight: '400',
        fontSize: '12px',
        color: '#2951D5',
        marginTop: 14,
        marginBottom: 16,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        justifyItems: 'center',
        borderRadius: '10px',
        width: '180px',
        height: '100px',
        background: 'white',
        cursor: 'pointer'
    },
    logo: {
        width: '30px',
        height: '30px'
    },
    select: {
        width: 100,
        height: 40,
        marginRight: 15,
        fontSize: '12px',
        border: "1px solid white",
        background: 'white'
    },
    unallocated: {
        color: '#3344FF',
        fontWeight: 300,
        fontSize: '12px'
    }
}))