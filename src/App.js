import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [movie1, setMovie1] = useState('');
  const [movie2, setMovie2] = useState('');
  const [data, setData] = useState({ movie1Data: null, movie2Data: null });
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);

  const compareMovies = async () => {
    setLoading(true);
    const movie1Formatted = movie1.replace(/ /g, '_');
    const movie2Formatted = movie2.replace(/ /g, '_');
    const result = await axios.post('http://localhost:5000/scrape', {
      movie1: movie1Formatted,
      movie2: movie2Formatted,
    });
    setData(result.data);
    setLoading(false);

    if (result.data.movie1Data && result.data.movie2Data) {
      const score1 = parseInt(result.data.movie1Data.tomatometer);
      const score2 = parseInt(result.data.movie2Data.tomatometer);

      if (score1 > score2) {
        setWinner(result.data.movie1Data.title);
      } else if (score1 < score2) {
        setWinner(result.data.movie2Data.title);
      } else {
        setWinner('Tie');
      }
    }
  };

  return (
    <div className='app-container'>
      <div className='input-container'>
        <TextField
          value={movie1}
          onChange={(e) => setMovie1(e.target.value)}
          label='Enter first movie name'
          sx={{
            color: 'white',
            '& label.Mui-focused': {
              color: 'white',
            },
            '& label': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input': { color: 'white' },
            width: '40%',
          }}
        />
        <TextField
          value={movie2}
          onChange={(e) => setMovie2(e.target.value)}
          label='Enter second movie name'
          sx={{
            color: 'white',
            '& label.Mui-focused': {
              color: 'white',
            },
            '& label': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input': { color: 'white' },
            width: '40%',
          }}
        />
        <Button
          variant='contained'
          onClick={compareMovies}
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#f2f2f2',
            },
          }}
        >
          Compare
        </Button>
      </div>
      {loading && (
        <p style={{ color: 'white' }}>
          Fetching movie data from Rotten Tomatoes...
        </p>
      )}
      {!loading && (
        <>
          <div className='movies-container'>
            {data.movie1Data && (
              <Card className='movie'>
                <CardMedia
                  component='img'
                  sx={{
                    height: '90%',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                  image={data.movie1Data.image}
                  alt={data.movie1Data.title}
                />
                <CardContent>
                  {winner === data.movie1Data.title ? (
                    <img
                      src='../images/rottentomatoeslogo1.png'
                      alt='Rotten Tomatoes logo'
                      className='tomatometer-logo'
                    />
                  ) : (
                    <img
                      src='../images/rottentomatoeslogo2.png'
                      alt='Rotten Tomatoes logo'
                      className='tomatometer-logo'
                    />
                  )}
                  <Typography variant='h3'>{data.movie1Data.title}</Typography>
                  <Typography>Director: {data.movie1Data.director}</Typography>
                  <Typography>Genre: {data.movie1Data.genre}</Typography>
                  <Typography variant='h5'>
                    Tomatometer: {data.movie1Data.tomatometer}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {data.movie1Data && data.movie2Data && (
              <div className='comparison-symbol'>
                {winner === 'Tie'
                  ? '='
                  : winner === data.movie1Data.title
                  ? '>'
                  : '<'}
              </div>
            )}

            {data.movie2Data && (
              <Card className='movie'>
                <CardMedia
                  component='img'
                  sx={{
                    height: '90%',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                  image={data.movie2Data.image}
                  alt={data.movie2Data.title}
                />
                <CardContent>
                  {winner === data.movie2Data.title ? (
                    <img
                      src='../images/rottentomatoeslogo1.png'
                      alt='Rotten Tomatoes logo'
                      className='tomatometer-logo'
                    />
                  ) : (
                    <img
                      src='../images/rottentomatoeslogo2.png'
                      alt='Rotten Tomatoes logo'
                      className='tomatometer-logo'
                    />
                  )}
                  <Typography variant='h3'>{data.movie2Data.title}</Typography>
                  <Typography>Director: {data.movie2Data.director}</Typography>
                  <Typography>Genre: {data.movie2Data.genre}</Typography>
                  <Typography variant='h5'>
                    Tomatometer: {data.movie2Data.tomatometer}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
