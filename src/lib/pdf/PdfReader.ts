import React, { useEffect, useState, useRef, useCallback } from 'react';


// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import * as pdfjsLib  from 'pdfjs-dist'; 


export default function PdfViewer(url: string){
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // @ts-ignore
  let data = [];

  const renderPage = useCallback((pageNum, pdf=pdfRef) => {
    // @ts-ignore
    pdf && pdf.getPage(pageNum).then(function(page) {
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
      page.render(renderContext);

      const tmp = canvas.toDataURL('image/png');
      console.log(tmp)
      // @ts-ignore
      data.push(tmp)      
      console.log(data.length + ' page(s) loaded in data')
    });   
  }, [pdfRef]);

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
      // @ts-ignore
    loadingTask.promise.then(loadedPdf => {
        // @ts-ignore
      setPdfRef(loadedPdf);
      // @ts-ignore
    }, function (reason) {
      console.error(reason);
    });
  }, [url]);

  // const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);
  // const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // @ts-ignore
  console.log(data);
  // @ts-ignore
  return data;
}