import { Box } from "@mui/material"
import React from "react"
import { useStyles } from "./GigExecution.styles"
import { features } from "./GigExecutionFeatures"
import { allocateGigger } from "../../api"
import { useGigStore } from "../../store/useGigStore"

export const GigExecution: React.FC = () => {
    const classes = useStyles()
    const [keySelected, setKey] = React.useState(0)
    const loadData = useGigStore(state => state.loadData)
    const [selected, setSelected] = React.useState<readonly string[]>([])
    const HeadComponent = features[keySelected]?.head as React.ElementType
    const BodyComponent = features[keySelected]?.body as React.ElementType

    const handleApprove = () => {
        Promise.all(selected.map(async (gig) => await allocateGigger(gig))).then(_ => loadData())
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.title}>Gig Execution Module</Box>
            <Box className={classes.description}>Allocate Gigs, Track Execution, Track Execution by Giggers</Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                {features.map(feature => (
                    <Feature
                        key={feature.key}
                        name={feature.name}
                        color={keySelected === feature.key ? 'white' : '#808080'}
                        Logo={<feature.logo fill={keySelected === feature.key ? 'white' : '#3344FF'} />}
                        idx={feature.key}
                        setKey={setKey}
                    />
                ))}
            </Box>
            { features[keySelected]?.head && <HeadComponent handleApprove={handleApprove} /> } 
            { features[keySelected]?.body && <BodyComponent selected={selected} setSelected={setSelected} /> } 
        </Box>
    )
}

type FeatureType = {
    Logo: React.ReactNode
    name: string
    color: string
    idx: number
    setKey: (key: number) => void
}
const Feature: React.FC<FeatureType> = ({ Logo, name, color, idx, setKey }) => {
    const classes = useStyles()
    return (
        <Box style={{ background: color === 'white' ? '#3344FF' : '' }} className={classes.card} onClick={() => setKey(idx)}>
            <Box className={classes.logo}>
                {Logo}
            </Box>
            <Box style={{ color: color }}>{name}</Box>
        </Box>
    )
}