import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { formatDistance } from 'date-fns';
import CustomInput from '../../components/CustomInput/CustomInput';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import PostImagePreview from './PostImagePreview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    previewRoot: {
      maxWidth: 545
    },
    postTitle: {
      textAlign: 'center',
      fontSize: '0.875rem'
    },
    postSubTitle: {
      textAlign: 'center',
      fontSize: '0.875rem'
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    actionIcon: {
      marginLeft: 'auto'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);
interface PostSettingsProps {
  formik: any;
}
export default function PostSettings(props: PostSettingsProps) {
  const classes = useStyles();
  const { formik } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleKeyDown = async (e: any) => {
    if (e.keyCode === 13) {
      const links = linkify.find(e.target.value, 'url');
      if (links && links.length > 0) {
        const url = links[links.length - 1].value;
        formik.setFieldValue('ogUrl', encodeURIComponent(url));
      }
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.previewRoot}>
            <CardHeader
              titleTypographyProps={{
                classes: {
                  root: classes.postTitle
                }
              }}
              subheaderTypographyProps={{
                classes: {
                  root: classes.postSubTitle
                }
              }}
              // className={classes.postTitle}
              title={`Create Post`}
              subheader={formatDistance(new Date(), new Date(), {
                addSuffix: true
              })}
            />

            <CardContent>
              <CustomInput
                labelText=""
                id="content"
                errorMessage={formik.errors.content}
                error={formik.touched.content && Boolean(formik.errors.content)}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 10,
                  value: `${formik.values.content}`,
                  onChange: formik.handleChange,
                  onKeyDown: handleKeyDown,
                  placeholder: 'Write Something to Post',
                  helpertext: `${
                    formik.touched.content && formik.errors.content
                  }`
                }}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Typography variant="caption" component="p">
                Add to your post
              </Typography>
              <IconButton
                aria-label="Photo/Video"
                className={classes.actionIcon}
              >
                <PhotoLibraryIcon />
              </IconButton>
              <IconButton aria-label="Get WhatsApp messages">
                <WhatsAppIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.previewRoot}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  S
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />

            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ whiteSpace: 'pre-line' }}
                paragraph={true}
                component="p"
              >
                <Linkify>{formik.values.content}</Linkify>
              </Typography>
            </CardContent>
            <PostImagePreview ogImage={formik.values.ogUrl} />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
