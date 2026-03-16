import React, { Component } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import numberWithCommas from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      updateTotalHarga: 0,
      getKeranjang: null,
    };
  }
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      updateTotalHarga: menuKeranjang.total_harga,
    });
  };
  handleClose = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    this.setState({ showModal: false });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      updateTotalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        updateTotalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.updateTotalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        Swal.fire({
          title: "Update Pesanan!",
          text:
            "Produk : " +
            this.state.keranjangDetail.product.nama +
            " berhasil di Update !",
          icon: "success",
          confirmButtonText: "OKE",
        });

        this.handleClose();
        this.props.getKeranjang(); // refresh

        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  hapusPesanan = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        Swal.fire({
          title: "Hapus Pesanan!",
          text:
            "Produk : " +
            this.state.keranjangDetail.product.nama +
            " berhasil di Hapus !",
          icon: "error",
          confirmButtonText: "OKE",
        });

        this.handleClose();
        this.props.getKeranjang(); // refresh

        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { keranjangs } = this.props;

    return (
      <Col lg={3}>
        <h1 className="text-2xl mt-3 mb-2 font-bold">Hasil</h1>
        <hr />

        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id}>
                  <Row>
                    <Col xs={2}>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>

                      <button
                        id="edit"
                        onClick={() => this.handleShow(menuKeranjang)}
                        className="btn btn-sm btn-warning py-0"
                      >
                        Edit
                      </button>

                      <button
                        id="hapus"
                        onClick={() => this.hapusPesanan(menuKeranjang.id)}
                        className="btn btn-sm btn-danger ml-2 py-0"
                      >
                        Delete
                      </button>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
        <ModalKeranjang
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          keranjangDetail={this.state.keranjangDetail}
          jumlah={this.state.jumlah}
          keterangan={this.state.keterangan}
          updateTotalHarga={this.state.updateTotalHarga}
          tambah={this.tambah}
          kurang={this.kurang}
          changeHandler={this.changeHandler}
          handleSubmit={this.handleSubmit}
          getKeranjang={this.props.getKeranjang}
          hapusPesanan={this.hapusPesanan}
        />

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
