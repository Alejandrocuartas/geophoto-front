import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { NEW_PHOTO_MUTATION } from '../queries';
import { useGlobalState } from '../context';
import { NewPhoto } from '../types';

const NewPhotoModal = ({ show, handleClose, isOpen }: { show: any, handleClose: any, isOpen: boolean }) => {
    const { user } = useGlobalState()
    const [loading, setLoading] = useState(false)
    const [NP] = useMutation(NEW_PHOTO_MUTATION, {
        context: {
            headers: {
                Authorization: `${user?.jwt}`,
            },
        },
    });
    const uploadPhoto = async (e: any) => {
        e.preventDefault()
        if ("geolocation" in navigator) {
            const url1 = `https://api.cloudinary.com/v1_1/dvpcbukeh/upload`;
            const file = e.target[0].files[0]
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "rmz30zri");
            formData.append("tags", "browser_upload")
            let url: string;
            setLoading(true)
            await fetch(url1, {
                method: "POST",
                body: formData
            }).then(async (res) => {
                if (!res.ok) {
                    const error = await res.json()
                    return console.log(error)
                }
                return res.json()
            }).then(res => {
                url = res.secure_url
            })
            navigator.geolocation.getCurrentPosition(async (position) => {
                const variables: { input: NewPhoto } = {
                    input: {
                        lat: String(position.coords.latitude),
                        long: String(position.coords.longitude),
                        url
                    }
                }
                console.log(position.coords.latitude, position.coords.longitude);
                try {
                    const data = await NP({ variables })
                    setLoading(false)
                    console.log(data)
                    handleClose()
                } catch (error) {
                    setLoading(false)
                    console.log(error)
                    handleClose()
                }

            }, (e) => alert("Error when getting geolocation: " + e.message), {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            });

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