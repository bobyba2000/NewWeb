import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchPost } from "../../api/postAPI"
import { RootState } from "../../app/store"

export interface Post{
    source:{
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    urlToImage: string,
    content: string,
}

export interface PostState{
    posts: Post[],
    actualPosts: Post[],
    status: "idle" | "loading" | "failed" | "succeeded",
}

const initialState: PostState={
    posts: [],
    actualPosts: [],
    status: 'idle',
}

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async (query: string): Promise<Post[]>=>{
        try {
            const response = await fetchPost(query)
            return response.articles
        } catch (error) {
            return []
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        filterBySource: (state, action: PayloadAction<string>)=>{
            state.posts = state.actualPosts.filter(post => post.source.name.includes(action.payload))
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(fetchPostsAsync.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPostsAsync.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.posts = action.payload
            state.actualPosts = action.payload
        })
        .addCase(fetchPostsAsync.rejected, (state, action)=>{
            state.status = 'failed'
        })
    }   
})

export default postSlice.reducer

export const {filterBySource} = postSlice.actions

export const selectPosts = (state: RootState) => state.posts.posts

export const selectPostsStatus = (state: RootState)=> state.posts.status