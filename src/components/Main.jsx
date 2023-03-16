import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAsync } from "../store/features/mainSlice";

import styles from "./main.module.css"

const URL = `https://641325ecc469cff60d5a601e.mockapi.io/data/user`;

function Main() {
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAsync(URL));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {data?.data?.map((user) => (
        <div key={user.id} className={styles.container}>
          <img src={user.avatar}></img>
          <span>{user.name}</span>
          <span>{user.address}</span>
          <span>account created{user.createdAt}</span>
        </div>
      ))}
    </div>
  );
}

export default Main;
