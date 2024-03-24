import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeUser } from "../../redux/userSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);
  const verifyToken = async () => {
    if (!token) {
      navigate("/admin-login");
    } else {
      const { data } = axios.post(
        `${import.meta.env.VITE_API_URL}/admin/verify-token`,
        {
          token,
        }
      );
      console.log(data);
      if (data.authentication == false || data.success == false) {
        dispatch(removeUser());
        navigate("/admin-logout");
      }
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);
  return <Outlet />;
};

export default ProtectedRoute;
