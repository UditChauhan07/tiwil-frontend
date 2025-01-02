import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Styles from "./Subscription.module.css";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { url } from "../../url/url";
import toast from "react-hot-toast";
import { MdModeEditOutline } from "react-icons/md";

function AddSubscription(props) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "",
    features: {
      eventCreation: "",
      invitefriends: "",
      wishlistCreation: "",
      PoolCreation: "",
      chatt: "",
      EventReminders: "",
      CustomEvent: "",
      AddfreeExperience: "",
      PrioritySupport: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingwishlist, setIsEditingwishlist] = useState(false);
  const [isEditinginvite, setIsEditinginvite] = useState(false);
  const navigate = useNavigate();




  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Clear error for the current field if there's a value
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value.trim()) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  
    // Check if the field is part of `features` or a top-level field
    setFormData((prevData) => {
      if (name in prevData.features) {
        return {
          ...prevData,
          features: {
            ...prevData.features,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  
  
  
  
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.status) newErrors.status = "Status is required";

    Object.keys(formData.features).forEach((key) => {
      if (!formData.features[key]) newErrors[key] = `${key} is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (req, res) => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${url}/create-subscription`,
          formData
        );
        console.log("RESPONSE", response);
        toast.success("Subscription Created successfully!");
        navigate("/subscription");
      } catch (error) {
        console.log("Error in creating subscription", error);
      }
    }
  };

  const handleShow = () => {
    navigate("/subscription");
  };

 

  return (
    <div>
      <Layout />

      {/* MAIN  */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-2"> </div>

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
                          CREATE SUBSCRIPTION
                        </h6>
                        <button
                          type="button"
                          className={`btn  font-weight-bold   ${Styles.btncls12}`}
                          onClick={handleShow}
                        >
                          Back
                        </button>
                      </div>
                    </div>

                    <div className="card-body px-0 pb-2">
                      <div className="container">
                        <p className="text-capitalize text-lg font-weight-bold mt-2">
                          Name
                        </p>
                        <InputGroup className="mb-2">
                          <Form.Control
                            name="name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Please enter Name"
                            value={formData?.name}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {errors.name && (
                          <p className="text-danger">{errors.name}</p>
                        )}
                        <p className="text-capitalize text-lg font-weight-bold mt-2">
                          Price
                        </p>
                        <InputGroup className="mb-2">
                          <Form.Control
                            name="price"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Please enter Price"
                            value={formData.price}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {errors.price && (
                          <p className="text-danger">{errors.price}</p>
                        )}

                        <p className="text-capitalize text-lg font-weight-bold ">
                          Status
                        </p>
                        <InputGroup className="mb-2">
                          <Form.Select
                            aria-label="Default select example"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option>Please select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </Form.Select>
                        </InputGroup>
                        {errors.status && (
                          <p className="text-danger">{errors.status}</p>
                        )}

                        <p className="mt-3 text-capitalize text-lg font-weight-bold ">
                          Please Select Features
                        </p>

                        {/* Event Creation Feature */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">1. Event Creation:</p>
                          <div className="d-flex gap-8">
                            {/* <div className="d-flex">
                              <Form.Check
                                type="radio"
                                label="Up To 5 Events"
                                name="eventCreation"
                                value="Up To 5 Events"
                                className="me-3"
                                checked={
                                  formData.features.eventCreation === "Up To 5 Events"
                                }
                                onChange={handleChange}
                              />
                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                              />
                            </div> */}

                            <div className="d-flex">
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="eventCreation"
                                  value={
                                    formData?.features?.eventCreation || ""
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  label={
                                    formData?.features?.eventCreation
                                      ? formData.features.eventCreation !==
                                        "Unlimited"
                                        ? formData.features.eventCreation
                                        : "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  name="eventCreation"
                                  value={
                                    formData?.features?.eventCreation !==
                                    "Unlimited"
                                      ? formData.features.eventCreation ||
                                        "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  className="me-3"
                                  checked={
                                    formData.features.eventCreation !==
                                      "Unlimited" &&
                                    formData.features.eventCreation ===
                                      (formData?.features?.eventCreation ||
                                        "Up To 5 Friends")
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                />
                              )}

                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                                onClick={() => setIsEditing(!isEditing)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>

                            <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="eventCreation"
                              value="Unlimited"
                              checked={
                                formData.features.eventCreation === "Unlimited"
                              }
                              // onChange={(e) =>
                              //   setFormData((prevData) => ({
                              //     ...prevData,
                              //     features: {
                              //       ...prevData.features,
                              //       [e.target.name]: e.target.value,
                              //     },
                              //   }))
                              // }
                              onChange={handleChange}
                            />

                            {/* <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="eventCreation"
                              value="Unlimited"
                              checked={
                                formData.features.eventCreation === "Unlimited"
                              }
                              onChange={handleChange}
                            /> */}
                          </div>
                          {errors.eventCreation && (
                            <p className="text-danger">
                              {errors.eventCreation}
                            </p>
                          )}
                        </div>
                        {/* INVITE FRIENDS TO USERS  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            2. Invite Friends to Events:
                          </p>
                          <div className="d-flex gap-8">
                            {/* <div className="d-flex">
                              <Form.Check
                                type="radio"
                                label="Up to 5 friends"
                                name="invitefriends"
                                value="Up to 5 friends"
                                className="me-3"
                                checked={
                                  formData.features.invitefriends ===
                                  "Up to 5 friends"
                                }
                                onChange={handleChange}
                              />

                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                              />
                            </div> */}

                            <div className="d-flex">
                              {isEditinginvite ? (
                                <input
                                  type="text"
                                  name="invitefriends"
                                  value={
                                    formData?.features?.invitefriends || ""
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  label={
                                    formData?.features?.invitefriends
                                      ? formData.features.invitefriends !==
                                        "Unlimited"
                                        ? formData.features.invitefriends
                                        : "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  name="invitefriends"
                                  value={
                                    formData?.features?.invitefriends !==
                                    "Unlimited"
                                      ? formData.features.invitefriends ||
                                        "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  className="me-3"
                                  checked={
                                    formData.features.invitefriends !==
                                      "Unlimited" &&
                                    formData.features.invitefriends ===
                                      (formData?.features?.invitefriends ||
                                        "Up To 5 Friends")
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                />
                              )}

                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                                onClick={() =>
                                  setIsEditinginvite(!isEditinginvite)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            </div>

                            <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="invitefriends"
                              value="Unlimited"
                              checked={
                                formData.features.invitefriends === "Unlimited"
                              }
                              // onChange={(e) =>
                              //   setFormData((prevData) => ({
                              //     ...prevData,
                              //     features: {
                              //       ...prevData.features,
                              //       [e.target.name]: e.target.value,
                              //     },
                              //   }))
                              // }
                              onChange={handleChange}
                            />

                            {/* <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="invitefriends"
                              value="Unlimited"
                              checked={
                                formData.features.invitefriends === "Unlimited"
                              }
                              onChange={handleChange}
                            /> */}
                          </div>
                          {errors.invitefriends && (
                            <p className="text-danger">
                              {errors.invitefriends}
                            </p>
                          )}
                        </div>
                        {/* WISHLIST CREATION  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            3. Wishlist Creation:
                          </p>
                          <div className="d-flex gap-8">
                            {/* <div className="d-flex">
                              <Form.Check
                                type="radio"
                                label="Up to 5 friends"
                                name="wishlistCreation"
                                value="Up to 5 friends"
                                className="me-3"
                                checked={
                                  formData.features.wishlistCreation ===
                                  "Up to 5 friends"
                                }
                                onChange={handleChange}
                              />

                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                              />
                            </div> */}

                            <div className="d-flex">
                              {isEditingwishlist ? (
                                <input
                                  type="text"
                                  name="wishlistCreation"
                                  value={
                                    formData?.features?.wishlistCreation || ""
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  label={
                                    formData?.features?.wishlistCreation
                                      ? formData.features.wishlistCreation !==
                                        "Unlimited"
                                        ? formData.features.wishlistCreation
                                        : "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  name="wishlistCreation"
                                  value={
                                    formData?.features?.wishlistCreation !==
                                    "Unlimited"
                                      ? formData.features.wishlistCreation ||
                                        "Up To 5 Friends"
                                      : "Up To 5 Friends"
                                  }
                                  className="me-3"
                                  checked={
                                    formData.features.wishlistCreation !==
                                      "Unlimited" &&
                                    formData.features.wishlistCreation ===
                                      (formData?.features?.wishlistCreation ||
                                        "Up To 5 Friends")
                                  }
                                  // onChange={(e) =>
                                  //   setFormData((prevData) => ({
                                  //     ...prevData,
                                  //     features: {
                                  //       ...prevData.features,
                                  //       [e.target.name]: e.target.value,
                                  //     },
                                  //   }))
                                  // }
                                  onChange={handleChange}
                                />
                              )}

                              <MdModeEditOutline
                                className={`${Styles.delicon112}`}
                                onClick={() =>
                                  setIsEditingwishlist(!isEditingwishlist)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            </div>

                            <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="wishlistCreation"
                              value="Unlimited"
                              checked={
                                formData.features.wishlistCreation === "Unlimited"
                              }
                              // onChange={(e) =>
                              //   setFormData((prevData) => ({
                              //     ...prevData,
                              //     features: {
                              //       ...prevData.features,
                              //       [e.target.name]: e.target.value,
                              //     },
                              //   }))
                              // }
                              onChange={handleChange}
                            />

                            {/* <Form.Check
                              type="radio"
                              label="Unlimited"
                              name="wishlistCreation"
                              value="Unlimited"
                              checked={
                                formData.features.wishlistCreation ===
                                "Unlimited"
                              }
                              onChange={handleChange}
                            /> */}
                          </div>
                          {errors.wishlistCreation && (
                            <p className="text-danger">
                              {errors.wishlistCreation}
                            </p>
                          )}
                        </div>
                        {/* POOL CREATION FOR WISHLIST ITEMS  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            4. Pool Creation for Wishlist Items:
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="YES"
                              name="PoolCreation"
                              value="YES"
                              className="me-3"
                              checked={formData.features.PoolCreation === "YES"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="NO"
                              name="PoolCreation"
                              value="NO"
                              className="me-3"
                              checked={formData.features.PoolCreation === "NO"}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.PoolCreation && (
                            <p className="text-danger">{errors.PoolCreation}</p>
                          )}
                        </div>
                        {/* CHAT WITH INVITED FRIENDS  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            5. Chat with Invited Friends:
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="Basic Chat"
                              name="chatt"
                              value="Basic Chat"
                              className="me-3"
                              checked={formData.features.chatt === "Basic Chat"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Group Chat"
                              name="chatt"
                              value="Group Chat"
                              className="me-3"
                              checked={formData.features.chatt === "Group Chat"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Advanced Chat"
                              name="chatt"
                              value="Advanced Chat"
                              checked={
                                formData.features.chatt === "Advanced Chat"
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {errors.chatt && (
                            <p className="text-danger">{errors.chatt}</p>
                          )}
                        </div>
                        {/* EVENT REMINDERS AND NOTIFICATION  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            6. Event Reminders & Notifications:
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="Basic Reminders"
                              name="EventReminders"
                              value="Basic reminders"
                              className="me-3"
                              checked={
                                formData.features.EventReminders ===
                                "Basic reminders"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Enhanced Reminders"
                              name="EventReminders"
                              value="Enhanced Reminders"
                              className="me-3"
                              checked={
                                formData.features.EventReminders ===
                                "Enhanced Reminders"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Priority Reminders & Push Notifications"
                              name="EventReminders"
                              value="Priority Reminders"
                              checked={
                                formData.features.EventReminders ===
                                "Priority Reminders"
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {errors.EventReminders && (
                            <p className="text-danger">
                              {errors.EventReminders}
                            </p>
                          )}
                        </div>
                        {/* CUSTOM EVENTS THEMES  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            7. Custom Event Themes:
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="Default Theme"
                              name="CustomEvent"
                              value="Default Theme"
                              className="me-3"
                              checked={
                                formData.features.CustomEvent ===
                                "Default Theme"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Premium Theme"
                              name="CustomEvent"
                              value="Premium Theme"
                              className="me-3"
                              checked={
                                formData.features.CustomEvent ===
                                "Premium Theme"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="10 Exclusive Themes + Customization"
                              name="CustomEvent"
                              value="Exclusive Theme"
                              checked={
                                formData.features.CustomEvent ===
                                "Exclusive Theme"
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {errors.CustomEvent && (
                            <p className="text-danger">{errors.CustomEvent}</p>
                          )}
                        </div>
                        {/* ADD FREE EXPERIENCE  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            8. Add Free Experience :
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="YES"
                              name="AddfreeExperience"
                              value="YES"
                              className="me-3"
                              checked={
                                formData.features.AddfreeExperience === "YES"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="NO"
                              name="AddfreeExperience"
                              value="NO"
                              className="me-3"
                              checked={
                                formData.features.AddfreeExperience === "NO"
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {errors.AddfreeExperience && (
                            <p className="text-danger">
                              {errors.AddfreeExperience}
                            </p>
                          )}
                        </div>
                        {/* PRIORITY SUPPORT  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            9. Priority Support:
                          </p>
                          <div className="d-flex gap-8">
                            <Form.Check
                              type="radio"
                              label="Standard Support"
                              name="PrioritySupport"
                              value="Standard Support"
                              className="me-3"
                              checked={
                                formData.features.PrioritySupport ===
                                "Standard Support"
                              }
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="24/7"
                              name="PrioritySupport"
                              value="24/7"
                              checked={
                                formData.features.PrioritySupport === "24/7"
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {errors.PrioritySupport && (
                            <p className="text-danger">
                              {errors.PrioritySupport}
                            </p>
                          )}
                        </div>
                        {/* BUTTONS  */}
                        <div className="container text-end mt-3">
                          <button
                            type="button"
                            className={`btn btn font-weight-bold ${Styles.btnlater}`}
                             onClick={handleShow}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className={`btn btn ${Styles.btnsucess}`}
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
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

export default AddSubscription;
