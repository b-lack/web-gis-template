<script>

    import center from '@turf/center'

    // Import Navigation Bar Component
    import Navbar from './components/nav-bar.svelte'
    import Drawer from './components/drawer.svelte'
    
    //Map Center
    import MapCenter from './components/map-center.svelte'

    // Import MAP Components
    import OL from './components/maps/openlayers.svelte'
    import LEAFLET from './components/maps/leaflet.svelte'
    import DECKGL from './components/maps/deck-gl.svelte'

    // Define available Map Components
    let mapAvailable = [
        {
            component: OL,
            name: 'OpenLayers',
            documentation: 'https://openlayers.org/',
            visible: true
        },
        {
            component: LEAFLET,
            name: 'Leaflet',
            documentation: 'https://leafletjs.com/',
            visible: false
        },
        {
            component: DECKGL,
            name: 'DECK.GL',
            documentation: 'https://deck.gl/',
            visible: false
        }
    ];

    let geoJson = [];
    let mapsCenter = {
        latitude: 47.403001, 
        longitude: 13.971791,
        zoom: 15
    }

    let drawerState = false

    const changeMapVisibility = (component, visibility, singleView) => {
        if(singleView){
            mapAvailable = mapAvailable.map((e) => {
                e.visible = e === component ?  true : false
                return e
            })
        }else{
            component.visible = visibility
            const index = mapAvailable.indexOf(component);
            mapAvailable[index] = component;
        }
    }

    const changeCenter = (newCenter) => {
        mapsCenter = {...mapsCenter, ...newCenter}
    }

    const geoJsonLoaded = (fileName, newGeoJson) => {
        geoJson = [...geoJson, {fileName: fileName, geoJson: newGeoJson}]
    }

    const removeLayer = (layer) => {
        geoJson = geoJson.filter((e) => e!==layer);
    }
    const focusLayer = (layer) => {
        const centerFeature = center(layer.geoJson);
        mapsCenter = {...mapsCenter, ...{
            latitude: centerFeature.geometry.coordinates[1],
            longitude: centerFeature.geometry.coordinates[0]
        }}
        console.log(centerFeature);
    }

    const toggleDrawer = () => {
        drawerState = !drawerState
    }

</script>

<div class="map-grid">

    <Navbar toggleDrawer={toggleDrawer} drawerState={drawerState}/>
    
    {#if drawerState}
        <Drawer 
            geoJsonLoaded={geoJsonLoaded} 
            mapAvailable={mapAvailable} 
            changeMapVisibility={changeMapVisibility} 
            geoJson={geoJson}
            removeLayer={removeLayer}
            center={mapsCenter}
            focusLayer={focusLayer}
        />
    {/if}

    {#each mapAvailable as map}
        {#if map.visible}
            <div id="{map.name}">
                {#if map.visible}

                    <svelte:component this={map.component} center={mapsCenter} changeCenter={changeCenter} geoJson={geoJson}></svelte:component>

                {:else}
                    <div>
                        <button class="btn-toggle-map" type="button" on:click={() => changeMapVisibility(map, true)}>Add</button>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}

</div>

<style>
    .map-grid{
        background-color: #333;
        display: flex;
        flex-wrap: wrap;
        height: calc(100vh);
    }
    
    .btn-toggle-map{
        position: absolute;
        z-index: 1000;
        top: 0;
        right: 0;
        padding: 10px;
        background-color: rgba(255,255,255,.9);
        border: none;
        border-bottom-left-radius: 10px;
    }
</style>