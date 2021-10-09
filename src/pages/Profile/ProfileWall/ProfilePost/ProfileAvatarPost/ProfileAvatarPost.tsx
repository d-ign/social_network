import React, { Dispatch, SetStateAction } from 'react'

import cn from 'classnames'
import s from './ProfileAvatarPost.module.scss'

import unknown from '../../../../../assets/img/no_photo.svg'
import Avatar from '../../../../../components/Avatar/Avatar'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../services/hooks/useApp'

import {
  setPostForDeleting,
  deletePostForDeleting,
} from '../../../../../store/reducers/profile-wall-reducer'
import { getTheme } from '../../../../../store/selectors/app-selectors'

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
  const theme = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  const handleClickOnAvatar = () => {
    if (!isSelectedPost) {
      setIsHiddenAllLikeAndXAndPrompt(true)
      setIsSelectedPost(true)
      dispatch(setPostForDeleting({ idPost }))
    } else {
      if (postsForDelete.size === 0) {
        // do not return all X and likes, if some posts are still selected
        setIsHiddenAllLikeAndXAndPrompt(false)
      }
      setIsSelectedPost(false)
      dispatch(deletePostForDeleting({ idPost }))
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
