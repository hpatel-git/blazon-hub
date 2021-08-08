import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { useScrapeUrlQuery } from '../../api/saleseazeApi';
import { Box, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ScrapeUrlResponse from '../../api/model/scrapeUrlResponse';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    detailWrapper: {
      margin: theme.spacing(3)
    },
    title: {
      fontWeight: 'bold'
    },
    description: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  })
);
interface PostImagePreviewProps {
  ogImage: string;
}
export default function PostImagePreview(props: PostImagePreviewProps) {
  const defaultProps = {
    bgcolor: '#D5D9DC',
    borderColor: '#D5D9DC',
    m: 1,
    border: 1,
    shadows: 12
  };
  const isScraperDisplayRequired = (scrapeData?: ScrapeUrlResponse) => {
    if (
      scrapeData !== undefined &&
      scrapeData.image === undefined &&
      scrapeData.description === undefined &&
      scrapeData.site_name === undefined &&
      scrapeData.title === undefined
    ) {
      return false;
    }
    return true;
  };
  const classes = useStyles();
  const { ogImage } = props;
  const scrapeUrlQuery = useScrapeUrlQuery(ogImage);

  return (
    <React.Fragment>
      {scrapeUrlQuery.isFetching && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
      {!scrapeUrlQuery.isFetching &&
        isScraperDisplayRequired(scrapeUrlQuery.data) && (
          <Box borderRadius="borderRadius" {...defaultProps}>
            <Grid container>
              {!scrapeUrlQuery.isFetching &&
                scrapeUrlQuery.data &&
                scrapeUrlQuery.data.image && (
                  <Grid item xs={12}>
                    <CardMedia
                      className={classes.media}
                      image={scrapeUrlQuery.data.image}
                      title="Paella dish"
                    />
                  </Grid>
                )}
              <Grid item xs={12}>
                <div className={classes.detailWrapper}>
                  <div>
                    {!scrapeUrlQuery.isFetching &&
                    scrapeUrlQuery.data &&
                    scrapeUrlQuery.data.site_name
                      ? scrapeUrlQuery.data.site_name
                      : ''}
                  </div>
                  <div className={classes.title}>
                    {!scrapeUrlQuery.isFetching &&
                    scrapeUrlQuery.data &&
                    scrapeUrlQuery.data.title
                      ? scrapeUrlQuery.data.title
                      : ''}
                  </div>

                  <div className={classes.description}>
                    {!scrapeUrlQuery.isFetching &&
                    scrapeUrlQuery.data &&
                    scrapeUrlQuery.data.description
                      ? scrapeUrlQuery.data.description
                      : ''}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        )}
    </React.Fragment>
  );
}
