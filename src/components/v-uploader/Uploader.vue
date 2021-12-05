<template>
  <div :class="[uploaderClass]">
    <!-- single upload file mode -->
    <div
      class="single-upload"
      v-if="!multiple"
    >
      <div
        class="image-box"
        v-if="preview"
      >
        <img
          :src="singleUploadImg"
          alt=""
          ref="simpleImg"
          :width="previewWidth"
          :height="previewHeight"
        >
      </div>
      <div
        class="btn singleFileUpload uploader-button"
        ref="upload"
      >
        <i
          class="v-upload-iconfont icon-uploader-open"
          v-if="buttonIcon"
        />
        <span>{{ buttonText?buttonText:ui.choseFileButton }}</span>
      </div>
    </div>

    <!-- multiple upload file mode -->
    <div
      v-if="multiple"
      ref="multipleUpload"
      class="upload-list"
    />

    <div
      v-if="multiple"
      v-show="false"
      ref="uploadArea"
    >
      <div
        class="qq-uploader-selector qq-uploader qq-gallery"
        :qq-drop-area-text="ui.dropHere"
        style="height:100%;"
      >
        <ul
          class="qq-upload-list-selector qq-upload-list"
          role="region"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          <li>
            <span
              role="status"
              class="qq-upload-status-text-selector qq-upload-status-text"
            />
            <div class="qq-progress-bar-container-selector qq-progress-bar-container">
              <div
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                class="qq-progress-bar-selector qq-progress-bar"
              />
            </div>
            <span class="qq-upload-spinner-selector qq-upload-spinner" />
            <div class="qq-thumbnail-wrapper">
              <img
                class="qq-thumbnail-selector"
                qq-max-size="120"
                qq-server-scale
              >
            </div>
            <button
              type="button"
              class="qq-upload-cancel-selector qq-upload-cancel"
            >
              X
            </button>
            <button
              type="button"
              class="qq-upload-retry-selector qq-upload-retry"
            >
              <span
                class="qq-btn qq-retry-icon"
                aria-label="Retry"
              /> Retry
            </button>

            <div class="qq-file-info">
              <div class="qq-file-name">
                <span class="qq-upload-file-selector qq-upload-file" />
                <span
                  class="qq-edit-filename-icon-selector qq-edit-filename-icon"
                  aria-label="Edit filename"
                />
              </div>
              <input
                class="qq-edit-filename-selector qq-edit-filename"
                tabindex="0"
                type="text"
              >
              <span class="qq-upload-size-selector qq-upload-size" />
              <button
                type="button"
                class="qq-btn qq-upload-delete-selector qq-upload-delete"
              >
                <span
                  class="qq-btn qq-delete-icon"
                  aria-label="Delete"
                />
              </button>
              <button
                type="button"
                class="qq-btn qq-upload-pause-selector qq-upload-pause"
              >
                <span
                  class="qq-btn qq-pause-icon"
                  aria-label="Pause"
                />
              </button>
              <button
                type="button"
                class="qq-btn qq-upload-continue-selector qq-upload-continue"
              >
                <span
                  class="qq-btn qq-continue-icon"
                  aria-label="Continue"
                />
              </button>
            </div>
          </li>
        </ul>

        <div
          class="qq-upload-drop-area-selector qq-upload-drop-area"
          qq-hide-dropzone
        >
          <span class="qq-upload-drop-area-text-selector" />
        </div>

        <div class="qq-upload-button-selector qq-upload-button uploader-button">
          <div>
            <i
              class="v-upload-iconfont icon-uploader-open"
              v-if="buttonIcon"
            />
            {{ buttonText?buttonText:ui.choseFileButton }}
          </div>
        </div>
        <div class="info-show">
          <div>
            {{ ui.fileSizeLimit }}：<span v-text="fileSizeLimit" /><br>
            {{ ui.fileTypes }}：<span v-text="fileTypeExts" />
          </div>
        </div>

        <!--
          <div class="qq-upload-button-selector qq-upload-button file-upload-finish" style="float:right;">
            <div><i class="iconfont icon-uploader-done"></i> {{ui.done}}</div>
          </div>
        -->

        <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
          <div
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './uploader.scss'
import { FineUploaderBasic, FineUploader } from 'fine-uploader'
import 'fine-uploader/fine-uploader/fine-uploader-gallery.min.css'
import holder from 'holderjs'

import * as cs from './constants'

