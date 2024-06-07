'use server'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Slug } from '@/lib/nadish'
import { faker } from '@faker-js/faker'
import { fakerAR } from '@faker-js/faker'

const commentGnerate = async (id, user) => {
  const service = await db.providerService.findMany({
    where: { providerid: id }
  })

  const numberOfImages = faker.number.int({ min: 2, max: 10 })
  for (let i = 0; i < numberOfImages; i++) {
    const service = {
      providerid: id,
      comment: fakerAR.lorem.sentence({ min: 3, max: 5 }),
      serviceid: fakerAR.helpers.arrayElement([
        'برامج الولاء والمكافآت',
        'خدمات التوصيل والاستلام',
        'ضمانات ممتدة وخطط صيانة',
        'خدمات التنظيف والتجميل',
        'خدمات فحص ما قبل الشراء',
        'خدمات المساعدة على الطريق',
        'خدمات الصيانة الدورية للمركبات التجارية'
      ]),
      isShow: faker.helpers.arrayElement([true, false]),
      isOpen: faker.helpers.arrayElement([true, false]),

      userid: faker.helpers.arrayElement(user)
    }
    await db.comment.create({ data: service })
  }
  return
}
