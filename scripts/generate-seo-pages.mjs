import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const cities = [
  "karnataka",
  "bangalore"
]

const courses = [
  "btech",
  "mba",
  "bca",
  "bba",
  "mbbs",
  "bpt" 
]

async function generatePages() {

  for (const city of cities) {
    for (const course of courses) {

      const slug = `${course}-colleges-in-${city}`

      const title = `Top ${course.toUpperCase()} Colleges in ${city} | Admission 2026`

      const description =
        `Explore the best ${course.toUpperCase()} colleges in ${city}. Compare fees, rankings, admission process and apply for direct admission.`

      await prisma.post.upsert({
        where: { slug },
        update: {},
        create: {
          title,
          slug,
          content: `Guide to ${course} colleges in ${city}`,
          metaTitle: title,
          metaDescription: description
        }
      })

      console.log(`Generated page: ${slug}`)
    }
  }

  console.log("SEO pages generated successfully")
}

generatePages()
