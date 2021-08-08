import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Card, CardContent } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDistance } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Linkify from 'linkifyjs/react';
import { Box } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Avatar, IconButton } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      backgroundColor: 'white'
    },
    detailWrapper: {
      marginLeft: theme.spacing(3)
    },
    root: {
      flex: 1,
      margin: theme.spacing(2)
    },
    title: {
      fontWeight: 'bold'
    },
    message: {
      whiteSpace: 'pre-line',
      margin: theme.spacing(2)
    },
    description: {
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
    let isDisplayRequired = true;
    if (
      ogImage === undefined &&
      ogTitle === undefined &&
      ogDescription === undefined &&
      ogSiteName === undefined
    ) {
      isDisplayRequired = false;
    }
    if (
      ogImage === '' &&
      ogTitle === '' &&
      ogDescription === '' &&
      ogSiteName === ''
    ) {
      isDisplayRequired = false;
    }
    console.log(
      'ogImage:',
      ogImage,
      'ogTitle:',
      ogTitle,
      'ogDescription:',
      ogDescription,
      ' ogSiteName: ',
      ogSiteName
    );
    return isDisplayRequired;
  };
  const classes = useStyles();
  const defaultProps = {
    bgcolor: '#D5D9DC',
    borderColor: '#D5D9DC',
    m: 1,
    border: 1,
    shadows: 12
  };

  return (
    <React.Fragment>
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
                className={classes.message}
                paragraph={true}
                component="p"
              >
                <Linkify>{message}</Linkify>
              </Typography>
            </Grid>
            {isScraperDisplayRequired() && (
              <Grid item xs={12}>
                <Box borderRadius="borderRadius" {...defaultProps}>
                  <Grid container>
                    {ogImage && (
                      <Grid item xs={12}>
                        <CardMedia
                          className={classes.media}
                          image={ogImage}
                          title={ogImage}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <div className={classes.detailWrapper}>
                        <div>{ogSiteName ? ogSiteName : ''}</div>
                        <div className={classes.title}>
                          {ogTitle ? ogTitle : ''}
                        </div>
                        <div className={classes.description}>
                          {ogDescription ? ogDescription : ''}
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
