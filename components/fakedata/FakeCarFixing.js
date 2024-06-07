'use server'
import { Notify } from '@/lib/nadish'
import db from '@/lib/prisma'
import { faker } from '@faker-js/faker'

export const GnerateProviderCarFixing = async () => {
  await db.ProviderCarFixing.deleteMany()

  const cars = await db.car.findMany({})
  const carsIDS = cars.map(el => el.id)

  const provider = await db.provider.findMany({ select: { id: true } })
  const providerIds = provider.map(el => el.id)

  for (let i = 0; i < providerIds.length; i++) {
    await createCarFixing(providerIds[i], cars, carsIDS)
  }
}

const createCarFixing = async (providerId, department, departmentIDS) => {
  const depCount = faker.number.int({ min: 2, max: 20 })

  for (let i = 0; i < depCount; i++) {
    const serviceId = faker.helpers.arrayElement(departmentIDS, {
      min: 2,
      max: 10
    })

    const serviceItem = await db.car.findFirst({
      where: { id: serviceId }
    })
    const image = {
      providerid: providerId,
      carid: serviceId,
      name: serviceItem.name,
      image: serviceItem.image,
      userid: 'khalidnadish'
    }
    await db.ProviderCarFixing.create({ data: image })
  }
}
