import React from "react";
import { Col, Card } from "react-bootstrap";
import numberWithCommas from "../utils/utils"; // ✔ default import\

const DaftarMenu = ({ menu, masukKeranjang }) => {
  return (
    <Col md={6} xs={6} lg={4} className="mb-4 mt-3 ">
      <Card
        className="shadow overflow-hidden flex flex-col h-full"
        key={menu.id}
        onClick={() => masukKeranjang(menu)}
      >
        <Card.Img
          className="object-cover w-full h-40"
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body className="flex-1 flex flex-col justify-between">
          <Card.Title className="text-[17px]">{menu.nama}</Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DaftarMenu;
