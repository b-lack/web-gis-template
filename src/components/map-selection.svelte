<script>
    export let mapAvailable
    export let changeMapVisibility

    let singleView = true

</script>

<div class="wgt-row">
    {#each mapAvailable as map}
       <!-- <div>
            <label for="map-selection-{ map.name }">{ map.name }</label>
            <input id="map-selection-{ map.name }" type="checkbox" on:change={changeMapVisibility(map, !map.visible)}  bind:checked={map.visible}/>
        </div> -->
        <div class="wgt-map-selection wgt-map-selection-{map.visible ? 'active' : ''}" on:click={changeMapVisibility(map, !map.visible, singleView)}>
            { map.name }
        </div>
    {/each}
</div>

<style>
    .wgt-map-selection{
       padding: 0 10px 10px 10px;
       cursor: pointer;
    }
    .wgt-map-selection:hover{
        border-bottom: 5px solid rgba(139, 0, 139, .3);
    }
    .wgt-map-selection-active{
        border-bottom: 5px solid darkmagenta !important;
    }
</style>