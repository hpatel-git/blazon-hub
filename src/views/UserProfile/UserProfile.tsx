import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButtons/Button';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardAvatar from '../../components/Card/CardAvatar';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';

import avatar from '../../assets/img/faces/marc.jpg';
import { createStyles } from '@material-ui/core';
import { useAppSelector } from '../../redux/hooks';

import * as yup from 'yup';
import { useFormik } from 'formik';

const styles = createStyles({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
});
const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  firstName: yup
    .string()
    .min(3, 'FirstName should be of minimum 3 characters length')
    .required('FirstName is required'),
  lastName: yup
    .string()
    .min(3, 'Last should be of minimum 3 characters length')
    .required('LastName is required'),
  username: yup
    .string()
    .min(3, 'UserName should be of minimum 3 characters length')
    .required('UserName is required')
});

function UserProfile(props: any) {
  const { classes } = props;
  const userProfile = useAppSelector((state) => state.auth.userProfile);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userProfile?.email,
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      username: userProfile?.username
    },
    validationSchema: validationSchema,
    validate: (values) => {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="User Name"
                      id="username"
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      errorMessage={formik.errors.username}
                      inputProps={{
                        name: 'username',
                        label: 'User Name',
                        value: `${formik.values.username}`,
                        onChange: formik.handleChange,
                        helpertext: `${
                          formik.touched.username && formik.errors.username
                        }`
                      }}
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      errorMessage={formik.errors.email}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      inputProps={{
                        name: 'email',
                        label: 'Email',
                        value: `${formik.values.email}`,
                        onChange: formik.handleChange,
                        helpertext: `${
                          formik.touched.email && formik.errors.email
                        }`
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      errorMessage={formik.errors.firstName}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      inputProps={{
                        name: 'firstName',
                        label: 'First Name',
                        value: `${formik.values.firstName}`,
                        onChange: formik.handleChange,
                        helpertext: `${
                          formik.touched.firstName && formik.errors.firstName
                        }`
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      errorMessage={formik.errors.lastName}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      id="lastName"
                      inputProps={{
                        name: 'lastName',
                        label: 'Last Name',
                        value: `${formik.values.lastName}`,
                        onChange: formik.handleChange,
                        helpertext: `${
                          formik.touched.lastName && formik.errors.lastName
                        }`
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText=""
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!formik.dirty}
                  onClick={() => formik.submitForm()}
                >
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile={true}>
              <CardAvatar profile={true}>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile={true}>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>{userProfile?.firstName}</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round={true}>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
