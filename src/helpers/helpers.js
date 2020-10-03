import firebase from "../firebase/firebase";
import axios from "axios";
import qs from "qs";

export const convertToText = (url, browserId, fileName) => {
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
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(response);
      let d = JSON.stringify(response.data.text);
      let j = JSON.parse(d).replace(/\n/g, "\n\n");
      let newObj = { url, text: j, fileName };
      console.log(newObj);
      firebase
        .database()
        .ref(`data/${browserId}`)
        .push(newObj)
        .then((resp) => {
          return j;
        });
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};
