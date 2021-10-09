import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PostType } from '../../types/types'

const profileWallSlice = createSlice({
  name: 'wall',
  initialState: {
    posts: [
      {
        idPost: 1,
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        likesCount: 0,
        isLikeClick: false,
      },
      {
        idPost: 2,
        message:
          // eslint-disable-next-line max-len
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ut quo maiores neque laboriosam. Ratione adipisci reiciendis autem placeat alias necessitatibus pariatur saepe ipsum, temporibus animi, facilis minus doloribus ducimus',
        likesCount: 1,
        isLikeClick: true,
      },
      {
        idPost: 3,
        message:
          // eslint-disable-next-line max-len
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ut quo maiores neque laboriosam. Ratione adipisci reiciendis autem placeat alias necessitatibus...',
        likesCount: 0,
        isLikeClick: false,
      },
    ] as PostType[],
    postsForDelete: [] as number[],
  },
  reducers: {
    initializePosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload
    },

    // delete one post
    addPost: (state, action: PayloadAction<{ newPostText: string }>) => {
      const newPost = {
        idPost: Date.now(), // TODO impure function call
        message: action.payload.newPostText,
        likesCount: 0,
        isLikeClick: false,
      }
      state.posts = [newPost, ...state.posts]
    },
    deletePost: (state, action: PayloadAction<{ idPost: number }>) => {
      state.posts = state.posts.filter(
        (p) => p.idPost !== action.payload.idPost
      )
    },

    // delete multiple posts
    setPostForDeleting: (state, action: PayloadAction<{ idPost: number }>) => {
      state.postsForDelete = [...state.postsForDelete, action.payload.idPost]
    },
    deletePostForDeleting: (
      state,
      action: PayloadAction<{ idPost: number }>
    ) => {
      state.postsForDelete = state.postsForDelete.filter(
        (id) => id !== action.payload.idPost
      )
    },
    clearPostsForDeleting: (state) => {
      state.postsForDelete = []
    },

    // like
    setLikeOnPost: (state, action: PayloadAction<{ idPost: number }>) => {
      state.posts = [
        ...state.posts.map((p) => {
          if (p.idPost === action.payload.idPost) {
            return {
              ...p,
              likesCount: ++p.likesCount,
              isLikeClick: true,
            }
          }
          return p
        }),
      ]
    },
    deleteLikeOnPost: (state, action: PayloadAction<{ idPost: number }>) => {
      state.posts = [
        ...state.posts.map((p) => {
          if (p.idPost === action.payload.idPost) {
            return {
              ...p,
              likesCount: --p.likesCount,
              isLikeClick: false,
            }
          }
          return p
        }),
      ]
    },
  },
})

export const {
  initializePosts,
  addPost,
  deletePost,
  setPostForDeleting,
  deletePostForDeleting,
  clearPostsForDeleting,
  setLikeOnPost,
  deleteLikeOnPost,
} = profileWallSlice.actions

export const profileWallReducer = profileWallSlice.reducer
