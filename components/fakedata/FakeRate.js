'use server'
import db from '@/lib/prisma'
import { faker } from '@faker-js/faker'
import { fakerAR } from '@faker-js/faker'

export const doRate = async (id, userIDS) => {
  const numberOfRate = faker.number.int({ min: 10, max: 100 })

  for (let i = 0; i < numberOfRate; i++) {
    const rate = {
      rate: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      comment: fakerAR.lorem.sentence({ min: 3, max: 5 }),
      providerId: id,
      userId: faker.helpers.arrayElement(userIDS)
    }
    await db.ProviderRating.create({ data: rate })
  }

  return
}

export const rateGnerate = async () => {
  await db.ProviderRating.deleteMany()
  const users = await db.user.findMany({})
  const userIDS = users.map(el => el.id)
  const provider = await db.provider.findMany({ select: { id: true } })
  const providerIds = provider.map(el => el.id)

  for (let i = 0; i < providerIds.length; i++) {
    await doRate(providerIds[i], userIDS)
  }
}
