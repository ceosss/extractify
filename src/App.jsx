import React, { useState, useEffect } from "react";

import SingleConvertedFile from "./Components/SingleConvertedFile/SingleConvertedFile";
import MultipleUploader from "./Components/Uploader/MultipleUploader";
import Footer from "./Components/Footer/Footer";

import { Modal } from "react-responsive-modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

import "./App.scss";
import "react-responsive-modal/styles.css";
import CTA from "./Components/CTA/CTA";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState();
  let browserId = localStorage.getItem("browserId");
  const [open, toggleOpen] = useState(browserId ? 0 : 1);

  useEffect(() => {
    setLoading(true);
    if (!browserId) {
      let id = uuidv4();
      localStorage.setItem("browserId", id);
      browserId = id;
    } else {
      const itemsRef = firebase.database().ref(`data/${browserId}`);
      itemsRef.on("value", (snapshot) => {
        let items = snapshot.val();
        let array = [];
        for (let key in items) {
          const item = {
            id: key,
            ...items[key],
          };
          array.push(item);
        }
        setUserFiles(array);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className="base-container">
      <div className="extractify">
        <div className="head">
          <img src={require("./logo.png")} alt="logo" />
          <h1>Extractify</h1>
        </div>
        <MultipleUploader browserId={browserId} setLoading={setLoading} />
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          userFiles && (
            <div className="previous">
              <h2>Previously Converted</h2>
              {userFiles.map((file) => (
                <SingleConvertedFile
                  text={file.text}
                  url={file.url}
                  fileName={file.fileName}
                  key={file.id}
                  browserId={browserId}
                  id={file.id}
                />
              ))}
            </div>
          )
        )}
      </div>
      <Footer />
      <Modal
        open={open}
        onClose={() => toggleOpen(false)}
        center
        closeOnOverlayClick={true}
        classNames={{
          modal: "customModal cta-modal",
        }}
      >
        <CTA close={() => toggleOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
