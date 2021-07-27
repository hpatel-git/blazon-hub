import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import Config from '../config';

export const saleseazeApi = createApi({
  reducerPath: 'saleseazeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.root.SALESEAZE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.userToken;
      console.log(`Preparing header ${token}`);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => `profiles/me`
    })
  })
});

export const { useGetMyProfileQuery } = saleseazeApi;
