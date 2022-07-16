import { Button, TextField, Grid } from "@mui/material"
import { useState } from 'react';
import axios from 'axios'
import settings from "./settings"

export default function Login({ login }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [sentOTP, setSentOTP] = useState(true);

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.get(`${settings.apiUrl}/login?phone_number=${phoneNumber}`);
        setSentOTP(true)
    };

    const handleOTP = async e => {
        e.preventDefault();
        try {
            let response = await axios.get(`${settings.apiUrl}/verify?phone_number=${phoneNumber}&otp=${otp}`);
            localStorage.setItem("jwt", response.data.message)
            login(phoneNumber)
        } catch (e) {
            setSentOTP(false)
            setPhoneNumber("")
        }
    };

    if (!sentOTP) {
        return (
            <>
                <h1>PepTok</h1>
                <p>
                    Change Your Narrative
                </p>
                <img style={{ height: '50%', left: '75%', position: 'absolute', transform: 'rotate(20deg)'}} src={require('./chat1.png')} />
                <img style={{ height: '50%', right: '75%', position: 'absolute', transform: 'rotate(-20deg)'}} src={require('./chat2.png')} />
                <form style={{marginTop: '50px'}} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                variant="filled"
                                value={phoneNumber}
                                helperText="Enter your phone number including area code."
                                onChange={e => setPhoneNumber(e.target.value)}
                                required />
                        </Grid>
                        <Grid style={{padding: '15px'}} item xs={12}>
                            <Button type="submit" variant="contained">Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        )
    } else {
        return (
            <>
                <h1>PepTok</h1>
                <p>
                    Change Your Narrative
                </p>
                <form style={{marginTop: '50px'}} onSubmit={handleOTP}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label="OTP"
                                variant="filled"
                                defaultValue=""
                                value={otp}
                                helperText="Enter the Secure Code you just recieved as a text message"
                                onChange={e => setOTP(e.target.value)}
                                required />
                        </Grid>
                        <Grid style={{padding: '15px'}} item xs={12}>
                            <Button type="submit" variant="contained">Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        )

    }
}