import configData from "../config.json";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image'
import empty from '../images/empty.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import './styles/header.css';

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
      <ThemeProvider theme={configData.THEME}>
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
        <div className="navigation">
          <div className="cont nav-container">

            <div className="pc-menu" >
              <li><Link style={{ fontSize: 36 }} to="/">MEMES</Link></li>
              <li><Link to="/games"> Find Game</Link></li>
              <li> <Link to="/packs">  Browse Packs</Link></li>
              <li><Link to="/create">  Create Pack</Link></li>
            </div>
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <div className='user' onClick={handleShow}>
                <div id='nickname'> {getName()}</div>
                <Image rounded="true" className='profilePic' srcSet={player ? player.Image : empty} onClick={handleShow} ></Image>
              </div>
            </div>
            <div className="menu-items">
              <li><Link style={{ fontSize: 36 }} to="/">MEMES</Link></li>
              <li><Link to="/games"> Find Game</Link></li>
              <li> <Link to="/packs">  Browse Packs</Link></li>
              <li><Link to="/create">  Create Pack</Link></li>
            </div>
          </div>
        </div>

        {/* <Container>
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
            <MenuIcon fontSize="large" id="toggler" color="secondary"></MenuIcon>

          </Container> */}
      </ThemeProvider>

    </>
  );
}

export default Header;
