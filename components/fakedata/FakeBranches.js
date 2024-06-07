'use server'
import db from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Slug } from '@/lib/nadish'
import { faker } from '@faker-js/faker'
import { fakerAR } from '@faker-js/faker'

const providerBranch = async (id, branchCount) => {
  // if multi timeing
  // for (let i = 0; i < branchCount; i++) {
  const image = {
    providerid: id, // Ensure this matches your database field name
    image: faker.image.avatar(),
    lat: faker.location.latitude({ max: 10, min: -10, precision: 5 }),
    lan: faker.location.longitude({ max: 10, min: -10, precision: 5 }),
    branchName: fakerAR.name.fullName(),
    sat: '9:00 am To 12:00 pm',
    sun: '9:00 am To 12:00 pm',
    mon: '9:00 am To 12:00 pm',
    tue: '9:00 am To 12:00 pm',
    wed: '9:00 am To 12:00 pm',
    thu: '9:00 am To 12:00 pm',
    fri: '9:00 am To 12:00 pm',
    userid: 'khalidnadish'
  }
  await db.providerBranch.create({ data: image })
}
