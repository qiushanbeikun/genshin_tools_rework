import * as React from 'react';
import { Typography } from '@mui/material';

export function Desc() {
  return (
    <>
      <a href="http://www.qiushanbeikun.com" target="_blank" rel="noopener noreferrer">
        <Typography>By QiushanBeikun</Typography>
      </a>
      <div>
        <Typography>
          {'This site is a fun site of '}
          <a href="https://ys.mihoyo.com/" target="_blank">
            Genshin Impact
          </a>
          {'. All associated names and images are property of '}
          <a href="https://www.mihoyo.com/" target="_blank">
            Mihoyo(China)
          </a>
          {' or '}
          <a href="https://www.hoyoverse.com/" target="_blank">
            HoyoVerse
          </a>
          .
        </Typography>
      </div>
      <br />
      <Typography>
        For any issue please contact <a href="mailto:beikuncanada@gmail.com">author</a> or join the
        QQ group (TBA).
      </Typography>

      <br />
      <Typography paragraph>
        Localization contribution is welcomed on
        <a href="https://github.com/qiushanbeikun/genshin_tools_rework">{' Github. '}</a>
        For any text not written in your language, please kindly use
        <a href="https://translate.google.com/">{' Google Translate'}</a>
      </Typography>

      <Typography paragraph>
        中文本地化未完全完成，欢迎在
        <a href="https://github.com/qiushanbeikun/genshin_tools_rework">{'Github'}</a>
        上参与贡献本地化文本，或请使用
        <a href="https://translate.google.com/">{'谷歌翻译'}</a>。
      </Typography>
    </>
  );
}
