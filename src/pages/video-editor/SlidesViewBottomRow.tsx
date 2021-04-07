import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PdfReader from '../../lib/pdf/PdfReader';
import store from '../../redux/store';
import { setIsBusy } from '../../redux/presentation/presentationSlice';

interface Props {
  presentationUrl: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      allignItems: 'center',
      marginTop: 'auto',
      height: '50px'
    },
  })
);

export const SlidesViewBottomRow = (props: Props): ReactElement => {
  const classes = useStyles();

  const hiddenFileInput = React.useRef(null);
  // @ts-ignore
  const handleClick = (event) => {
    // @ts-ignore
    hiddenFileInput?.current.click();
  };

  // @ts-ignore
  const handleFile = ({ target }) => {
    const files = Array.from(target.files)    
    const fileReader = new FileReader();  

    fileReader.onload = function() {
      store.dispatch(setIsBusy(true));
      // @ts-ignore
      const typedarray = new Uint8Array(this.result);
      PdfReader(typedarray, props.presentationUrl);
    };
    // @ts-ignore
    fileReader.readAsArrayBuffer(files[0]);
  }

  return (
    <div className={classes.root} >      
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
          accept='application/pdf' 
          hidden
        />
    </div>
  );
};
