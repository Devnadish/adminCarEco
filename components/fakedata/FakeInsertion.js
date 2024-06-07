'use server'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { fakerAR } from '@faker-js/faker'
import { GnerateDepartment } from './FakeDepatrment'
import { newProviderData } from './Fakeproviders'
import { GnerateServices } from './FakeService'
import { sliderImage } from './FakeImages'
import { GnerateProviderCarFixing } from './FakeCarFixing'

export const createBlock = async count => {
  await newProviderData(count)
  await GnerateDepartment()
  await GnerateServices()
  await sliderImage()
  await GnerateProviderCarFixing()
}

export const deleteBlock = async () => {
  try {
    await Promise.all([
      db.image.deleteMany(),
      db.providerBranch.deleteMany(),
      db.providerService.deleteMany(),
      // db.service.deleteMany(),
      db.comment.deleteMany(),
      db.user.deleteMany(),
      db.ProviderRating.deleteMany()
    ])
  } catch (error) {
    console.error('Error deleting records:', error)
  }
}

export const getusers = async () => {
  const user = await db.user.findMany({})
  const users = user.map(el => el.email)
  return users
}

export const fakeMailing = async () => {
  const users = await getusers()

  for (let i = 0; i < 50; i++) {
    const service = {
      subject: fakerAR.lorem.sentence({ min: 1, max: 3 }),
      msg: fakerAR.lorem.sentence({ min: 3, max: 5 }),
      from: faker.helpers.arrayElement(users),
      to: faker.helpers.arrayElement(users)
    }
    await db.inbox.create({ data: service })
  }
}

const rateGnerate = async id => {
  const users = await db.user.findMany({})
  const userIds = users.map(user => user.id)
  const numberOfRate = faker.number.int({ min: 10, max: 100 })

  for (let i = 0; i < numberOfRate; i++) {
    const rate = {
      rate: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
      comment: fakerAR.lorem.sentence({ min: 3, max: 5 }),
      providerId: id,
      userId: faker.helpers.arrayElement(userIds)
    }

    await db.ProviderRating.create({ data: rate })
  }

  return
}

const generateProviderAsUser = async (provider, id) => {
  const providerUser = await db.user.create({
    data: {
      name: provider.providerName,
      email: provider.email,
      image: provider.logo,
      password: bcrypt.hashSync('0000', 8),
      isVerified: true,
      VerifiedToken: '0000',
      role: 'provider',
      pageId: id
    }
  })

  return
}

export const genetaeUsers = async count => {
  for (let index = 0; index < count; index++) {
    await db.user.create({
      data: {
        name: fakerAR.name.fullName(),
        // mobile: faker.phone.number(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        password: bcrypt.hashSync('0000', 8),
        isVerified: true,
        role: 'user'
      }
    })
  }
  return
}
