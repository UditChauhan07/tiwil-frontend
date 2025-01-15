import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Styles from "./payment.module.css";
import axios from "axios";
import { url } from "../../url/url";

function Payment(props) {
  const [paymentData, setpaymentData] = useState([]);
  console.log(paymentData);

  useEffect(() => {
    GetAllPayment();
  }, []);

  const GetAllPayment = async (req, res) => {
    try {
      const response = await axios.get(`${url}/get-allpayment`);
      //   console.log(response.data?.data);
      setpaymentData(response.data?.data);
    } catch (error) {
      console.log("error in fetching payment", error);
    }
  };

  return (
    <div>
      <Layout />

      {/* MAIN  */}
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className={`card ${Styles.maintt}`}>
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="d-flex bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 className="text-white text-capitalize ps-3">
                          Payment table
                        </h6>
                      </div>
                    </div>

                    <>
                      <div className="card-body px-0 pb-2">
                        <div className="table-responsive p-0 ">
                          <table className="table align-items-center mb-0">
                            <thead>
                              <tr>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                                  UserName
                                </th>
                                <th className=" text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                  Amount
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Payment ID
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Date
                                </th>
                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {paymentData.map((item) => {
                                return (
                                  <>
                                    <tr>
                                      <td className="align-middle text-center">
                                        <p className="text-xs font-weight-bold text-secondary mb-0">
                                          {item.name}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <p className="text-xs font-weight-bold text-secondary mb-0">
                                          {item.amount}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <p className="text-xs font-weight-bold text-secondary mb-0">
                                          {item.paymentId}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center">
                                        <p className="text-xs font-weight-bold text-secondary mb-0">
                                          {new Date(
                                            item.date
                                          ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                          })}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center text-sm">
                                      <span className="badge badge-sm bg-gradient-success">
                                        {item?.status}
                                      </span>
                                    </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                          {/* PAGINATION  */}
                        </div>
                      </div>
                    </>
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

export default Payment;
