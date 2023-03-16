const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const main = async () => {
  const mahasiswa = sequelize.define(
    "mahasiswa",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jurusanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  await sequelize.sync();
  await mahasiswa.create({
    username: "bigegi84",
    nama: "Gilang Pratama Wiguna",
    jurusanId: 1,
  });
  app.get("/", async (req, res) => {
    const result = await mahasiswa.findAll();
    res.send({ result });
  });

  app.get("/withJurusan", async (req, res) => {
    const rMahasiswa = await mahasiswa.findAll();
    const jurusan = (await axios.get("http://localhost:3001")).data.result;
    const result = rMahasiswa.map((it) => {
      const data = { ...it.dataValues };
      jurusan.forEach((itJ) => {
        if (it.jurusanId == itJ.id) {
          data.jurusan = itJ;
        }
      });
      return data;
    });
    res.send({ result });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
