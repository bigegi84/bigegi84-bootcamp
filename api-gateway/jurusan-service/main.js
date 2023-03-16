const express = require("express");
const app = express();
const port = 3001;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const main = async () => {
  const jurusan = sequelize.define(
    "jurusan",
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  await sequelize.sync();

  await jurusan.create({
    nama: "Teknik Informatika",
  });

  app.get("/", async (req, res) => {
    const result = await jurusan.findAll();
    res.send({ result });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
