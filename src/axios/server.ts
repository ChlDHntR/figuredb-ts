import axios from 'axios'

const server = axios.create({
  baseURL: 'https://wiry-bow-talos.glitch.me/',
})

export default server
