import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, FormGroup, Checkbox } from "@mui/material";
import axios from 'axios'
import settings from "./settings"

export default function Configuration( { phoneNumber }) {
    const [allCategories, setAllCategories] = useState([]);
    const [userCategories, setUserCategories] = useState([])

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const headers = {'PepTok-Token': jwt}
    useEffect( () => {
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
    }

    return (
        <>
        <FormGroup>
            {allCategories.map( (category, idx) => {
                return (<FormControlLabel key={idx} control={<Checkbox checked={userCategories.includes(category)} onChange={(e) => toggleCategory(idx, e)} />} label={category} />)
            })}
        </FormGroup>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={updateSettings}>
            Update
        </Button>

        <p style={{fontSize: '14px', position: 'fixed', bottom: '10px'}}>We hope you enjoy Peptok and that it helps to brighten your day. If this is the case, please consider providing a <a target="_blank" href="https://buy.stripe.com/5kAeVtc7Baju79CfZ0">donation</a> so we can continue to provide this service.</p>
        </>
    )
}