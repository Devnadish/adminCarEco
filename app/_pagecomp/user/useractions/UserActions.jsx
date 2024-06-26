'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dislike, Like } from '@/components/svg/LikeAndDislike'
import { HeartHandshake, MessageCircleMore, Share2 } from '@/lib/icons'
import {
  addDislikeAction,
  addFavoriteAction,
  addLikeAction
} from './db/addReaction'
import Swal from 'sweetalert2'
import { SubSpinner } from '@/components/shared/Spinner'
import { sendReactionMail } from '@/app/_pagecomp/admin/mailsystem/db/inbox'
import Text from '@/components/shared/Text'

function UserActions({
  session,
  providerId,
  likeCount = 0,
  disLikeCount = 0,
  favCount = 0,
  commentCount = 0,
  shareCount = 0,
  userActions,
  providerEmail
}) {
  const [isLikeLoading, setLikeLoading] = useState(false)
  const [isDisLikeLoading, setDisLikeLoading] = useState(false)
  const [isFavItLoading, setFavItLoading] = useState(false)

  const handleLikeAction = async () => {
    const { value: likeComment } = await Swal.fire({
      title: 'اعجاب ',
      text: 'نشكرك على اعجابك ونطلب منك توضيح لأن نساهم في تحسين خدمتك.',
      input: 'text',
      inputPlaceholder: 'أدخل  الاعجاب ',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'استمر',
      cancelButtonText: 'تراجع'
    })
    const comment = likeComment || 'متحفظ '

    setLikeLoading(true)
    await addLikeAction(providerId, session?.user?.id, comment)
    Swal.fire({
      title: 'احسنت!',
      text: 'شكرا لدعمك',
      icon: 'success'
    })
    // send mail to  provider for reaction
    await sendReactionMail(
      session?.user?.email,
      providerEmail,
      'اعجاب ',
      comment,
      'like'
    )
    setLikeLoading(false)
  }

  const handleDislikeAction = async () => {
    const { value: dislikeComment } = await Swal.fire({
      title: 'اعجاب سلبي',
      text: 'نأسف لسببك ونطلب منك توضيح لأن نساهم في تحسين خدمتنا.',
      input: 'text',
      inputPlaceholder: 'أدخل سببك للاعجاب السلبي',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'استمر',
      cancelButtonText: 'تراجع'
    })

    const comment = dislikeComment || 'متحفظ '
    setDisLikeLoading(true)
    // add reaction to db
    await addDislikeAction(providerId, session?.user?.id, comment)
    Swal.fire({
      title: 'Sorry!',
      text: 'Thank you for your feedback',
      icon: 'success'
    })
    // send mail to  provider for reaction
    await sendReactionMail(
      session?.user?.email,
      providerEmail,
      'اعجاب سلبي',
      comment,
      'dislike'
    )
    setDisLikeLoading(false)
  }

  const handleFavoriteAction = async () => {
    setFavItLoading(true)
    await addFavoriteAction(providerId, session?.user?.id)

    await sendReactionMail(
      session?.user?.email,
      providerEmail,
      'اضافة للمفضلة ',
      'قام العميل بالاضافة للمفضلة',
      'favorite'
    )
    Swal.fire({
      title: 'Thank you!',
      text: 'Your favorite has been registered.',
      icon: 'success'
    })
    setFavItLoading(false)
  }
  return (
    <div className='fixed left-2 top-[65px] z-50 flex flex-col items-center justify-end gap-4 px-1 '>
      <UserAction
        label='Like'
        count={likeCount}
        isLoading={isLikeLoading}
        icon={Like}
        isActive={userActions.isLike}
        onClick={handleLikeAction}
      />
      <UserAction
        label='Fav'
        count={favCount}
        isLoading={isFavItLoading}
        icon={HeartHandshake}
        isActive={userActions.isFav}
        onClick={handleFavoriteAction}
      />

      <UserAction
        label='Dislike'
        count={disLikeCount}
        isLoading={isDisLikeLoading}
        icon={Dislike}
        isActive={userActions.isDisLike}
        onClick={handleDislikeAction}
      />
      <Comments commentCount={commentCount} />
      <Shared shareCount={shareCount} />
    </div>
  )
}

export default UserActions
function UserAction({
  count,
  isLoading,
  icon: Icon,
  isActive,
  onClick,
  label
}) {
  const handleClick = () => {
    if (isActive) {
      const msg =
        label === 'Like'
          ? '😊 تم الاعجاب من قبل'
          : label === 'Dislike'
            ? '😢 تم الاعجاب السلبي من قبل'
            : '❤️ تم اضافتها للمفضلة'
      const icon = label === 'Like' || label === 'Fav' ? 'success' : 'question'
      Swal.fire({
        title: msg,
        icon: icon
      })
      return
    }
    onClick()
  }

  return (
    <Button
      variant='ghost'
      onClick={handleClick}
      className={`size-10 border border-primary shadow-lg ${isActive ? 'bg-primary text-white' : 'bg-primary/40'}`}
    >
      {isLoading ? (
        <SubSpinner />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <Icon
            className={`size-4 ${isActive ? 'text-primary-foreground' : ''}`}
          />
          <span
            className={`size-4 text-xs ${isActive ? 'text-primary-foreground' : ''}`}
          >
            {count}
          </span>
        </div>
      )}
    </Button>
  )
}

const Comments = ({ commentCount }) => {
  return (
    <div className='flex w-full items-center justify-center gap-4'>
      <Button
        variant='outline'
        className='flex size-10 h-16 flex-col items-center justify-center gap-2 rounded-md border bg-secondary'
      >
        <MessageCircleMore className={`size-4 text-muted-foreground`} />
        <span className='text-[.7rem] text-muted-foreground'>
          {commentCount}
        </span>
      </Button>
    </div>
  )
}

const Shared = ({ shareCount }) => {
  return (
    <div className='flex w-full items-center justify-center gap-4'>
      <Button
        variant='outline'
        className='flex  size-10 h-16 flex-col items-center justify-center gap-2 rounded-md border bg-secondary'
      >
        <Share2 className={`size-4 text-muted-foreground`} />
        <span className='text-[.7rem] text-muted-foreground'>{shareCount}</span>
      </Button>
    </div>
  )
}
