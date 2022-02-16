// import { useModal } from "@ebay/nice-modal-react";
import NiceModal, { useModal, bootstrapDialog } from "@ebay/nice-modal-react";

// libraries
import { Modal, Button } from "react-bootstrap";

// style

// delete

// report

export default NiceModal.create(() => {
  let modal = useModal();

  // can delete post

  // let resons = [""];

  return (
    <>
      <Modal {...bootstrapDialog(modal)} title="Nice Modal">
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modal.hide}>
            Close
          </Button>
          <Button variant="primary" onClick={modal.hide}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
