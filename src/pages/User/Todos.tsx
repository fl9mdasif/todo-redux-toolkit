/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../types/global";
import { TTask } from "../../types/todos.types";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../redux/features/sales/salesApi";
import Modal from "antd/es/modal/Modal";
import {
  useGetAllTodosQuery,
  useUpdateMutation,
} from "@/redux/features/todos/todosApi";
import { useAddTodoMutation } from "@/redux/api/api";

export type TTableData = Partial<TTask>;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Todos = () => {
  const [createOrder, refetch] = useCreateOrderMutation();
  const [update] = useUpdateMutation();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedTotoId, setSelectedTotoId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openUpdateModal = (id: string) => {
    setIsOrderModalOpen(true);
    setSelectedTotoId(id);
    // console.log(id);
  };

  const handleOrderModalOk = () => {
    setIsOrderModalOpen(false);
    setSelectedTotoId(null);
  };

  const handleOrderModalCancel = () => {
    setIsOrderModalOpen(false);
    setSelectedTotoId(null);
  };

  const handleUpdateModalOk = () => {
    setIsUpdateModalOpen(false);
    setSelectedTotoId(null);
  };
  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
    setSelectedTotoId(null);
  };

  // create todos
  const onFinish = async (orderData: any) => {
    const toastId = toast.loading("Loading...");
    try {
      // Use the createShoes mutation to handle the API call
      const res: any = await createOrder(orderData).unwrap();

      //   console.log("res", res.data);
      if (!res.data) {
        toast.error(`Decrease quantity for order `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        // setOrderData(initialOrderData);

        toast.success("Order Created  successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const [page, setPage] = useState(1);

  const {
    data: todos,
    // isLoading,
    isFetching,
  } = useGetAllTodosQuery(params);

  //   console.log("params", params);

  // update product
  const updateTodo = async (updatedFieldData: TTask) => {
    // console.log(productId);
    try {
      setIsUpdateModalOpen(false);
      const toastId = toast.loading("Loading...");
      // console.log(selectedTotoId);
      // Use the createShoes mutation to handle the API call
      const res: any = await update({
        taskId: selectedTotoId as string,
        updatedData: updatedFieldData, // Correct property name
      });

      console.log("res", res);

      if (!res.data) {
        toast.error(`Decrease quantity for order `, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Update product successfully", {
          id: toastId,
          duration: 2000,
        });
        // refetch();
      }
    } catch (error) {
      console.error("Error creating shoes:", error);
      toast.error("Error creating shoes. Please try again.");
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (value: string) => {
    setSearchTerm(value);
    setParams([
      { name: "title", value },
      // Add other filters as needed
    ]);
  };

  const metaData = todos?.meta as any;
  // console.log("m", metaData);

  const tableData: any = todos?.data?.map(
    ({ _id, title, description, priority, deadline, authorId }: any) => ({
      key: _id,
      title,
      description,
      priority,
      deadline,
      authorId,
    })
  );
  //   console.log("cover", tableData);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },

    {
      title: "Description.",
      key: "description",
      dataIndex: "description",
    },

    // priority
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      filters: [
        {
          text: "High",
          value: "high",
        },
        {
          text: "Medium",
          value: "medium",
        },
        {
          text: "Low",
          value: "low",
        },
      ],
    },
    // deadline
    {
      title: "Deadline",
      key: "deadline",
      dataIndex: "deadline",
    },
    // author
    {
      title: "AuthorId",
      key: "authorId",
      dataIndex: "authorId",
    },

    {
      title: "update",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button
              onClick={() => {
                if (item.key) {
                  openUpdateModal(item.key);
                }
              }}
              className="bg-green-600 font-bold text-white"
            >
              update
            </Button>
            {/* </Link> */}
            {/* order modal  */}
            <Modal
              title="Order Modal"
              open={isOrderModalOpen}
              onOk={handleUpdateModalOk}
              onCancel={handleUpdateModalCancel}
            >
              <div>
                {/* order form */}
                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={updateTodo}
                  style={{ maxWidth: 600 }}
                >
                  {/* product Id*/}
                  <Form.Item
                    label="task Id"
                    name="_id"
                    initialValue={selectedTotoId}
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>

                  {/* {/* title/} */}
                  <Form.Item
                    label="title"
                    name="title"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="priority" name="priority">
                    <Select>
                      <Select.Option value="high">High</Select.Option>
                      <Select.Option value="medium">Medium</Select.Option>
                      <Select.Option value="low">Low</Select.Option>
                    </Select>
                  </Form.Item>

                  {/* {/* description/} */}
                  <Form.Item
                    label="description"
                    name="description"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* {/* deadline/} */}
                  <Form.Item
                    label="deadline"
                    name="deadline"
                    rules={[{ required: false, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* button  */}
                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button
                      className="bg-green-600  text-white font-bold"
                      htmlType="submit"
                    >
                      Create order
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.priority?.forEach((item) =>
        queryParams.push({ name: "priority", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <h1 className="font-bold">Total : {metaData?.total} tasks</h1>

      <Input
        style={{ width: "220px" }}
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
    // <p>hi</p>
  );
};

export default Todos;
