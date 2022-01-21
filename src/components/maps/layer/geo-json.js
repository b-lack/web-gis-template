import {GeoJsonLayer} from '@deck.gl/layers';

const getGeoJsonLayer = (id, data) => {
    return new GeoJsonLayer({
        id,
        data,
        stroked: false,
        filled: true,
        extruded: true,
        pointType: 'circle',
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: [50, 135, 255, 80],
        //getLineColor: d => colorToRGBArray([50, 135, 255, 255]), //d.properties.color
        getLineColor: [0, 0, 0, 200],
        getPointRadius: 100,
        getLineWidth: 1,
        getElevation: 30
    })
}


export default getGeoJsonLayer;