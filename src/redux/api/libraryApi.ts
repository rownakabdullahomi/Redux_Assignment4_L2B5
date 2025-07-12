import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://library-management-backend-teal.vercel.app/api",
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["book", "borrow"],
  endpoints: (builder) => ({

    //. Get all books
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),

    //. Add books
    addBook: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["book"],
    }),

    
  }),
});

export const { useAddBookMutation } = libraryApi;
