import configData from "../../config.json";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image'
import empty from '../../images/empty.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import './Header.scss';

function Header(props) {

  const inputRef = useRef(null);
  const [name, setName] = useState(false)
  const [image, setImage] = useState(empty)
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [player, setPlayer] = useState(null)


  useEffect(() => {
    if (!player && props.data) {
      setPlayer(ps => {
        return {
          ...ps,
          Name: props.data.Name,
          UserID: props.data.UserID,
          Image: props.data.Image
        }
      });
    }
  }, [player,props, image])

  function saveChanges() {
    axios({
      method: 'post',
      url: `${configData.SERVER_URL}/updateUser`,
      headers: {},
      data: {
        id: player.UserID,
        name: name || player.Name,
        image: image
      }
    }).then(() => {
      axios.get(`${configData.SERVER_URL}/getOrCreateUser`).then((response) => {
        setPlayer(response.data);
        setImage(response.data.Image)
      });
    })
    setProfilePopUp(false)
  }

  function handleChange(event) {

    setName(event?.target?.value)

  }

  function getName() {

    return player && player.Name ? player.Name : 'Loading..'
  }

  const handleClose = () => setProfilePopUp(false);
  const handleShow = () => setProfilePopUp(true);
  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleChangeImage = (evt) => {
    let file = evt.target.files[0];

    const formData = new FormData();
    formData.append("files", file);

    axios({
      method: "post",
      url: `${configData.SERVER_URL}/upload_files`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => {
      console.log("Response", r.data.names)
      setImage(`${configData.SERVER_URL}/${r.data.names[0]}`);
    })

  }

  return (
    <>
      <ThemeProvider theme={configData.THEME}>
        <Modal animation='true' show={profilePopUp} onHide={handleClose} >
          <input type="file" id="file" ref={inputRef} onChange={handleChangeImage} style={{ display: "none" }} />
          <Modal.Header className="profileHeader" closeButton>
            <Modal.Title>Profile info</Modal.Title>
          </Modal.Header>
          <Modal.Body className="profileContainer">
            <div className="inputCont">
              <Image rounded="true" className='profilePic' srcSet={image === empty ? (player ? player.Image : empty) : image} onClick={handleImageClick} ></Image>
              <Form.Control
                  defaultValue={getName()}
                  onChange={handleChange}
                  type="text"
                  className="nickname"
                  id="nicknameInput"
                  aria-describedby="passwordHelpBlock"
              />
            </div>

          </Modal.Body>
          <Modal.Footer className="profileFooter" >
            <Button variant="secondary" className="closeBtn" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="saveBtn" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="navigation">
          <div className="cont nav-container">

            <div className="pc-menu" >
              <li><Link style={{ fontSize: 36 }} to="/">MEMES</Link></li>
              <li><Link to="/games"> Find Game</Link></li>
              <li> <Link to="/packs">  Browse Packs</Link></li>
              <li><Link to="/create">  Create Pack</Link></li>
            </div>
            <div className="logo">
              <div className='user' onClick={handleShow}>
                <div id='nickname'> {getName()}</div>
                <img  className='profilePic' srcSet={player ? player.Image : empty} onClick={handleShow}  alt="profile pic"/>
              </div>
            </div>
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>

            <div className="menu-items">
              <li><Link style={{ fontSize: 36 }} to="/">Home</Link></li>
              <li><Link to="/games"> Find Game</Link></li>
              <li> <Link to="/packs">  Browse Packs</Link></li>
              <li><Link  to="/create">  Create Pack</Link></li>
            </div>
          </div>
        </div>


      </ThemeProvider>

    </>
  );
}

export default Header;
