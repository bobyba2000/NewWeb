import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchPostsAsync, filterBySource, Post, selectPosts, selectPostsStatus } from "./postSlice"

import styles from './Post.module.css';
import React, { useEffect } from "react";
import { Container } from "@mui/system";
import SearchAppBar from "./navbar";
import { debounce } from "lodash"

export const PostItem = (post: Post)=>{
    return (
        <Card sx={{ maxWidth: 345 }} className={styles.card}>
          <CardMedia
            component="img"
            height="170"
            image={post.urlToImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className={styles.title}>
              {post.title}
            </Typography>
            <Typography component="div" className={styles.source}>
                From: {post.source.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={styles.description}>
              {post.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
    )
}



export const PostList= ()=>{
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts)
    const status = useAppSelector(selectPostsStatus)
    
    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchPostsAsync(""))
        }
      }, [status, dispatch])

    const debouncedSearch = debounce(async (criteria) => {
        dispatch(filterBySource(criteria))
      }, 300);
      
      async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        debouncedSearch(e.target.value);
      }

    return (
        <React.Fragment>
            <SearchAppBar handleChange={handleSearch}/>
            <Container fixed sx={{marginTop: 10, marginBottom: 10}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} alignItems="stretch">
                {Array.from(Array(posts?.length??0)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <PostItem {...posts[index]}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </React.Fragment>
        
    )
    
}