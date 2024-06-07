'use server'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const getserviceData = async (poviderSlug, serviceSlug) => {
  const PID = await db.provider.findFirst({ where: { slug: poviderSlug } })
  const poviderId = PID.id

  const DID = await db.service.findFirst({ where: { slug: serviceSlug } })
  const serviceid = DID.id
  const serviceData = await db.ProviderService.findFirst({
    where: { providerid: poviderId, serviceid: serviceid }
  })

  const comments = await ShowserviceComment(poviderId, serviceid)
  console.log(comments)

  return {
    service: serviceData,
    comment: comments,
    poviderId,
    providerName: PID.providerName,
    serviceid
  }
}

export const addserviceComment = async (data, poviderSlug, serviceSlug) => {
  // TODO: Add validation & Send email to provider for New Servicecomment
  try {
    const save = await db.ExtraServiceComment.create({ data })
    await addCommentToProvider(data.providerid)
    revalidatePath(`/`)
    revalidatePath(`/comment/service/${poviderSlug}/${serviceSlug}`)
  } catch (error) {
    console.log(error)
  }
}

export const ShowserviceComment = async (providerid, serviceid) => {
  try {
    const data = await db.ExtraServiceComment.findMany({
      where: { providerid: providerid, serviceid: serviceid }
    })
    const userCommentsWithUserImage = await Promise.all(
      data.map(async comment => {
        const user = await db.user.findFirst({
          where: { id: comment.userid }
        })
        return {
          ...comment,
          userImage: user.image || '',
          userName: user.name || ''
        }
      })
    )

    return userCommentsWithUserImage
  } catch (error) {
    console.log(error)
  }
}

const addCommentToProvider = async providerid => {
  return await db.provider.update({
    where: { id: providerid },
    data: { commentCount: { increment: 1 } }
  })
}
