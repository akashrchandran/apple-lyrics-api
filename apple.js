import axios from "axios";
import dotenv from "dotenv";
import parser from 'node-html-parser';
dotenv.config();

const {AUTH_BEARER, TOKEN} = process.env;

const HEADERS = {
        "authorization": AUTH_BEARER,
        "media-user-token": TOKEN,
        "Origin": "https://music.apple.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://music.apple.com/",
        "content-type": "application/json",
        "x-apple-renewal": "true",
        "DNT": "1",
        "Connection": "keep-alive",
        'l': 'en-US'
}


const getLrics = async () => {
    try {
        const song = await axios.get('https://amp-api.music.apple.com/v1/catalog/ph/songs/1691927418/lyrics', { headers: HEADERS })
        const html = parser.parse(song.data.data[0].attributes.ttml)
        const lyrics = html.querySelectorAll('p')
        lyrics.forEach((lyric) => {
            console.log(lyric.text)
        })
    }
    catch (error) {
        console.log(error)
    }

}

getLrics();