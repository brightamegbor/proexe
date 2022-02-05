const { Modal, Button } = require("react-bootstrap");

function DeleteModal(props) {
  return (
    <Modal
    show={props.show} onHide={props.onHide}
    // size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Delete
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* <h4>Centered Modal</h4> */}
      <p>
        Confirm delete of {props.user.name}
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={props.onHide}>Cancel</Button>
      <Button variant="danger" onClick={props.delete}>Delete</Button>
    </Modal.Footer>
  </Modal>
  );
}

export default DeleteModal