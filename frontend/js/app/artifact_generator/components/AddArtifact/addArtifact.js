import * as React from "react";
import {Box, Grid, TextField, Typography} from "@mui/material";
import {FormikProvider, useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store";
import {INDEX_TO_NAME_POSITION, INITIAL_FORM_VALUE} from "./constants";
import PositionInput from "./positionInput";


export default function AddArtifact() {

  const {t} = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values) => {
    const payload = {...values};
    payload.contributor = auth.account.email;
    const headers = {Authorization: auth.token ? `JWT ${auth.token}` : null}
    console.log(payload, headers);
  }

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUE,
    onSubmit: handleSubmit,

  })

  return (
    <Box maxWidth="lg" sx={{m: "1em auto"}}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FormikProvider value={formik}>
            <form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h4" paragraph>Properties</Typography>
                </Grid>
                <>

                  <Grid item xs={3}>
                    Title
                  </Grid>
                  <Grid item xs={7}>
                    <TextField value={formik.values.title} name="title" onChange={formik.handleChange}
                               variant="standard"/>
                  </Grid>
                  {[0, 1, 2, 3, 4].map((index) => <PositionInput index={index}/>)}

                  <Grid item xs={3}>
                    2-Set Bonus
                  </Grid>
                  <Grid item xs={7}>
                    <TextField value={formik.values.two_set_buff} name="title" onChange={formik.handleChange}
                               variant="standard" multiline rows={3}/>
                  </Grid>
                  <Grid item xs={3}>
                    4-Set Bonus
                  </Grid>
                  <Grid item xs={7}>
                    <TextField value={formik.values.four_set_buff} name="title" onChange={formik.handleChange}
                               variant="standard" multiline rows={3}/>
                  </Grid>
                  <Grid item xs={3}>
                    Description
                  </Grid>
                  <Grid item xs={7}>
                    <TextField value={formik.values.desc} name="title" onChange={formik.handleChange} variant="standard"
                               multiline rows={3}/>
                  </Grid>
                </>

              </Grid>
              
            </form>
          </FormikProvider>
        </Grid>

        <Grid item xs={4}>
          <h3>Description</h3>
          <Typography paragraph>
            圣遗物上传说明
          </Typography>

          <Typography paragraph>
            由于已经有其他网站拥有完备的圣遗物图片，本站计划套用该网站的图片，因此暂时关闭本站上传通道.
          </Typography>

          <Typography paragraph>
            圣遗物为多人共同修改，由管理员审核后会开放使用。所有参与了编辑圣遗物的用户都会列于“贡献名单”中。
          </Typography>

          <Typography paragraph>
            仅注册会员可以添加/修改圣遗物模板。请勿恶意修改，后台由自动程序监控，发现后会自动封号。
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
