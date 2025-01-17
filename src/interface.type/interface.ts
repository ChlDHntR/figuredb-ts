

type User = {
    userID: string,
    username: string,
    pwd: string,
    list: {},
    id: string
}

type FigureData = {
    id: String,
    name: String,
    image: String,     
    series: String,
    brand: String,
    date: String,
    price: String,
    about: String
}

type CommentDat = {
    id: String | number,
    poster: String,
    time: String,
    content: String,
    children: []
}

export { User, FigureData, CommentDat }