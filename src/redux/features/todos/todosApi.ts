/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { TTask } from "../../../types/todos.types";
import { baseApi } from "../../api/baseApi";

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/tasks`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TTask[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getUsersTodo: builder.query<any, string>({
      query: (authorId) => {
        return {
          url: `/tasks/${authorId}/getUserTask`,

          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TTask[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    update: builder.mutation<TTask, { taskId: string; updatedData: TTask }>({
      query: ({ taskId, updatedData }) => ({
        url: `/tasks/${taskId}`, // Replace with your actual update endpoint
        method: "PUT",
        body: updatedData,
      }),
    }),

    deleteTodo: builder.mutation<ResponseType, string[]>({
      query: (ids) => ({
        url: `/tasks/tasksIds`,
        method: "DELETE",
        body: ids,
      }),
    }),
  }),
});

const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<TTask[], void>({
      query: (shoesData) => ({
        url: "/shoes/create-shoes",
        method: "POST",
        body: shoesData,
      }),
    }),
  }),
});

export const { useGetAllTodosQuery, useUpdateMutation, useDeleteTodoMutation } =
  todoApi;
export const { useCreateProductMutation } = createProductApi;
