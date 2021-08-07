interface FacebookPage {
  id: string;
  accountId: string;
  companyId: string;
  category: string;
  name: string;
  tasks: Array<string>;
  categoryList: Array<FBPageCategory>;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
interface FBPageCategory {
  id: string;
  name: string;
}
export type FacebookPageResponse = FacebookPage[];
export default FacebookPage;
