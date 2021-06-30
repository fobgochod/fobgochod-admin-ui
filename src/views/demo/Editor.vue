<template>
    <frame-space>
        <div slot="header" class="clearfix">
            <span>TinyMce富文本编辑器</span>
        </div>
        <div>
            <tiny-mce v-model="editor_content"/>
            <span>编辑器渲染内容：</span>
            <div v-html="editor_content"></div>
            <el-divider/>
            <span>HTML原版内容：</span>
            <el-divider/>
            <div>
                {{editor_content}}
            </div>
        </div>
    </frame-space>
</template>

<script>
export default {
    data() {
        return {
            editor_content: '<h1>HTML原版内容</h1>',
        }
    },
};
</script>

<style scoped>

</style>