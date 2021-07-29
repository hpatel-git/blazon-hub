interface Company {
  id: string;
  companyName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
interface UserProfileResponse {
  company?: Company;
}

export default UserProfileResponse;
