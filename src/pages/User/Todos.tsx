/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  InputNumber,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../types/global";
import { TProduct } from "../../types/product.types";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../redux/features/sales/salesApi";
import Modal from "antd/es/modal/Modal";
import { useGetAllTodosQuery } from "@/redux/features/todos/todosApi";

export type TTableData = Partial<TProduct>;

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
  const [createOrder] = useCreateOrderMutation();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const openOrderModal = (id: string) => {
    setIsOrderModalOpen(true);
    setSelectedProductId(id);
    // console.log(id);
  };

  const handleOrderModalOk = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOrderModalCancel = () => {
    setIsOrderModalOpen(false);
    setSelectedProductId(null);
  };
  // place order with modal
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

  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (value: string) => {
    setSearchTerm(value);
    setParams([
      { name: "productName", value },
      // Add other filters as needed
    ]);
  };

  const metaData = todos?.meta as any;
  console.log("m", metaData);

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
    // {
    //   title: "Cover",
    //   key: "coverPhoto",
    //   render: (item) => (
    //     <img src={item.coverPhoto} alt="Cover" style={{ width: "60px" }} />
    //   ),
    // },
    {
      title: "Name",
      key: "productName",
      dataIndex: "productName",
    },

    {
      title: "Product Unique Id",
      key: "key",

      render: (item) => <p className="w-20">{item.key}</p>,
    },
    {
      title: "Price.",
      key: "price",
      dataIndex: "price",
    },

    // brand
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      filters: [
        {
          text: "Nike",
          value: "Nike",
        },
        {
          text: "Apex",
          value: "Apex",
        },
        {
          text: "Lotto",
          value: "Lotto",
        },
      ],
    },
    // gender
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
    },
    // gender
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      filters: [
        {
          text: "28",
          value: "28",
        },
        {
          text: "30",
          value: "30",
        },
        {
          text: "32",
          value: "32",
        },
        {
          text: "34",
          value: "34",
        },
      ],
    },
    //color
    {
      title: "Color.",
      key: "color",
      dataIndex: "color",
      filters: [
        {
          text: "White",
          value: "white",
        },
        {
          text: "Red",
          value: "red",
        },
        {
          text: "Black",
          value: "black",
        },
        {
          text: "Brown",
          value: "brown",
        },
      ],
    },
    // raw materials
    {
      title: "Material",
      key: "rawMaterial",
      dataIndex: "rawMaterial",
      filters: [
        {
          text: "leather",
          value: "leather",
        },
        {
          text: "fabric",
          value: "fabric",
        },
        {
          text: "jeans",
          value: "jeans",
        },
      ],
    },
    // category
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: [
        {
          text: "Sneakers",
          value: "sneakers",
        },
        {
          text: "converse",
          value: "converse",
        },
        {
          text: "loffer",
          value: "loffer",
        },
      ],
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log(item);
        return (
          <Space>
            {/* <Link to={`/seller/${item.key}`}> */}
            <Button
              onClick={() => {
                if (item.key) {
                  openOrderModal(item.key);
                }
              }}
              className="bg-green-600 font-bold text-white"
            >
              Order
            </Button>
            {/* </Link> */}
            {/* order modal  */}
            <Modal
              title="Order Modal"
              open={isOrderModalOpen}
              onOk={handleOrderModalOk}
              onCancel={handleOrderModalCancel}
            >
              <div>
                {/* order form */}
                <Form
                  {...formItemLayout}
                  variant="filled"
                  onFinish={onFinish}
                  style={{ maxWidth: 600 }}
                >
                  {/* product Id*/}
                  <Form.Item
                    label="Product Id"
                    name="productId"
                    initialValue={selectedProductId}
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Buyer Name "
                    name="buyer"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Quantity "
                    name="quantity"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* buyer name */}
                  <Form.Item
                    label="Date of Sales "
                    name="dateOfSales"
                    rules={[{ required: true, message: "Please input!" }]}
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
      filters.brand?.forEach((item) =>
        queryParams.push({ name: "brand", value: item })
      );
      filters.gender?.forEach((item) =>
        queryParams.push({ name: "gender", value: item })
      );
      filters.rawMaterial?.forEach((item) =>
        queryParams.push({ name: "rawMaterial", value: item })
      );
      filters.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );
      filters.color?.forEach((item) =>
        queryParams.push({ name: "color", value: item })
      );
      filters.size?.forEach((item) =>
        queryParams.push({ name: "size", value: item })
      );
      // filters.productName?.forEach((item) =>
      //   queryParams.push({ name: "productName", value: item })
      // );
      setParams(queryParams);
    }
  };

  return (
    <>
      <h1 className="font-bold">
        Total : {metaData?.total} available shoes in the inventory
      </h1>

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
