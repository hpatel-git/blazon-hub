import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import CardBody from '../../components/Card/CardBody';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      fontSize: 14
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    pageSelectionWrapper: {
      marginTop: theme.spacing(2)
    }
  })
);
interface PostSettingsProps {
  formik: any;
}
export default function PostTicker(props: PostSettingsProps) {
  const classes = useStyles();
  const { formik } = props;

  const defaultProps = {
    // bgcolor: '#D5D9DC',
    borderColor: '#D5D9DC',
    pt: 2,
    border: 1,
    shadows: 12
  };
  return (
    <div className={classes.root}>
      <CardBody>
        <div className={classes.pageSelectionWrapper}>
          <Box
            display="flex"
            justifyContent="center"
            component="div"
            borderRadius="borderRadius"
            {...defaultProps}
          >
            <Box component="div">
              <TextField
                id="publishTime"
                name="publishTime"
                label="Publish Time"
                type="datetime-local"
                onChange={formik.handleChange}
                value={formik.values.publishTime}
                className={classes.textField}
                inputProps={{
                  onChange: formik.handleChange
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
          </Box>
        </div>
      </CardBody>
    </div>
  );
}
