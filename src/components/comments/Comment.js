import React from 'react';
import Typography from '@mui/material/Typography';
import './comments.css';


const Comment = ({ comment }) => {

    let commentPoster = comment[1];
    let endCommentPoster = commentPoster.slice(-4, -1);
    commentPoster = commentPoster.slice(0, 4);
    commentPoster = commentPoster.concat('...', endCommentPoster);
    
    return(
        <div className="comment">
            <Typography sx={{ color: '#ffffff', fontWeight: 700 }} gutterBottom>
                {commentPoster}:&nbsp;
            </Typography>
            <Typography sx={{ color: '#eeeeee' }} gutterBottom>
                {comment[0]}
            </Typography>

        </div>


    );
}

export default Comment;