import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/mints';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Comment from './Comment';




const CommentSection = ({ mint, walletAddress }) => {

    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#14F195",
              },
        }
      });

    const handleClick = () =>  {
        let fullComment = []
        fullComment = [comment, walletAddress]
        dispatch(commentPost(fullComment, mint._id))
        setComment('');
    };

    const renderComments = () => {

        return (
            <>
            <Typography gutterBottom variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>Comments</Typography>
            {mint.comments.map((c, i) => (
                <Comment comment={c} key={i} />
            ))}
            </>
        );
    }

    return (
        <div>
            <div>
                <div>
                <ThemeProvider theme={theme}>
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
                        <br></br>
                    </div>
                    {mint.comments[0].length!==0 && renderComments()}
                    {console.log(mint.comments)}
                </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;