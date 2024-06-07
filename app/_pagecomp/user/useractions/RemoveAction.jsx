'use client'
import React from 'react'
import { Button } from '../../../../components/ui/button'
import { MessageCircleMore, Trash } from '@/lib/icons'
import Text from '../../../../components/shared/Text'
import { removeAction, showComment } from './db/removeReaction'
import Swal from 'sweetalert2'
export const dynamic = 'force-dynamic'

function RemoveActionButton({ providerId, actionId, userid }) {
  const handleRemoveFromList = async () => {
    await removeAction(providerId, userid, actionId)
  }

  const handleShowComment = async () => {
    const msg = await showComment(providerId, userid, actionId)
    if (msg) {
      Swal.fire({
        html: msg.comment,
        icon: 'info',
        confirmButtonColor: '#007bff',
        confirmButtonText: 'متابعه'
      })
    }
  }

  return (
    <div className='flex w-full items-center justify-between gap-2'>
      {actionId === 1 || actionId === 2 ? (
        <Button
          className='bg-primaary flex h-6 items-center justify-between gap-4 text-white'
          onClick={handleShowComment}
          type='button'
        >
          <MessageCircleMore className='size-4 text-white' />
        </Button>
      ) : null}

      <Button
        // className='flex h-6 items-center justify-between gap-4 bg-red-500 text-white hover:bg-red-600'
        onClick={handleRemoveFromList}
        type='button'
        variant='link'
      >
        <Text fontSize={'xs'} fontFamily={'tajwal'}>
          ازالة من القائمة
        </Text>
        {/* <Trash className='size-4 text-white' /> */}
      </Button>
    </div>
  )
}

export default RemoveActionButton
