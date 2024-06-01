import {createUploadthing} from 'uploadthing/next'

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({
      image: {maxFileSize: '4MB'},
    })
    .onUploadComplete(async ({file}:any) => {
      console.log('file url: ', file.url);
      //response to client
      return {message: 'File was uploaded'};
    }),
  
  pdfUploader: f({pdf: {maxFileSize: '4MB'}})
    .onUploadComplete(async ({file}:any) => {
      console.log('file URL: ', file.url);
      return {message: 'pdf was uploaded'};
    }),
  
  videoUploader: f({video: {maxFileSize: '4MB'}})
    .onUploadComplete(async ({file}:any) => {
      console.log('file URL: ', file.url);
      return {message: 'Video was uploaded'};
    }),

}