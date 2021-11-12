<template>
    <section class="container">
        <header class="header">
            <router-view name="header"></router-view>
        </header>
        <section class="main">
            <router-view name="main"></router-view>
        </section>
        <footer class="footer">
            <router-view name="footer"></router-view>
        </footer>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 0.5rem;
}
@media (min-width: 1080px) {
    .container {
        min-width: 16rem;
    }
}
.container .header,
.container .footer {
    flex-shrink: 0;
    height: 3rem;
}
.container .header {
    position: sticky;
    top: 0;
}
.container .main {
    flex: 1;
}
</style>