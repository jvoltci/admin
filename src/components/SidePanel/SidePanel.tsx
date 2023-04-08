import React from "react"
import { useStyles } from "./SidePanel.styles"
import Logo from '../../assets/logo.png'
import { Box, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { footerRoutes, routes } from "./SidePanelRoutes"

export const SidePanel: React.FC = () => {
    const [keySelected, setKey] = React.useState(2)
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Box>
                <Box className={classes.header}>
                    <Header />
                    <Typography className={classes.title}>Admin Console</Typography>
                </Box>
                <List className={classes.listWrapper}>
                    {routes.map(route => (
                        <ListItem
                            key={route.key}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                borderRadius: '10px',
                                background: route.key === keySelected ? 'rgba(255, 255, 255, 0.2)' : ''
                            }}
                        >
                            <ListItemButton onClick={() => setKey(route.key)}>
                                {route.icon &&
                                    <ListItemIcon className={classes.icon}>
                                        <route.icon className={classes.icon} />
                                    </ListItemIcon>}
                                {route.title}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <List className={classes.listWrapper}>
                    {footerRoutes.map(route => (
                        <ListItem
                        key={route.key}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                borderRadius: '10px',
                                background: route.key === keySelected ? 'rgba(255, 255, 255, 0.2)' : ''
                            }}
                        >
                            <ListItemButton onClick={() => setKey(route.key)}>
                                {route.icon &&
                                    <ListItemIcon className={classes.icon}>
                                        <route.icon className={classes.icon} />
                                    </ListItemIcon>}
                                {route.title}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

const Header: React.FC = () => {
    return <Box component={'img'} src={Logo} />
}