<script>
    export let geoJsonLoaded

    const onReaderLoad = (event) => {

        try{
            var obj = JSON.parse(event.target.result);
            if(obj.type)
             geoJsonLoaded(obj);
        }catch(e){
            console.log(e);
        }
        
    }
    const loadGeoJson = (event) => {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }
</script>

<input type="file" accept="application/JSON" on:change={loadGeoJson} />