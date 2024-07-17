import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList/TodoList";
import TodoForm from "../components/TodoForm/TodoForm";
import { getTasksRequest, createTaskRequest, deleteTaskRequest, logOutRequest } from "../actions/actionCreator";
import { connect } from "react-redux";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import CONSTANTS from "../constants";

Modal.setAppElement("#root");

const TodoPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (props.user) {
      props.getTasksRequest();
    }
  }, [props.user]);

  const getNewTd = (data) => {
    props.createTaskRequest({
      status: "new",
      ...data,
    });
  };

  const delTask = (id) => {
    props.deleteTaskRequest(id);
  };

  const logOutHandler = () => {
    props.logOutRequest();
  };

  const generateLink = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    return `http://${CONSTANTS.IPv4_ADDRESS}:3000/authByQR/?refresh=${refreshToken}`;
    // http://192.168.43.112:3000/authByQR/?refresh=
  };

  return (
    <>
      <button onClick={logOutHandler}>Log out</button>
      <h1>TodoPage</h1>
      <button onClick={() => setIsModalOpen(true)}>Generate QR code to authentificate other devices</button>
      <TodoForm sendData={getNewTd} />
      <TodoList todos={props.tasks} delCallback={delTask} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h1>Scan this QR code to authetificate</h1>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={generateLink()}
            viewBox={`0 0 256 256`}
          />
        </div>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
  logOutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
