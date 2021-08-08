import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Card, CardContent } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDistance } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Linkify from 'linkifyjs/react';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Avatar, IconButton } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      width: 300,
      paddingTop: '45%', // 16:9,
      marginTop: '30'
    },
    detailWrapper: {
      margin: theme.spacing(3)
    },
    root: {
      flex: 1,
      margin: theme.spacing(2)
    },
    title: {
      fontWeight: 'bold'
    },
    description: {
      width: 300,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);
interface SocialPostItemProps {
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  message: string;
}
export default function SocialPostItem(props: SocialPostItemProps) {
  const { ogImage, ogTitle, ogDescription, ogSiteName, message } = props;
  const isScraperDisplayRequired = () => {
    if (
      ogImage === undefined &&
      ogTitle === undefined &&
      ogDescription === undefined &&
      ogSiteName === undefined
    ) {
      return false;
    }
    return true;
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      {isScraperDisplayRequired() && (
        <Card className={classes.root}>
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
            title="Saleseaze Post Preview"
            subheader={formatDistance(new Date(), new Date(), {
              addSuffix: true
            })}
          />
          <CardContent>
            <Grid container direction="column">
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ whiteSpace: 'pre-line' }}
                  paragraph={true}
                  component="p"
                >
                  <Linkify>{message}</Linkify>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {ogImage && (
                  <CardMedia
                    className={classes.media}
                    image={ogImage}
                    title={ogImage}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <div className={classes.detailWrapper}>
                  <div>{ogSiteName ? ogSiteName : ''}</div>
                  <div className={classes.title}>{ogTitle ? ogTitle : ''}</div>
                  <div className={classes.description}>
                    {ogDescription ? ogDescription : ''}
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
}
