import React, { useEffect, useState } from "react";
import Styles from "./Notification.module.css";
import Layout from "../../layout/Layout";
import axios from "axios";
import { url } from "../../url/url";
import Box from "@mui/material/Box";
import { ThreeCircles } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import Button from "react-bootstrap/Button";
import CommonModal from "../Modal/modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { Card, Row, Col, DatePicker } from "antd";
import Modal from "react-bootstrap/Modal";
import { MdModeEditOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
// import { getFCMToken } from "../../Utils/FirebaseConfig";
// import { Select } from "antd";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

// const { Option } = Select;

function Notification(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowView, setModalShowView] = useState(false);
  const [modalShowDelete, setmodalShowDelete] = useState(false);
  const [modalShowEdit, setmodalShowEdit] = useState(false);
  const [NotifyView, setNotifyView] = useState();
  const [NotifyEdit, setNotifyEdit] = useState();
  const [NotifyCancel, setNotifyCancel] = useState();
  const [NotifyData, setNotifyData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersEdit, setSelectedUsersEdit] = useState([]);
  const [isDateInputVisible, setIsDateInputVisible] = useState(false);
  const [isPublishLaterClicked, setIsPublishLaterClicked] = useState(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    title: "",
    description: "",
    type: "", // Default dropdown value
    publishFor: "", // Empty by default
  });
  const [formDataEdit, setFormDataEdit] = useState({
    date: "",
    time: "",
    title: "",
    description: "",
    type: "", // Default dropdown value
    publishFor: "", // Empty by default
  });

  // console.log("FORMDATA", formDataEdit)

  const handleShow = () => {
    setModalShow(true);
  };

  const handleShowView = (item) => {
    setNotifyView(item);
    setModalShowView(true);
  };
  const handleShowDelete = (item) => {
    setNotifyCancel(item);
    setmodalShowDelete(true);
  };
  const handleShowEdit = (item) => {
    setNotifyEdit(item);
    setmodalShowEdit(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setIsPublishLaterClicked(false);
  };

  const handleCloseView = () => {
    setModalShowView(false);
  };
  const handleClosecancelbtn = () => {
    setmodalShowDelete(false);
  };

  const handleCloseCancel = async (e) => {
    setmodalShowDelete(false);
    // e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/Update-Notification-status/${NotifyCancel?._id}`,
        { status: "cancel" }
      );
      console.log("RESPONSE", response);
      toast.success("Notification Status Update Successfully");
      getnotification();
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };
  const handleCloseEdit = () => {
    setmodalShowEdit(false);
  };

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      backgroundColor: "rgb(232,56,116)",
      padding: "10px 15px",
      textAlign: "left",
    },
    content: {
      padding: "15px",
    },
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each field
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.type) {
      newErrors.type = "Type is required.";
    }
    setErrors(newErrors);

    // If no errors, return true, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePublishForAndSelectChange = (e) => {
    const value = e.target.value;
    console.log(value);

    // Update publishFor state based on the selected option
    setFormData((prev) => ({
      ...prev,
      publishFor:
        value === "ChooseUser"
          ? selectedUsers.map((user) => console.log(user))
          : value, // If "Choose user" is selected, map selected users' IDs
    }));

    // Update dropdown visibility based on condition
    if (value === "ChooseUser") {
      setIsUserDropdownVisible(true);
    } else {
      setIsUserDropdownVisible(false);
    }
  };

  const handlePublishForAndSelectChangeEdit = (e) => {
    const value = e.target.value;
    console.log(value);

    // Update publishFor state based on the selected option
    setFormDataEdit((prev) => ({
      ...prev,
      publishFor:
        value === "ChooseUser"
          ? selectedUsersEdit.map((user) => console.log(user))
          : value, // If "Choose user" is selected, map selected users' IDs
    }));

    // Update dropdown visibility based on condition
    if (value === "ChooseUser") {
      setIsUserDropdownVisible(true);
    } else {
      setIsUserDropdownVisible(false);
    }
  };

  const handleUserSelectChange = (event, newValue) => {
    // console.log(newValue)
    // Update selected users and publishFor state with user IDs when users are selected
    setSelectedUsers(newValue);
    setFormData((prev) => ({
      ...prev,
      publishFor: newValue.map((user) => user.id), // Get selected users' IDs and update publishFor
    }));
  };
  const handleUserSelectChangeEdit = (event, newValue) => {
    // console.log(newValue)
    // Update selected users and publishFor state with user IDs when users are selected
    setSelectedUsersEdit(newValue);
    setFormDataEdit((prev) => ({
      ...prev,
      publishFor: newValue.map((user) => user.id), // Get selected users' IDs and update publishFor
    }));
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      setModalShow(false);
      e.preventDefault();
      const selectedDate = formData?.date ? new Date(formData.date) : null;

      const payload = {
        ...formData,
        // time: selectedDate
        //   ? `${selectedDate
        //       .getHours()
        //       .toString()
        //       .padStart(2, "0")}:${selectedDate
        //       .getMinutes()
        //       .toString()
        //       .padStart(2, "0")}`
        //   : "",
        status: selectedDate ? "Schedule" : "Sent",
      };

      try {
        const response = await axios.post(
          `${url}/schedule-Notification`,
          payload
        );
        console.log("RESPONSE", response);
        toast.success("Notification send successfully");
        getnotification();
      } catch (error) {
        setMessage(error.message || "An error occurred");
      }
    } else {
      console.log("validation failed");
    }
    setFormData({
      title: "",
      description: "",
      type: "",
      publishFor: "",
    });
    setIsPublishLaterClicked(false);
    setIsUserDropdownVisible(false);
  };

  const handleSubmitEdit = async (e) => {
    setmodalShowEdit(false);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/edit-Notification/${NotifyEdit?._id}`,
        formDataEdit
      );
      console.log("RESPONSE", response);
      toast.success("Notification Update Successfully");
      getnotification();
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }

    setFormDataEdit({
      title: "",
      description: "",
      type: "",
      publishFor: "",
    });
    setIsPublishLaterClicked(false);
  };

  const PublishLater = () => {
    // setModalShow(false);
    setIsDateInputVisible(true);
    setIsPublishLaterClicked(true);
  };

  useEffect(() => {
    getnotification();
  }, []);
  const getnotification = async () => {
    try {
      const response = await axios.get(`${url}/get-allnotification`);
      setNotifyData(response.data.notification);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error in fetching notification", error);
    }
  };
  // const handleSelectChange = (e) => {
  //   const value = e.target.value;
  //   if (value === "4") {
  //     setIsUserDropdownVisible(true);
  //   } else {
  //     setIsUserDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   const sendNotification = async () => {
  //     const fcmToken = await getFCMToken();

  //     if (fcmToken) {
  //       const payload = {
  //         fcmToken,
  //         title: "Test Notification",
  //         body: "This is a test notification from React.",
  //       };

  //       // Send notification to Node.js API
  //       fetch("http://localhost:3839/send-notification", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log("Notification Response:", data);
  //         })
  //         .catch((error) => {
  //           console.error("Error sending notification:", error);
  //         });
  //     }
  //   };

  //   sendNotification();
  // }, []);

  // GET ALL USERS

  useEffect(() => {
    const getAllusers = async () => {
      try {
        const response = await axios.get(`${url}/get-allusers`);
        // console.log(response.data?.allUsers)

        setUserData(response.data?.allUsers);
      } catch (error) {
        console.log("error in fetching users", error);
      }
    };
    getAllusers();
  }, []);

  return (
    <div>
      <Layout />

      {/* -----MODAL----- */}

      {/* MODAL FOR CREATE  */}
      <CommonModal
        show={modalShow}
        handleClose={handleClose}
        size="lg"
        body={
          <>
            <div
              style={{
                maxWidth: "980px",
                margin: "0px auto",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={styles.card}>
                <div style={styles.header}>
                  <h5 style={{ color: "#fff", margin: 0 }}>
                    Create Notification
                  </h5>
                </div>
                <div className="container">
                  <p className="text-capitalize text-lg font-weight-bold mt-2">
                    Title
                  </p>
                  <InputGroup className="mb-2">
                    <Form.Control
                      name="title"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Please enter title"
                      // value={formData.title}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  {errors.title && (
                    <span className="text-danger">{errors.title}</span>
                  )}
                  <p className="text-capitalize text-lg font-weight-bold ">
                    Description
                  </p>
                  <InputGroup className="mb-2">
                    <Form.Control
                      name="description"
                      as="textarea"
                      aria-label="With textarea"
                      placeholder="description..."
                      // value={formData.description}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  {errors.description && (
                    <span className="text-danger">{errors.description}</span>
                  )}

                  <p className="text-capitalize text-lg font-weight-bold ">
                    Select Type
                  </p>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Default select example"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option>Please select type</option>
                      <option value="App upgrade">App upgrade</option>
                      <option value="Discount">Discount</option>
                      <option value="EventType">EventType</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </InputGroup>
                  {errors.type && (
                    <span className="text-danger">{errors.type}</span>
                  )}

                  <p className="text-capitalize text-lg font-weight-bold ">
                    Publish For
                  </p>
                  <InputGroup className="mb-4">
                    <Form.Select
                      name="publishFor"
                      aria-label="Default select example"
                      onChange={handlePublishForAndSelectChange}
                    >
                      <option>Please select publish </option>
                      <option value="allusers">All Users</option>
                      <option value="eventowner">Event Owners</option>
                      <option value="ChooseUser">Choose user</option>
                    </Form.Select>
                  </InputGroup>
                  {errors.publishFor && (
                    <span className="text-danger">{errors.publishFor}</span>
                  )}

                  {isUserDropdownVisible && (
                    <>
                      <p className="text-capitalize text-lg font-weight-bold ">
                        Select User :
                      </p>

                      <Autocomplete
                        multiple
                        options={UserData.map((item) => ({
                          id: item._id, // Unique identifier
                          name: item.name, // Display value
                        }))}
                        getOptionLabel={(option) => option.name} // Use 'name' field for display
                        value={selectedUsers}
                        // onChange={(event, newValue) =>
                        //   setSelectedUsers(newValue)
                        // }
                        onChange={handleUserSelectChange}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        } // Match by 'id'
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Users"
                            placeholder="Search..."
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  )}

                  {isPublishLaterClicked && (
                    <>
                      <div className={`text-center ${Styles.maindateinpp}`}>
                        <p className="text-capitalize text-lg font-weight-bold ">
                          Please Select Date & Time :
                        </p>
                        {isDateInputVisible && (
                          <>
                            <input
                              type="date"
                              name="date"
                              value={formData?.date}
                              onChange={handleChange}
                              className={`${Styles.inppdates}`}
                            />

                            <input
                              type="time"
                              name="time"
                              value={formData?.time}
                              onChange={handleChange}
                              className={`${Styles.inppdates}`}
                            />
                          </>
                        )}
                        <div className="text-end">
                          <button
                            type="button"
                            className={`btn btn font-weight-bold ${Styles.btnsucess1}`}
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {!isPublishLaterClicked && (
                    <div className="text-end">
                      <button
                        type="button"
                        className={`btn btn font-weight-bold ${Styles.btnlater}`}
                        onClick={PublishLater}
                      >
                        Publish Later
                      </button>
                      <button
                        type="button"
                        className={`btn btn ${Styles.btnsucess}`}
                        onClick={handleSubmit}
                      >
                        Publish Now
                      </button>
                    </div>
                  )}

                  {/* <div className="text-end">
                    <button
                      type="button"
                      className={`btn btn font-weight-bold ${Styles.btnlater}`}
                      onClick={PublishLater}
                    >
                      Publish Later
                    </button>
                    <button
                      type="button"
                      className={`btn btn ${Styles.btnsucess}`}
                      onClick={handleSubmit}
                    >
                      Publish Now
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </>
        }
      />

      {/* MODAL FOR VIEW  */}
      <CommonModal
        show={modalShowView}
        handleClose={handleCloseView}
        size="lg"
        body={
          <>
            <div
              style={{
                maxWidth: "980px",
                margin: "0px auto",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div style={styles.card}>
                <div style={styles.header}>
                  <h5 style={{ color: "#fff", margin: 0 }}>
                    Notification Details
                  </h5>
                </div>
                <div className="container">
                  <Card className="society-card">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Title :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Description :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Type :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Publish For :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Status :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Date & Time :
                          </b>
                        </p>
                        {NotifyView?.scheduledAt && (
                          <p>
                            <b className="text-lg text-center font-weight-bold mb-0">
                              ScheduledAt :
                            </b>
                          </p>
                        )}
                      </Col>
                      <Col span={12}>
                        <p>
                          <b>{NotifyView?.title}</b>
                        </p>
                        <p>
                          <b>{NotifyView?.description}</b>
                        </p>
                        <p>
                          <b>{NotifyView?.type}</b>
                        </p>
                        <p>
                          {/* Check if NotifyView?.publishFor is an array */}
                          {Array.isArray(NotifyView?.publishFor) ? (
                            <ul style={{ display: "flex", padding: 0 }}>
                              {NotifyView?.publishFor.map((value, index) => (
                                <li
                                  key={index}
                                  style={{
                                    marginRight: "10px",
                                    listStyle: "none",
                                  }}
                                >
                                  {`${value},`}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            // If not an array, display the single value
                            <span className="text-xs font-weight-bold mb-0">
                              {NotifyView?.publishFor}
                            </span>
                          )}
                        </p>
                        <p className="mt-4">
                          <b>{NotifyView?.status}</b>
                        </p>
                        {/* <p>
                          <b>
                            {new Date(NotifyView?.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </b>
                        </p> */}
                        <p className="mt-4">
                          <b>
                            {new Date(NotifyView?.createdAt).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                              }
                            )}
                          </b>
                        </p>
                        {NotifyView?.scheduledAt && (
                          <p className="mt-2">
                            <b>
                              {new Date(NotifyView?.scheduledAt).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </b>
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </div>
          </>
        }
      />

      {/* MODAL FOR CANCEL  */}
      <CommonModal
        show={modalShowDelete}
        handleClose={handleClosecancelbtn}
        size="md"
        body={
          <>
            <div className="container">
              <h5 className="text-center">
                Are you sure want to Cancel this Notification!
              </h5>

              <Modal.Footer className="mt-5">
                <Button
                  onClick={handleClosecancelbtn}
                  className={`btn btn  ${Styles.btnsucess}`}
                >
                  NO
                </Button>
                <Button
                  onClick={handleCloseCancel}
                  className={`btn btn ${Styles.btnsucess}`}
                >
                  YES
                </Button>
              </Modal.Footer>
            </div>
          </>
        }
      />

      {/* MODAL FOR EDIT  */}
      <CommonModal
        show={modalShowEdit}
        handleClose={handleCloseEdit}
        size="lg"
        body={
          <>
            <>
              <div
                style={{
                  maxWidth: "980px",
                  margin: "0px auto",
                  fontFamily: "Arial, sans-serif",
                  height: "450px",
                }}
              >
                <div style={styles.card}>
                  <div style={styles.header}>
                    <h5 style={{ color: "#fff", margin: 0 }}>
                      Edit Notification
                    </h5>
                  </div>
                  <div
                    className="container modal-content-scrollable "
                    style={{
                      maxWidth: "980px",
                      margin: "0px auto",
                      fontFamily: "Arial, sans-serif",
                      height: "400px",
                      overflowY: "auto",
                    }}
                  >
                    <p className="text-capitalize text-lg font-weight-bold mt-2">
                      Title
                    </p>
                    <InputGroup className="mb-2">
                      <Form.Control
                        name="title"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Please enter title"
                        defaultValue={NotifyEdit?.title}
                        // value={formData.title}
                        onChange={handleChangeEdit}
                      />
                    </InputGroup>
                    {errors.title && (
                      <span className="text-danger">{errors.title}</span>
                    )}
                    <p className="text-capitalize text-lg font-weight-bold ">
                      Description
                    </p>
                    <InputGroup className="mb-2">
                      <Form.Control
                        name="description"
                        as="textarea"
                        aria-label="With textarea"
                        placeholder="description..."
                        defaultValue={NotifyEdit?.description}
                        // value={formData.description}
                        onChange={handleChangeEdit}
                      />
                    </InputGroup>
                    {errors.description && (
                      <span className="text-danger">{errors.description}</span>
                    )}

                    <p className="text-capitalize text-lg font-weight-bold ">
                      Select Type
                    </p>
                    <InputGroup className="mb-2">
                      <Form.Select
                        aria-label="Default select example"
                        name="type"
                        value={
                          formDataEdit?.type
                            ? formDataEdit?.type
                            : NotifyEdit?.type
                        }
                        onChange={handleChangeEdit}
                      >
                        <option>Please select type</option>
                        <option value="App upgrade">App upgrade</option>
                        <option value="Discount">Discount</option>
                        <option value="EventType">EventType</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </InputGroup>
                    {errors.type && (
                      <span className="text-danger">{errors.type}</span>
                    )}

                    <p className="text-capitalize text-lg font-weight-bold ">
                      Publish For
                    </p>
                    <InputGroup className="mb-4">
                      <Form.Select
                        name="publishFor"
                        aria-label="Default select example"
                        onChange={handlePublishForAndSelectChangeEdit}
                      >
                        <option>Please select publish </option>
                        <option value="allusers">All Users</option>
                        <option value="eventowner">Event Owners</option>
                        <option value="ChooseUser">Choose user</option>
                      </Form.Select>
                    </InputGroup>
                    {errors.publishFor && (
                      <span className="text-danger">{errors.publishFor}</span>
                    )}

                    {isUserDropdownVisible && (
                      <>
                        <p className="text-capitalize text-lg font-weight-bold ">
                          Select User :
                        </p>

                        <Autocomplete
                          multiple
                          options={UserData.map((item) => ({
                            id: item._id, // Unique identifier
                            name: item.name, // Display value
                          }))}
                          getOptionLabel={(option) => option.name} // Use 'name' field for display
                          value={selectedUsersEdit}
                          // onChange={(event, newValue) =>
                          //   setSelectedUsers(newValue)
                          // }
                          onChange={handleUserSelectChangeEdit}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          } // Match by 'id'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Users"
                              placeholder="Search..."
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    )}

                    <>
                      <div className={`text-center ${Styles.maindateinpp}`}>
                        <p className="text-capitalize text-lg font-weight-bold ">
                          Update Date & Time :
                        </p>

                        <>
                          <input
                            type="date"
                            name="date"
                            value={
                              formDataEdit?.date
                                ? formDataEdit?.date
                                : NotifyEdit?.date
                            }
                            onChange={handleChangeEdit}
                            className={`${Styles.inppdates}`}
                          />

                          <input
                            type="time"
                            name="time"
                            value={
                              formDataEdit?.time
                                ? formDataEdit?.time
                                : NotifyEdit?.time
                            }
                            onChange={handleChangeEdit}
                            className={`${Styles.inppdates}`}
                          />
                        </>
                      </div>
                    </>

                    <div className="text-end">
                      <button
                        type="button"
                        className={`btn btn font-weight-bold ${Styles.btnlater}`}
                        onClick={PublishLater}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`btn btn ${Styles.btnsucess}`}
                        onClick={handleSubmitEdit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </>
        }
      />

      {/* -------MAIN-------- */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-2"></div>

          <div className="col-lg-8">
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className={`card ${Styles.maintt}`}>
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div
                        className={`d-flex bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3 ${Styles.headtop}`}
                      >
                        <h6 className="text-white text-capitalize ps-3 text-lg font-weight-bold mb-0">
                          Notifications Table
                        </h6>

                        <button
                          type="button"
                          className={`btn  font-weight-bold   ${Styles.btncls}`}
                          onClick={handleShow}
                        >
                          Add Notification
                        </button>
                      </div>
                    </div>

                    {loading ? (
                      <>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="50vh" // Full viewport height
                        >
                          <ThreeCircles
                            visible={true}
                            height="80"
                            width="100"
                            color="rgb(231,56,116)" // Change the color to your desired color
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <div className="card-body px-0 pb-2">
                          <div className="table-responsive p-0 ">
                            <table className="table align-items-center mb-0">
                              <thead>
                                <tr>
                                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Title
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Description
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Type
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    publish for
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Status
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Action
                                  </th>

                                  <th className="text-secondary opacity-7"></th>
                                </tr>
                              </thead>

                              <tbody>
                                {NotifyData.map((item) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>
                                          <p className="text-base font-weight-bold mb-0">
                                            {item.title}
                                          </p>
                                        </td>
                                        <td>
                                          <p className="text-xs text-center font-weight-bold mb-0">
                                            {item.description}
                                          </p>
                                        </td>
                                        <td>
                                          <p className="text-xs text-center font-weight-bold mb-0">
                                            {item.type}
                                          </p>
                                        </td>
                                        <td>
                                          {/* Check if item.publishFor is an array */}
                                          {Array.isArray(item?.publishFor) ? (
                                            <ul className="list-none">
                                              {item?.publishFor.map(
                                                (value, index) => (
                                                  <li
                                                    key={index}
                                                    className="text-xs text-center font-weight-bold mb-0"
                                                    style={{
                                                      listStylePosition:
                                                        "inside", // Make sure bullet is inside the list item
                                                      textAlign: "center", // Center align the text
                                                    }}
                                                  >
                                                    {value}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          ) : (
                                            <p className="text-xs text-center font-weight-bold mb-0">
                                              {item?.publishFor}
                                            </p>
                                          )}
                                        </td>

                                        {/* <td className="align-middle text-center text-sm">
                                      <span className="badge badge-sm bg-gradient-success">
                                        {item?.status}
                                      </span>
                                    </td> */}
                                        <td className="align-middle text-center text-sm">
                                          {item?.status === "Schedule" ? (
                                            <span className="badge badge-sm bg-gradient-warning">
                                              {item?.status}
                                            </span>
                                          ) : (
                                            <p className="text-xs text-center font-weight-bold mb-0">
                                              {item?.status}
                                            </p>
                                          )}
                                        </td>
                                        <td className="align-middle text-center">
                                          <span>
                                            <MdVisibility
                                              className={`${Styles.delicon1}`}
                                              onClick={() => {
                                                handleShowView(item);
                                              }}
                                            />

                                            {item.status === "Schedule" && (
                                              <>
                                                <MdModeEditOutline
                                                  className={`${Styles.delicon1}`}
                                                  onClick={() => {
                                                    handleShowEdit(item);
                                                  }}
                                                />

                                                <GiCancel
                                                  className={`${Styles.delicon1}`}
                                                  onClick={() => {
                                                    handleShowDelete(item);
                                                  }}
                                                />
                                              </>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
