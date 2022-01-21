import {H3HexagonLayer} from '@deck.gl/geo-layers';

const getH3Layer = (id, data) => {
    return new H3HexagonLayer({
        id: 'h3-hexagon-layer',
        data,
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        elevationScale: 20,
        getHexagon: d => d.hex,
        getFillColor: d => [255, (1 - d.count / 500) * 255, 0],
        getElevation: d => d.count
      });    
}


export default getH3Layer;