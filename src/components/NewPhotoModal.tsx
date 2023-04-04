import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useGlobalState } from '../context';

const NewPhotoModal = ({ show, handleClose, isOpen }: { show: any, handleClose: any, isOpen: boolean }) => {
    const { user } = useGlobalState()
    const [loading, setLoading] = useState(false)
    const uploadPhoto = async (e: any) => {
        e.preventDefault()
        if ("geolocation" in navigator) {
            const url1 = `https://api.cloudinary.com/v1_1/dvpcbukeh/upload`;
            const file = e.target[0].files[0]
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "rmz30zri");
            formData.append("tags", "browser_upload")
            const url = await fetch(url1, {
                method: "POST",
                body: formData
            }).then(res => {
                if (!res.ok) {
                    console.log(res.statusText)
                }
                return res.json()
            }).then(res => {
                return res.secure_url
            })
            const options = {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            };
            navigator.geolocation.getCurrentPosition((position) => {
                //NewPhotoMut
                console.log(position.coords.latitude, position.coords.longitude);
            }, (e) => alert(e.message), options);

        } else {
            alert("Geolocation is not available so you cannot upload photos")
            handleClose()
        }
    }
    if (!isOpen) {
        return null
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="uploadForm" onSubmit={uploadPhoto}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                name="photo"
                                type="file"
                                placeholder="upload file"
                                autoFocus
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading ? "Loading..." : (
                            <div>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="dark" type='submit' form='uploadForm'>
                                    upload
                                </Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPhotoModal