<template>
    <div id="app" class="container mt-5 mb-5">
        <router-view></router-view>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    export default {}
</script>

<style lang="scss">
    html, body, #app {
        /*height: 100%;*/
    }
    body {
        background-color: #f5f5f5;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
