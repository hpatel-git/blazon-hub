import { KeycloakProfile } from 'keycloak-js';
type UserExtraAttributes = {
  country: string[];
  city?: string[];
  postalCode?: string[];
  aboutMe?: string[];
  phoneNumber?: string[];
  isRegistrationComplete?: string[];
};

type UserExtraAttributesResponse = {
  country: string;
  city: string;
  postalCode: string;
  aboutMe: string;
  phoneNumber: string;
  isRegistrationComplete: string;
};

const generateUserExtraAttribute = (
  userProfile?: KeycloakProfile
): UserExtraAttributesResponse => {
  let userAttributes = undefined;
  for (const [key, value] of Object.entries(userProfile ? userProfile : '')) {
    if (key === 'attributes') {
      userAttributes = value as UserExtraAttributes;
      break;
    }
  }
  const city =
    userAttributes && userAttributes.city && userAttributes.city.length > 0
      ? userAttributes.city[0]
      : '';
  const country =
    userAttributes &&
    userAttributes.country &&
    userAttributes.country.length > 0
      ? userAttributes.country[0]
      : '';
  const postalCode =
    userAttributes &&
    userAttributes.postalCode &&
    userAttributes.postalCode.length > 0
      ? userAttributes.postalCode[0]
      : '';
  const aboutMe =
    userAttributes &&
    userAttributes.aboutMe &&
    userAttributes.aboutMe.length > 0
      ? userAttributes.aboutMe[0]
      : '';
  const phoneNumber =
    userAttributes &&
    userAttributes.phoneNumber &&
    userAttributes.phoneNumber.length > 0
      ? userAttributes.phoneNumber[0]
      : '';
  const isRegistrationComplete =
    userAttributes &&
    userAttributes.isRegistrationComplete &&
    userAttributes.isRegistrationComplete.length > 0
      ? userAttributes.isRegistrationComplete[0]
      : '';
  return {
    city: city,
    country: country,
    postalCode: postalCode,
    aboutMe: aboutMe,
    phoneNumber: phoneNumber,
    isRegistrationComplete: isRegistrationComplete
  };
};

const isUserRegistrationComplete = (userProfile?: KeycloakProfile): boolean => {
  let userAttributes = undefined;
  for (const [key, value] of Object.entries(userProfile ? userProfile : '')) {
    if (key === 'attributes') {
      userAttributes = value as UserExtraAttributes;
      break;
    }
  }
  const isComplete =
    userAttributes &&
    userAttributes.isRegistrationComplete &&
    userAttributes.isRegistrationComplete.length > 0
      ? userAttributes.isRegistrationComplete[0] === 'true'
      : false;
  console.log(isComplete);
  return isComplete;
};
export { generateUserExtraAttribute, isUserRegistrationComplete };
