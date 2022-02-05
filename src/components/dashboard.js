import { Card, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, removeUser, sortUsersbyId, sortUsersbyUsername } from "../store/users";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import DeleteModal from "./modal";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.list);
  const loading = useSelector((state) => state.loading);

  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [sortConfig, setSortConfig] = useState("a-z");

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(sortUsersbyId(""));
  }, [dispatch]);

  const deleteUser = async (user) => {
    await setCurrentUser(user);

    setModalShow(true);
  };

  const confirmDelete = () => {
    // console.log(currentUser);
    dispatch(removeUser(currentUser));
    setModalShow(false);
  };

  const requestSort = () => {
    if (sortConfig === "a-z") {
      dispatch(sortUsersbyUsername(sortConfig));
      setSortConfig("z-a");
    } else {
      dispatch(sortUsersbyUsername(sortConfig));
      setSortConfig("a-z");
    }
  };

  return (
    <div className="container">
      <p className="pt-3"></p>
      <div className="d-flex flex-column">
        <h4 className="me-auto" onClick={() => dispatch(loadUsers())}>
          Dashboard
        </h4>

        <p></p>
        <Card className="users-card mb-3" bg="">
          <Card.Header className="bg-white">
            <div className="container pt-2 pb-2">
              <div className="d-flex flex-direction-row justify-content-between">
                <p>User list</p>
                <Link to={`add-new`} state={{ userData: {} }}>
                  <Button className="pl-2 pr-2">Add user</Button>
                </Link>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            {loading && <LinearProgress />}
            <div>
              <Table className="users-table border" responsive hover>
                <thead className="table-head">
                  <tr>
                    <th className="table-body-id">Id</th>
                    <th>Name</th>
                    <th>
                      Username{" "}
                      {sortConfig === "a-z" ? (
                        <BsFillCaretDownFill onClick={() => requestSort()} />
                      ) : (
                        <BsFillCaretUpFill onClick={() => requestSort()} />
                      )}{" "}
                    </th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr className="table-body-row" key={user.id}>
                      <td className="table-body-id">{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address.city}</td>
                      <td>
                        <Link to={`${user.id}`} state={{ userData: user }}>
                          <Button variant="warning">Edit</Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteUser(user)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* no user */}
              {Object.keys(users).length === 0 && (
                <div className="text-center">
                  No user available yet, consider adding
                </div>
              )}
            </div>
            <DeleteModal
              show={modalShow}
              user={currentUser}
              onHide={() => setModalShow(false)}
              delete={() => confirmDelete()}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
