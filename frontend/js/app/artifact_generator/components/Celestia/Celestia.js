import * as React from 'react';
import { Fragment, useRef, useState } from 'react';
import { Box, Button, Checkbox, Grid } from '@mui/material';
import ReactCrop from 'react-image-crop';
import Modal from 'react-modal';
import { DEFAULT_CROP_SIZE, INITIAL_INPUT_VALUES, INPUT_FIELDS } from './constants';
import imgTemplate from '../../../../../assets/images/artifact_generator/celestia_template.png';
import { GenshinStyles } from '../../../../theme';
import axios from 'axios';
import { getCroppedImg } from './imgProcess';
import { SImg, StyledPreview, StyledTextField } from '../../styles';
import i18n from '../../../../localization/i18n';
import BtnGroup from '../btnGroup';

export default function Celestia() {
  const classes = GenshinStyles();
  const [artifactProfile, setArtifactProfile] = useState();
  const [inputFields, setInputFields] = useState(INITIAL_INPUT_VALUES);
  const [imgPath, setImgPath] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImg, setCroppedImg] = useState();
  const [crop, setCrop] = useState(DEFAULT_CROP_SIZE);
  const imgRef = useRef();

  const clearFields = () => setInputFields(INITIAL_INPUT_VALUES);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleBlankRuleChange = (e) => {
    setInputFields({ ...inputFields, allowBlank: e.target.checked });
  };

  const handleImgUpload = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setImgPath(URL.createObjectURL(e.target.files[0]));
      setIsModalOpen(true);
    }
  };

  const handleCropComplete = (c) => {
    getCroppedImg(imgRef.current, c).then(([img, imgBase64]) => {
      setCroppedImg(img);
      setInputFields({ ...inputFields, photo: imgBase64.split('base64,')[1] });
    });
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const haveEmpty = Object.keys(inputFields).reduce((acc, cur) => acc && cur !== '', true);
    if (!inputFields.allowBlank && haveEmpty) {
      alert('at least one input is empty');
      // todo highlight the empty inputs
    } else {
      const { data } = await axios.post('/artifact_generator/celestia/', inputFields);
      setArtifactProfile(data.data);
    }
  };

  const handleModifyCrop = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const GenerateFormRow = ({ name, text }) => {
    return (
      <Fragment key={`${name}_${text}`}>
        <Grid item xs={4}>
          <p>{text}</p>
        </Grid>
        <Grid item xs={8}>
          <StyledTextField
            name={name}
            value={inputFields[name]}
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
      </Fragment>
    );
  };

  return (
    <div>
      <Grid container spacing={{ xs: 5, md: 1 }} className={classes.root}>
        <Grid item xs={7}>
          <h4>{i18n.t('generator_ui:editor')}</h4>

          <form onSubmit={submitHandler}>
            <Grid container spacing={{ xs: 2, my: 1 }}>
              <Grid item xs={4}>
                <p>{i18n.t('generator_ui:allow_blank')}</p>
              </Grid>
              <Grid item xs={8}>
                <Checkbox checked={inputFields['allowBlank']} onChange={handleBlankRuleChange} />
              </Grid>

              <Grid item xs={4}>
                <p>{i18n.t('generator_ui:artifact_photo')}</p>
              </Grid>
              <Grid item xs={8}>
                <input
                  type="file"
                  accept="image/*"
                  id="select_artifact_img"
                  onChange={handleImgUpload}
                />
                <button type="button" onClick={handleModifyCrop}>
                  {i18n.t('generator_ui:modify_crop')}
                </button>
              </Grid>

              <Grid item xs={4}>
                <p>{i18n.t('generator_ui:preview')}</p>
              </Grid>
              <Grid item xs={8}>
                {!!croppedImg ? (
                  <StyledPreview src={croppedImg} alt="whatever" />
                ) : (
                  <p>{i18n.t('generator_ui:preview_photo')}</p>
                )}
              </Grid>

              {INPUT_FIELDS.map((field) => GenerateFormRow(field))}

              <Grid item xs={4}>
                <p>{i18n.t('generator_ui:desc')}</p>
              </Grid>
              <Grid item xs={8}>
                <StyledTextField
                  name="desc"
                  value={inputFields.desc}
                  variant="standard"
                  onChange={handleInputChange}
                  multiline
                  rows={7}
                  maxRows={7}
                />
              </Grid>

              {/*<GenerateFormRow name="owner" text="Owner"/>*/}
              <Grid item xs={4}>
                <p>Owner</p>
              </Grid>
              <Grid item xs={8}>
                <StyledTextField
                  name="owner"
                  value={inputFields['owner']}
                  variant="standard"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <BtnGroup func={clearFields} />
          </form>
        </Grid>

        <Grid item xs={5}>
          <h4>{i18n.t('generator_ui:artifact_screenshot')}</h4>
          {!!artifactProfile ? (
            <SImg src={`data:image/png;base64,${artifactProfile}`} />
          ) : (
            <SImg src={imgTemplate} />
          )}
        </Grid>
      </Grid>

      <div>
        <Modal isOpen={isModalOpen} ariaHideApp={false}>
          <p>Image Crop</p>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={1}
          >
            <img src={imgPath} alt="img_to_crop" ref={imgRef} />
          </ReactCrop>
          <Button onClick={handleModalClose}>Crop And Close</Button>
        </Modal>
      </div>
    </div>
  );
}
