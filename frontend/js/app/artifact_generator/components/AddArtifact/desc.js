import * as React from "react";
import {Grid, Typography} from "@mui/material";

export default function Desc() {
  return (
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
      <Typography paragraph>
        对于多行的文本，系统会自动记录换行和缩进。或在输入时加入“\n”分隔符以及对应的空格。
      </Typography>
      <Typography paragraph>
        Flower - Cup 为对应圣遗物位的名称，如：“雷云之笼”。
      </Typography>

      <Typography paragraph>
        Image Path 为对应图片的后端路径，若没有对应的圣遗物图片，则为未更新，将此处留空。
        通常为圣遗物的英文名称，可以查看
        <a
          href="https://github.com/qiushanbeikun/genshin_tools_rework/tree/master/backend/artifact_generator/assets/artifacts"
          target="_blank">
          {` Github Repo `}
        </a>
        的backend/artifact_generator/assets/artifact 路径下的文件。
      </Typography>
      <Typography paragraph>
        当前本站的圣遗物图片来自于
        <a href="https://github.com/wormtql/genshin_artifact" target="_blank">
          莫娜占卜铺
        </a>
      </Typography>
    </Grid>
  )
}
