import React from "react";
import firebase from "../../firebase/firebase";
import Dropzone from "react-dropzone-uploader";

import "react-dropzone-uploader/dist/styles.css";

const SingleFileAutoSubmit = ({ setUrl, setLoading, setFileName }) => {
  let browserId = localStorage.getItem("browserId");

  const getUploadParams = async (d) => {
    // console.log(d);
    setLoading(true);
    setFileName(d.file.name);
    const pdfRef = await firebase
      .storage()
      .ref(`pdf/${browserId}`)
      .child(d.file.name);
    await pdfRef
      .put(d.file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })

      .then((downloadURL) => {
        console.log(
          `Successfully uploaded file and got download link - ${downloadURL}`
        );
        setUrl(downloadURL);
        return downloadURL;
      })

      .catch((error) => {
        console.log(`Failed to upload file and get link - ${error}`);
      });
    // console.log(Durl);
    setLoading(false);
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = (d, status) => {
    if (status === "headers_received") {
    }
  };

  return (
    <React.Fragment>
      {/* <div id="toast"></div> */}
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: {
            width: 400,
            height: 200,
          },
          dropzoneActive: { borderColor: "green" },
        }}
      />
    </React.Fragment>
  );
};

export default SingleFileAutoSubmit;
