const express = require("express"); // подключаем библиотеку экспресс
const bodyParser = require("body-parser"); // импортируем библиотеку
const MongoClient = require("mongodb").MongoClient; // импортировали MangoClient

const app = express(); // это наш веб-сервер
let db; //описываем переменную, чтобы она была доступна во всем файле
// и в ней мы будем хранить переменную db которая будет ссылкой на БД после подключения

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

app.post("/artists", (req, res) => {
  // добавить новый объект
  const artist = {
    id: Date.now(),
    name: req.body.name, // через постмэн отправляем json name
  };
  artists.push(artist);
  res.send(artist);
});

app.put("/artists/:id", (req, res) => {
  // обновление данных, изменение имени объекта
  const artist = artists.find((artist) => {
    return artist.id === Number(req.params.id);
  });
  artist.name = req.body.name;
  //   res.send(artist)
  res.sendStatus(200);
});

app.delete("/artists/:id", (req, res) => {
  // удалить артиста с данным id
  artists = artists.filter((artist) => {
    return artist.id !== Number(req.params.id);
  });
  res.sendStatus(200);
});

// app.listen(3012, () => {
//   console.log("API app started");
// });

const run = async () => {
  console.log("Try to connect mongodb");
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    console.log("Client is created! Try to create DB.");
    db = client.db("myapi"); // это ссылка на нашу БД
    console.log("DB is created! Start app listener");
    app.listen(3012, () => {
      console.log("API app started");
    });
  } catch (err) {
    console.error("Error!", err);
  }
};

run();
