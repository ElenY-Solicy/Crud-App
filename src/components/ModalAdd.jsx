import { Modal } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addDataAsync } from "../store/features/mainSlice";

import styles from "./modalEditAdd.module.css";

const URL = process.env.REACT_APP_API_URL;

function ModalAdd({ title, open, setIsAddModalOpen }) {
  const [addedData, setAddedData] = useState({
    id: uuid(),
    name: "",
    country: "",
    address: "",
    createdAt: moment.utc(Date.now()).format("MM/DD/YY"),
  });

  

  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(addDataAsync({ URL, addedData }));
    setIsAddModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };
  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <div className={styles.modal}>
        <input
          type="text"
          placeholder="Add name"
          className={styles.input}
          onChange={(e) => setAddedData({ ...addedData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Add country"
          className={styles.input}
          onChange={(e) =>
            setAddedData({ ...addedData, country: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Add city"
          className={styles.input}
          onChange={(e) =>
            setAddedData({ ...addedData, address: e.target.value })
          }
        />
      </div>
    </Modal>
  );
}

export default ModalAdd;
