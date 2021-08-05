import React from 'react';
// @material-ui/core components
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Table from '../../components/Table/Table';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import AddAlert from '@material-ui/icons/AddAlert';
import { CircularProgress } from '@material-ui/core';
import { useFetchAccountPagesQuery } from '../../api/saleseazeApi';
import Snackbar from '../../components/Snackbar/Snackbar';

const connectToSocialAccountsStyle = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps
  extends WithStyles<typeof connectToSocialAccountsStyle> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const styles = createStyles({
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
  cardAction: {
    float: 'right',
    color: '#FFFFFF',
    marginTop: '0px'
  },
  cardTitle: {
    float: 'left',
    color: '#FFFFFF'
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
});
type SocialPageParam = {
  accountId: string;
};

function SocialPages(props: any) {
  const { classes } = props;
  const params = useParams<SocialPageParam>();

  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const fetchAccountPagesQuery = useFetchAccountPagesQuery(params.accountId);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
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

export default withStyles(styles)(SocialPages);
