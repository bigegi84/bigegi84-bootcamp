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
    },
    {
      // Other model options go here
    }
  );
  await sequelize.sync();
  await mahasiswa.create({
    username: "bigegi84",
    nama: "Gilang Pratama Wiguna",
  });
  app.get("/", async (req, res) => {
    const result = await mahasiswa.findAll();
    res.send({ result });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
main();
