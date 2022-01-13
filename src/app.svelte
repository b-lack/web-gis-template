<script>
    import NAVBAR from './components/nav-bar.svelte'
    import OL from './components/maps/openlayers.svelte'
    import LEAFLET from './components/maps/leaflet.svelte'
    import DECKGL from './components/maps/deck-gl.svelte'

    let maps = [OL, LEAFLET, DECKGL]
    let geoJson = {}
    let center = {
        latitude: 47.403001, 
        longitude: 13.971791,
        zoom: 15
    }


    const addMap = (type) => {

        switch (type) {
            case 'ol':
                maps = [...maps, OL]
                break
            case 'leaflet':
                maps = [...maps, LEAFLET]
                break
            case 'deckgl':
                maps = [...maps, DECKGL]
                break
        }

    }

    const changeCenter = (newCenter) => {
        //if((newCenter.latitude !== center.latitude || newCenter.longitude !== center.longitude || newCenter.zoom !== center.zoom))
        center = {...center, ...newCenter}
    }

    const geoJsonLoaded = (newGeoJson) => {
        console.log('new geoJson1');
        geoJson = {...geoJson, ...newGeoJson}
    }

</script>
<NAVBAR addMap={addMap} center={center} geoJsonLoaded={geoJsonLoaded}/>

<div class="map-grid">
    {#each maps as map}
        <svelte:component this={map} center={center} changeCenter={changeCenter} geoJson={geoJson}></svelte:component>
    {/each}
</div>

<style>
    .map-grid{
        background-color: #333;
    }
</style>