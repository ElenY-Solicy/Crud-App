import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import ModalEdit from "./ModalEdit";
import {
  getDataAsync,
  deleteDataAsync,
  sort,
  filter,
} from "../store/features/mainSlice";
import pencil from "../assets/images/pencil.png";
import remove from "../assets/images/remove.png";

import styles from "./main.module.css";
import ModalAdd from "./ModalAdd";
import { Select, Space } from "antd";

const URL = process.env.REACT_APP_API_URL;

function Main() {
  const data = useSelector((state) => state.data);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAsync(URL));
  }, [dispatch]);

  const handleEdit = (user) => {
    setIsEditModalOpen(true);
    setSingleUserData(data?.data.filter((el) => el.id === user.id));
  };

  const handleDelete = (id) => {
    dispatch(deleteDataAsync({ URL, id }));
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSort = () => {
    dispatch(sort());
  };

  return (
    <>
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={handleSort}>
          Sort
        </button>
        <button className={styles.btn} onClick={handleAdd}>
          Add User
        </button>
      </div>
      <div className={styles.wrapper}>
        {data?.data?.map((user) => (
          <div key={user.id} className={styles.container}>
            <div className={styles.img}>
              <img
                src={pencil}
                alt="edit"
                className={styles.control}
                onClick={() => handleEdit(user)}
              />
              <img
                src={remove}
                alt="delete"
                className={styles.control}
                onClick={() => handleDelete(user.id)}
              />
            </div>
            <span>Name: {user.name}</span>
            <span>Country: {user.country}</span>
            <span>City: {user.address}</span>
            <span>
              account created: {moment.utc(user.createdAt).format("MM/DD/YY")}
            </span>
          </div>
        ))}
        <ModalEdit
          title="Edit Info"
          open={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          singleUserData={singleUserData}
        />
        <ModalAdd
          title="Add Info"
          open={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      </div>
    </>
  );
}

export default Main;
