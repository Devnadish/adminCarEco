'use server'
import db from '@/lib/prisma'
import { faker } from '@faker-js/faker'

export const sliderImage = async id => {
  await db.image.deleteMany()
  const provider = await db.provider.findMany({ select: { id: true } })
  const providerIds = provider.map(el => el.id)

  for (let i = 0; i < providerIds.length; i++) {
    await createImages(providerIds[i])
  }
}

const createImages = async id => {
  const numberOfImages = faker.number.int({ min: 2, max: 10 })
  for (let i = 0; i < numberOfImages; i++) {
    const image = {
      image: faker.image.avatar(),
      providerid: id, // Ensure this matches your database field name
      type: 'slider',
      userid: 'khalidnadish'
    }
    await db.image.create({ data: image })
  }
}
