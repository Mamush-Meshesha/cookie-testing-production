import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../store/redux/authSlice";

const User = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  return (
    <div>
      <h2>User Info</h2>
      {loading ? <p>Loading...</p> : user ? <p>Welcome, {user.username}</p> : <p>No user data</p>}
    </div>
  );
};

export default User;
