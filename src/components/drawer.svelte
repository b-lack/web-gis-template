<script>
    import FileInput from './file-loader.svelte'
    import MapSelection from './map-selection.svelte'
    import JsonList from './layer-list.svelte'

    export let geoJsonLoaded
    export let mapAvailable
    export let changeMapVisibility
    export let geoJson
    export let removeLayer
    export let focusLayer
    export let center

    let curPageNr = 0

    const pageView = (pageIndex) => {
        curPageNr = pageIndex;
    }
</script>

<div class="wgt-drawer">
    <div class="wgt-drawer-header">
        <MapSelection mapAvailable={mapAvailable} changeMapVisibility={changeMapVisibility}/>
    </div>
    <div class="wgt-drawer-body">
        {#if curPageNr === 0}
            <div>
                <FileInput geoJsonLoaded={geoJsonLoaded}/>
            </div>
            <JsonList geoJson={geoJson} removeLayer={removeLayer} focusLayer={focusLayer}/>
        {:else}
            DATA
        {/if}
    </div>
    <div class="wgt-drawer-footer">
        <small>Made by <a href="https://gruenecho.de">Grünecho</a> for <a href="https://frab.fossgis-konferenz.de/2022/">FOSSGIS-Konferenz 2022</a></small>
    </div>
</div>

<style>
    .wgt-drawer{
        
        top: 0;
        left: 0;
        z-index: 1001;
        height: 100vh;
        max-width: 300px;
        background-color: white;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, .6);
        display: flex;
        flex-direction: column;
    }
    .wgt-drawer-header{
        margin: 10px 0;
        padding:  10px 10px 0 10px;
        border-bottom: 1px solid darkmagenta;
    }
    .wgt-drawer-body{
        flex-grow: 1;
    }
    .wgt-drawer-footer{
        border-top: 1px solid #eee;
        color: #777;
        flex-shrink: 0;
        padding: 5px;
    }
    .wgt-drawer-footer a{
        color: inherit;
    }
</style>