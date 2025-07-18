// import { uploadFile } from "../lib/webdrive.lib";

export  default {
    baseURL:"http://techxie.local:5000/",
    userVerificationAPI:"http://techxie.local:5000/User/api/UserVerification",
    signupAPI:"http://techxie.local:5000/User/api/signup",
    emailVerificationURL:"http://techxie.local:5000/User/api/verifyMail",
    authAPI:"http://techxie.local:5000/User/api/OAuth",
    loginAPI:"http://techxie.local:5000/User/api/login",
    tool_lstAPI:"http://techxie.local:5000/User/api/tools_lst",
    csrfAPI:"http://techxie.local:5000/User/api/verify",
    changePwd:"http://techxie.local:5000/User/api/changePwd",
    driveUploadFile:"http://techxie.local:5000/user/file/upload",
    createFolder:"http://techxie.local:5000/user/folder/createfolder",
    delFolder:"http://techxie.local:5000/user/folder/delFolder",
    delFile:"http://techxie.local:5000/user/file/delFile",
    getFileInfo:"http://techxie.local:5000/user/file/getFileInfo",
    pdfViewer:"http://techxie.local:5000/user/page/pdfViewer",
    renameFolder: "http://techxie.local:5000/user/folder/rename"
}