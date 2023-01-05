import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { Button } from "../../Button";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const ShowConfirmDelete = (props: any) => {
  const { item, modalData, modalVisible, handleOk, handleCancel } = props;
  // const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const handleOpenModal = (data: any) => {
  //   setModalVisible(true);
  // };

  // const handleOk = () => {
  //   setModalVisible(false);
  // };

  // const [flip, setFlip] = useState<boolean>(false);
  // const handleCancel = () => {
  //   setFlip(!flip);
  //   setModalVisible(false);
  // };
  const navigate = useNavigate();

  return <Modal
                
  onOk={handleOk}
  onCancel={handleCancel}
  open={modalVisible}
  centered={true}
  footer={false}
  closable={true}
>
  <div className="">
    <ExclamationCircleFilled className="text-red bg-red"/>
    <div className="boder-b text-lg font-medium">
      Delete trip from {item.start} to{" "}
      {item.destination}
    </div>
  </div>
  <span className="flex">
    
    <Button
      title="Edit"
      type="submit"
      className="w-full py-2 mr-4 text-xs rounded-md bg-primary-100"
      onClick={() => {
        navigate("");
      }}
    />
    <Button
      title="Delete"
      type="submit"
      className="w-full py-2 text-xs rounded-md border text-red-600 border-red-500"
      onClick={() => {
        // setFlip(true);
        ShowConfirmDelete(item);
      }}
    />
  </span>
  
</Modal>

  // confirm({
  //   title: "Delete trip from " + item.start + " to " + item.destination,
  //   icon: <ExclamationCircleFilled />,
  //   content: "This action is irreversible",
  //   onOk() {
  //     const index = data.indexOf(item);
  //     if (index > -1) {
  //       data.splice(index, 1);
  //       console.log(data)
  //     }
  //   },
  //   onCancel() {},
  // });
};

export default ShowConfirmDelete;
