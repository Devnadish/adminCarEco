'use server'
import db from '@/lib/prisma'
import { faker } from '@faker-js/faker'

export const GnerateDepartment = async (id, serviceid) => {
  await db.ProviderDepartment.deleteMany()

  const department = await db.service.findMany({
    where: { type: 'department' }
  })
  const departmentIDS = department.map(el => el.id)

  const provider = await db.provider.findMany({ select: { id: true } })
  const providerIds = provider.map(el => el.id)

  for (let i = 0; i < providerIds.length; i++) {
    await createDepartment(providerIds[i], department, departmentIDS)
  }
}

const createDepartment = async (providerId, department, departmentIDS) => {
  const depCount = faker.number.int({ min: 2, max: 10 })

  for (let i = 0; i < depCount; i++) {
    const serviceId = faker.helpers.arrayElement(departmentIDS, {
      min: 2,
      max: 10
    })

    const serviceItem = await db.service.findFirst({
      where: { id: serviceId }
    })
    const image = {
      providerid: providerId,
      departmentid: serviceId,
      department: serviceItem.service,
      slug: serviceItem.slug,
      description: serviceItem.description,
      logo: serviceItem.logo,
      subPoints: serviceItem.subPoints,
      userid: 'khalidnadish',
      likeCounter: faker.number.int({ max: 100 }),
      dislikeCounter: faker.number.int({ max: 100 }),
      commentCounter: faker.number.int({ max: 100 })
    }
    await db.ProviderDepartment.create({ data: image })
  }
}
