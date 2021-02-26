import React, {useState} from 'react';
import Dropzone from 'react-dropzone-uploader';
import cartoonService from "../services/cartoon-service";
import '../css/App.css';
import {Grid, Typography} from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import 'react-dropzone-uploader/dist/styles.css';
import Button from '@material-ui/core/Button';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const typefilesAccepted = ".jpg,.jpeg,.png"
const cartoonDefaultFile = 'https://static.thenounproject.com/png/574704-200.png'
const faceDefaultFile = 'https://static.thenounproject.com/png/574704-200.png'



function ImageCartoon(){

    const [cartoon, setCartoon] = useState({file: cartoonDefaultFile})
    const [face, setFace] = useState({nameFile:"", file: faceDefaultFile})
    const [faceCrop, setFaceCrop] = useState({image: null, 
                                              crop:{ aspect: 1/1 },
                                              imageCropped: null })

    const handleSubmit = async (files, allFiles) => {
        convertFaceToCartoon()
      }   

    
    const convertFaceToCartoon = async () => {

            var file;
            
            console.log('xd::', faceCrop.imageCropped)
            try{
                console.log('cropped image')
                let blob = await fetch(faceCrop.imageCropped).then(r => r.blob());
              
                file = new File([blob], face.nameFile + ".png", {
                  type: "text/png",
                });  

                  
                const res = await cartoonService.sendImageToConvert(file);
    
                const { data } = await cartoonService.getCartoonImage(res.data.filename_cartoon);
                setCartoon({ file: data });
      
            }catch(e){
                try{
                    console.log('normal image')
                   file = face.file

                     
                const res = await cartoonService.sendImageToConvert(file);
    
                const { data } = await cartoonService.getCartoonImage(res.data.filename_cartoon);
                setCartoon({ file: data });
      
                }catch(e){
                    console.log('error sending image to convert cartoon');
                    console.error(e);
                }
            }


    } 

    const handleChangeStatus = ({ meta, file }, status) => { 
        console.log(status, meta, file)

        if(status=='done'){
            handleChangeDone({file})
        } 

        if(status=='removed'){
            handleChangeRemoved()
        }
        
    }

    const handleChangeRemoved = () => {

        setFace({nameFile: "", 
                 file: faceDefaultFile
        })

        setCartoon({
            file: cartoonDefaultFile
        })

        setFaceCrop(
            {image: null, 
                crop:{ aspect: 1/1 },
                imageCropped: null }
        )
    }


    const handleChangeDone = ({file})=>{
        try {
            setFace({nameFile: file.name.split('.')[0], 
                     file: file
                    })
            
            const currentFile = file
            const myFileItemReader = new FileReader()
            myFileItemReader.addEventListener("load", ()=>{
                // console.log(myFileItemReader.result)
                const myResult = myFileItemReader.result
                console.log('myresult::', myResult)
                setFaceCrop({...faceCrop,
                    image: myResult})  
            }, false)

            myFileItemReader.readAsDataURL(currentFile)


          } catch (e) {
            console.log('error subiendo imagen para convertir a cartoon');
            console.error(e);
          }
    }


    const onChangeCrop = crop => {
        setFaceCrop({...faceCrop,
                     crop: crop})    
    }

    const handleOnCropComplete = (crop, pixelCrop) =>{
        getCroppedImg()
    }    

    function getCroppedImg() {
        
        
        const image = new Image()
        image.src = faceCrop.image

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = faceCrop.crop.width;
        canvas.height = faceCrop.crop.height;
        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(
          image,
          faceCrop.crop.x * scaleX,
          faceCrop.crop.y * scaleY,
          faceCrop.crop.width * scaleX,
          faceCrop.crop.height * scaleY,
          0,
          0,
          faceCrop.crop.width,
          faceCrop.crop.height,
        );
      
        const base64Image = canvas.toDataURL('image/jpg');        
        setFaceCrop({...faceCrop,
            imageCropped: base64Image
            })

      }    


    return (
        <div>
            <div>
                <h1>Avatar Image Generator</h1>
                <a>Here you can create a virtual avatar based on your appearance. Just upload a picture of your face below, crop it, and you're done!</a>
            </div>
            <div>
                <div>
                    <ReactCrop src={typeof face.file === 'string' ? face.file : URL.createObjectURL(face.file)} 
                                crop={faceCrop.crop} onChange={onChangeCrop}
                                onComplete={handleOnCropComplete}
                                />
                    <img src={faceCrop.imageCropped} alt='Cropped Image' 
                        style={{
                            height: "200px",
                            width:"200px"
                            }}
                    />
                </div> 
                <div>
                    <Dropzone
                        onChangeStatus={handleChangeStatus}
                        accept={typefilesAccepted}
                        onSubmit={handleSubmit}
                        maxFiles={1}
                        styles={{
                            dropzone: { width: '50%', height: 200, overflow: 'hidden', backgroundColor: '#ECECEC' },

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
                    >   
                    </Dropzone>
                </div>
                <div>
                    <img src={typeof cartoon.file === 'string' ? cartoon.file : URL.createObjectURL(cartoon.file)} 
                        style={{
                        height: "200px",
                        width:"200px",
                        }}
                        className='cartoonImage'
                    />
                </div>
                <div>
                    <a href={typeof cartoon.file === 'string' ? cartoon.file : URL.createObjectURL(cartoon.file)} download={face.nameFile + "_cartoon.jpg"}>
                        <Button variant="contained" color="primary" >
                                Download
                        </Button>
                    </a>
                </div>    
            </div>
        </div>
    )

}

export default ImageCartoon;