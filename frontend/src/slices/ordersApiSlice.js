import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),
    payOrder: builder.mutation({
      query: ({ id, paymentResult }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: 'PUT',
        body: paymentResult,
      }),
    }),
    deliverOrder: builder.mutation({
      query: id => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation } = ordersApiSlice;