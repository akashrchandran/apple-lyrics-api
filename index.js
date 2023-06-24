import express from "express";
import apple from "./apple.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", async (req, res) => {
    const lyrics = await apple.getLrics();
    res.json(lyrics);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});