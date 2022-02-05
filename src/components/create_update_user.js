import { Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../store/users";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/// validation
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is requried"),
  })
  .required();

function CreateUpdateUser(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.list);

  const location = useLocation();
  const { userData } = location.state;

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return userData;
    }, [userData])
  });

  useEffect(() => {
    // console.log(users);
  }, [users]);

  function saveUser(data) {
    var newData = Object.assign({}, userData);
    newData["email"] = data.email;
    newData["name"] = data.name;

    // console.log(newData);
    dispatch(updateUsers(newData));
    // dispatch({
    //   type: 'users/updateUsersData',
    //   newData
    //  });
    // console.log(users);

    navigate(-1);
  }

  return (
    <div className="container">
      <p className="pt-3"></p>
      <div className="d-flex flex-column">
        <h4 className="me-auto">Dashboard</h4>

        <p></p>
        <Card className="users-card mb-3" bg="">
          <Card.Header className="bg-white">
            <div className="container pt-2 pb-2">
              <div className="d-flex flex-direction-row justify-content-between">
                <p>Form</p>
                {/* <Button className="pl-2 pr-2">Add user</Button> */}
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div>
              <Form onSubmit={handleSubmit(saveUser)}>
                <p className="pt-3"></p>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <div className="d-flex flex-row align-items-center">
                    <Form.Label className="form-label-name">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <Form.Text className="text-danger text-start ps-100">
                      {errors.name?.message}
                    </Form.Text>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="d-flex flex-row align-items-center">
                    <Form.Label className="form-label-name">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <Form.Text className="text-danger text-start ps-100">
                      {errors.email?.message}
                    </Form.Text>
                  </div>
                </Form.Group>

                <div className="d-flex flex-row justify-content-end">
                  <Button
                    variant="outline-danger"
                    type="button"
                    className="me-2"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CreateUpdateUser;
