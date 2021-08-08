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
  accountId: string;
  companyId: string;
  pageId: string;
  message: string;
  link: string;
  response: any;
  responseStatus: string;
  status: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogSiteName?: string;
}
export interface PublishPostPageResponse {
  content: PublishPost[];
  last: boolean;
  totalElements: number;
  totalPages: number;
}
export type PublishPostResponse = PublishPost[];

export default PublishPostRequest;
