type User = {
  userID: string
  username: string
  pwd: string
  list: {}
  id: string
}

type FigureData = {
  id: string
  name: string
  image: string
  series: string
  brand: string
  date: string
  price: string
  about: string
}

type CommentDat = {
  id: string | number
  poster: string
  time: string
  content: string
  children: []
}

export { User, FigureData, CommentDat }
