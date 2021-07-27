import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import keycloakConfig from '../config/keycloakConfig';
import Config from '../config';
import UserProfileUpdateRequest from './model/userProfileUpdateRequest';

export const saleseazeApi = createApi({
  reducerPath: 'saleseazeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.root.SALESEAZE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      if (!keycloakConfig.isTokenExpired()) {
        headers.set('Authorization', `Bearer ${keycloakConfig.token}`);
      } else {
        keycloakConfig.login();
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => `profiles/me`
    }),
    updateMyProfile: builder.mutation<void, Partial<UserProfileUpdateRequest>>({
      query: ({ ...body }) => ({
        url: `profiles/me`,
        method: 'PUT',
        body
      })
    })
  })
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } =
  saleseazeApi;
