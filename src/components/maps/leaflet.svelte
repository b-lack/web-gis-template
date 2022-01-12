<script>
    export let center
    export let changeCenter
    export let geoJson

    import { onMount } from 'svelte';

    import 'leaflet/dist/leaflet.css';
    import L from 'leaflet/dist/leaflet';

    let map;
    let mapElement
    let prevCenter
    let prevGeoJson
    let geoJsonLayer

    $: {
        if(prevCenter && (prevCenter.latitude !== center.latitude || prevCenter.longitude !== center.longitude || prevCenter.zoom !== center.zoom))
            setCenter(center);

            if(prevGeoJson !== geoJson)
            updateGeoJson(geoJson)
    }

    const setCenter = (newCenter) => {
        if(!map) return

        map.setView([newCenter.latitude, newCenter.longitude], newCenter.zoom);
        prevCenter = newCenter;
    }
    const updateGeoJson = (geoJson) => {
        if(map && geoJson.type){
            geoJsonLayer.addData(geoJson)
            prevGeoJson = geoJson
        }
    }

    onMount(() => {
        map = L.map(mapElement, { zoomControl: false });
        setCenter(center);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on("moveend", function () {
            const lonLat = map.getCenter()
            
            changeCenter({
                longitude: lonLat.lng,
                latitude: lonLat.lat,
                zoom: map.getZoom()
            });
        });

        geoJsonLayer = L.geoJSON().addTo(map)
    })

    

</script>

<div bind:this={mapElement} class="map" ></div>