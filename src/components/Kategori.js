import axios from "axios";
import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-3" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-3" />;

  // return <FontAwesomeIcon icon={faUtensils} />;
};

export default class Kategori extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  // componentDidMount pakai async/await
  async componentDidMount() {
    try {
      const res = await axios.get(API_URL + "categories");

      // aman, jika res.data undefined maka menus tetap array kosong
      const categories = res?.data || [];
      this.setState({ categories, loading: false });
    } catch (error) {
      console.log("Error fetching Categories:", error);

      // set state supaya component tetap stabil walau error
      this.setState({
        categories: [],
        loading: false,
        error: "Failed to fetch products",
      });
    }
  }

  render() {
    const categories = this.state;
    const { ubahCategory, pilihCategory } = this.props;
    return (
      <Col lg={2}>
        <h2 className="text-2xl mb-2 font-bold">Kategori</h2>
        <hr />
        <ListGroup className="mt-3 cursor-pointer">
          {this.state.categories &&
            this.state.categories.map((category) => (
              <h2>
                <ListGroup.Item
                  key={category.id}
                  onClick={() => ubahCategory(category.nama)}
                  className={
                    pilihCategory === category.nama &&
                    "bg-orange-600 text-white border-radius-sm"
                  }
                >
                  <Icon nama={category.nama} /> {category.nama}
                </ListGroup.Item>
              </h2>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
