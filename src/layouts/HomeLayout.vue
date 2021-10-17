<template>
    <section class="container">
        <header class="header">
            <slot name="header">header</slot>
        </header>
        <section class="main">
            <slot name="main">main</slot>
        </section>
        <footer class="footer">
            <slot name="footer">footer</slot>
        </footer>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    gap: .5rem
}
.container .header,
.container .footer {
    flex-shrink: 0;
    height: 2.5rem;
}
.container .header {
    position: sticky;
    top: 0;
}
.container .main {
    flex: 1;
}
/* .container > * {
    border: 1px solid black;
} */
</style>