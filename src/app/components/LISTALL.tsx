"use client";
import { List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IOption {
    _id: string;
    Fname: string;
    Lname: String;
    Email: String;
    Location_detail: String
    Location_province: String;
    Location_amphure: String;
    Location_tambon: String;
    zip_code: number;
    CA: String;
    HB_rate: number;
}

const LISTALL = () => {
    const [responddata, setresponddata] = useState<IOption[]>()
    const axios = require('axios');
    axios.get('http://localhost:3000/api/getCharger').then((response: any) => {
        const rawdata = response.data
        setresponddata(rawdata)
    })
        .catch((error: string | undefined) => {
            return null
        });
    return (
        <List spacing={2}>
            
            {responddata?.map(function (object: IOption, i: any) {
                return <ListItem border={'solid'} fontSize='xl'>
                    {object.CA} {object.Location_province} {object.Location_amphure} {object.Location_tambon}
                </ListItem>
            })}
        </List>
    )
}

export default LISTALL;