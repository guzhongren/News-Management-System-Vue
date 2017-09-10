<template>
  <el-row class='full-content'>
    <el-col :span="24" class='channelTools'>
      <div class='articleTools'>
        <el-button size="small" type="primary" @click='addManagerEvent'><i class="icon-padding-right fa fa-address-card-o" aria-hidden="true"></i>增加管理员</el-button>
      </div>
    </el-col>
    <!-- content -->
    <el-col>
      <el-row>
        <div v-if='managers'>
          <el-col :span="4" v-for='manager in managers.list' :key='manager.id'>
            <div class="itemBox margin10">
                <div class="alige-center">
                  <i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                </div>
                <p class="alige-center header">{{manager.username}}</p>
                <p class="alige-center">
                  创建时间:</br>{{manager.time}}
                </p>
              <div class="oprations">
                  <ul class="list-unstyled">
                    <li>
                      <a :id='manager.id' @click='lookManagerEvent'>查看详情</a>
                    </li>
                    <li>
                      <a :id='manager.id' @click='editManagerEvent'>编辑</a>
                    </li>
                    <li>
                      <a :id='manager.id' @click='deleteManagerEvent'>删除</a>
                    </li>
                  </ul>
              </div>
          </div>
          </el-col>
          <el-col class='alige-center'>
            翻页
            <!-- <el-pagination current-page.sync="1" page-size="10" layout="total, prev, pager, next" total="100">
            </el-pagination> -->
          </el-col>
        </div>
      </el-row>
    </el-col>
    <!-- dialog -->
    <el-dialog  :title='currenDialogTitle' :visible.sync="isDialogVisible" size="tiny" >
      <div v-if='managerStatus[0] === currentManagerStatus'>
        <!-- DISPLAY -->
        <el-form ref="form" :model="currentManager" label-width="80px">
          <el-form-item label="用户名">
            <span>{{currentManager.username}}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{currentManager.time}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if='managerStatus[1] === currentManagerStatus'>
        <!-- ADD -->
        <el-form ref="form" :model="addManagerInfo" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="addManagerInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="addManagerInfo.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if='managerStatus[2] === currentManagerStatus'>
        <!-- EDIT -->
        <el-form ref="form" :model="currentManager" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="currentManager.username"></el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input type='password' v-model="currentManager.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type='password' v-model="currentManager.new_password"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码">
            <el-input type='password' v-model="currentManager.re_password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-else='managerStatus[3] === currentManagerStatus'>
        <h3>确定要删除么？</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click='handleClose'>取 消</el-button>
        <el-button type="primary" @click='handleOk'>确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      isDialogVisible: false,
      dialogTitle: ['管理员详情', '添加管理员', '编辑管理员', '删除管理员'],
      currenDialogTitle: '',
      // dialogStatus: ['DISPLAY', 'ADD', 'EDIT', 'DELETE'],
      // currentDialogStatus: '',
      managers: null,
      addManagerInfo: {
        username: '',
        password: ''
      },
      currentManager: {
        username: '',
        old_password: '',
        new_password: '',
        re_password: ''
      },
      managersPage: 1,
      managerStatus: ['DISPLAY', 'ADD', 'EDIT', 'DELETE'],
      currentManagerStatus: ''
    }
  },
  mounted () {
    this.getManagers()
  },
  methods: {
    deleteManagerEvent (evt) {
      if (evt) {
        this.getManagerById(evt.target.id, (res) => {
          this.currenDialogTitle = this.dialogTitle[3]
          this.currentManagerStatus = this.managerStatus[3]
          this.isDialogVisible = true
        })
      }
    },
    editManagerEvent (evt) {
      if (evt) {
        this.getManagerById(evt.target.id, (res) => {
          this.currenDialogTitle = this.dialogTitle[2]
          this.currentManagerStatus = this.managerStatus[2]
          this.isDialogVisible = true
        })
      }
    },
    lookManagerEvent (evt) {
      if (evt) {
        this.getManagerById(evt.target.id, (res) => {
          this.currenDialogTitle = this.dialogTitle[0]
          this.currentManagerStatus = this.managerStatus[0]
          this.isDialogVisible = true
        })
      }
    },
    getManagerById (id, callbck) {
      let _self = this
      _self.$api.get('manage/' + id, null, (er) => {}, (res) => {
        if (res.code === 0) {
          _self.currentManager = res.data
          callbck ? callbck(res.data) : null
        }
      })
    },
    getManagers (callback) {
      let _self = this
      _self.isDialogVisible ? _self.isDialogVisible = !_self.isDialogVisible : null
      let params = {
        page: _self.managersPage
      }
      _self.$api.get('manage', params, (er) => {}, (res) => {
        if (res.code === 0) {
          _self.managers = res.data
        }
      })
    },
    deleteManager (managerId) {
      let _self = this
      _self.$api.delete('manage/' + managerId, null, (er) => {}, (res) => {
        res.code === 0 ? _self.getManagers() : null
      })
    },
    editManager (newManagerInfo) {
      let _self = this
      _self.$api.put('manage/' + _self.currentManager.id, newManagerInfo, (er) => {}, (res) => {
        _self.getManagers()
      })
    },
    addManager (managerInfo) {
      let _self = this
      _self.$api.post('manage', managerInfo, (er) => {}, (res) => {
        res.code === 0 ? _self.getManagers() : null
      })
    },
    addManagerEvent () {
      this.currenDialogTitle = this.dialogTitle[1]
      this.currentManagerStatus = this.managerStatus[1]
      this.isDialogVisible = true
    },
    handleOk () {
      if (this.currentManagerStatus === this.managerStatus[0]) {
        this.isDialogVisible = !this.isDialogVisible
      } else if (this.currentManagerStatus === this.managerStatus[1]) {
        if (this.addManagerInfo.username && this.addManagerInfo.password) {
          this.addManager(this.addManagerInfo)
        } else {
          alert('请输入正确的用户名和密码')
        }
      } else if (this.currentManagerStatus === this.managerStatus[2]) {
        if (this.currentManager.username && this.currentManager.old_password && this.currentManager.new_password && this.currentManager.re_password) {
          this.editManager(this.currentManager)
        } else {
          alert('请输入正确的用户名及密码')
        }
      } else if (this.currentManagerStatus === this.managerStatus[3]) {
        this.deleteManager(this.currentManager.id)
      }
    },
    handleClose () {
      this.isDialogVisible ? this.isDialogVisible = false : null
    }
  }
}
</script>

<style scoped>
</style>
