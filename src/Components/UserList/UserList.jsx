import React, { useEffect, useState } from "react";
import Styles from "./UserList.module.css";
import Layout from "../../layout/Layout";
import axios from "axios";
import { url } from "../../url/url";
import Box from "@mui/material/Box";
import { ThreeCircles } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function UserList(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]); // Store both start and end dates
  const [startDate, endDate] = dateRange;

 
  // Function to filter users by name
  const filterUsersByName = () => {
    // Convert users object to an array
    const usersArray = Object.values(users);

    // Filter users by name, case-insensitive search
    const filteredUsers = usersArray.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredUsers;
  };

  const filteredUsers = filterUsersByName(); // Get the filtered list of users
 

  const itemsPerPage = 15;

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${url}/get-allusers`);
        const usersData = response.data.allUsers;
        const usersArray = Object.values(usersData);
        setUsers(usersArray);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);



  const filteredData = currentData.filter((item) => {
    // Check if a date range is selected
    if (startDate && endDate) {
      const itemDate = new Date(item.createdAt); // Assuming item.date is in valid date format
      // Check if the item's date falls within the selected date range
      if (!(itemDate >= startDate && itemDate <= endDate)) {
        return false; // If it doesn't match the date range, filter it out
      }
    }

    // If a search term is provided, check if the name matches
    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return true; // If no date range or search term is applied, include the item
  });

  return (
    <div>
      <Layout />
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className={`card ${Styles.maintt}`}>
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className=" d-flex bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 className="text-white text-capitalize ps-3">
                          Users table
                        </h6>
                        <div className={`${Styles.inpfilter}`}>
                          <DatePicker
                            className={` ${Styles.inpdate}`}
                            selected={startDate}
                            onChange={(update) => setDateRange(update)}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date Range"
                            maxDate={new Date()}
                            isClearable={true} // Allows the user to clear the date selection
                          />

                          <input
                            type="text"
                            className={` ${Styles.inpsearch}`}
                            placeholder="Search by Name.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {loading ? (
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
                    ) : (
                      <>
                        <div className="card-body px-0 pb-2">
                          <div className="table-responsive p-0 ">
                            <table className="table align-items-center mb-0">
                              <thead>
                                <tr>
                                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Name
                                  </th>
                                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Email
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Marital Status
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Phone No
                                  </th>
                                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Gender
                                  </th>
                                
                                  <th className="text-secondary opacity-7"></th>
                                </tr>
                              </thead>
                              {/* <tbody>
                                {currentData.map((item) => {
                                  return (
                                    <tr>
                                      <td>
                                        <div className="d-flex px-2 py-1">
                                          <div>
                                            <img
                                              src={`http://localhost:3839${item.image}`}
                                              className="avatar avatar-sm me-3 border-radius-lg"
                                              alt="user1"
                                            />
                                          </div>
                                          <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">
                                              {item.name}
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <p className="text-xs font-weight-bold mb-0">
                                          {item.email}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center text-sm">
                                        <span
                                          className={`badge badge-sm ${
                                            item.maritalStatus === "Married"
                                              ? "bg-gradient-success"
                                              : "bg-gradient-secondary"
                                          }`}
                                        >
                                          {item.maritalStatus}
                                        </span>
                                      </td>
                                      <td className="align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {item.phoneno}
                                        </span>
                                      </td>
                                      <td className="align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {item.gender}
                                        </span>
                                      </td>
                                      <td className="align-middle">
                                        <a
                                          href="javascript:;"
                                          className="text-secondary font-weight-bold text-xs"
                                          data-toggle="tooltip"
                                          data-original-title="Edit user"
                                        >
                                          Delete
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody> */}
                              <tbody>
                                {filteredData.length > 0 ? (
                                  filteredData.map((item) => (
                                    <tr key={item.id}>
                                      <td>
                                        <div className="d-flex px-2 py-1">
                                          <div>
                                            <img
                                              src={`${url}${item.image}`}
                                              className="avatar avatar-sm me-3 border-radius-lg"
                                              alt="user1"
                                            />
                                          </div>
                                          <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">
                                              {item.name}
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <p className="text-xs font-weight-bold mb-0">
                                          {item.email}
                                        </p>
                                      </td>
                                      <td className="align-middle text-center text-sm">
                                        <span
                                          className={`badge badge-sm ${
                                            item.maritalStatus === "Married"
                                              ? "bg-gradient-success"
                                              : "bg-gradient-secondary"
                                          }`}
                                        >
                                          {item.maritalStatus}
                                        </span>
                                      </td>
                                      <td className="align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {item.phoneno}
                                        </span>
                                      </td>
                                      <td className="align-middle text-center">
                                        <span className="text-secondary text-xs font-weight-bold">
                                          {item.gender}
                                        </span>
                                      </td>
                                      

                                      <td className="align-middle">
                                        <span>
                                          <MdDelete
                                            className={`${Styles.delicon}`}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      No Data Found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* PAGINATION  */}
                        <nav
                          aria-label="Page navigation example"
                          className="mt-3"
                        >
                          <ul className="pagination justify-content-end pg-11 ">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Previous"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                              >
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>

                            {Array.from({ length: totalPages }, (_, index) => (
                              <li
                                key={index}
                                className={`page-item ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </a>
                              </li>
                            ))}

                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                aria-label="Next"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                              >
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
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

export default UserList;
