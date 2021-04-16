import { Button } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PdfReader from '../../lib/pdf/PdfReader';
import store from '../../redux/store';
import { setIsBusy } from '../../redux/presentation/presentationSlice';

interface Props {
  presentationUrl: string;
}

export const AddFromPdfButton = (props: Props) => {
  const hiddenFileInput = React.useRef(null);
  // @ts-ignore
  const handleClick = (event) => {
    // @ts-ignore
    hiddenFileInput?.current.click();
  };

  // @ts-ignore
  const handleFile = ({ target }) => {
    const files = Array.from(target.files);
    const fileReader = new FileReader();

    // @ts-ignore
    hiddenFileInput.current.value = '';

    fileReader.onload = function () {
      store.dispatch(setIsBusy(true));
      // @ts-ignore
      const typedarray = new Uint8Array(this.result);
      PdfReader(typedarray, props.presentationUrl);
    };
    // @ts-ignore
    fileReader.readAsArrayBuffer(files[0]);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add from pdf
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFile}
        accept="application/pdf"
        hidden
      />
    </div>
  );
};
