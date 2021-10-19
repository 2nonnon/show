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
/* .container > * {
    border: 1px solid black;
} */
</style>