# restapi-express

## Installation

MongoDB
```
use MusicStore
db.createCollection('Album')
```

Command Promt
```
mongoimport -d MusicStore -c Album --file album.json
```

Config project
```
npm install
```

## Run
```
npm start
```

## Packages
* express
* mongooes
* body-parser
* cors
* morgan

## Model

Schema
```
let albumSchema = Schema({
    'album': String,
    'artist': String,
    'tracks': [{
        'name': String,
        'artists': [ String ]
    }]
});
```

Sample modle
```
{
    "album": "25",
    "artist": "Adele",
    "tracks": [
        {
            "name": "Hello",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Send to my love (To your new lover)",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "I miss you",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "When we were young",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Remedy",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Water under the bridge",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "River lea",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Love in the dark",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Million years ago",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "All I ask",
            "artists": [
                "Adele"
            ]
        },
        {
            "name": "Sweetest devotion",
            "artists": [
                "Adele"
            ]
        }
    ]
}
```