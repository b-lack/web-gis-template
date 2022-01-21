<script>
    export let drawerState
    export let toggleDrawer
</script>


<nav class="nav-bar">
    <div on:click={toggleDrawer()}>
        <img class="wgt-logo" alt="logo" src="./asset/favicon/android-chrome-192x192.png" width="40" height="40"/>
    </div>
    <!--<div>
        <button class="wgt-button wgt-button-round {drawerState ? 'wgt-button-round-active' : 'wgt-button-round-inactive'}" on:click={toggleDrawer()}></button>
    </div>-->
</nav>

<style>
    .nav-bar{
        
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10009;
        width: 50px;
        min-width: auto;
        flex-grow: unset;
        background-color: white;
        border: none;
    }
    .nav-bar > *{
        margin: 7px;
    }
    .wgt-button-round{
        border-radius: 50%;
    }
    .wgt-button-round-active::before{
        content: '-'
    }
    .wgt-button-round-inactive::before{
        content: '+'
    }
</style>