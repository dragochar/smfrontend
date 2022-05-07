import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const CommentSection = ({ mint }) => {

    const [comments, setComments] = useState(['hi', 'yo'])


    return (
        <div>
            <div className="commentsOuterContainer">
                <div className="commentsInnerContainer">
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            Comment {i}
                        </Typography>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentSection;