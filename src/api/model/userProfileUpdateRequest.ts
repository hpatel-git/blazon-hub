interface UserProfileUpdateRequest {
  userId?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  aboutMe?: string;
  phoneNumber?: string;
  companyDetails?: UserCompanyDetails;
}
interface UserCompanyDetails {
  companyName?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}
export default UserProfileUpdateRequest;
