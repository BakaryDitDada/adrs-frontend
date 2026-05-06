import { baseApiSlice } from '@/store/baseApiSlice';

export const AiApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateReport: builder.mutation({
      query: (query) => ({
        url: '/ai/reports',
        method: 'POST',
        body: { query },
      }),
      transformResponse: (response) => response.data,
    }),
    sendChatMessage: builder.mutation({
      query: ({ message, conversationId }) => ({
        url: '/ai/chat',
        method: 'POST',
        body: {
          message,
          conversationId: conversationId || null,
        },
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: [{ type: 'AIChat', id: "LIST" }],
    }),
    getConversation: builder.query({
      query: (conversationId) => `/ai/conversations/${conversationId}`,
      providesTags: [{ type: 'AIChat', id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const { 
  useGenerateReportMutation, 
  useSendChatMessageMutation,
  useGetConversationQuery,
} = AiApi;