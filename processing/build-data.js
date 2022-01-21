const fs = require('fs');
const fsP = require('fs').promises;

const saveFeatureCollection = (features) => {


    const featureCollection = { type: "FeatureCollection",
        "features": features
    }

    
    fs.writeFileSync('docs/examples/example-values.json', JSON.stringify(featureCollection));
    console.log('SUCCESS: ', features.length + ' Features');
}

const rawFile = (filePath) => {
    const features = [];

    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    data.forEach(element => {
        const feature = { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [element.y, element.x]},
            "properties": {"elevation": element.val}
        }
        features.push(feature)
    });

    saveFeatureCollection(features);
}

rawFile('src/data/pure_data.json')