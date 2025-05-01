import axios from 'axios';
const server = "https://localhost:8000"
const link = axios.create({
    baseURL: server
})

export const fetchCommunities = () => link.get('/db/communities')
export const fetchPosts = () => link.get('/db/posts')
export const fetchComments = ()=> link.get('/db/comments')
export const fetchFlairs = ()=> link.get('/db/flairs')
export const fetchAll = () => link.get('/db')