import React, { useState } from "react";

import firebase from "../../firebase/firebase";

import { Modal } from "react-responsive-modal";
import ReactMarkdown from "react-markdown";
import { MdDeleteSweep } from "react-icons/md";

import "react-responsive-modal/styles.css";
import "./SingleConvertedFile.scss";

const SingleConvertedFile = ({ url, text, browserId, id, fileName }) => {
  const [open, toggleOpen] = useState(false);
  const handleDelete = () => {
    const itemRef = firebase.database().ref(`/data/${browserId}`).child(id);
    itemRef.remove();
    const fileRef = firebase.storage().ref(`pdf/${browserId}/${fileName}`);
    fileRef.delete();
  };
  return (
    <div className="single-converted-file">
      <div className="single-list">
        <iframe src={url} title="small-preview"></iframe>
        <div className="more">
          <p>{fileName}</p>
          <button onClick={() => toggleOpen(true)}>Show Converted</button>
        </div>
        <MdDeleteSweep className="del" onClick={handleDelete} />
      </div>

      <Modal
        open={open}
        onClose={() => toggleOpen(false)}
        center
        closeOnOverlayClick={true}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="content">
          {url && (
            <div className="pdf">
              <h2>PDF VIEW</h2>
              <iframe src={url} title="pdf view"></iframe>
            </div>
          )}
          {text && (
            <div className="converted">
              <h2>EXTRACTED TEXT</h2>
              <ReactMarkdown source={text} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SingleConvertedFile;
