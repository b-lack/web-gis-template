<script>
    export let geoJsonLoaded

    let fileInput;

    const onReaderLoad = (fileName, event) => {
        
        try{
            var obj = JSON.parse(event.target.result);
            if(obj.type) geoJsonLoaded(fileName, obj);
        }catch(e){
            console.log(e);
        }
        
    }
    const readFile = (file) => {
        var reader = new FileReader()
        reader.onload = (event) => onReaderLoad(file.name, event)
        reader.readAsText(file)
    }

    const loadGeoJson = (event) => {
        const files = event.target.files;

        for (var i = 0; i < files.length; i++) {
            readFile(files[i]);
        }
        
    }
    const triggerUpload = (e) => {
        e.preventDefault();
        fileInput.click();
    }
</script>

<button class="wgt-button" on:click={triggerUpload} type="button">.geojson/.json</button>
<input style="display:none;" bind:this={fileInput} type="file" accept="application/JSON" on:change={loadGeoJson} multiple/>