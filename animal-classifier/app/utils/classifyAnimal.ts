import { pipeline } from '@huggingface/transformers';

export async function classifyAnimal(imageData: string): Promise<string | null> {
  try {
    // Model checkpoint for the CLIP model
    const checkpoint = "google/owlv2-base-patch16-ensemble";

    // Initialize the pipeline
    const classifier = await pipeline("zero-shot-image-classification", checkpoint);

    // Labels for classification
    const labels = [
      'cat',
      'dog',
      'elephant',
      'lion',
      'tiger',
      'crocodile',
      'giraffe',
      'zebra',
      'bear',
      'wolf',
      'fox',
    ];

    // Perform classification
    const results = await classifier(imageData, labels);

    // Ensure results are returned and extract the highest confidence score
    if (!results || results.length === 0) {
      console.error('No classification results returned.');
      return null;
    }

    const bestMatch = results.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), results[0]);

    return bestMatch ? bestMatch.label : null;
  } catch (error) {
    console.error("Error in classifyAnimal:", error);
    return null;
  }
}
