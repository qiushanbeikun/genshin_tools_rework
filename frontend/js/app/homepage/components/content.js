import {GenshinStyles} from "../../../theme";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  styled,
  Collapse, CardActionArea, Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from "react";
import {Link} from "react-router-dom";

const StaticRLink = styled(Link)`
  text-decoration: none;
  color: #474747;
`;

const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Content(props) {
  const classes = GenshinStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={6}>
      <Card sx={{m: "1em"}}>
        <CardActionArea>
          <StaticRLink to="/artifact_generator" style={{textDecoration: 'none'}}>
            <CardHeader title={props.title}/>
          </StaticRLink>
        </CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width="400"
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.short_desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon/>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {props.long_desc.map((paragraph) => (
              <Typography paragraph>{paragraph}</Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}
