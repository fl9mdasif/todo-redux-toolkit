import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";

import { FaTrashAlt } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { toggleComplete } from "@/redux/features/ToDoSlice";
import { FormEvent, useState } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export type TTodoCardProps = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted: boolean;
};

const TodoCard = ({
  _id,
  title,
  priority,
  description,
  isCompleted,
}: TTodoCardProps) => {
  const [updateTodo, { data: todos }] = useUpdateTodoMutation();
  console.log(todos);
  const handleTaskComplete = () => {
    // e.preventDefault();

    const tasksData = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    };

    const options = {
      id: _id,
      data: tasksData,
    };
    console.log(options);
    updateTodo(options);
  };

  const [removeTodo, { data, isSuccess, isError }] = useDeleteTodoMutation();

  const [utask, setTask] = useState("");
  const [udescription, setDescription] = useState("");
  const [upriority, setPriority] = useState("");

  const taskUpdate = (e: FormEvent) => {
    e.preventDefault();

    const updateTasks = {
      title: utask,
      description: udescription,
      priority: upriority,
      isCompleted,
    };

    const options = {
      id: _id,
      data: updateTasks,
    };
    updateTodo(options);
  };

  return (
    <div className="bg-white items-center  flex justify-between p-3 border">
      <input
        onChange={handleTaskComplete}
        type="checkbox"
        name="checkbox"
        id=""
        className="checkbox "
      />
      <div className="  ml-3 flex-1">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="  flex-1 flex  gap-2 items-center">
        <div
          className={`size-3 rounded-full 
          ${priority === "high" ? "bg-red-500" : null} 
          ${priority === "medium" ? "bg-yellow-500" : null} 
          ${priority === "low" ? "bg-green-500" : null} 
         `}
        ></div>
        <p className={``}>{priority}</p>
      </div>
      <div className=" flex-1">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">pending</p>
        )}
      </div>
      <div className=" flex-[2]">
        <p>{description}</p>
      </div>
      <div className=" space-x-5">
        <Button onClick={() => removeTodo(_id)} className="bg-red-500">
          <FaTrashAlt />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-primary-gradient text-white"
              variant="outline"
            >
              <FaEdit />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={taskUpdate}>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  Add your task & Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="task" className="text-right">
                    Task
                  </Label>
                  <Input
                    defaultValue={title}
                    onBlur={(e) => setTask(e.target.value)}
                    id="task"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    defaultValue={description}
                    onBlur={(e) => setDescription(e.target.value)}
                    id="description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select onValueChange={(value) => setPriority(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TodoCard;
