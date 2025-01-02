import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Styles from "./Subscription.module.css";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { url } from "../../url/url";
import toast from "react-hot-toast";
import { MdModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";

function EditSubscription(props) {
  const location = useLocation();
  const { subscriptionData } = location.state || {};
  // console.log(subscriptionData);

  const [formData, setFormData] = useState({
    name: "" || subscriptionData?.name,
    price: "" || subscriptionData?.price,
    status: "" || subscriptionData?.status,
    features: {
      eventCreation: "" || subscriptionData?.features?.eventCreation,
      invitefriends: "" || subscriptionData?.features?.invitefriends,
      wishlistCreation: "" || subscriptionData?.features?.wishlistCreation,
      PoolCreation: "" || subscriptionData?.features?.PoolCreation,
      chatt: "" || subscriptionData?.features?.chatt,
      EventReminders: "" || subscriptionData?.features?.EventReminders,
      CustomEvent: "" || subscriptionData?.features?.CustomEvent,
      AddfreeExperience: "" || subscriptionData?.features?.AddfreeExperience,
      PrioritySupport: "" || subscriptionData?.features?.PrioritySupport,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingwishlist, setIsEditingwishlist] = useState(false);
  const [isEditinginvite, setIsEditinginvite] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (req, res) => {
    try {
      const response = await axios.put(`${url}/edit-subscription/${subscriptionData?._id}`, formData);
      toast.success("Subscription Updated Successfully!");
      navigate("/subscription");
    } catch (error) {
      console.log("Error in creating subscription", error);
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
                          UPDATE SUBSCRIPTION
                        </h6>
                        <button
                          type="button"
                          className={`btn  font-weight-bold   ${Styles.btncls121}`}
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
                            defaultValue={subscriptionData?.name}
                            // value={formData?.name}
                            // value={subscriptionData?.name}
                            onChange={handleChange}
                          />
                        </InputGroup>

                        <p className="text-capitalize text-lg font-weight-bold mt-2">
                          Price
                        </p>
                        <InputGroup className="mb-2">
                          <Form.Control
                            name="price"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Please enter Price"
                            defaultValue={subscriptionData?.price}
                            // value={subscriptionData?.price}
                            onChange={handleChange}
                          />
                        </InputGroup>

                        <p className="text-capitalize text-lg font-weight-bold ">
                          Status
                        </p>
                        <InputGroup className="mb-2">
                          <Form.Select
                            aria-label="Default select example"
                            name="status"
                            // value={formData.status}
                            value={subscriptionData?.status}
                            onChange={handleChange}
                          >
                            <option>Please select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </Form.Select>
                        </InputGroup>

                        <p className="mt-3 text-capitalize text-lg font-weight-bold ">
                          Please Select Features
                        </p>

                        {/* Event Creation Feature */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">1. Event Creation:</p>
                          <div className="d-flex gap-8">
                            <div className="d-flex">
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="eventCreation"
                                  value={
                                    formData?.features?.eventCreation || ""
                                  }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                //   label={
                                //     formData?.features?.eventCreation
                                //       ? formData.features.eventCreation !==
                                //         "Unlimited"
                                //         ? formData.features.eventCreation
                                //         : "Up To 5 Friends"
                                //       : "Up To 5 Friends"
                                //   }
                                label={
                                    subscriptionData?.features?.eventCreation === "Unlimited"
                                      ? formData?.features?.eventCreation
                                        ? formData?.features?.eventCreation
                                        : "Up To 5 Friends"
                                      : subscriptionData?.features?.eventCreation === "Unlimited"
                                      ? "Up To 5 Friends"
                                      : formData?.features?.eventCreation !== "Unlimited"
                                      ? formData?.features?.eventCreation === ""
                                        ? subscriptionData?.features?.eventCreation
                                        : formData?.features?.eventCreation
                                      : subscriptionData?.features?.eventCreation
                                  }
                                  value={
                                    formData?.features?.eventCreation === ""
                                      ? subscriptionData?.features?.eventCreation || "Up To 5 Friends"
                                      : formData?.features?.eventCreation
                                  }
                                  checked={
                                    formData?.features?.eventCreation === ""
                                      ? subscriptionData?.features?.eventCreation ===
                                        subscriptionData?.features?.eventCreation
                                      : formData?.features?.eventCreation ===
                                        formData?.features?.eventCreation
                                  }
                                  name="eventCreation"
                                //   value={
                                //     formData?.features?.eventCreation !==
                                //     "Unlimited"
                                //       ? formData.features.eventCreation ||
                                //         "Up To 5 Friends"
                                //       : "Up To 5 Friends"
                                //   }
                                  className="me-3"
                                  //   checked={
                                  //     formData.features.eventCreation !==
                                  //       "Unlimited" &&
                                  //     formData.features.eventCreation ===
                                  //       (formData?.features?.eventCreation ||
                                  //         "Up To 5 Friends")
                                  //   }
                                //   checked={
                                //     subscriptionData?.features?.eventCreation
                                //   }
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
                              //   checked={
                              //     formData.features.eventCreation === "Unlimited"
                              //   }
                              checked={
                                formData?.features?.eventCreation === "Unlimited" ||
                                (!formData?.features?.eventCreation &&
                                  subscriptionData?.features?.eventCreation === "Unlimited")
                              }
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* INVITE FRIENDS TO USERS  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            2. Invite Friends to Events:
                          </p>
                          <div className="d-flex gap-8">
                            <div className="d-flex">
                              {isEditinginvite ? (
                                <input
                                  type="text"
                                  name="invitefriends"
                                  value={
                                    formData?.features?.invitefriends === "Unlimited" ? 
                                    subscriptionData?.features?.invitefriends : formData?.features?.invitefriends
                                  }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                //   label={
                                //     formData?.features?.invitefriends
                                //       ? formData.features.invitefriends !==
                                //         "Unlimited"
                                //         ? formData.features.invitefriends
                                //         : "Up To 5 Friends"
                                //       : "Up To 5 Friends"
                                //   }
                                label={
                                    subscriptionData?.features?.invitefriends === "Unlimited"
                                      ? formData?.features?.invitefriends
                                        ? formData?.features?.invitefriends
                                        : "Up To 5 Friends"
                                      : subscriptionData?.features?.invitefriends === "Unlimited"
                                      ? "Up To 5 Friends"
                                      : formData?.features?.invitefriends !== "Unlimited"
                                      ? formData?.features?.invitefriends === ""
                                        ? subscriptionData?.features?.invitefriends
                                        : formData?.features?.invitefriends
                                      : subscriptionData?.features?.invitefriends
                                  }
                                  name="invitefriends"
                                //   value={
                                //     formData?.features?.invitefriends !==
                                //     "Unlimited"
                                //       ? formData.features.invitefriends ||
                                //         "Up To 5 Friends"
                                //       : "Up To 5 Friends"
                                //   }
                                value={
                                    formData?.features?.invitefriends === ""
                                      ? subscriptionData?.features?.invitefriends || "Up To 5 Friends"
                                      : formData?.features?.invitefriends
                                  }
                                  checked={
                                    formData?.features?.invitefriends === ""
                                      ? subscriptionData?.features?.invitefriends ===
                                        subscriptionData?.features?.invitefriends
                                      : formData?.features?.invitefriends ===
                                        formData?.features?.invitefriends
                                  }
                                  className="me-3"
                                  //   checked={
                                  //     formData.features.invitefriends !==
                                  //       "Unlimited" &&
                                  //     formData.features.invitefriends ===
                                  //       (formData?.features?.invitefriends ||
                                  //         "Up To 5 Friends")
                                  //   }
                                //   checked={
                                //     subscriptionData?.features?.invitefriends
                                //   }
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
                              //   checked={
                              //     formData.features.invitefriends === "Unlimited"
                              //   }

                            //   checked={
                            //     subscriptionData?.features?.invitefriends
                            //   }
                            // checked={
                            //     formData?.features?.invitefriends === "Unlimited" ||
                            //     (!formData?.features?.invitefriends &&
                            //       subscriptionData?.features?.invitefriends === "Unlimited")
                            //   }
                            checked={
                                formData?.features?.invitefriends === "Unlimited" ||
                                (!formData?.features?.invitefriends &&
                                  subscriptionData?.features?.invitefriends === "Unlimited")
                              }
                              onChange={handleChange}
                            />
                          </div>
                         
                        </div>
                        {/* WISHLIST CREATION  */}
                        <div className="container mb-3">
                          <p className="font-weight-bold">
                            3. Wishlist Creation:
                          </p>
                          <div className="d-flex gap-8">
                            <div className="d-flex">
                              {isEditingwishlist ? (
                                <input
                                  type="text"
                                  name="wishlistCreation"
                                  value={
                                    formData?.features?.wishlistCreation === "Unlimited" ? 
                                    subscriptionData?.features?.wishlistCreation : formData?.features?.wishlistCreation
                                  }
                                  onChange={handleChange}
                                  className="form-control me-3"
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                    // label={
                                    //   subscriptionData?.features?.wishlistCreation
                                    //     ? subscriptionData.features.wishlistCreation !==
                                    //       "Unlimited"
                                    //       ? subscriptionData.features.wishlistCreation
                                    //       : formData?.features?.wishlistCreation
                                    //     : formData?.features?.wishlistCreation
                                    // }
                                    
                                  //   name="wishlistCreation"
                                    // value={
                                    //     subscriptionData?.features?.wishlistCreation !==
                                    //   "Unlimited"
                                    //     ? subscriptionData.features.wishlistCreation ||
                                    //     formData?.features?.wishlistCreation :
                                    //     formData?.features?.wishlistCreation
                                    // }
                                  //   className="me-3"
                                  //   checked={
                                  //     formData.features.wishlistCreation !==
                                  //       "Unlimited" &&
                                  //     formData.features.wishlistCreation ===
                                  //       (formData?.features?.wishlistCreation ||
                                  //         "Up To 5 Friends")
                                  //   }
                              

                                // label={
                                //     subscriptionData?.features?.wishlistCreation === "Unlimited"
                                //       ? "Up To 5 Friends" 
                                //       : formData?.features?.wishlistCreation !== "Unlimited"
                                //       ? formData?.features?.wishlistCreation === ""
                                //         ? subscriptionData?.features?.wishlistCreation
                                //         : formData?.features?.wishlistCreation
                                //       : subscriptionData?.features?.wishlistCreation
                                //   }

                                label={
                                    subscriptionData?.features?.wishlistCreation === "Unlimited"
                                      ? formData?.features?.wishlistCreation
                                        ? formData?.features?.wishlistCreation
                                        : "Up To 5 Friends"
                                      : subscriptionData?.features?.wishlistCreation === "Unlimited"
                                      ? "Up To 5 Friends"
                                      : formData?.features?.wishlistCreation !== "Unlimited"
                                      ? formData?.features?.wishlistCreation === ""
                                        ? subscriptionData?.features?.wishlistCreation
                                        : formData?.features?.wishlistCreation
                                      : subscriptionData?.features?.wishlistCreation
                                  }
                                  
                                  
                                  name="wishlistCreation"
                                  value={
                                    formData?.features?.wishlistCreation === ""
                                      ? subscriptionData?.features?.wishlistCreation || "Up To 5 Friends"
                                      : formData?.features?.wishlistCreation
                                  }
                                  className="me-3"
                                //   checked={
                                //     subscriptionData?.features
                                //       ?.wishlistCreation ===
                                //     subscriptionData?.features?.wishlistCreation
                                //   }
                                checked={
                                    formData?.features?.wishlistCreation === ""
                                      ? subscriptionData?.features?.wishlistCreation ===
                                        subscriptionData?.features?.wishlistCreation
                                      : formData?.features?.wishlistCreation ===
                                        formData?.features?.wishlistCreation
                                  }
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
                              //   checked={
                              //     formData.features.wishlistCreation === "Unlimited"
                              //   }
                            //   checked={
                            //     subscriptionData?.features?.wishlistCreation ===
                            //       "Unlimited" ||
                            //     (!subscriptionData?.features
                            //       ?.wishlistCreation &&
                            //       "Unlimited" === "Unlimited")
                            //   }
                            checked={
                                formData?.features?.wishlistCreation === "Unlimited" ||
                                (!formData?.features?.wishlistCreation &&
                                  subscriptionData?.features?.wishlistCreation === "Unlimited")
                              }
                              onChange={handleChange}
                            />
                          </div>
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
                              // checked={
                              //   subscriptionData?.features?.PoolCreation ===
                              //   "YES" ?       subscriptionData?.features?.PoolCreation ===
                              //   "YES" :       formData?.features?.PoolCreation ===
                              //   "YES"
                              // }
                              checked={formData?.features?.PoolCreation === "YES"}
                            />
                            <Form.Check
                              type="radio"
                              label="NO"
                              name="PoolCreation"
                              value="NO"
                              className="me-3"
                              //   checked={formData.features.PoolCreation === "NO"}
                              // checked={
                              //   subscriptionData?.features?.PoolCreation ===
                              //   "NO" ?       subscriptionData?.features?.PoolCreation ===
                              //   "NO" :       formData?.features?.PoolCreation ===
                              //   "NO"
                              // }
                              checked={formData?.features?.PoolCreation === "NO"}
                   
                              onChange={handleChange}
                            />
                          </div>
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
                              // checked={
                              //   subscriptionData?.features?.chatt ===
                              //   "Basic Chat" ?    subscriptionData?.features?.chatt ===
                              //   "Basic Chat" :    formData?.features?.chatt ===
                              //   "Basic Chat"
                              // }
                              checked={formData?.features?.chatt ===
                                "Basic Chat"}

                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Group Chat"
                              name="chatt"
                              value="Group Chat"
                              className="me-3"
                              // checked={
                              //   subscriptionData?.features?.chatt ===
                              //   "Group Chat" ?    subscriptionData?.features?.chatt ===
                              //   "Group Chat" :    formData?.features?.chatt ===
                              //   "Group Chat"
                              // }
                              checked={formData?.features?.chatt ===
                                "Group Chat"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Advanced Chat"
                              name="chatt"
                              value="Advanced Chat"
                              // checked={
                              //   subscriptionData?.features?.chatt ===
                              //   "Advanced Chat" ?    subscriptionData?.features?.chatt ===
                              //   "Advanced Chat" :    formData?.features?.chatt ===
                              //   "Advanced Chat"
                              // }
                              checked={formData?.features?.chatt ===
                                "Advanced Chat"}
                     
                              onChange={handleChange}
                            />
                          </div>
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
                              value="Basic Reminders"
                              className="me-3"
                              // checked={
                              //   subscriptionData?.features?.EventReminders ===
                              //   "Basic Reminders" ? subscriptionData?.features?.EventReminders ===
                              //   "Basic Reminders" : formData?.features?.EventReminders ===
                              //   "Basic Reminders"
                              // }
                              checked={formData?.features?.EventReminders ===
                                "Basic Reminders"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Enhanced Reminders"
                              name="EventReminders"
                              value="Enhanced Reminders"
                              className="me-3"
                              // checked={
                              //   subscriptionData?.features?.EventReminders ===
                              //   "Enhanced Reminders" ? subscriptionData?.features?.EventReminders ===
                              //   "Enhanced Reminders" : formData?.features?.EventReminders ===
                              //   "Enhanced Reminders"
                              // }
                              checked={formData?.features?.EventReminders ===
                                "Enhanced Reminders"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Priority Reminders & Push Notifications"
                              name="EventReminders"
                              value="Priority Reminders"
                              // checked={
                              //   subscriptionData?.features?.EventReminders ===
                              //   "Priority Reminders" ? subscriptionData?.features?.EventReminders ===
                              //   "Priority Reminders" : formData?.features?.EventReminders ===
                              //   "Priority Reminders"
                              // }
                              checked={formData?.features?.EventReminders ===
                                "Priority Reminders"}
                  
                              onChange={handleChange}
                            />
                          </div>
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
                              // checked={
                              //   subscriptionData?.features?.CustomEvent ===
                              //   "Premium Theme" ?  subscriptionData?.features?.CustomEvent ===
                              //   "Premium Theme" :  formData?.features?.CustomEvent ===
                              //   "Premium Theme"
                              // }
                              checked={formData?.features?.CustomEvent ===
                                "Default Theme"}
                         
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="Premium Theme"
                              name="CustomEvent"
                              value="Premium Theme"
                              className="me-3"
                              // checked={
                              //   subscriptionData?.features?.CustomEvent ===
                              //   "Premium Theme" ?  subscriptionData?.features?.CustomEvent ===
                              //   "Premium Theme" :  formData?.features?.CustomEvent ===
                              //   "Premium Theme"
                              // }
                              checked={ formData?.features?.CustomEvent ===
                                "Premium Theme"}
                         
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="10 Exclusive Themes + Customization"
                              name="CustomEvent"
                              value="Exclusive Theme"
                              // checked={
                              //   subscriptionData?.features?.CustomEvent ===
                              //   "Exclusive Theme" ?  subscriptionData?.features?.CustomEvent ===
                              //   "Exclusive Theme" :  formData?.features?.CustomEvent ===
                              //   "Exclusive Theme"
                              // }
                              checked={formData?.features?.CustomEvent ===
                                "Exclusive Theme"}
                         
                              onChange={handleChange}
                            />
                          </div>
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
                              // checked={
                              //   subscriptionData?.features
                              //     ?.AddfreeExperience === "YES" ?  subscriptionData?.features
                              //     ?.AddfreeExperience === "YES" :  formData?.features
                              //     ?.AddfreeExperience === "YES"
                              // }
                              checked={formData?.features
                                ?.AddfreeExperience === "YES"}
                           
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="NO"
                              name="AddfreeExperience"
                              value="NO"
                              className="me-3"
                              // checked={
                              //   subscriptionData?.features
                              //     ?.AddfreeExperience === "NO" ?  subscriptionData?.features
                              //     ?.AddfreeExperience === "NO" :  formData?.features
                              //     ?.AddfreeExperience === "NO"
                              // }
                             checked={ formData?.features
                              ?.AddfreeExperience === "NO"}
                              onChange={handleChange}
                            />
                          </div>
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
                              checked={formData?.features?.PrioritySupport === "Standard Support" }
                              
                              // checked={
                              //   subscriptionData?.features?.PrioritySupport ===
                              //   "Standard Support" ?  subscriptionData?.features?.PrioritySupport ===
                              //   "Standard Support" : formData?.features?.PrioritySupport ===  "Standard Support" 
                              // }
                             
                              onChange={handleChange}
                            />
                            <Form.Check
                              type="radio"
                              label="24/7"
                              name="PrioritySupport"
                              value="24/7"
                              // checked={
                              //   subscriptionData?.features?.PrioritySupport ===
                              //   "24/7" ?  subscriptionData?.features?.PrioritySupport ===
                              //   "24/7" : formData?.features?.PrioritySupport === "24/7"
                              // }
                              checked={formData?.features?.PrioritySupport === "24/7" }
                      
                              onChange={handleChange}
                            />
                          </div>
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

export default EditSubscription;
