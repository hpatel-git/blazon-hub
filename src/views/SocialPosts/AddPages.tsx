import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  useFetchRegisteredSocialAccountsQuery,
  useLazyFetchAccountPagesQuery
} from '../../api/saleseazeApi';
import CardBody from '../../components/Card/CardBody';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import Table from '../../components/Table/Table';
import PageSelectionList from './PageSelectionList';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      fontSize: 14
    },
    pageSelectionWrapper: {
      marginTop: theme.spacing(2)
    }
  })
);
interface PostSettingsProps {
  formik: any;
}
export default function AddPages(props: PostSettingsProps) {
  const classes = useStyles();

  const socialAccountQuery = useFetchRegisteredSocialAccountsQuery();
  const [trigger, result] = useLazyFetchAccountPagesQuery();
  const { formik } = props;
  const handleRowClick = async (row: any) => {
    try {
      let accountId = row[0][0];
      console.log(accountId);
      await trigger(accountId);
    } catch (e) {}
  };
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
        {!socialAccountQuery.isFetching && socialAccountQuery.data && (
          <Table
            tableHeaderColor="primary"
            hasAction={false}
            hasLink={false}
            hasRowSelector={true}
            onRowClick={handleRowClick}
            tableHead={[
              'Account Name',
              'Provider',
              'Connected On',
              'Modified By'
            ]}
            tableData={socialAccountQuery.data?.map((item) => [
              [item.accountId],
              item.name,
              item.graphDomain,
              item.createdDate,
              item.modifiedBy
            ])}
          />
        )}
        <div className={classes.pageSelectionWrapper}>
          <Box
            display="flex"
            justifyContent="center"
            borderRadius="borderRadius"
            {...defaultProps}
          >
            <Box>
              <PageSelectionList formik={formik} data={result.data} />
            </Box>
          </Box>
        </div>
      </CardBody>
      {(socialAccountQuery.isFetching || result.isFetching) && (
        <CircularProgress />
      )}
    </div>
  );
}
