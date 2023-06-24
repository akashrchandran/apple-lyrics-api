import express from "express";
import getname from "./apple.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    getname()
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});