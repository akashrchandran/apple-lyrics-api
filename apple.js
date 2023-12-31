import axios from "axios";
import dotenv from "dotenv";
import parser from "node-html-parser";
dotenv.config();

const { AUTH_BEARER, TOKEN } = process.env;

const HEADERS = {
    authorization: AUTH_BEARER,
    "media-user-token": TOKEN,
    Origin: "https://music.apple.com",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: "https://music.apple.com/",
    "content-type": "application/json",
    "x-apple-renewal": "true",
    DNT: "1",
    Connection: "keep-alive",
    l: "en-US",
};


const formatTime = (originaltime) => {
    let time = originaltime.substring(0, originaltime.length - 1);
    if (time.includes(":")) {
        time = "0" + time;
    } else if (time < 10) {
        time = "00:0" + time;
    } else {
        time = "00:" + time;
    }
    return time;
};

const getLyrics = async (trackid) => {
    let synced = true;
    try {
        const response = await axios.get(
            `https://amp-api.music.apple.com/v1/catalog/ph/songs/${trackid}/lyrics`,
            { headers: HEADERS }
        );
        const {ttml} = response.data.data[0].attributes;
        const html = parser.parse(ttml);
        if (html.toString().includes('itunes:timing="None"')) {
            synced = false;
        }
        const lyrics = Array.from(html.querySelectorAll("p"), (lyric) => ({
            start: formatTime(lyric.getAttribute("begin")),
            end: formatTime(lyric.getAttribute("end")),
            words: lyric.text,
        }));
        console.log("Lyrics fetched");
        return [lyrics, synced];
    } catch (error) {
        console.log("Error getting lyrics");
        return [[], synced];
    }
};



export default { getLyrics };
