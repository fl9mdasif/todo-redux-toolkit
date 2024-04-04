import CompletedTodos from "@/pages/User/CompletedTodos";
import Todos from "@/pages/User/Todos";
import UserDashboard from "@/pages/User/UserDashboard";

export const UserPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My To-dos",
    children: [
      {
        name: "All Todos",
        path: "todos",
        element: <Todos />,
      },
      {
        name: "complete todos",
        path: "complete-todos",
        element: <CompletedTodos />,
      },
    ],
  },
];
