import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, FormGroup, Checkbox, Modal, Box, Typography } from "@mui/material";
import axios from 'axios'
import settings from "./settings"

export default function Configuration({ phoneNumber }) {
    const [allCategories, setAllCategories] = useState([]);
    const [userCategories, setUserCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const headers = { 'PepTok-Token': jwt }
    useEffect(() => {
        async function getCategories() {
            let response = await axios.get(`${settings.apiUrl}/categories`, { headers })
            setAllCategories(response.data)

            console.log(phoneNumber)
            response = await axios.get(`${settings.apiUrl}/user?phone_number=${phoneNumber}`, { headers })
            setUserCategories(response.data[1].split(','))
        }
        getCategories()
    }, [])

    const toggleCategory = (idx, e) => {
        if (e.currentTarget.checked) {
            setUserCategories([...userCategories, allCategories[idx]])
        } else {
            setUserCategories([...userCategories.filter(c => c !== allCategories[idx])])
        }
    }

    const updateSettings = async () => {
        await axios.post(`${settings.apiUrl}/subscribe?phone_number=${phoneNumber}&categories=${userCategories.join(',')}`, {}, { headers })
        setModalOpen(true);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Your settings have been saved!
                    </Typography>
                    <Typography id="modal-modal-description">
                        You will now receive Peptoks as text messages. Note, the messages are semi-random so you may not receive one everyday.
                    </Typography>
                </Box>
            </Modal>
            <FormGroup>
                {allCategories.map((category, idx) => {
                    return (<FormControlLabel key={idx} control={<Checkbox checked={userCategories.includes(category)} onChange={(e) => toggleCategory(idx, e)} />} label={category} />)
                })}
            </FormGroup>
            <Button style={{ marginTop: '20px' }} variant="contained" onClick={updateSettings}>
                Update
            </Button>

            <div style={{ fontSize: '14px', bottom: '10px', marginTop: '30px' }}>
                <p >We hope you enjoy Peptok and that it helps to brighten your day!</p>
                <br></br>
                <p>If so, please help us by doing any of the following:</p>
                <p>1. Share with your friends</p>
                <p>2. Share on your social media using the #peptok hashtag</p>
                <p>3. <a target="_blank" href="https://buy.stripe.com/5kAeVtc7Baju79CfZ0">Donate</a> so we can continue to provide this service.</p>
            </div>
        </>
    )
}