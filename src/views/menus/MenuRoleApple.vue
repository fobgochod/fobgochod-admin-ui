<template>
    <frame-space>
        <el-row style='margin-bottom: 10px;'>
            <el-col :span='4'>
                <el-select v-model='roleId' style='width: 100%' @change='changeRole' placeholder='请选择角色'>
                    <el-option v-for='item in roles' :key='item.key'
                               :value='item.key' :label='item.label'>
                        <span style='float: left'>{{ item.label }}</span>
                        <span style='float: right; color: #8492a6; font-size: 13px'>{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tree :data='menus' :props='defaultProps' node-key='id' ref='menuTree'
                         icon-class='el-icon-caret-right'
                         show-checkbox default-expand-all
                         @check='checkMenu'>
                    <span slot-scope='{ node }'>
                        <span>{{ node.label }}</span>
                    </span>
                </el-tree>
            </el-col>
        </el-row>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Profile from '@/api/profile'
import MenuRole from '@/api/menu/menu.role'
import Role from '@/api/system/role'

export default {
    mixins: [pageMixin],
    data() {
        return {
            roles: [],
            roleId: '',
            menus: [],
            checkedKeys: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        getRole() {
            Role.getOptions().then(res => {
                this.roles = res.data
            }).catch(() => {
                this.roles = []
            })
        },
        getMenu() {
            Profile.getMenu().then(res => {
                this.menus = res.data
            })
        },
        changeRole() {
            this.getRoleMenu()
        },
        getRoleMenu() {
            MenuRole.getById(this.roleId)
            .then(res => {
                this.$refs.menuTree.setCheckedKeys(res.data)
            })
        },
        checkMenu(data, checked) {
            if (!this.roleId) {
                this.$refs.menuTree.setChecked(data, false, true)
                this.$message.error('请先选择角色')
                return
            }
            let menuRole = {
                roleId: this.roleId,
                checkedKeys: checked.checkedKeys,
                halfCheckedKeys: checked.halfCheckedKeys
            }
            MenuRole.saveData(menuRole)
        }
    },
    mounted() {
        this.getRole()
        this.getMenu()
    }
}
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding-right: 8px;
}
</style>
