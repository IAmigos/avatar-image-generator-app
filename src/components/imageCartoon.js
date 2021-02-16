import React, {useState} from 'react';
import Dropzone from 'react-dropzone-uploader';
import cartoonService from "../services/cartoon-service";
import '../css/App.css';
import ReactGA from "react-ga";
import {Grid, Typography} from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import 'react-dropzone-uploader/dist/styles.css';
import Button from '@material-ui/core/Button';
const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

function ImageCartoon() {
    const [cartoon, setCartoon] = useState({file: 'https://static.thenounproject.com/png/574704-200.png'});
    const [imgName, setImgName] = useState("out");

    const handleSubmit = async (files, allFiles) => {
        const uniqueFile = files[0].file; // forgive me father
      ReactGA.event({
        category: 'Usuario',
        action: 'Imagen Enviada'
      }); 
    
        try {
          setImgName(uniqueFile.name.split('.')[0])
          console.log('uniqueFile:: ', uniqueFile)
          const res = await cartoonService.sendImageToConvert(uniqueFile);

          const { data } = await cartoonService.getCartoonImage(res.data.filename_cartoon);
          setCartoon({ file: data });
    
        } catch (e) {
          console.log('error enviando imagen para convertir a cartoon');
          console.error(e);
        }
      }    

    const handleOnClick = ()=>{
      console.log('Blob!', cartoon.file)
      const imgURL = window.URL.createObjectURL(cartoon.file);
    }

      return (
        <div className="containerDropzone">
          <Dropzone
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept=".jpg,.jpeg,.png"
            styles={{
              dropzone: { width: '50%', height: 200, overflow: 'hidden', backgroundColor: '#ECECEC' },
              inputLabel: { color: '#707070' },
              submitButton: { backgroundColor: '#29985E', borderRadius: '0px' },
              dropzoneReject: { borderColor: '#F2DEDE', backgroundColor: '#F2DEDE' },
              dropzoneActive: { borderColor: '#29985E' },
            }}
            inputContent={(
              <Grid key="1" container direction="row" justify="center" alignItems="center">
                <Grid item xs={3}>
                  <PublishIcon style={{ fontSize: 80, color: '#000000' }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6"> Drag or select a face image </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Allowed formats (.jpg, .jpeg, .png)</Typography>
                </Grid>
              </Grid>
            )}
            submitButtonContent="Convert to cartoon"
            maxFiles={1}
          />
          <Grid container spacing={1} alignItems="center" justify="center">
            <Grid item xs={3} >
              <img src={typeof cartoon.file === 'string' ? cartoon.file : URL.createObjectURL(cartoon.file)}
              alt="cartoon"
              style={{
                height: "200px",
                width:"200px"
              }}
              // className="cartoonImage"
              />
            </Grid>
            <Grid item xs={3}>
            <a href={typeof cartoon.file === 'string' ? cartoon.file : URL.createObjectURL(cartoon.file)} download={imgName + "_cartoon.jpg"}>
              <Button variant="contained" color="primary" >
                    Download
              </Button>
            </a>
            </Grid>
          </Grid>

        </div>
      );

}

export default ImageCartoon;
