import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { removeTodo, toggleComplete } from "@/redux/features/ToDoSlice";
import { FormEvent } from "react";

export type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted: boolean;
};

const TodoCard = ({ _id, title, description, isCompleted }: TTodoCardProps) => {
  const dispatch = useAppDispatch();
  console.log(_id);

  const handleComplete = (e: FormEvent) => {
    e.preventDefault();
    dispatch(toggleComplete(_id));
    // console.log("clicked");
  };

  return (
    <div className="bg-white  flex justify-between p-3 border">
      <input
        onChange={handleComplete}
        type="checkbox"
        name=""
        id=""
        className="checkbox"
      />
      <p>{title}</p>
      <div>
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">pending</p>
        )}
      </div>
      <p>{description}</p>
      <div className=" space-x-5">
        <Button
          onClick={() => dispatch(removeTodo(_id))}
          className="bg-red-500"
        >
          <FaTrashAlt />
        </Button>
        <Button className="bg-[#5C53FE]">
          <FaEdit />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
