import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      width: 300,
      paddingTop: '23%', // 16:9,
      marginTop: '30'
    },
    detailWrapper: {
      margin: theme.spacing(3)
    },
    title: {
      fontWeight: 'bold'
    },
    description: {
      width: 300,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  })
);
interface SocialPostItemProps {
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
}
export default function SocialPostItem(props: SocialPostItemProps) {
  const defaultProps = {
    bgcolor: '#D5D9DC',
    borderColor: '#D5D9DC',
    width: 320,
    m: 1,
    border: 1,
    shadows: 12
  };
  const { ogImage, ogTitle, ogDescription, ogSiteName } = props;
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
        <Grid container>
          {ogImage && (
            <Grid item xs={12}>
              <CardMedia
                className={classes.media}
                image={ogImage}
                title="Paella dish"
              />
            </Grid>
          )}
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
      )}
    </React.Fragment>
  );
}
