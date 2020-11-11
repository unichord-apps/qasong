import React from "react";
import featuredPlaylists from "./featuredPlaylists.json";
import {
  Box,
  ButtonBase,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  playlist: {
    borderColor: "#ffae5c",
    border: "2px solid",
    maxWidth: 500,
    margin: "auto",
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {},
  image: {
    width: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function FeaturedPlaylists({
  setQueue,
  setQueueName,
  setNowPlaying,
  setShowQueue,
  nowPlaying,
  queue,
}) {
  const classes = useStyles();

  function handlePlaylistClick(playlistId) {
    const selectedPlaylist = featuredPlaylists.find(
      (playlist) => playlist.id === playlistId
    );

    setQueue(selectedPlaylist.queue);
    setNowPlaying(selectedPlaylist.queue[0]);
    setShowQueue(true);
    setQueueName(selectedPlaylist.name);
  }

  function handleAddToQueueClick(playlistId) {
    const selectedPlaylist = featuredPlaylists.find(
      (playlist) => playlist.id === playlistId
    );

    setQueue([...queue, ...selectedPlaylist.queue]);
    setQueueName(selectedPlaylist.name);
  }

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" style={{ color: "#888" }}>
        Featured playlists
      </Typography>

      {featuredPlaylists.map((playlist) => {
        return (
          <Grid
            key={playlist.id}
            container
            item
            className={classes.playlist}
            data-playlist_id={playlist.id}
          >
            <Grid item xs={12}>
              <Box align="center">
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={playlist.image} />
                </ButtonBase>
              </Box>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs container direction="column" spacing="2">
                <Grid item>
                  <Typography gutterBottom>
                    <Link
                      color="textPrimary"
                      component="button"
                      variant="h4"
                      onClick={() => handlePlaylistClick(playlist.id)}
                    >
                      {playlist.name}
                    </Link>
                  </Typography>
                  <IconButton
                    title="play playlist"
                    onClick={() => handlePlaylistClick(playlist.id)}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton
                    title="add playlist to queue"
                    onClick={() => handleAddToQueueClick(playlist.id)}
                  >
                    <AddToPhotosIcon />
                  </IconButton>
                </Grid>
                <List>
                  {playlist.queue.map((song) => {
                    return (
                      <ListItem
                        key={song.videoId}
                        onClick={() => {
                          setNowPlaying(song);
                        }}
                        button
                        selected={song.videoId === nowPlaying?.videoId}
                      >
                        <ListItemText primary={song.title} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default FeaturedPlaylists;
