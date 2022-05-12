import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/mints';


const CommentSection = ({ mint, walletAddress }) => {

    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleClick = () =>  {
        let fullComment = []
        fullComment = [comment, walletAddress]
        dispatch(commentPost(fullComment, mint._id))
        setComment('');
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <TextField 
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div>
                        <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
                            Comment
                        </Button>
                        </div>
                    </div>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {mint.comments.map((c, i) => (
                        <Typography key={i} gutterBottom>
                            {c[0]}
                        </Typography>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentSection;