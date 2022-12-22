import configData from "./config.json";
import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import empty from '../images/empty.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

import axios from "axios";

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
  }, [props, image])

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
    var file = evt.target.files[0];

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
      <Modal animation='true' show={profilePopUp} onHide={handleClose}>
        <input type="file" id="file" ref={inputRef} onChange={handleChangeImage} style={{ display: "none" }} />
        <Modal.Header closeButton>
          <Modal.Title>Profile info</Modal.Title>
        </Modal.Header>
        <Modal.Body className='profcont'>
          <Image rounded="true" className='profilePic' srcSet={image == empty ? (player ? player.Image : empty) : image} onClick={handleImageClick} ></Image>
          <Form.Control
            defaultValue={getName()}
            onChange={handleChange}
            type="text"
            id="nicknameInput"
            aria-describedby="passwordHelpBlock"
          />
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar  className='nav' variant="dark">
        <Container>
          <Navbar.Brand href="/">MEMES</Navbar.Brand>
          <Nav className="me-auto">
            <Link className={window.location.pathname == '/games' ? 'navlink' : 'navlink'} to="/games">Find Game</Link>
            <Link className={window.location.pathname == '/packs' ? 'navlink' : 'navlink'} to="/packs">Browse Packs</Link>
            <Link className={window.location.pathname == '/create' ? 'navlink' : 'navlink'} to="/create">Create Pack</Link>
          </Nav>
          <div className='user' onClick={handleShow}>
            <div id='nickname'> {getName()}</div>
            <Image rounded="true" className='profilePic' srcSet={player ? player.Image : empty} onClick={handleShow} ></Image>
          </div>


        </Container>
      </Navbar>
    </>
  );
}

export default Header;
