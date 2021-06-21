import firebase from "firebase";
import { useState } from "react";
import { storage } from "../firebase";


const ImageUpload = ({ username }) => {
  const user = firebase.auth().currentUser;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  


  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            user.updateProfile({
              photoURL: url
            }).then(() => {
              console.log('Succesfully changed the picture')
            }).catch((error) => {
              console.log(error);
            });
            setProgress(0);
            setImage(null);
            window.location.reload();
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <div>
        <input type="file" onChange={handleChange} />
        <button className="imageupload__button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      <br />
    </div>
  );
};

export default ImageUpload;