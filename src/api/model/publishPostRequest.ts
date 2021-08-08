interface PublishPostRequest {
  link?: string;
  message: string;
  publishTime: string;
  pageIds: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
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
}
export type PublishPostResponse = PublishPost[];
export default PublishPostRequest;
/**
 *  val message: String,
    val link: String?,
    var publishTime: String,
    var pageIds: List<String>
 */
