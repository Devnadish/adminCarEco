'use server'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Slug } from '@/lib/nadish'
import { faker } from '@faker-js/faker'
import { fakerAR } from '@faker-js/faker'

const dataSchema = async () => {
  const citits = await db.city.findMany({ select: { city: true } })
  const cititsName = citits.map(i => i.city)
  const typeOfType = ['c', 'w', 'h']
  let provideName = fakerAR.person.fullName()

  let providerSlug = Slug(provideName)

  await new Promise(resolve => setTimeout(resolve, 1000))

  const provider = {
    providerName: provideName,
    slug: providerSlug,
    coverImage: fakerAR.image.avatar(),
    heroSlogon: fakerAR.lorem.paragraph({ min: 1, max: 1 }),
    email: `${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(
        4,
        '0'
      )}${Date.now().toString().slice(-6).replace(/[^\w]/g, '')}@gmail.com`,

    // email: `${faker.internet.exampleEmail({ firstName: 'Jeanne' })}.${Date.now().toString().slice(-10)}`,
    mobile: faker.phone.number(),
    logo: fakerAR.image.avatar(),
    detail: fakerAR.lorem.paragraph({ min: 5, max: 30 }),
    description: fakerAR.lorem.paragraph({ min: 3, max: 7 }),
    starCount: faker.number.int({ max: 100 }), // 42
    commentCount: faker.number.int({ max: 100 }), // 42,
    likeCount: faker.number.int({ max: 100 }), // 42,
    disLikeCount: faker.number.int({ max: 100 }), // 42,
    favCount: faker.number.int({ max: 100 }), // 42,
    shareCount: faker.number.int({ max: 100 }), // 42,
    branchCount: faker.number.int({ min: 1, max: 10 }), // 42,
    type: faker.helpers.arrayElements(typeOfType, { min: 1, max: 1 })[0],
    city: faker.helpers.arrayElements(cititsName, { min: 1, max: 1 })[0],
    dist: faker.helpers.arrayElements(cititsName, { min: 1, max: 1 })[0],
    workingHours: JSON.stringify(workDayAndHoure),

    userid: 'khalidnadish'
  }

  return provider
}

export const newProviderData = async (count = 100) => {
  await db.provider.deleteMany()
  const providers = await Promise.all(
    Array.from({ length: count }, async (_, index) => {
      const counter = index + 1

      const provider = await dataSchema()
      const pr = await db.provider.create({ data: provider })
      return provider
    })
  )
}

// sample object for workDay and hour for all the week
const workDayAndHoure = {
  Sunday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Monday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Tuesday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Wednesday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Thursday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Friday: {
    workDay: false,
    hour: ['08:00', '12:00', '13:00', '18:00']
  },
  Saturday: {
    workDay: true,
    hour: ['08:00', '12:00', '13:00', '18:00']
  }
}
