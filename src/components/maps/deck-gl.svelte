<script>
    export let center
    export let changeCenter
    export let geoJson

    import { onMount } from 'svelte';

    import {Deck} from '@deck.gl/core';
    import {ScatterplotLayer} from '@deck.gl/layers';

    import getTileLayer from './layer/tile'
    import getGeoJsonLayer from './layer/geo-json'

    let mapElement
    let layers = []
    let prevCenter
    let INITIAL_VIEW_STATE = {...center, ...{bearing:0, pitch:0}}
    let deckgl
    let prevGeoJson
    let geoJsonData = []

    const server = [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ];

    $: {
        setCenter(center);
    
        if(prevGeoJson !== geoJson)
            updateGeoJson(geoJson)
    }

    const setCenter = (newCenter) => {
        if(!deckgl) return;

        deckgl.setProps({
            initialViewState: {...INITIAL_VIEW_STATE, ...newCenter}
        })
        prevCenter = newCenter
    }
    const removeLayer = (id) => {
        const keyById = layers.findIndex((element) => element.id === id)
        if(keyById === -1) return
        
        layers.splice(keyById, 1)
    }
    const updateGeoJson = (geoJson) => {

        geoJson.forEach(element => {
            console.log(element);
            removeLayer('geo-json-' + element.fileName);
            const jsonLayer = getGeoJsonLayer('geo-json-' + element.fileName, element.geoJson)
            layers.push(jsonLayer)
        });
        console.log(layers);
        //geoJsonData = newLayer;
        prevGeoJson = geoJson
    }

    onMount(() => {
        layers.unshift(getTileLayer(server, 5, 19))
        updateGeoJson(geoJsonData)
        

        deckgl = new Deck({
            parent: mapElement,
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            layers: layers
        });
    })
</script>


<div class="map" bind:this={mapElement}></div>
<slot></slot>
