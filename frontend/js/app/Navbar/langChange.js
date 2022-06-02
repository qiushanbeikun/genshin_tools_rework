import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Box} from "@mui/material";
import i18n from "i18next";

const LANGUAGES = [
  {name: "en", text: "English"},
  {name: "zh", text: "简体中文"},
]

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangChange = (e, lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Box sx={{display: 'inline-flex'}}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        文/EN
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem onClick={(e) => handleLangChange(e, language.name)}>{language.text}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
