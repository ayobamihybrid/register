import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from './auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://duwitt-api-2e5c3d7db1f0.herokuapp.com/v1/',
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({
        url: 'get-user',
        method: 'GET',
        credentials: 'include',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: response?.data?.accessToken,
              user: response?.data?.user,
            })
          );
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
  }),
});

export const { useLoadUserQuery } = apiSlice;
