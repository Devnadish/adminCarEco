'use server'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
export const removeAction = async (providerid, userid, requestCode) => {
  try {
    const actionId = await db.userAction.findFirst({
      where: {
        providerid,
        userid,
        actionid: requestCode
      },
      select: { id: true }
    })

    if (!actionId) {
      throw new Error('Action not found')
    }

    await db.userAction.delete({
      where: { id: actionId.id }
    })

    const updateData = {
      likeCount: { decrement: 1 },
      disLikeCount: { decrement: 1 },
      favCount: { decrement: 1 }
    }
    updateData[
      `${requestCode === 1 ? 'likeCount' : requestCode === 2 ? 'disLikeCount' : 'favCount'}`
    ] = { decrement: 1 }

    await db.provider.update({
      where: { id: providerid },
      data: updateData
    })

    revalidatePath(`/reaction/${userid}`)
    revalidatePath('/')
  } catch (error) {
    console.error(`Error removing action: ${error}`)
  }
}

export const showComment = async (providerid, userid, requestCode) => {
  const msg = await db.userAction.findFirst({
    where: {
      providerid,
      userid,
      actionid: requestCode
    },
    select: { comment: true }
  })
  return msg
}
