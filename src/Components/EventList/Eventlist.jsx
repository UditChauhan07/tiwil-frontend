import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import Styles from "./EventList.module.css";
import axios from "axios";
import { url } from "../../url/url";
import { MdVisibility } from "react-icons/md";
import CommonModal from "../Modal/modal";
import { Button } from "react-bootstrap";
import { FaUser, FaHashtag, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TbCirclesRelation } from "react-icons/tb";
import Carousel from "react-bootstrap/Carousel";
import DatePicker from "react-datepicker";

function Eventlist(props) {
  const [Events, setEvents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [invitedUser, setinvitedUser] = useState();
  const [wishlist, setWishlist] = useState([]);

  const GetEvents = async () => {
    try {
      const response = await axios.get(`${url}/get-allevents`);
      setEvents(response.data.events);
    } catch (error) {
      console.log("Error in fetching events", error);
    }
  };

  useEffect(() => {
    GetEvents();
  }, []);

  const handleShow = (e, item, _id) => {
    setModalShow(true);
    e.preventDefault();
    setinvitedUser(item);
    Getwishlist(item, _id);
  };

  const Getwishlist = async (item, _id) => {
    try {
      const response = await axios.get(
        `${url}/get-subwishlist/${item?.id}/${_id}`
      );
      setWishlist(response.data);
    } catch (error) {
      console.log("Error in fetching wislist", error);
    }
  };

  const handleClose = () => {
    setModalShow(false);
    setWishlist();
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    icon: {
      marginRight: "10px",
      color: "rgb(232,56,116)",
    },
    actions: {
      marginTop: "15px",
      textAlign: "center",
    },
    actionButton: {
      margin: "5px",
      padding: "8px 15px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#5468ff",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-GB"); // Change 'en-GB' as needed
  };

  // FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermEvent, setSearchTermEvent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredResults = Events.flatMap((item) => {
    const search = searchTerm.toLowerCase();

    const matches = [];

    // Check for matching fields and include the useridName in the relevant fields
    if (item.father?.name && item.father.name.toLowerCase().includes(search)) {
      matches.push({
        type: "father",
        data: {
          ...item.father,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }
    if (item.mother?.name && item.mother.name.toLowerCase().includes(search)) {
      matches.push({
        type: "mother",
        data: {
          ...item.mother,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }

    // Include myAnniversary and parentsAnniversary if search term is empty or they match the search term
    if (!search || item.myAnniversary?.name?.toLowerCase().includes(search)) {
      matches.push({
        type: "myAnniversary",
        data: {
          ...item.myAnniversary,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }

    if (
      !search ||
      item.parentsAnniversary?.name?.toLowerCase().includes(search)
    ) {
      matches.push({
        type: "parentsAnniversary",
        data: {
          ...item.parentsAnniversary,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }

    if (
      item.husband?.name &&
      item.husband.name.toLowerCase().includes(search)
    ) {
      matches.push({
        type: "husband",
        data: {
          ...item.husband,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }

    if (item.wife?.name && item.wife.name.toLowerCase().includes(search)) {
      matches.push({
        type: "wife",
        data: {
          ...item.wife,
          useridName: item.userid?.name,
          eventId: item._id,
          createdAt: item.createdAt,
        },
      });
    }

    // Handle siblings and children arrays, including useridName in each sibling or child
    if (item.siblings && item.siblings.length > 0) {
      item.siblings.forEach((sibling) => {
        if (sibling.name && sibling.name.toLowerCase().includes(search)) {
          matches.push({
            type: "sibling",
            data: {
              ...sibling,
              useridName: item.userid?.name,
              eventId: item._id,
              createdAt: item.createdAt,
            },
          });
        }
      });
    }

    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        if (child.name && child.name.toLowerCase().includes(search)) {
          matches.push({
            type: "child",
            data: {
              ...child,
              useridName: item.userid?.name,
              eventId: item._id,
              createdAt: item.createdAt,
            },
          });
        }
      });
    }
    return matches;
  });

  // console.log(filteredResults);

  // Filter the events based on the search term
  //  const filteredEvents = filteredResults.filter((item) =>
  //   item.data.eventType.toLowerCase().includes(searchTermEvent.toLowerCase())
  // );

  const filteredEvents = filteredResults.filter((item) => {
    // Filter by eventType (search term)
    const matchesEventType = item.data.eventType
      .toLowerCase()
      .includes(searchTermEvent.toLowerCase());

    // Filter by date range
    const eventDate = new Date(item.data.createdAt); // Convert createdAt to Date object
    const matchesDateRange =
      (!startDate || eventDate >= startDate) &&
      (!endDate || eventDate <= endDate);

    return matchesEventType && matchesDateRange;
  });

  console.log(filteredEvents);

  return (
    <div>
      <Layout />

      {/* ----MODAL---  */}
      <CommonModal
        show={modalShow}
        handleClose={handleClose}
        size="xl"
        body={
          <div
            style={{
              maxWidth: "980px",
              margin: "20px auto",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={styles.card}>
              <div style={styles.header}>
                <h5 style={{ color: "#fff", margin: 0 }}>Event Details</h5>
              </div>
              <div style={styles.content}>
                <table style={styles.table}>
                  <tbody>
                    <tr>
                      <td className="text-uppercase  text-base font-weight-bolder opacity-8">
                        <FaUser style={styles.icon} />
                        Name
                      </td>
                      <td
                        style={{
                          color: "rgb(231,55,115)",
                        }}
                        className="text-uppercase  text-xs font-weight-bolder opacity-12"
                      >
                        {invitedUser?.name ? invitedUser?.name : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-uppercase  text-base font-weight-bolder opacity-8">
                        <FaHashtag style={styles.icon} />
                        Event Type
                      </td>
                      <td
                        style={{
                          color: "rgb(231,55,115)",
                        }}
                        className="text-uppercase  text-xs font-weight-bolder opacity-12"
                      >
                        {invitedUser?.eventType ? invitedUser?.eventType : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-uppercase  text-base font-weight-bolder opacity-8">
                        <TbCirclesRelation style={styles.icon} />
                        Relation Type
                      </td>
                      <td
                        style={{
                          color: "rgb(231,55,115)",
                        }}
                        className="text-uppercase  text-xs font-weight-bolder opacity-12"
                      >
                        {invitedUser?.relationType
                          ? invitedUser?.relationType
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-uppercase  text-base font-weight-bolder opacity-8">
                        <FaMapMarkerAlt style={styles.icon} />
                        Location
                      </td>
                      <td
                        style={{
                          color: "rgb(231,55,115)",
                        }}
                        className="text-uppercase  text-xs font-weight-bolder opacity-12"
                      >
                        {invitedUser?.location ? invitedUser?.location : "--"}
                      </td>
                    </tr>

                    <tr>
                      <td className="text-uppercase  text-base font-weight-bolder opacity-8">
                        <MdLocationCity style={styles.icon} />
                        Date
                      </td>

                      <td
                        style={{
                          color: "rgb(231,55,115)",
                        }}
                        className="text-uppercase  text-xs font-weight-bolder opacity-12"
                      >
                        {invitedUser?.dob
                          ? formatDate(invitedUser?.dob)
                          : "--" || invitedUser?.anniversaryDate
                          ? formatDate(invitedUser?.anniversaryDate)
                          : "--"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Tabs
              defaultActiveKey="home"
              id="fill-tab-example"
              className="mb-3 mt-4"
              fill
            >
              {/* WISHLIST TAB  */}
              <Tab
                eventKey="home"
                title={<span className="custom-tab-title">Wishlist Items</span>}
              >
                <div style={styles.card} className="mt-4">
                  <div style={styles.header}>
                    <h5 style={{ color: "#fff", margin: 0 }}>
                      Wishlist Details
                    </h5>
                  </div>
                  <div style={styles.content}>
                    <table
                      style={styles.table}
                      className="table align-items-center mb-0"
                    >
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ">
                            GiftName
                          </th>
                          <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">
                            Price
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                            Desired Rate
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                            Product Link
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-4">
                        {wishlist?.length > 0 ? (
                          <>
                            {wishlist?.map((ele) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      <div className="d-flex px-2 py-1">
                                        <div>
                                          <img
                                            src={`${url}${ele.image}`}
                                            className="avatar avatar-sm me-3 border-radius-lg"
                                            alt="user1"
                                          />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                          <p className="text-xs font-weight-bold text-secondary mb-0">
                                            {ele?.giftname}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="">
                                      <p className="text-xs font-weight-bold text-secondary mb-0">
                                        {ele?.price}
                                      </p>
                                    </td>
                                    <td className="">
                                      <p className="text-xs text-center font-weight-bold text-secondary mb-0">
                                        {`${ele?.desiredRate}%`}
                                      </p>
                                    </td>
                                    <td className="">
                                      <p className="text-xs text-center font-weight-bold text-secondary mb-0">
                                        {ele?.productLink}
                                      </p>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center ">
                              <p className="text-base font-weight-bold text-secondary mb-0 mt-3">
                                No Wishlist Found!
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
              {/* INVITED USERS TAB  */}
              <Tab
                eventKey="profile"
                title={<span className="custom-tab-title">Invited Users</span>}
              >
                <div style={styles.card} className="mt-4">
                  <div style={styles.header}>
                    <h5 style={{ color: "#fff", margin: 0 }}>
                      InvitedUser Details
                    </h5>
                  </div>
                  <div style={styles.content}>
                    <table
                      style={styles.table}
                      className="table align-items-center mb-0"
                    >
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ">
                            Image
                          </th>
                          <th className="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">
                            Name
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                            Phone No
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-4">
                        {invitedUser?.invitedUsers &&
                        invitedUser.invitedUsers.length > 0 ? (
                          invitedUser.invitedUsers.map((item, index) => (
                            <tr key={index}>
                              <td className="">
                                <div>
                                  <img
                                    src={`${url}${item?.image}`}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user1"
                                  />
                                </div>
                              </td>
                              <td className="">
                                <p className="text-xs font-weight-bold text-secondary mb-0">
                                  {item?.name}
                                </p>
                              </td>
                              <td className="">
                                <p className="text-xs text-center font-weight-bold text-secondary mb-0">
                                  {item?.phoneno}
                                </p>
                              </td>
                              <td className="">
                                <p className="text-xs text-center font-weight-bold text-secondary mb-0">
                                  {item?.status}
                                </p>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center ">
                              <p className="text-base font-weight-bold text-secondary mb-0 mt-3">
                                No Invitedusers Found!
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
              {/* Events images tab  */}
              <Tab
                eventKey="longer-tab"
                title={<span className="custom-tab-title">Event Images</span>}
              >
                <div style={styles.card} className="mt-4">
                  <div style={styles.header}>
                    <h5 style={{ color: "#fff", margin: 0 }}>
                      Event Images List
                    </h5>
                  </div>
                  <div style={styles.content}>
                    {invitedUser?.eventImages.length > 0 ? (
                      <>
                        <Carousel>
                          {invitedUser?.eventImages &&
                          invitedUser?.eventImages.length > 0
                            ? invitedUser?.eventImages.map((image, index) => {
                                return (
                                  <Carousel.Item key={index}>
                                    <img
                                      className="d-block w-100"
                                      src={`${url}/${image}`}
                                      alt={`Slide ${index + 1}`}
                                      style={{
                                        height: "300px",
                                        objectFit: "cover",
                                      }} // Adjust styles as needed
                                    />
                                    {/* <Carousel.Caption>
                        <h3>{image.title || `Slide ${index + 1}`}</h3>
                        <p>{image.description || "Default description"}</p>
                      </Carousel.Caption> */}
                                  </Carousel.Item>
                                );
                              })
                            : ""}
                        </Carousel>
                      </>
                    ) : (
                      <p className="text-base text-center font-weight-bold text-secondary mb-0 mt-3">
                        No Images Found!
                      </p>
                    )}
                  </div>
                </div>
              </Tab>
              {/* HISTORY TAB  */}
              <Tab
                eventKey="contact"
                title={<span className="custom-tab-title">History</span>}
              >
                <div style={styles.card} className="mt-4">
                  <div style={styles.header}>
                    <h5 style={{ color: "#fff", margin: 0 }}>
                      History Details
                    </h5>
                  </div>
                  <div>
                    <p className="text-base text-center font-weight-bold text-secondary mb-3 mt-3">
                      No History Found!
                    </p>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        }
      />

      {/* -----MAIN--- */}
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
                          Events table
                        </h6>
                        <div className={`${Styles.inpfilter}`}>
                        
                           <DatePicker
                            className={` ${Styles.inpdate}`}
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                              setStartDate(update[0]);
                              setEndDate(update[1]);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date Range"
                            maxDate={new Date()}
                            isClearable={true}
                          />

                          <input
                            type="text"
                            className={` ${Styles.inpsearch}`}
                            placeholder="Search by Name.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />

                          <input
                            type="text"
                            className={` ${Styles.inpsearch1}`}
                            placeholder="Search by EventType.."
                            value={searchTermEvent}
                            onChange={(e) => setSearchTermEvent(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0 ">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                                Name
                              </th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Relation Type
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Event Type
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Created By
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Wishlist Count
                              </th>
                              <th className="text-start text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Invited Users
                              </th>
                              <th className="text-secondary opacity-7">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredEvents.length > 0 ? (
                              filteredEvents.map((item, index) => {
                                return (
                                  <tr key={item?.data?.id}>
                                    <td>
                                      <div className=" px-2 py-1">
                                        <div className=" flex-column justify-content-center">
                                          <h6 className="mb-0 text-sm">
                                            {item.data?.name
                                              ? item.data?.name
                                              : "--"}
                                          </h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="align-middle text-center">
                                      <p className="text-xs font-weight-bold text-secondary  mb-0">
                                        {item.data?.relationType}
                                      </p>
                                    </td>
                                    <td className="align-middle text-center">
                                      <p className="text-xs font-weight-bold text-secondary mb-0">
                                        {item.data?.eventType}
                                      </p>
                                    </td>
                                    <td className="align-middle text-center text-sm">
                                      <span className="badge badge-sm bg-gradient-success">
                                        {item.data?.useridName}
                                      </span>
                                    </td>
                                    <td className="align-middle text-center">
                                      <p className="text-xs font-weight-bold  text-secondary mb-0">
                                        wishlist count
                                      </p>
                                    </td>
                                    <td className="align-middle text-center">
                                      <p className="text-xs font-weight-bold  text-secondary mb-0">
                                        {item.data?.invitedUsers?.length}
                                      </p>
                                    </td>
                                    <td className="align-middle text-center text-sm">
                                      <span>
                                        <MdVisibility
                                          className={`${Styles.delicon}`}
                                          onClick={(e) =>
                                            handleShow(
                                              e,
                                              item?.data,
                                              item?.data?.eventId
                                            )
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr className="">
                                <td colSpan="6" className="text-center">
                                  No Data Found!
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {/* PAGINATION  */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="footer py-4  ">
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <div className="copyright text-center text-sm text-muted text-lg-start">
                        ©{" "}
                        <script>
                          document.write(new Date().getFullYear())
                        </script>
                        , made with <i className="fa fa-heart"></i> by
                        <a
                          href="https://www.creative-tim.com"
                          className="font-weight-bold"
                          target="_blank"
                        >
                          Creative Tim
                        </a>
                        for a better web.
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                        <li className="nav-item">
                          <a
                            href="https://www.creative-tim.com"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            Creative Tim
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://www.creative-tim.com/presentation"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            About Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://www.creative-tim.com/blog"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            Blog
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://www.creative-tim.com/license"
                            className="nav-link pe-0 text-muted"
                            target="_blank"
                          >
                            License
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eventlist;

