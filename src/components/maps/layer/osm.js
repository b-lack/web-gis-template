import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

const getTileLayer = (data, minZoom = 10, maxZoom = 19, visible = true) => {
    return new TileLayer({
        id: 'osm',
        data,
        visible,
        maxZoom,
        minZoom,
        pickable:true,
        renderSubLayers: props => {
            const {
                bbox: {west, south, east, north}
            } = props.tile;
    
            return [
                new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north]
                })
            ];
        }
    })
}


export default getTileLayer;