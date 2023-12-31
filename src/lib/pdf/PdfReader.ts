import store from '../../redux/store';
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import * as pdfjsLib  from 'pdfjs-dist'; 
import { createSlide } from '../../redux/presentation/presentationThunks';
import { setIsBusy } from '../../redux/presentation/presentationSlice';

// @ts-ignore
function getCanvasBlob(canvas) {
  return new Promise(function(resolve, reject) {
    // @ts-ignore
    canvas.toBlob(function(blob) {
      resolve(blob)
    })
  })
}

export default function PdfReader(data: Uint8Array, presentationUrl: string){
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  // @ts-ignore
  let pdfRef;
  let currentPage = 1;
  // @ts-ignore
  const renderPage = (pageNum, pdf) => {
    // @ts-ignore
    pdf && pdf.getPage(pageNum).then(async function(page) {
      const viewport = page.getViewport({scale: 1.5});
      const canvas = document.createElement('canvas');
      // @ts-ignore
      canvas.height = viewport.height;
      // @ts-ignore
      canvas.width = viewport.width;
      const renderContext = {
      // @ts-ignore
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      const renderTask =  page.render(renderContext);
      await renderTask.promise;

      getCanvasBlob(canvas).then(async (blob) => {
        await store.dispatch(createSlide({url: presentationUrl, 
          // @ts-ignore
          dto: {audio: null, duration: 1, order: 99999, image: blob}}));
        if (pdf && currentPage < pdf.numPages) {
          currentPage++;
          renderPage(currentPage, pdf);
        } else {          
          store.dispatch(setIsBusy(false));
        };
      });      
    });   
  };

  const loadingTask = pdfjsLib.getDocument(data);
    // @ts-ignore
  loadingTask.promise.then(loadedPdf => {
      // @ts-ignore
    pdfRef = loadedPdf;
    // @ts-ignore
    renderPage(currentPage, pdfRef);
    // @ts-ignore
  }, function (reason) {
    console.error(reason);
  });
}
