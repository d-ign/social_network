import React, { SetStateAction, Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import cn from 'classnames'
import s from './ProfileButtonsPostsDelete.module.scss'

import { actions } from '../../../../redux/reducers/profile-reducer'
import { getTheme } from '../../../../redux/selectors/app-selectors'

import { PostType } from '../../../../types/types'

type PropsType = {
  posts: PostType[]
  postsForDelete: Set<number>
  isSelectedAllPosts: boolean
  setIsSelectedAllPosts: Dispatch<SetStateAction<boolean>>
  setIsHiddenAllLikeAndXAndPrompt: Dispatch<SetStateAction<boolean>>
  setIsCancelDeletion: Dispatch<SetStateAction<boolean>>
  setIsShowAnimation: Dispatch<SetStateAction<boolean>>
}

const ProfileButtonsPostsDelete: React.FC<PropsType> = (props) => {
  const {
    posts,
    postsForDelete,
    isSelectedAllPosts,
    setIsSelectedAllPosts,
    setIsHiddenAllLikeAndXAndPrompt,
    setIsCancelDeletion,
    setIsShowAnimation,
  } = props

  const stylesButton: React.CSSProperties = {
    color: 'white',
    maxWidth: '120px',
    height: '70%',
    margin: '10px',
    textShadow: '2px 2px 7px var(--color-darkBlueTransparent)',
  }

  const dispatch = useDispatch()
  const theme = useSelector(getTheme)

  const handleDeleteSelectedPost = () => {
    // start delete animation
    setIsShowAnimation(true)

    setIsSelectedAllPosts(false)

    // return X and likes on all posts
    setIsHiddenAllLikeAndXAndPrompt(false)

    setTimeout(() => {
      postsForDelete.forEach((p) => {
        dispatch(actions.deletePost(p))
      })
      dispatch(actions.clearPostsForDeleting())

      // end of delete animation
      setIsShowAnimation(false)
    }, 600)
  }

  const handleCancelDeletion = () => {
    dispatch(actions.clearPostsForDeleting())
    setIsCancelDeletion(true)
    setIsSelectedAllPosts(false)
  }

  const handleSelectedAllPosts = () => {
    if (!isSelectedAllPosts) {
      posts.forEach((post) => {
        dispatch(actions.setPostForDeleting(post.idPost))
      })
      setIsSelectedAllPosts(true)
    } else {
      dispatch(actions.clearPostsForDeleting())
      setIsSelectedAllPosts(false)
    }
  }

  return (
    <div className={s.wrapButtons}>
      <div
        hidden={postsForDelete.size === 0}
        className={cn({ [s.buttons]: postsForDelete.size > 0 })}
      >
        <FormControlLabel
          control={
            <Checkbox color={theme === 'theme1' ? 'primary' : 'secondary'} />
          }
          label='Select all'
          labelPlacement='end'
          style={{ marginLeft: '14px' }}
          checked={isSelectedAllPosts && postsForDelete.size === posts.length}
          onChange={handleSelectedAllPosts}
        />

        <div className={s.buttonDesktop}>
          <Button
            variant='contained'
            style={stylesButton}
            startIcon={<DeleteIcon />}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            onClick={handleDeleteSelectedPost}
          >
            Delete
          </Button>
        </div>
        <div hidden className={s.buttonMobile}>
          <IconButton
            title='Delete'
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            onClick={handleDeleteSelectedPost}
          >
            <DeleteIcon />
          </IconButton>
        </div>

        <div className={s.buttonDesktop}>
          <Button
            variant='outlined'
            style={stylesButton}
            startIcon={<CloseIcon />}
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            onClick={handleCancelDeletion}
          >
            Cancel
          </Button>
        </div>
        <div hidden className={s.buttonMobile}>
          <IconButton
            title='Cancel'
            color={theme === 'theme1' ? 'primary' : 'secondary'}
            onClick={handleCancelDeletion}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ProfileButtonsPostsDelete
