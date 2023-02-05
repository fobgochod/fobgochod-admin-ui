<template>
    <div id='tabs-bar-container' class='tabs-bar-container'>
        <el-tabs v-model='activeTab' type='card' class='tabs-content'
                 @tab-click='handleTabClick'
                 @tab-remove='handleTabRemove'>
            <el-tab-pane v-for='item in visitedRoutes'
                         :key='item.path'
                         :name='item.path'
                         :closable='!isAffix(item)'>
                <span slot='label'><i :class='item.meta.icon'></i> {{item.meta.title}}</span>
            </el-tab-pane>
        </el-tabs>

        <el-dropdown @command='handleCommand'>
            <span style='cursor: pointer'>
                <i class='el-icon-menu'></i>
            </span>
            <el-dropdown-menu slot='dropdown' class='tabs-more'>
                <el-dropdown-item icon='el-icon-circle-close' command='closeOtherTab'>
                    关闭其他
                </el-dropdown-item>
                <el-dropdown-item icon='el-icon-back' command='closeLeftTab'>
                    关闭左侧
                </el-dropdown-item>
                <el-dropdown-item icon='el-icon-right' command='closeRightTab'>
                    关闭右侧
                </el-dropdown-item>
                <el-dropdown-item icon='el-icon-remove-outline' command='closeAllTab'>
                    关闭全部
                </el-dropdown-item>
            </el-dropdown-menu>
            `
        </el-dropdown>
    </div>
</template>

<script>
import {routes} from '@/router'
import path from 'path'
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            affixTab: [],
            activeTab: ''
        }
    },
    computed: {
        ...mapGetters('tabsBar', ['visitedRoutes'])
    },
    watch: {
        $route: {
            handler(route) {
                this.initTab()
                this.addTab()
                let tabActive = ''
                this.visitedRoutes.forEach((item) => {
                    if (item.path === this.$route.path) {
                        tabActive = item.path
                    }
                })
                this.activeTab = tabActive
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions('tabsBar', ['addRoute', 'delRouteAsync', 'delOtherRouteAsync', 'delLeftRouteAsync', 'delRightRouteAsync', 'delAllRouteAsync']),

        handleTabClick(tab) {
            const route = this.visitedRoutes.filter((item, index) => {
                if (tab.index == index) return item
            })[0]
            if (route.path !== this.$route.path) {
                this.$router.push({
                    path: route.path,
                    query: route.query,
                    fullPath: route.fullPath
                })
            }
        },
        async handleTabRemove(tabActive) {
            let view
            this.visitedRoutes.forEach((item, index) => {
                if (tabActive === item.path) {
                    view = item
                }
            })
            const {visitedRoutes} = await this.delRouteAsync(view)
            if (this.isActive(view)) {
                this.toLastTag(visitedRoutes, view)
            }
        },
        isActive(route) {
            return route.path === this.$route.path
        },
        isAffix(tag) {
            return tag.meta && tag.meta.affix
        },
        addTab() {
            const {name} = this.$route
            if (name) {
                this.addRoute(this.$route)
            }
        },

        initTab() {
            const affixTab = (this.affixTab = this.filterAffixTab(routes))
            for (const tag of affixTab) {
                if (tag.name) {
                    this.addRoute(tag)
                }
            }
        },
        filterAffixTab(routes, basePath = '/') {
            let tabs = []
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path)
                    tabs.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: {...route.meta}
                    })
                }
                if (route.children) {
                    const tempTab = this.filterAffixTab(route.children, route.path)
                    if (tempTab.length >= 1) {
                        tabs = [...tabs, ...tempTab]
                    }
                }
            })
            return tabs
        },

        handleCommand(command) {
            switch (command) {
                case 'closeOtherTab':
                    this.closeOtherTab()
                    break
                case 'closeLeftTab':
                    this.closeLeftTab()
                    break
                case 'closeRightTab':
                    this.closeRightTab()
                    break
                case 'closeAllTab':
                    this.closeAllTab()
                    break
            }
        },
        async closeOtherTab() {
            const view = await this.toThisTag()
            await this.delOtherRouteAsync(view)
        },
        async closeLeftTab() {
            const view = await this.toThisTag()
            await this.delLeftRouteAsync(view)
        },
        async closeRightTab() {
            const view = await this.toThisTag()
            await this.delRightRouteAsync(view)
        },
        async closeAllTab() {
            const view = await this.toThisTag()
            const {visitedRoutes} = await this.delAllRouteAsync()
            if (this.affixTab.some((tag) => tag.path === view.path)) {
                return
            }
            this.toLastTag(visitedRoutes, view)
        },
        toLastTag(visitedRoutes, view) {
            const lastView = visitedRoutes.slice(-1)[0]
            if (lastView) {
                this.$router.push(lastView)
            } else {
                this.$router.push('/')
            }
        },
        async toThisTag() {
            const view = this.visitedRoutes.filter((item, index) => {
                if (item.path === this.$route.fullPath) {
                    return item
                }
            })[0]
            if (view.path !== this.$route.path) {
                await this.$router.push(view)
            }
            return view
        }
    }
}
</script>

<style lang='scss' scoped>
.tabs-bar-container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding-right: 20px;
    padding-left: 20px;
    user-select: none;
    background: #fff;
    border-top: 1px solid #f6f6f6;

    ::v-deep {
        .fold-unfold {
            margin-right: 20px;
        }
    }

    .tabs-content {
        width: calc(100% - 90px);
        height: 34px;

        ::v-deep {
            .el-tabs__nav-next,
            .el-tabs__nav-prev {
                height: 34px;
                line-height: 34px;
            }

            .el-tabs__header {
                border-bottom: 0;

                .el-tabs__nav {
                    border: 0;
                }

                .el-tabs__item {
                    height: 38px;
                    padding: 0 30px 0 30px;
                    margin-top: 5.95px;
                    margin-right: -18px;
                    line-height: 38px;
                    text-align: center;
                    border: 0;
                    outline: none;
                    transition: padding .3s cubic-bezier(.645, .045, .355, 1) !important;

                    &.is-active {
                        color: #1890ff !important;
                        background: #e8f4ff !important;
                        border-radius: 4px 4px 0 0;
                        mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEDCAIM9A37+fj2CaqG3UAAAAnUlEQVRIx2NgAANW7f7/tAO/xAoYkIHyf9qCT8iWMf6nNWhAsk2f5rYheY7dnua2/Q+A28ZEe8v+J9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctng62PYVbls+HWz7S8/G6//PsI6H4396gAUQy1jO08W2jxDbZvynD+gD2uWp+J9eYNsEhv/0BPS1DQCZ2BLkLLWg6QAAAABJRU5ErkJggg==);
                        -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEDCAIM9A37+fj2CaqG3UAAAAnUlEQVRIx2NgAANW7f7/tAO/xAoYkIHyf9qCT8iWMf6nNWhAsk2f5rYheY7dnua2/Q+A28ZEe8v+J9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctng62PYVbls+HWz7S8/G6//PsI6H4396gAUQy1jO08W2jxDbZvynD+gD2uWp+J9eYNsEhv/0BPS1DQCZ2BLkLLWg6QAAAABJRU5ErkJggg==);
                        mask-size: 100% 100%;
                        -webkit-mask-size: 100% 100%;
                    }

                    &:hover {
                        padding: 0 30px 0 30px;
                        color: #515a6e;
                        background: #dee1e6;
                        -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEDCAIM9A37+fj2CaqG3UAAAAnUlEQVRIx2NgAANW7f7/tAO/xAoYkIHyf9qCT8iWMf6nNWhAsk2f5rYheY7dnua2/Q+A28ZEe8v+J9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctng62PYVbls+HWz7S8/G6//PsI6H4396gAUQy1jO08W2jxDbZvynD+gD2uWp+J9eYNsEhv/0BPS1DQCZ2BLkLLWg6QAAAABJRU5ErkJggg==);
                        mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEDCAIM9A37+fj2CaqG3UAAAAnUlEQVRIx2NgAANW7f7/tAO/xAoYkIHyf9qCT8iWMf6nNWhAsk2f5rYheY7dnua2/Q+A28ZEe8v+J9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctng62PYVbls+HWz7S8/G6//PsI6H4396gAUQy1jO08W2jxDbZvynD+gD2uWp+J9eYNsEhv/0BPS1DQCZ2BLkLLWg6QAAAABJRU5ErkJggg==);
                        -webkit-mask-size: 100% 100%;
                        mask-size: 100% 100%;
                    }
                }
            }

            .more {
                display: flex;
                align-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
}
</style>
