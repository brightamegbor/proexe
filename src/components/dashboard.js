import { Card, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../store/users";
import { useEffect } from "react";

function Dashboard() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <p className="pt-3"></p>
      <div className="d-flex flex-column">
        <h4 className="me-auto">Dashboard</h4>

        <p></p>
        <Card className="users-card mb-3" bg=''>
          <Card.Header className='bg-white'>
            <div className="container pt-2 pb-2">
              <div className="d-flex flex-direction-row justify-content-between">
                <p>User list</p>
                <Button className="pl-2 pr-2">Add user</Button>
              </div>

            </div>
          </Card.Header>

          <Card.Body>
            <div>
              <Table className="users-table border" responsive hover >
                <thead className="table-head">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {/* body */}
                <tbody>
                  {users.map((user) => (

                  <tr className="table-body-row">
                    <td>{user.id}</td>
                    <td >{user.name}</td>
                    <td>{user.username}</td>
                    <td >{user.email}</td>
                    <td >{user.address.city}</td>
                    <td>
                      <Button variant="warning">Edit</Button>
                    </td>
                    <td>
                    <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </Card.Body>
        </Card>
      </div>

    </div>
  )
}

export default Dashboard