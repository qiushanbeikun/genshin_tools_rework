import * as React from "react";
import {useRef, useState} from "react";
import {Button, Checkbox, Grid} from "@mui/material";
import ReactCrop from "react-image-crop";
import Modal from "react-modal";
import {DEFAULT_ARTIFACT_IMG_SIZE, INITIAL_INPUT_VALUES, INPUT_FIELDS} from "./constants";
import imgTemplate from "../../../../../assets/images/celestia_template.png";
import {GenshinStyles} from "../../../../theme";
import axios from "axios";
import {getCroppedImg} from "./imgProcess";
import {SImg, StyledPreview, StyledTextField} from "../../styles";


export default function Celestia() {

  const classes = GenshinStyles();

  const [artifactProfile, setArtifactProfile] = useState();
  const [inputFields, setInputFields] = useState(INITIAL_INPUT_VALUES);
  const [imgPath, setImgPath] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImg, setCroppedImg] = useState();
  const [crop, setCrop] = useState(DEFAULT_ARTIFACT_IMG_SIZE);
  const imgRef = useRef();

  const handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setInputFields({...inputFields, [name]: value})
  }

  const handleBlankRuleChange = (e) => {
    setInputFields({...inputFields, "allowBlank": e.target.checked});
  }

  const handleImgUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      setImgPath(URL.createObjectURL(e.target.files[0]));
      setIsModalOpen(true);
    }
  }

  const handleCropComplete = (c, pc) => {
    getCroppedImg(imgRef.current, c).then(([img, imgBase64]) => {
      setCroppedImg(img);
      setInputFields({...inputFields, "photo": imgBase64.split("base64,")[1]})
    })
  }

  const handleModalClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const haveEmpty = Object.keys(inputFields).reduce((acc, cur) => acc && cur !== "", true);
    if (!inputFields.allowBlank && haveEmpty) {
      alert("at least one input is empty")
      // todo highlight the empty inputs
    } else {
      axios.post("/artifact_generator/celestia/", inputFields).then((res) => {
        // todo: add spinner loading indicate for production
        // intentionally 2 second delay to test loading spin works
        // setTimeout(() => setArtifactProfile(res.data.data), 1000)
        setArtifactProfile(res.data.data)
      })
    }
  }

  const handleModifyCrop = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  const GenerateFormRow = ({name, text}) => {
    return (
      <>
        <Grid item xs={4}>
          <p>{text}</p>
        </Grid>
        <Grid item xs={8}>
          <StyledTextField name={name} value={inputFields[name]} variant="standard" onChange={handleInputChange}/>
        </Grid>
      </>
    )
  }

  return (
    <div>
      <Grid container spacing={{xs: 2, md: 1}} className={classes.root}>
        <Grid item xs={6}>
          <h4>Editor</h4>

          <form onSubmit={submitHandler}>
            <Grid container spacing={{xs: 2, my: 1}}>
              <Grid item xs={4}>
                <p>Allow Blank Fields?</p>
              </Grid>
              <Grid item xs={8}>
                <Checkbox checked={inputFields["allowBlank"]} onChange={handleBlankRuleChange}/>
              </Grid>

              <Grid item xs={4}>
                <p>Artifact Photo</p>
              </Grid>
              <Grid item xs={8}>
                <input type="file" accept="image/*" id="select_artifact_img" onChange={handleImgUpload}/>
                <button type="button" onClick={handleModifyCrop}>Modify Crop</button>
                {(!!croppedImg) ? <StyledPreview src={croppedImg} alt="whatever"/> : <p>Preview</p>}
              </Grid>

              {INPUT_FIELDS.map((field) => GenerateFormRow(field))}

              <Grid item xs={4}>
                <p>Description (Max 7 lines)</p>
              </Grid>
              <Grid item xs={8}>
                <StyledTextField name="desc" value={inputFields.desc} variant="standard"
                                 onChange={handleInputChange} multiline rows={7} maxRows={7}/>
              </Grid>

              {/*<GenerateFormRow name="owner" text="Owner"/>*/}
              <Grid item xs={4}>
                <p>Owner</p>
              </Grid>
              <Grid item xs={8}>
                <StyledTextField name="owner" value={inputFields["owner"]} variant="standard" onChange={handleInputChange}/>
              </Grid>

            </Grid>
            <Button variant="contained" type="submit" className="submit_button">Generate</Button>
          </form>
        </Grid>

        <Grid item xs={6}>
          <h4>{!!artifactProfile ? "Artifact \"Screenshot\"" : "Artifact Template"}</h4>
          {!!artifactProfile ? <SImg src={`data:image/png;base64,${artifactProfile}`}/> : <SImg src={imgTemplate}/>}
        </Grid>
      </Grid>

      <div>
        <Modal isOpen={isModalOpen}>
          <p>Image Crop</p>
          <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={handleCropComplete} aspect={1}>
            <img src={imgPath} alt="img_to_crop" ref={imgRef}/>
          </ReactCrop>
          <Button onClick={handleModalClose}>Crop And Close</Button>
        </Modal>
      </div>

    </div>
  )
}
