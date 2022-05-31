import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import './comments.css';


const Comment = ({ comment, photo }) => {
    
    if (comment.length===0) return <></>;

    let commentPoster = comment[1];


    return(
        <div className="comment">
            <Avatar alt="User" src={photo} sx={{ width: 20, height: 20 }} />
            <Typography sx={{ color: '#ffffff', fontWeight: 700 }} gutterBottom>
            &nbsp;{commentPoster}:&nbsp;
            </Typography>
            <Typography sx={{ color: '#eeeeee' }} gutterBottom>
                {comment[0]}
            </Typography>

        </div>


    );
}

export default Comment;