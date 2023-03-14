const express = require("express"); // подключаем библиотеку экспресс
const bodyParser = require("body-parser"); // импортируем библиотеку

const app = express(); // это наш веб-сервер

app.use(bodyParser.json()); // эта строчка нужна чтобы правильно парсить json
app.use(bodyParser.urlencoded({ extended: true })); // эта строчка нужна чтобы правильно парсить формы

let artists = [
  {
    id: 1,
    name: "Metallica",
  },
  {
    id: 2,
    name: "Iron Maiden",
  },
  {
    id: 3,
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
    return artist.id === Number(req.params.id);
  });
  res.send(artist);
});

app.post("/artists", (req, res) => { // добавить новый объект
  const artist = {
    id: Date.now(),
    name: req.body.name, // через постмэн отправляем json name
  };
  artists.push(artist);
  res.send(artist);
});

app.put("/artists/:id", (req, res) => { // обновление данных, изменение имени объекта
  const artist = artists.find((artist) => {
    return artist.id === Number(req.params.id);
  });
  artist.name = req.body.name;
//   res.send(artist)
  res.sendStatus(200);
});

app.delete("/artists/:id", (req, res) => {
  artists = artists.filter((artist) => {
    return artist.id !== Number(req.params.id);
  });
  res.sendStatus(200);
});

app.listen(3012, () => {
  console.log("API app started");
});
