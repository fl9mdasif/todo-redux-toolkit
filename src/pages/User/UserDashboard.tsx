import { selectCurrentUser } from "@/redux/features/authApi/authSlice";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector(selectCurrentUser);

  console.log(user);
  return <div>{user?.username}'s Dashboard</div>;
};

export default UserDashboard;
