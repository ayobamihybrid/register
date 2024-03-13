import { apiSlice } from '../apiSlice';
import { userLoggedIn, userLoggedOut, userRegistration } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data?.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_code, activation_token }) => ({
        url: 'activation',
        method: 'POST',
        body: { activation_code, activation_token },
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: 'sign-in',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    logout: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include',
      }),

      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogoutQuery,
} = authApi;
