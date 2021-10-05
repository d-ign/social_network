import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import cn from 'classnames'
import s from './ProfileAvatarPost.module.scss'

import { actions } from '../../../../../redux/reducers/profile-reducer'
import { getTheme } from '../../../../../redux/selectors/app-selectors'

import unknown from '../../../../../img/no_photo.svg'
import Avatar from '../../../../common/Avatar/Avatar'

import { ProfileType } from '../../../../../types/types'

type PropsType = {
  idPost: number
  profile: ProfileType | null
  postsForDelete: Set<number>
  isSelectedPost: boolean
  setIsSelectedPost: Dispatch<SetStateAction<boolean>>
  setIsHiddenAllLikeAndXAndPrompt: Dispatch<SetStateAction<boolean>>
}

const ProfileAvatarPost: React.FC<PropsType> = ({
  idPost,
  profile,
  postsForDelete,
  isSelectedPost,
  setIsSelectedPost,
  setIsHiddenAllLikeAndXAndPrompt,
}) => {
  const theme = useSelector(getTheme)
  const dispatch = useDispatch()

  const handleClickOnAvatar = () => {
    if (!isSelectedPost) {
      setIsHiddenAllLikeAndXAndPrompt(true)
      setIsSelectedPost(true)
      dispatch(actions.setPostForDeleting(idPost))
    } else {
      if (postsForDelete.size === 0) {
        // do not return all X and likes, if some posts are still selected
        setIsHiddenAllLikeAndXAndPrompt(false)
      }
      setIsSelectedPost(false)
      dispatch(actions.deletePostForDeleting(idPost))
    }
  }

  return (
    <div
      aria-hidden='true'
      onClick={handleClickOnAvatar}
      className={cn(
        { [s.avatar]: !isSelectedPost },
        {
          [s.postSelectedTheme1]: isSelectedPost && theme === 'theme1',
        },
        {
          [s.postSelectedTheme2]: isSelectedPost && theme === 'theme2',
        }
      )}
    >
      <Avatar
        size='medium'
        id={profile?.userId || null}
        photo={profile?.photos.large || unknown}
      />
    </div>
  )
}

export default ProfileAvatarPost
