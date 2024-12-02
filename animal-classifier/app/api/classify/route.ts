import { NextRequest, NextResponse } from 'next/server'
import { classifyAnimal } from '../../utils/classifyAnimal'
import { checkAnimalDanger } from '../../utils/checkAnimalDanger'

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json()
    
    const animalName = await classifyAnimal(image)
    
    if (animalName) {
      const dangerInfo = await checkAnimalDanger(animalName)
      return NextResponse.json({ result: dangerInfo })
    } else {
      return NextResponse.json({ result: "No animal detected in the image." })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred while processing the image." }, { status: 500 })
  }
}

