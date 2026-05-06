import { useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
} from "@/features/auth/store/authSlice";

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const connectedUserId = user?._id ?? "";
  const connectedUserName = user?.username ?? "";
  const connectedUserEmail = user?.email ?? "";

  const role = user?.role || undefined;

  return {
    user,
    token,
    isAuthenticated,
    role,
    isAdmin: role === "admin",
    isUser: role === "user",
    isHr: role === "hr",
    isManager: role === "manager",
    isEmployee: role === "employee",
    canManageAll: role === "admin" || role === "hr",
    connectedUserId,
    connectedUserEmail,
    connectedUserName,
  };
};

export default useAuth;