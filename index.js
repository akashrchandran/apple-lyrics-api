import express from "express";
import apple from "./apple.js";

const app = express();
const PORT = 3000;
const REGEX = /https:\/\/music.apple.com\/\w{2}\/album\/.+?\/\d+\?i=(\d+)/;

app.use(express.json());


app.get("/", async (req, res) => {
    if (!req.query.url && !req.query.trackid) {
        res.json({
            "error": true,
            "message": "No url/trackid provided",
        });
        return;
    }
    if (req.query.url) {
        const match = req.query.url.match(REGEX);
        if (match) {
            req.query.trackid = match[1];
        } else {
            res.json({
                "error": true,
                "message": "Invalid url",
            });
            return;
        }
    }
    let [lyrics, synced]= await apple.getLyrics(req.query.trackid);
    if (lyrics.length === 0) {
        res.json({
            "error": true,
            "message": "Lyrics not found",
        });
        return;
    }
    res.json({
        "error": false,
        "syncType": synced?"LINE_SYNCED":"UN_SYNCED",
        "lines": lyrics,
    });
    return;
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});