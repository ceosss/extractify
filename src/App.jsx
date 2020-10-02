import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import Uploader from "./Components/Uploader/Uploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

import SingleConvertedFile from "./Components/SingleConvertedFile/SingleConvertedFile";

import "./App.scss";

const App = () => {
  const [url, setUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState();
  let browserId = localStorage.getItem("browserId");

  useEffect(() => {
    // if (localStorage.getItem("browserId")) {
    //   browserId = localStorage.getItem("browserId");
    // }
    console.log(browserId);
    if (!browserId) {
      let id = uuidv4();
      localStorage.setItem("browserId", id);
      browserId = id;
    } else {
      setLoading(true);
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

  useEffect(() => {
    if (url) {
      setLoading(true);
      var data = qs.stringify({
        path: url,
      });
      var config = {
        method: "post",
        url: "https://extractify-backend.herokuapp.com/convert",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyMC0wOS0yMFQxMDo0NToxMy4zNTlaIiwiZW1haWwiOiJzc3dhcmFqc2FtYW50QGdtYWlsLmNvbSIsImlhdCI6MTYwMDU5ODcxM30.5f0JmvISp1dWD_JR9941mEDTIKQhI29hPg3_0muEd-k",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response);
          let d = JSON.stringify(response.data.text);
          let j = JSON.parse(d).replace(/\n/g, "\n\n");
          // let b = await localStorage.getItem("browserId");
          setText(j);
          let newObj = { url, text: j, fileName };
          console.log(newObj);
          firebase
            .database()
            .ref(`data/${browserId}`)
            .push(newObj)
            .then((resp) => {
              setLoading(false);
            });
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  }, [url]);

  const getUrl = (d) => {
    setUrl(d);
  };
  return (
    <div className="base-container">
      <div className="extractify">
        <div className="head">
          <h1>Extractify</h1>
        </div>
        <Uploader
          setUrl={getUrl}
          setLoading={setLoading}
          setFileName={setFileName}
        />
        {/* <div className="content">
          {url && (
            <div className="pdf">
              <h2>PDF VIEW</h2>
              <iframe src={url} title="pdf view"></iframe>
            </div>
          )}
          {loading ? (
            <CircularProgress />
          ) : (
            text && (
              <div className="converted">
                <h2>EXTRACTED TEXT</h2>
                <ReactMarkdown source={text} />
              </div>
            )
          )}
        </div> */}
        {loading ? (
          <CircularProgress />
        ) : (
          userFiles && (
            <div className="previous">
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
      <div className="footer">
        MADE WITH{" "}
        <span role="img" aria-label="emoji">
          🧡
        </span>{" "}
        by
        <a
          href="https://github.com/ceosss"
          rel="noopener noreferrer"
          target="_blank"
        >
          ceo.sss
        </a>
      </div>
    </div>
  );
};

export default App;
