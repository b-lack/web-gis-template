<script>
    export let addMap
    export let center
    export let geoJsonLoaded

    import FILEINPUT from './file-loader.svelte'

    const selectMap = (event) => {
        console.log(event.target.value)
        addMap(event.target.value);
    }

</script>


<nav class="nav-bar">
    <FILEINPUT geoJsonLoaded={geoJsonLoaded}/>
    <div>
        <select on:change={selectMap}>
            <option value="ol">...select Map</option>
            <option value="ol">Openlayers</option>
            <option value="leaflet">Leaflet</option>
            <option value="deckgl">DeckGl</option>
        </select>
    </div>
    <div class="f-grow"></div>
    <div class="f-column">
        <div>Longitude</div>
        {center.longitude}
    </div>
    <div class="f-column">
        <div>Latitude</div>
        {center.latitude}
    </div>
    <div class="f-column">
        <div>Zoom</div>
        <div>{center.zoom}</div>
    </div>
</nav>

<style>
    .nav-bar{
        position: fixed;
        display: flex;
        flex-direction: row;
        top: 0;
        left: 0;
        width: 100%;
    }
    .nav-bar > *{
        margin: 7px;
    }
    .f-grow{
        flex-grow: 1;
    }
    .f-column{
        display: flex;
        flex-direction: column;
    }
</style>