export default {
  name: 'VUploader',
  props: {
    language: { type: String, default: 'cn' },
    // show preview box in single upload mode
    preview: { type: Boolean, default: true },
    previewImg: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    buttonIcon: { type: Boolean, default: true },
    previewWidth: { type: Number, default: 200 },
    previewHeight: { type: Number, default: 150 },
    /**
     * file upload type
     * true: multiple file upload
     * false: single file upload(default)
     */
    multiple: { type: Boolean, default: false },
    // upload file object name
    uploadFileObjName: { type: String, default: 'uploadFileObj' },
    // Maximum number of items that can be potentially uploaded in this session.
    // set 0 to unlimited
    itemLimit: { type: Number, default: 0 },
    // upload file size limit
    fileSizeLimit: { type: String, default: '5MB' },
    // allow to upload file types
    fileTypeExts: { type: String, default: 'jpeg,jpg,gif,png' },
    imageMaxHeight: { type: Number, default: 0 },
    imageMaxWidth: { type: Number, default: 0 },
    imageMinHeight: { type: Number, default: 0 },
    imageMinWidth: { type: Number, default: 0 },
    /**
     * the callback before file upload
     *
     * @param id - file id
     * @param name - file name
     *
     * @return boolean - return false to abort file upload
     */
    beforeUpload: { type: Function, default: undefined },
    // file uploader service url
    uploadFileUrl: { type: String, default: '' },
    // file delete service url
    deleteFileUrl: { type: String, default: '' },
    // set the way to show upload message(upload fail message)
    showMessage: { type: Function, default: undefined }
  },
  data () {
    return {
      uploadedFiles: [],
      deleteIndexs: [],

      options: {},
      /**
       * upload success callback
       * @param id - file id
       * @param name - file name
       * @param json - uploaded file detail info
       */
      callback: undefined,
      singleUploadImg: '',
      ui: {},
      // fileSizeLimit: 0,
      uploaderClass: {
        'v-uploader': true,
        'single-mode': false,
        'multiple-mode': false
      }
    }
  },
  watch: {
    previewImg (val) {
      if (val) this.singleUploadImg = val
    }
  },
  beforeMount () {
    const that = this
    if (this.multiple) this.uploaderClass['multiple-mode'] = true
    else this.uploaderClass['single-mode'] = true

    this.ui = cs.getI18n(this.language)
    const imgHolder = `holder.js/${this.previewWidth}x${this.previewHeight}?text=${this.ui.thumbnail}&size=16`
    this.singleUploadImg = this.previewImg ? this.previewImg : imgHolder

    if (!this.multiple) {
      this.callback = data => {
        if (data && typeof (data.success) !== 'undefined' && data.success) {
          if (that.preview) that.singleUploadImg = data.url
          that.$emit('done', [data])
        }
      }
    } else {
      this.callback = data => {
        if (data && typeof (data.success) !== 'undefined' && data.success) {
          that.uploadedFiles.push(data)
        }
      }
    }
    this.options = cs.buildOptions.call(this)
  },
  mounted () {
    const that = this

    if (!this.multiple) {
      if (this.preview && !this.previewImg) holder.run({ images: this.$refs.simpleImg })
      this.options.button = this.$refs.upload
      // upload error callback
      // basic mode work only
      that.options.callbacks.onError = (id, name, errorReason, xhr) => {
        if (that.showMessage && typeof that.showMessage === 'function') { that.showMessage(that, errorReason) }
      }
      if (this.beforeUpload && typeof this.beforeUpload === 'function') { that.options.callbacks.onSubmit = this.beforeUpload }
      // eslint-disable-next-line no-new
      new FineUploaderBasic(that.options)
    } else {
      that.options.deleteFile.endpoint = this.deleteFileUrl
      that.options.template = this.$refs.uploadArea
      that.options.element = this.$refs.multipleUpload
      that.options.showMessage = message => {
        if (that.showMessage && typeof that.showMessage === 'function') that.showMessage(that, message)
      }
      that.options.callbacks.onDelete = id => {
        that.deleteIndexs.push(id)
        that.$emit('done', that.uploadedFiles.filter((val, index) => {
          return !that.deleteIndexs.includes(index)
        }))
      }
      that.options.callbacks.onAllComplete = (succeeded, failed) => {
        that.$emit('done', that.uploadedFiles)
      }
      if (this.itemLimit) this.options.validation.itemLimit = this.itemLimit
      if (this.beforeUpload && typeof (this.beforeUpload) === 'function') { that.options.callbacks.onSubmit = this.beforeUpload }
      // eslint-disable-next-line no-new
      new FineUploader(that.options)
    }
  }
}
</script>
