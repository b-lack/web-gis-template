<script>
    export let center
    export let changeCenter
    export let geoJson

    import { onMount } from 'svelte';

    import {Deck} from '@deck.gl/core';
    import {ScatterplotLayer} from '@deck.gl/layers';

    import getTileLayer from './layer/osm'

    let mapElement
    let layers = []
    let prevCenter
    let INITIAL_VIEW_STATE = {...center, ...{bearing:0, pitch:0}}
    let deckgl

    const server = [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ];

    $: {
        setCenter(center);
    }

    const setCenter = (newCenter) => {
        if(!deckgl) return;
        console.log(INITIAL_VIEW_STATE);
        //INITIAL_VIEW_STATE = {...INITIAL_VIEW_STATE, ...newCenter}
        deckgl.setProps({
            initialViewState: {...INITIAL_VIEW_STATE, ...newCenter}
        })
        prevCenter = newCenter
    }

    onMount(() => {
        layers.push(getTileLayer(server, 5, 19))

        deckgl = new Deck({
            parent: mapElement,
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            layers: layers
        });
    })
</script>

<div bind:this={mapElement} class="map">
</div>