import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import numberWithCommas from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../utils/constants";
import axios from "axios";
// Functional wrapper untuk inject navigate
import { useNavigate } from "react-router-dom";

// Class Component
class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs || [],
    };
    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        // Gunakan navigate yang di-inject dari wrapper
        this.props.navigate("/Sukses");
      })
      .catch((err) => console.error(err));
  };

  render() {
    const totalBayar = (this.props.keranjangs || []).reduce(
      (result, item) => result + item.total_harga,
      0,
    );
    return (
      <>
        {/* Web View */}

        <div className="fixed-bottom d-none d-md-block ">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="bg-white p-4 text-xl">
              <h2>
                Total Bayar :{" "}
                <strong className="float-right mr-2 ">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h2>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile View */}

        <div className="d-sm-block d-md-none ">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="bg-white p-4 text-xl">
              <h2>
                Total Bayar :{" "}
                <strong className="float-right mr-2 ">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h2>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

function TotalBayarWrapper(props) {
  const navigate = useNavigate();
  return <TotalBayar {...props} navigate={navigate} />;
}

export default TotalBayarWrapper;
