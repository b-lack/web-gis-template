<script>
    export let center
</script>

<div class="center-widget">
    <div class="f-column">
        <div><small>Longitude</small></div>
        {center.longitude}
    </div>
    <div class="f-column">
        <div><small>Latitude</small></div>
        {center.latitude}
    </div>
    <div class="f-column">
        <div><small>Zoom</small></div>
        <div>{center.zoom}</div>
    </div>
</div>


<style>
    .center-widget{
        position: absolute;
        right: 20px;
        bottom: 20px;
        background-color: rgba(255, 255, 255, .8);
        border-radius: 5px;
        z-index: 1000;
        border: none;
        padding: 10px;
        width:auto;
        position: fixed;
        display: flex;
        flex-direction: row;
    }
    .center-widget > *{
        margin: 10px;
    }
</style>