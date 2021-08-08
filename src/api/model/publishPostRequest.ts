interface PublishPostRequest {
  link?: string;
  message: string;
  publishTime: string;
  pageIds: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
}

export interface PublishPost {
  id: string;
  companyId: string;
  message: string;
  link: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
  publishDetails: PublishDetails[];
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
export interface PublishDetails {
  accountId: string;
  pageId: string;
  pageName: string;
  response: any;
  responseStatus: string;
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}
export interface PublishPostPageResponse {
  content: PublishPost[];
  last: boolean;
  totalElements: number;
  totalPages: number;
}
export type PublishPostResponse = PublishPost[];

export default PublishPostRequest;
