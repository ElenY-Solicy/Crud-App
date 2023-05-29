import { Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editDataAsync } from "../store/features/mainSlice";

import styles from "./modalEditAdd.module.css";

const URL = process.env.REACT_APP_API_URL;

function ModalEdit({ title, open, singleUserData, setIsEditModalOpen }) {
  const dispatch = useDispatch();
  const [changedData, setChangedData] = useState({});

  const handleOk = () => {
    dispatch(editDataAsync({ URL, changedData }));
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };
  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      {singleUserData?.map((user) => (
        <div key={user.id} className={styles.modal}>
          <input
            className={styles.input}
            type="text"
            defaultValue={user.name}
            onChange={(e) => setChangedData({ ...user, name: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            defaultValue={user.country}
            onChange={(e) =>
              setChangedData({ ...user, country: e.target.value })
            }
          />
          <input
            className={styles.input}
            type="text"
            defaultValue={user.address}
            onChange={(e) =>
              setChangedData({ ...user, address: e.target.value })
            }
          />
        </div>
      ))}
    </Modal>
  );
}

export default ModalEdit;
