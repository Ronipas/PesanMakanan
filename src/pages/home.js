import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Kategori from "../components/Kategori";
import Hasil from "../components/Hasil";
import { Component } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Menu from "../components/Menus";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      pilihCategory: "Makanan",
      keranjangs: [],
      loading: true, // state untuk menandai sedang loading
      error: null, // state untuk menyimpan error jika ada
    };
  }

  // Function Ambil Menu
  getMenus = () => {
    axios
      .get(API_URL + "products?category.nama=" + this.state.pilihCategory)
      .then((res) => {
        const menus = res?.data || [];
        this.setState({ menus, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ menus: [], loading: false, error: err });
      });
  };
  // Function Ambil Keranjang
  getKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res?.data || [];
        this.setState({ keranjangs, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ keranjangs: [], loading: false, error: err });
      });
  };

  componentDidMount() {
    this.getMenus();
    this.getKeranjang();
  }

  ubahCategory = (value) => {
    this.setState({
      pilihCategory: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        // aman jika res.data undefined, menus tetap array kosong
        const menus = res?.data || [];
        this.setState({ menus, loading: false });
      })
      .catch((error) => {
        console.log("Eror nih", error);
        // jika error, tetap set menus jadi array kosong dan loading false
        this.setState({ menus: [], loading: false });
      });
  };

  masukKeranjang = async (value) => {
    // Pake asybc/await biar lebih rapi dan mudah dibaca, dibanding pake .then() dan .catch()
    try {
      // ambil semua keranjang
      const res = await axios.get(API_URL + "keranjangs");
      const keranjangs = res.data || [];

      // cek apakah produk sudah ada di keranjang
      const existing = keranjangs.find(
        (item) => String(item.product.id) === String(value.id),
      );

      if (existing) {
        this.getKeranjang(); // refresh keranjang setelah update
        // update jumlah & total harga
        const update = {
          ...existing,
          jumlah: existing.jumlah + 1,
          total_harga: existing.total_harga + value.harga,
          product: value,
        };

        await axios.put(API_URL + "keranjangs/" + existing.id, update);

        Swal.fire({
          title: "Dimasukkan ke Keranjang",
          html: `Produk : <b>${value.nama}</b> berhasil ditambahkan (update jumlah)!`,
          icon: "success",
          confirmButtonText: "OKE",
        });
      } else {
        // buat item baru
        const keranjangBaru = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        await axios.post(API_URL + "keranjangs", keranjangBaru);
        this.getKeranjang(); // refresh keranjang setelah update
        Swal.fire({
          title: "Dimasukkan ke Keranjang",
          html: `Produk : <b>${value.nama}</b> berhasil dimasukkan ke keranjang.`,
          icon: "success",
          confirmButtonText: "OKE",
        });
      }
    } catch (err) {
      console.error("Error masukKeranjang:", err);
      Swal.fire({
        title: "Error",
        text: "Gagal menambahkan ke keranjang",
        icon: "error",
        confirmButtonText: "OKE",
      });
    }
  };

  render() {
    const { menus, pilihCategory, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Kategori
              ubahCategory={this.ubahCategory}
              pilihCategory={pilihCategory}
            />
            <Col>
              <h2 className="text-2xl mb-2 mt-3 font-bold">Daftar Menu</h2>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              getKeranjang={this.getKeranjang}
              {...this.props}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
