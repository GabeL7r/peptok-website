import { useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, FormGroup, Checkbox } from "@mui/material";
export default function Configuration() {
    const [categories, setCategories] = useState([]);
    useEffect( () => {
        setCategories([
            {
                "name": "Grief",
                "slug": "grief",
                "checked": true
            },
            {
                "name": "Entrpreneur",
                "slug": "entrepreneur",
                "checked": false
            }
        ])
    }, [])

    const toggleCategory = (idx) => {
        const updatedCategories = [...categories]
        updatedCategories[idx]["checked"] = !updatedCategories[idx]["checked"]
        setCategories(updatedCategories)
    }

    const updateSettings = () => {
        console.log(categories)
    }

    return (
        <>
        <FormGroup>
            {categories.map( (category, idx) => {
                return (<FormControlLabel key={idx} control={<Checkbox checked={category.checked} onChange={() => toggleCategory(idx)} />} label={category.name} />)
            })}
        </FormGroup>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={updateSettings}>
            Update
        </Button>
        </>
    )
}