import React from 'react';
// @material-ui/core components
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PagesIcon from '@material-ui/icons/Pages';
import { useHistory } from 'react-router-dom';
import SyncIcon from '@material-ui/icons/Sync';
import purple from '@material-ui/core/colors/purple';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import AddAlert from '@material-ui/icons/AddAlert';
import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import {
  useFetchAccountPagesQuery,
  useInitiateSyncPagesMutation
} from '../../api/saleseazeApi';
import Snackbar from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    facebookIconStyle: {
      display: 'flex',
      flexDirection: 'column',
      '& .kep-login-facebook.metro': {
        width: '100%',
        borderRadius: 2,
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'none',
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingRight: 10,
        '& svg': {
          margin: '10px 10px 10px 10px'
        }
      }
    },
    cardCategoryWhite: {
      '&,& a,& a:hover,& a:focus': {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0'
      },
      '& a,& a:hover,& a:focus': {
        color: '#FFFFFF'
      }
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    },
    cardAction: {
      float: 'right',
      color: '#FFFFFF',
      marginTop: '-10px'
    },
    cardTitle: {
      float: 'left',
      color: '#FFFFFF'
    },
    link: {
      display: 'flex'
    },
    cardTitleWhite: {
      color: '#FFFFFF',
      marginTop: '0px',
      minHeight: 'auto',
      fontWeight: 300,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: '3px',
      textDecoration: 'none',
      '& small': {
        color: '#777',
        fontSize: '65%',
        fontWeight: 400,
        lineHeight: 1
      }
    }
  })
);
type SocialPageParam = {
  accountId: string;
};

function SocialPages(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<SocialPageParam>();
  const handleRoute = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    history.push('/admin/accounts');
    event.preventDefault();
  };

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const fetchAccountPagesQuery = useFetchAccountPagesQuery(params.accountId);
  const [initiateSyncPages] = useInitiateSyncPagesMutation();
  const showSuccessMessage = (message: string) => {
    setIsSuccess(true);
    setSuccessMessage(message);
  };
  const handleError = (e: any, defaultMessage: string) => {
    if ('data' in e) {
      setErrorMessage(e.data.message);
    } else {
      setErrorMessage(defaultMessage);
    }
    setIsError(true);
  };

  const syncPages = async () => {
    try {
      if (!params.accountId) {
        return;
      }
      await initiateSyncPages(params.accountId).unwrap();
      fetchAccountPagesQuery.refetch();

      showSuccessMessage('Pages sync successfully');
    } catch (e) {
      handleError(e, 'Error while sync pages');
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color="inherit"
            href="/"
            onClick={handleRoute}
            className={classes.link}
          >
            <AccountTreeIcon className={classes.icon} />
            Social Accounts
          </Link>
          <Link color="inherit" href="#" className={classes.link}>
            <PagesIcon className={classes.icon} />
            {params.accountId}
          </Link>
        </Breadcrumbs>
        <Snackbar
          place="bc"
          color="success"
          icon={AddAlert}
          message={successMessage}
          open={isSuccess}
          closeNotification={() => {
            setIsSuccess(false);
            setSuccessMessage('');
          }}
          close={true}
        />
        <Snackbar
          place="bc"
          color="danger"
          icon={AddAlert}
          message={errorMessage}
          open={isError}
          closeNotification={() => {
            setIsError(false);
            setErrorMessage('');
          }}
          close={true}
        />
        <Card>
          <CardHeader color="primary">
            <div className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>Social Pages</h4>
            </div>
            <div className={classes.cardAction}>
              <Tooltip title="Sync Pages">
                <IconButton aria-label="Sync Pages" onClick={syncPages}>
                  <SyncIcon style={{ color: purple[50] }} />
                </IconButton>
              </Tooltip>
            </div>
          </CardHeader>

          <CardBody>
            {fetchAccountPagesQuery.isFetching && <CircularProgress />}
            {!fetchAccountPagesQuery.isFetching &&
              fetchAccountPagesQuery.data && (
                <Table
                  tableHeaderColor="primary"
                  hasAction={false}
                  hasLink={false}
                  tableHead={[
                    'Id',
                    'Name',
                    'Category',
                    'Modified By',
                    'Modified Date'
                  ]}
                  tableData={fetchAccountPagesQuery.data?.map((item) => [
                    item.id,
                    item.name,
                    item.category,
                    item.modifiedBy,
                    item.modifiedDate
                  ])}
                />
              )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default SocialPages;
