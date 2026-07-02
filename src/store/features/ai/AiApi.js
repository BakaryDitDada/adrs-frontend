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
    // getConversation: builder.query({
    //   query: (conversationId) => `/ai/conversations/${conversationId}`,
    //   providesTags: [{ type: 'AIChat', id: "LIST" }],
    // }),
    getConversations: builder.query({
      query: () => `/ai/conversations`,
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'AIChat', id: 'LIST' }],
    }),
    getConversation: builder.query({
      query: (conversationId) => {
        console.log("Conversation ID type ::: ", typeof(conversationId))
        if(conversationId) {
          return `/ai/conversations/${conversationId}`    
        }
        return `/ai/conversations`
      },
      transformResponse: (response) => response?.data,
      providesTags: [{ type: 'AIChat', id: 'LIST' }],
    }),
    removeConversation: builder.mutation({
      query: (id) => ({
        url: `ai/conversations/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: 'AIChat', id: 'LIST' }]
    }),
    getReports: builder.query({
      query: () => '/ai/reports',
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'AIReports', id: "LIST" }],
    })
  }),
  overrideExisting: true,
});

export const { 
  useGenerateReportMutation,
  useSendChatMessageMutation,
  useGetConversationQuery,
  useGetReportsQuery,
  useGetConversationsQuery,
  useRemoveConversationMutation
} = AiApi;