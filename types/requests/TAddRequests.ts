export type TAddUserRequest = {
    name: string
}

export type TAddGenreRequest = {
    name: string
}

export type TAddAuthorRequest = {
    name: string,
}

export type TAddBookRequest = {
    name: string,
    type: string,
    author_id: string,
    genres?: string,
}