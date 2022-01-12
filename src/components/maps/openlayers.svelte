<script>
    export let center
    export let changeCenter
    export let geoJson

    import { onMount } from 'svelte';

    import 'ol/ol.css';
    import Map from 'ol/Map';
    import {Tile, Vector as VectorLayer} from 'ol/layer';
    import {OSM, Vector as VectorSource} from 'ol/source';
    import View from 'ol/View';
    import { fromLonLat, toLonLat } from 'ol/proj';
    import GeoJSON from 'ol/format/GeoJSON';

    let view
    let mapElement
    let prevCenter
    let geoJsonLayer
    let prevGeoJson

    $: {
        //if(prevCenter && (prevCenter.latitude !== center.latitude || prevCenter.longitude !== center.longitude || prevCenter.zoom !== center.zoom))
        setCenter(center);
        if(prevGeoJson !== geoJson)
            updateGeoJson(geoJson)
    }

    const setCenter = (newCenter) => {
        if(!view) return

        view.setCenter(fromLonLat([newCenter.longitude, newCenter.latitude]))
        view.setZoom(newCenter.zoom)
        prevCenter = newCenter
    }

    const updateGeoJson = (geoJson) => {
        if(view && geoJson.type){
            const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geoJson)
            geoJsonLayer.addFeatures(features);
            prevGeoJson = geoJson
        }
            
    }

    onMount(() => {
        view = new View();
        geoJsonLayer = new VectorSource();
        

        const map = new Map({
            controls: [],
            target: mapElement,
            view: view,
            layers: [
                new Tile({
                    source: new OSM()
                }),
                new VectorLayer({
                    source: geoJsonLayer
                })
            ]
        });

        map.on('moveend', function(e){
            const view = map.getView()
            const lonLat = toLonLat(view.getCenter())
            
            changeCenter({
                longitude: lonLat[0],
                latitude: lonLat[1],
                zoom: view.getZoom()
            });

        });
        
        setCenter(center);
    })

</script>

<div bind:this={mapElement} class="map" ></div>