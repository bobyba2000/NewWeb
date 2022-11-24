import { Post } from "../features/posts/postSlice"

export interface ListPostData{
    status: string
    totalResults: string
    articles: Post[]
}

export async function fetchPost(query:string): Promise<ListPostData> {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?q=${query}&country=us&category=business&apiKey=05e7864c7c0a460a88006b7ed9a73d99`, {
        method: 'GET',
    })
    const responseJson = await response.json()
    return responseJson as ListPostData  
}
  