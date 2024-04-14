import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_FEATURE_FLAG } from '../../utils/constants/constants';
import { FeatureFlag } from '../../types/contextTypes/contextTypes';

export const featureFlagApi = createApi({
  reducerPath: 'featureFlagAPI',
  baseQuery: fetchBaseQuery({
    method: 'GET',
    baseUrl: process.env.REACT_APP_FEATURE_FLAG_API_URL,
  }),
  endpoints: (builder) => ({
    getFeatureFlag: builder.query<FeatureFlag, void>({
      query: () => ({
        url: API_FEATURE_FLAG,
      }),
    }),
  }),
});

export const { useGetFeatureFlagQuery } = featureFlagApi;
