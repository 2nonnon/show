<template>
    <div class="container">
        <div class="cover">
            <img src="../assets/6b70920d25d5be7b0a0b9bb6c23462e6.jpg" />
        </div>
        <div class="content">
            <div class="title">
                <h3>のんYouTube「のんやろが！ちゃんねる」＃6 配信です！「ひげのん!?」YouTubeネームを考える</h3>
            </div>
            <div class="tags">
                <span>Other</span>
                <span>Web</span>
            </div>
            <div class="bottom">
                <div class="time">2021.10.17</div>
                <div class="continue">继续阅读</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: #ffee7f;
}
.cover {
    height: 10rem;
    width: 100%;
    overflow: hidden;
}
.cover > img {
    width: 100%;
    object-fit: cover;
}
.content {
    display: flex;
    flex-direction: column;
    padding: .8rem;
    gap: .6rem;
}
.title {
    height: 7.5rem;
}
.tags {
    display: flex;
    gap: 0.5rem;
}
.tags > span {
    height: 1.3rem;
    line-height: 1.3rem;
    background-color: #fff8cc;
    padding: 0 .4rem;
    color: rgb(85, 85, 85);
}
.bottom {
    display: flex;
    justify-content: space-between;
}
.bottom > div {
    height: 1.3rem;
    line-height: 1.3rem;
}
</style>