import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../actions/groceryItem";
import AddItem from "../AddItem";
import { Loading } from "../layout/Loading";
import ListItem from "../ListItem";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { groceryItems, loading } = useSelector((state) => state.groceryItems);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user && !loading) {
      console.log("Called==>");
      dispatch(getItem(user._id));
    }
  }, [user]);
  return (
    <>
      <div>{loading && <Loading />} </div>
      <div>{!loading && <ListItem />}</div>;
    </>
  );
};

export default Home;
