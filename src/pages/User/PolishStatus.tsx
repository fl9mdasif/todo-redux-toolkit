/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetMyPolishReqQuery } from "../../redux/features/todos/shoePolishApi";
import { TTableData } from "./Products";
import { Pagination, Table, TableColumnsType } from "antd";

const PolishStatus = () => {
  const [page, setPage] = useState(1);
  const {
    data: productData,
    // isLoading,
    isFetching,
  } = useGetMyPolishReqQuery(undefined);

  const metaData = productData?.meta as any;
  // console.log("m", metaData);

  const tableData: any = productData?.data?.map(
    ({ _id, userId, polishType, shineLevel, instructions, status }: any) => ({
      key: _id,
      userId,
      polishType,
      shineLevel,
      instructions,
      status,
    })
  );

  //   console.log("cover", tableData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "User",
      key: "userId",
      dataIndex: "userId",
    },

    {
      title: "Shine level",
      key: "shineLevel",
      dataIndex: "shineLevel",
    },
    {
      title: "Polish Type",
      key: "polishType",
      dataIndex: "polishType",
    },
    {
      title: "Instructions",
      key: "instructions",
      dataIndex: "instructions",
    },

    // gender
    {
      title: "status",
      key: "status",
      //   dataIndex: "status",
      render: (item) => {
        // console.log(item);
        return (
          <div className="  flex-1 flex  gap-2 items-center">
            <div
              className={`size-3 rounded-full 
            ${item.status === "pending" ? "bg-red-500" : null} 
            ${item.status === "in-progress" ? "bg-yellow-500" : null} 
            ${item.status === "completed" ? "bg-green-500" : null} 
           `}
            ></div>
            <p className={``}>{item.status}</p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
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

export default PolishStatus;
