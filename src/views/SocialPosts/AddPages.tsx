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
import FacebookPage from '../../api/model/facebookPage';
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

  const [left, setLeft] = React.useState<FacebookPage[]>([]);
  const [right, setRight] = React.useState<FacebookPage[]>(
    formik.values.selectedPages
  );
  React.useEffect(() => {
    if (!result.isFetching) {
      const pages = result.data ? result.data : [];
      const notPresentInLeft = not(pages, left);
      const notPresentInRight = not(notPresentInLeft, right);
      const updatedLeft = [...left, ...notPresentInRight];
      setLeft(updatedLeft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  const not = (a: FacebookPage[], b: FacebookPage[]) => {
    return a.filter(
      (value: FacebookPage) =>
        b.findIndex((item: FacebookPage) => value.id === item.id) === -1
    );
  };
  const handleSelectedPages = (data: FacebookPage[]) => {
    setRight(data);
    formik.setFieldValue('selectedPages', data);
  };
  const handleRowClick = async (row: any) => {
    try {
      let accountId = row[0][0];
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
            component="div"
            borderRadius="borderRadius"
            {...defaultProps}
          >
            <Box component="div">
              <PageSelectionList
                formik={formik}
                left={left}
                setLeft={setLeft}
                right={right}
                setRight={handleSelectedPages}
              />
            </Box>
          </Box>
        </div>
      </CardBody>
      {(socialAccountQuery.isFetching || result.isFetching) && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
