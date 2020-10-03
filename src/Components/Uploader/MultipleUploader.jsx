import React from "react";
import Dropzone from "react-dropzone-uploader";
import firebase from "../../firebase/firebase";

import "react-dropzone-uploader/dist/styles.css";
import { convertToText } from "../../helpers/helpers";

const MultipleUploader = ({ browserId, setLoading }) => {
  const handleSubmit = async (files) => {
    files.map(async (file) => {
      setLoading(true);
      const pdfRef = firebase
        .storage()
        .ref(`/pdf/${browserId}`)
        .child(file.file.name);
      await pdfRef
        .put(file.file)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
        .then(async (downloadURL) => {
          //   console.log(
          //     `Successfully uploaded file and got download link - ${downloadURL}`
          //   );

          convertToText(downloadURL, browserId, file.file.name).then((text) => {
            setLoading(false);
          });
        })
        .catch((error) => {
          //   console.log(`Failed to upload file and get link - ${error}`);
          setLoading(false);
        });
    });
  };

  return (
    <Dropzone
      onSubmit={handleSubmit}
      accept=".pdf"
      inputContent={(files, extra) =>
        extra.reject
          ? "PDF files only"
          : "Drag Files or Click to Browse *PDF ONLY*"
      }
      styles={{
        dropzone: { minHeight: 200, maxHeight: 250 },
        dropzoneReject: { border: "5px solid red", backgroundColor: "#DAA" },
        dropzoneActive: { border: "5px solid greenyellow" },
      }}
    />
  );
};

export default MultipleUploader;
