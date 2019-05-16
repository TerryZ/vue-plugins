const FILE_UPLOAD_API = process.env.FILE_UPLOAD_API;

/**
 * v-tablegrid plugin data load hooks
 * @param vue(object) - vue instance
 * @param data(string|object) - server side url
 * @param params(object) - query params
 *
 * @return a Promise instance
 */
const gridConfig = {
    dataLoad: (vue, data, params)=>{
        return new Promise((resolve, reject)=>{
            vue.$http(data, params).then(resp=>{
				resolve(resp && resp.gridResult);
			}, resp => {
				reject(resp);
			});
        });
    }
};

/**
 * v-uploader plugin global config
 */
const uploaderConfig = {
    /**
     * file uploader service url
     *
     * return result
     * {
     *      success: true,//boolean, required
     *      error: 'error message to display',//error message, required when upload fail
     *
     *      fileId: '123'//your custom file info
     *      ...
     * }
     *
     * for example
     * success: {success: true, fileId: '123', fileName: '2018-04-26-1023.jpg'}
     *
     * fail: {success: false, error: 'file upload fail, out of space.'}
     *
     * for detail, visit fine-uploader site
     * https://docs.fineuploader.com/branch/master/endpoint_handlers/traditional.html
     */
    uploadFileUrl: FILE_UPLOAD_API + '/upload/publicFileUpload',
    /**
     * file delete service url
     * the server just response 200 status, no need to return data
     *
     * for detail, visit fine-uploader site
     * https://docs.fineuploader.com/branch/master/endpoint_handlers/traditional.html
     */
    deleteFileUrl: FILE_UPLOAD_API + '/upload/deleteUploadFile',
    /**
     * set the way to show upload message(upload fail message)
     *
     * @param vue - the Vue instance
     * @param message - upload file message
     */
    showMessage(vue, message){
        vue.$dlg.alert(message, {messageType: 'error'});
    }
};

/**
 * editor file uploader server side url
 *
 * @type {{uploadFileUrl: string}}
 */
const editorUploadConfig = {
    uploadFileUrl: FILE_UPLOAD_API + '/upload/editorFileUpload?upload_name=upload'
};

export {gridConfig};
export {uploaderConfig};
export {editorUploadConfig};