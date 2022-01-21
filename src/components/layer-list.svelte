<script>
    export let geoJson
    export let removeLayer
    export let focusLayer

</script>



{#each geoJson as layer}
    <div class="wgt-row">
        <div>
            <b>{layer.fileName}</b><br/>{layer.geoJson.type}
        </div>
        <div>
            {layer.geoJson.features.length}<br/>
            <span on:click={removeLayer(layer)}>remove</span> <span on:click={focusLayer(layer)}>focus</span>
        </div>
        
    </div>
{/each}

<style>
    .wgt-row{
        border-bottom: 1px solid #ddd;
        padding: 10px;
    }
</style>