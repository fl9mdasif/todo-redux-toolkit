"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hooks";
import { filterTodo } from "@/redux/features/ToDoSlice";

const TodoFilter = ({ priority, setPriority }) => {
  // console.log(priority);
  const dispatch = useAppDispatch();

  // Function to handle priority change
  const handlePriorityChange = (priority: string) => {
    setPriority(priority);
    dispatch(filterTodo(priority)); // Dispatch the filterTodo action
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary-gradient text-white" variant="outline">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          onValueChange={handlePriorityChange}
          value={priority}
        >
          {/* <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem> */}
          <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
