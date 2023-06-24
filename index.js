import express from "express";
import apple from "./apple.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", async (req, res) => {
    const {lyrics, synced}= await apple.getLrics();
    console.log(synced);
    res.json({
        "error": false,
        "syncType": "LINE_SYNCED",
        "lines": lyrics,
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});