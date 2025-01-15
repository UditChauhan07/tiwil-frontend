import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Styles from "./Subscription.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../url/url";
import { MdModeEditOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { MdVisibility } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "antd";
import CommonModal from "../Modal/modal";
import { Card, Row, Col, DatePicker } from "antd";
import toast from "react-hot-toast";

function Subscription(props) {
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

  const [subscriptionData, setsubscriptionData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [subscriptionView, setsubscriptionView] = useState();
  const [modalShowDelete, setModalShowDelete] = useState();
  const [subscriptionDeleteid, setsubscriptionDeleteid] = useState();
  const navigate = useNavigate();

  const handleShow = () => {
    navigate("/add-subscription");
  };

  useEffect(() => {
    GetAllsubscription();
  }, []);

  const GetAllsubscription = async () => {
    try {
      const response = await axios.get(`${url}/get-subscription`);
      setsubscriptionData(response.data);
    } catch (error) {
      console.log("Error in fetching subscription", error);
    }
  };

  const handleshow = (item) => {
    setsubscriptionView(item);
    setModalShow(true);
  };
  const handleClose = () => {
    setModalShow(false);
  };

  const handleshowEdit = (item) => {
    // navigate("/update-subscription");
    navigate("/update-subscription", {
      state: {
        subscriptionData: item, // Ensure this contains valid data
      },
    });
  };

  const handleshowDelete = (item) => {
    setsubscriptionDeleteid(item);
    setModalShowDelete(true);
  };

  const handleCloseDelete = () => {
    setModalShowDelete(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(
        `${url}/delete-subscription/${subscriptionDeleteid}`
      );
      console.log(response);
      toast.success("Subscription Deleted Successfully!");
    } catch (error) {
      console.log("error in deleting the subscription", error);
    }
    setModalShowDelete(false);
    GetAllsubscription();
  };

  return (
    <div>
      <Layout />

      {/* MODAL FOR VIEW  */}
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
                height: "450px", 
                // overflowY: "auto",
              }}
            >
              <div style={styles.card}>
                <div style={styles.header}>
                  <h5 style={{ color: "#fff", margin: 0 }}>
                    Subscription Details
                  </h5>
                </div>
                <div className="container modal-content-scrollable " style={{
                maxWidth: "980px",
                margin: "0px auto",
                fontFamily: "Arial, sans-serif",
                height: "400px", 
                overflowY: "auto",
              }}>
                  <Card className="society-card">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Name :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Price :
                          </b>
                        </p>
                        <p>
                          <b className="text-lg text-center font-weight-bold mb-0">
                            Status :
                          </b>
                        </p>
                        <p>
                          <b className=" text-lg text-center font-weight-bold mb-0">
                            Features :
                          </b>
                        </p>
                      </Col>
                      <Col span={12}>
                        <p>
                          <b>{subscriptionView?.name}</b>
                        </p>
                        <p>
                          <b>INR {subscriptionView?.price}/Event</b>
                        </p>
                        <p>
                          <b>{subscriptionView?.status}</b>
                        </p>

                        <p className="mt-4 featurr">
                          <b>
                            <ul>
                              {subscriptionView?.features &&
                                Object.entries(subscriptionView.features).map(
                                  ([key, value]) => (
                                    <li key={key}>
                                      <b>
                                        {key.charAt(0).toUpperCase() +
                                          key.slice(1)}
                                        :{" "}
                                      </b>{" "}
                                      {value}
                                    </li>
                                  )
                                )}
                            </ul>
                          </b>
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </div>
          </>
        }
      />

      {/* MODAL FOR DELETE  */}

      <CommonModal
        show={modalShowDelete}
        handleClose={handleCloseDelete}
        size="md"
        body={
          <>
            <div className="container">
              <h5 className="text-center">
                Are you sure! Want to delete this Subscription!
              </h5>
              <div className="container text-end mt-4">
                <button
                  type="button"
                  className={`btn btn font-weight-bold ${Styles.btnlater}`}
                  onClick={handleCloseDelete}
                >
                  No
                </button>
                <button
                  type="button"
                  className={`btn btn ${Styles.btnsucess}`}
                  onClick={handleSubmit}
                >
                  Yes
                </button>
              </div>
            </div>
          </>
        }
      />

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
                          Subscription Table
                        </h6>
                        <button
                          type="button"
                          className={`btn  font-weight-bold   ${Styles.btncls}`}
                          onClick={handleShow}
                        >
                          Add Subscription
                        </button>
                      </div>
                    </div>

                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0 ">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Name
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Features
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Price
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
                            {subscriptionData?.subscription?.map((item) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      <p className="text-base font-weight-bold mb-0">
                                        {item?.name}
                                      </p>
                                    </td>

                                    <td>
                                      <ul>
                                        {Object.entries(item?.features || {})
                                          .slice(0, 4) // Show only the first 4 items
                                          .map(([key, value]) => (
                                            <li
                                              key={key}
                                              className={`text-xs text-center font-weight-bold mb-0 ${Styles.customlist}`}
                                            >
                                              {value}
                                            </li>
                                          ))}

                                        {Object.entries(item?.features || {})
                                          .length > 4 && (
                                          <Tooltip
                                            title={Object.entries(
                                              item?.features || {}
                                            )
                                              .slice(4) // Items for the tooltip
                                              .map(
                                                ([key, value]) => ` ${value}`
                                              )
                                              .join(", ")} // Display remaining items in tooltip
                                          >
                                            <li
                                              className={`text-xs text-center font-weight-bold mb-0 ${Styles.customlist}`}
                                            >
                                              +
                                              {Object.entries(
                                                item?.features || {}
                                              ).length - 4}{" "}
                                              more
                                            </li>
                                          </Tooltip>
                                        )}
                                      </ul>
                                    </td>

                                    <td>
                                      <p className="text-xs text-center font-weight-bold mb-0">
                                        {`INR ${item?.price}/Event`}
                                      </p>
                                    </td>
                                    <td className="align-middle text-center text-sm">
                                      <span className="badge badge-sm bg-gradient-success">
                                        {item?.status}
                                      </span>
                                    </td>
                                    <td className="align-middle text-center">
                                      <span>
                                        <MdVisibility
                                          className={`${Styles.delicon1}`}
                                          onClick={() => handleshow(item)}
                                        />

                                        <MdModeEditOutline
                                          className={`${Styles.delicon1}`}
                                          onClick={() => handleshowEdit(item)}
                                        />

                                        <MdDelete
                                          className={`${Styles.delicon1}`}
                                          onClick={() =>
                                            handleshowDelete(item?._id)
                                          }
                                        />
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

export default Subscription;
