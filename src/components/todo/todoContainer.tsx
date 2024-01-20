import { useState } from "react";
import AddTodoModel from "./addTodoModel";
import TodoCard, { TTodoCardProps } from "./todoCard";
import TodoFilter from "./todoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  const [priority, setPriority] = useState("");
  // from server side fetching
  const { data, isLoading } = useGetTodosQuery(priority, {});
  // console.log(data);
  if (isLoading) {
    return <p>Loading.....</p>;
  }
  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModel />

        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        {/* <div className="bg-white p-3 flex justify-center -items-center">
          <p className="text-center text-2xl font-bold">
            There is no task pending
          </p>
        </div> */}
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-2">
          {data.data?.map((item: TTodoCardProps) => (
            <TodoCard {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
