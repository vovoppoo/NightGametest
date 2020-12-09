<template>
  <div class="edit-dialog-wrap" v-if="ctrlDialog">
    <el-dialog @open="openDialogFn"
               :close-on-click-modal="true"
               :title="titleText"
               width="600px"
               :visible.sync="ctrlDialog">
      <div v-loading="dialogLoading" class="form-wrap">
        <el-form
          :model="formLabelData" label-position="right" :rules="rules" ref="PersonalForm" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-col :span="22">
                <el-form-item label="文件列表" prop="agencyUnit">
                  <el-upload
                    class="upload-demo"
                    :action="action"
                    :data="{'projectId':this.projectId}"
                    accept=".pdf,.docx,.doc,.xls,.xlsx,.png,.jpeg,.jpg"
                    :headers="{'QXJ-ACCESS-TOKEN':this.token}"
                    :on-change="handleChange"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">建议上传类型: pdf / doc / xls / jpg / png文件</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div slot="footer" v-if="type!=='look'" class="dialog-footer">
        <el-button @click="resetForm('PersonalForm')">取 消</el-button>
        <el-button :loading="submitFormLoading" @click="submitForm('PersonalForm')"
                   type="primary" class="btn-submit">完成上传
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>

</style>

<script>
  import Api from '../../../api';
  import Conf from '../../../apiconfig';
  import { dateFormat } from '../../../filter/index';

  export default {
    data() {
      return {
        titleText: '新增',
        action: `${Conf.resourcesDomain}/upload`,
        dialogLoading: false,
        type: '',
        loading: false,
        ctrlDialog: false,
        submitFormLoading: false,
        orgFormData: {},
        formLabelData: {},
        backupForm: {},
        fileList: [],
        projectId: '',
        rules: {
          agencyUnit: [
            { required: true, message: '请选择机关单位', trigger: 'blur' },
          ],
          year: [
            { required: true, message: '请选择年', trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      this.backupForm = JSON.parse(JSON.stringify(this.formLabelData));
      this.token = localStorage.getItem('ww_token');
    },
    watch: {},
    methods: {

      openDialogFn() {
        if (this.type != 'add') {
          this.dialogLoading = true;
        }
      },

      getDataInfo(val) {
        const _this = this;
        _this.ctrlDialog = true;
        _this.formLabelData = JSON.parse(JSON.stringify(_this.backupForm));
        _this.orgFormData = {};
        if (val) {
          _this.formLabelData = val;
          // Api.getCarInfo(val,
          // )
          // .then((res) => {
          //   if (res.code === 0) {
          //     _this.dialogLoading = false;
          //     _this.formLabelData = res.response;
          //   }
          // });
        }
      },
      submitForm(formName) {
        this.$Bus.$emit('addFileModelModelData', 0);
        this.ctrlDialog = false;
        return
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.orgFormData = {};
        this.ctrlDialog = false;
      },
    },

  };
</script>


