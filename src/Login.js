import { Button, TextField, Grid } from "@mui/material"
import { useState } from 'react';
import axios from 'axios'

export default function Login({ login }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [sentOTP, setSentOTP] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        //const response = await axios.get(`http://localhost:8000/login?phone_number${phoneNumber}`);
        setSentOTP(true)
    };

    const handleOTP = async e => {
        e.preventDefault();
        try {
            //const response = await axios.get(`http://localhost:8000/login?phone_number${phoneNumber}&otp=${otp}`);
            login(true)
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
                <form style={{marginTop: '50px'}} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                variant="filled"
                                value={phoneNumber}
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