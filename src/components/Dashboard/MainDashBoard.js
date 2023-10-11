import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { getProfileAction } from "../../redux/slice/users/usersSlice";

const MainDashBoard = () => {
  // ! dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  // TODO: get data from store
  const { loading, profile, error } = useSelector((state) => {
    return state?.users;
  });

  return (
    <>
      {loading ? (
        /* loading */
        <h2 className="text-center text-green-600 mt-5 text-lg">Loading...</h2>
      ) : error ? (
        /* error */
        <h2 className="text-red-600 text-center mt-5 text-lg">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
