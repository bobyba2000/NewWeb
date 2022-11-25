import { CardMedia, Container, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SearchAppBar from "../posts/navbar";
import { fetchPostsAsync, removeSearch, selectActualPosts, selectPostsStatus } from "../posts/postSlice";

import styles from './SinglePostPage.module.css';

export const SinglePostPage=()=>{
    const {postId} = useParams();
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectActualPosts)
    const status = useAppSelector(selectPostsStatus)

    dispatch(removeSearch())

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchPostsAsync())
        }
      }, [status, dispatch])
    
      const post = posts.find((post) => post.id === postId)
    
      if(postId === undefined || post === undefined){
        return (
            <div>
                <SearchAppBar  searchDisplay={'none'}/>
                404, Page Not Found
            </div>
        )
    }
    return (
        <React.Fragment>
            <SearchAppBar  searchDisplay={'none'}/>
            <Container fixed sx={{marginTop: 5, marginBottom: 5}}>
                <Typography variant="h3" className={styles.title}>
                    {post.title}
                </Typography>
                <Typography variant="body2" className={styles.publishedDate}>
                    Publish Date: {post.publishedAt}
                </Typography>
                <Typography variant="body2" className={styles.author}>
                    Author: {post.author}
                </Typography>
                <p className={styles.source} >
                Source: &nbsp; 
                    <a href={post.url} target="_blank">
                        {post.source.name}
                    </a>
                </p>
                
                <CardMedia
                    component="img"
                    width="200"
                    image={post.urlToImage}
                    sx={{marginTop: 2}}
                    alt="green iguana"/>
                <Typography className={styles.description} sx={{marginTop: 1}}>
                    {post.description}
                </Typography>
                <Typography className={styles.content} sx={{marginTop: 3}}>
                    {post.content}
                </Typography>
            </Container>
        </React.Fragment>
    )
}