const express = require("express"); // подключаем библиотеку экспресс

const app = express(); // это наш веб-сервер

const artists = [
  {
    id: 1,
    name: "Metallica",
  },
  {
    id: 2,
    name: "Iron Maiden",
  },
  {
    id: 1,
    name: "Deep purple",
  },
];

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/artists", (req, res) => {
  res.send(artists);
});

app.get("/artists/:id", (req, res) => {
    const artist = artists.find((artist) => {
        return artist.id === Number(req.params.id)
    })
    res.send(artist);
});

app.listen(3012, () => {
  console.log("API app started");
});
