import React, { useEffect, useState, useRef, useCallback } from 'react';


// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import * as pdfjsLib  from 'pdfjs-dist'; 
import { useAppDispatch } from '../../redux/store';
import { createSlide } from '../../redux/presentation/presentationThunks';
import { AixmusicApi } from '../aixmusic-api/AixmusicApi';

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
  const api = AixmusicApi.getInstance();

  // @ts-ignore
  let pdfRef;
  let currentPage = 1;
  // @ts-ignore
  const renderPage = (pageNum, pdf) => {
    console.log(`pageNum ${pageNum}`)
    // @ts-ignore
    pdf && pdf.getPage(pageNum).then(async function(page) {
      const viewport = page.getViewport({scale: 1.5});
      // const canvas = document.createElement('canvas');
      const canvas = document.getElementById('canvas');
      console.log(canvas)
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

      // debug:
       // @ts-ignore
      const image = canvas?.toDataURL('image/png');
      console.log(image);

      getCanvasBlob(canvas).then(async (blob) => {
        // @ts-ignore
        await api.createSlide(presentationUrl, {audio: null, duration: 1, order: 1, image: blob});  
        if (pdf && currentPage < pdf.numPages) {
          currentPage++;
          renderPage(currentPage, pdf);
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