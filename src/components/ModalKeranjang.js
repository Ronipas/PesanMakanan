import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import numberWithCommas from "../utils/utils";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  updateTotalHarga,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      autoFocus={true} // fokus otomatis ke elemen pertama saat modal buka
      restoreFocus={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetail ? (
            <>
              {keranjangDetail.product.nama}{" "}
              <strong>
                (Rp. {numberWithCommas(keranjangDetail.product.harga)})
              </strong>
            </>
          ) : (
            "Kosong"
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="">
            <Form.Label>Total Harga : </Form.Label> {""}
            <strong>Rp. {numberWithCommas(updateTotalHarga)}</strong>
          </Form.Group>

          <Form.Group controlId="">
            <Form.Label>Jumlah : </Form.Label>
            <br />
            <Button
              variant="primary"
              size="sm"
              className="mr-4"
              onClick={() => kurang()}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <strong>{jumlah} </strong>

            <Button
              variant="primary"
              size="sm"
              className="ml-4"
              onClick={() => tambah()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>

          <Form.Group controlId="" className="mt-2">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              placeholder="Contoh : Pedas, Banyak Nasi, dll"
              value={keterangan}
              onChange={(event) => changeHandler(event)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeranjang;
