import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'


function ImageUplodaPractice() {
    
    const [files, setFiles] = useState([])
    
    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, 
            {preview: URL.createObjectURL(file)}))])
    }, [])

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files]) 

    const { getRootProps, getInputProps } = useDropzone({onDrop, accept:{
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png']
    }})

    return (
        <>
        <h1>UPLOAD YOUR MEMORIES...</h1>
            <div {...getRootProps({style:dropzoneStyle })}>
                <div {...getInputProps()}>
                </div>
        <p>Drag N drop to upload <br /> Or click to upload</p>

                <div style={previewContainerStyle}>
                    {files.map((file, index) => (
                        <div key={index} style={previewStyle}>
                            <img src={file.preview} alt="" style={imageStyle} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
    minWidth: '500px',
    minHeight: '300px'
};

// Styling for the preview container
const previewContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    justifyContent: 'center',
};

// Styling for the individual preview
const previewStyle = {
    margin: '10px',
    textAlign: 'center',
};

// Styling for the image
const imageStyle = {
    maxWidth: '150px',
    maxHeight: '150px',
};

export default ImageUplodaPractice
