import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  async componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res?.data || [];
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => {
        console.error(err);
        // jika error, tetap set menus jadi array kosong dan loading false
        this.setState({ keranjangs: [], loading: false });
      });
  }

  render() {
    return (
      <div className="text-center items-center  mt-3 space-y-2">
        <Image
          width={400}
          className="mx-auto d-block"
          src="assets/images/sukses.png"
        />
        <h2 className="text-2xl">Pesanan Sukses</h2>
        <p>Terimakasih, pesanan Anda telah diproses.</p>
        <Button className="btn-sukses" as={Link} to="/">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }
}
