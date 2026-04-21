import React from "react";
import { useState, useEffect } from React
import axios from "axios";
import { useNavigate } from "react-router";

function CreateBlog(){
    const [blogData, setBlogData] = useState({
        description: '',
        image: '',
        comments: ''
    })

    const navigate = useNavigate()

    function handleChange(event){
        setBlogData({ ...blogData, [event.target.description]: event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try {
            const createdBlog = await axios.post()
        } catch (err){
            
        }
    }


    return(
        <div>
            <h1> Create a new Blog </h1>
            <form onSubmit={handleSubmit}></form>
        </div>
    )
}


