import * as React from "react";
import {useState} from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from "@mui/material";
import {GenshinStyles} from "../../../../theme";
import {ARTIFACT_POSITIONS, INITIAL_ARTI_CONFIG, VICE_PROP_TYPE} from "./constants";
import {getConstraint, getNewUsedProps, getParsedArtiConfig, isEnhanceAble, resetViceProps, ucFirst} from "./utils";
import axios from "axios";
import background from "../../../../../assets/images/template.png";
import {SImg, StyledButtonGroup, VicePropInput} from "../../styles";

export default function Celestia() {

  const classes = GenshinStyles();
  const [artiConfig, setArtiConfig] = useState(INITIAL_ARTI_CONFIG);
  const [constraints, setConstraints] = useState(getConstraint('flower'));
  const [usedProps, setUsedProps] = useState([constraints[0]]);
  const [artifact, setArtifact] = useState();


  const handlePositionChange = (e) => {
    e.preventDefault();
    const curPos = e.target.value;
    const newConstraint = getConstraint(curPos)
    setConstraints(newConstraint);
    setUsedProps([newConstraint[0]]);
    setArtiConfig(resetViceProps(curPos))
  }

  const handleMainPropChange = (e) => {
    e.preventDefault();
    setArtiConfig(resetViceProps(artiConfig.position, e.target.value))
    setUsedProps([constraints[e.target.value]])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const artiInfo = getParsedArtiConfig(artiConfig, constraints);
    console.log("artiInfo", artiInfo)
    axios.post("/artifact_generator/teyvat", artiInfo).then((res) => {
      // setArtifact(res.data.data)
    })
  }

  const GenerateViceProps = () => {

    const vicePropHandler = (e, idx) => {
      e.preventDefault();
      const curIdx = e.target.value;
      const newViceProps = [...artiConfig.vice_props];
      newViceProps[idx - 1] = curIdx;
      setUsedProps(getNewUsedProps(usedProps, curIdx, artiConfig.vice_props[idx-1]))
      setArtiConfig({...artiConfig, ["vice_props"]: newViceProps})
    }

    const viceCountHandler = (e, idx, operation) => {
      e.preventDefault();
      console.log(idx, operation)
      const newViceCounts = [...artiConfig.vice_counts];
      console.log(newViceCounts)
      newViceCounts[idx - 1] += operation;
      setArtiConfig({...artiConfig, ["vice_counts"]: newViceCounts})
    }

    return (
      <>
        {[1, 2, 3, 4].map((idx) => {
          return (
            <>
              <Grid item xs={7}>
                <VicePropInput sx={{m: 1, minWidth: 120}}>
                  <InputLabel className={classes.root}>Secondary Property {idx}</InputLabel>
                  <Select value={artiConfig.vice_props[idx - 1]} label={`Secondary Prop ${idx}`}
                          onChange={(e) => vicePropHandler(e, idx)} className={classes.root}>
                    <MenuItem value={0} className={classes.root}>Not Selected</MenuItem>
                    {VICE_PROP_TYPE.map((each, index) =>
                      <MenuItem key={each} value={index+1} disabled={usedProps.includes(each)}
                                className={classes.root}>{each}</MenuItem>
                    )}
                  </Select>
                </VicePropInput>
              </Grid>

              <Grid item xs={5}>
                <StyledButtonGroup size="large" aria-label="small outlined button group">
                  <Button onClick={(e) => viceCountHandler(e, idx, -1)}
                          disabled={artiConfig.vice_counts[idx - 1] <= 1}>-</Button>
                  {<Button disabled>{artiConfig.vice_counts[idx - 1]}</Button>}
                  <Button onClick={(e) => viceCountHandler(e, idx, +1)}
                          disabled={(!isEnhanceAble(artiConfig))}>+</Button>
                </StyledButtonGroup>
              </Grid>
            </>
          )
        })}
      </>
    )
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={6}>
          <h4>Editor</h4>
          <form onSubmit={handleSubmit}>

            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.root}>Artifact Position</FormLabel>
              <RadioGroup row value={artiConfig["position"]} onChange={handlePositionChange}>
                {ARTIFACT_POSITIONS.map((pos) => <FormControlLabel value={pos} control={<Radio/>}
                                                                   className={classes.root} label={ucFirst(pos)}/>)}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 120}}>
              <InputLabel id="demo-simple-select-helper-label" className={classes.root}>Main Property</InputLabel>
              <Select value={artiConfig.main_prop} onChange={handleMainPropChange}>
                {constraints.map((each, index) => (
                  <MenuItem key={each} value={index} className={classes.root}>{each}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={1}>
              <GenerateViceProps/>
            </Grid>

            <Button variant="contained" type="submit" className="submit_button">Generate</Button>
          </form>
        </Grid>

        <Grid item xs={6}>
          <h4>Artifact "Screenshot"</h4>
          {!!artifact ? <SImg src={`data:image/png;base64,${artifact}`}/> : <SImg src={background}/>}
        </Grid>
      </Grid>
    </>
  )
}
