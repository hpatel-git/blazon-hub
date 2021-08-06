import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { useScrapeUrlQuery } from '../../api/saleseazeApi';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    }
  })
);
interface PostImagePreviewProps {
  ogImage: string;
}
export default function PostImagePreview(props: PostImagePreviewProps) {
  const classes = useStyles();
  const { ogImage } = props;
  const scrapeUrlQuery = useScrapeUrlQuery(ogImage);
  console.log(scrapeUrlQuery.data);
  return (
    <React.Fragment>
      {scrapeUrlQuery.isFetching && <CircularProgress />}
      {!scrapeUrlQuery.isFetching &&
        scrapeUrlQuery.data &&
        scrapeUrlQuery.data.image && (
          <CardMedia
            className={classes.media}
            image={scrapeUrlQuery.data.image}
            title="Paella dish"
          />
        )}
    </React.Fragment>
  );
}
