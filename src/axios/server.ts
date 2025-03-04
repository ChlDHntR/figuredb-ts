import axios from 'axios'

const server = axios.create({
  //baseURL: 'https://wiry-bow-talos.glitch.me/',
  baseURL: 'http://localhost:3001/',
})

export default server
