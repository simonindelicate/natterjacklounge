// pages/recipes/[slug].tsx

import { useRouter } from "next/router";
import { recipes } from "@/data/recipes";
import Head from "next/head";
import styles from "@/styles/recipes.module.css";

// Define the Recipe interface to match your recipes' structure
interface Recipe {
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  method: string;
  garnish?: string;
  glassware?: string;
}

export default function RecipeCard() {
  const router = useRouter();
  const { slug } = router.query;

  // Find the recipe that matches the slug
  const recipe = recipes.find((r) => r.slug === slug) as Recipe;

  if (!recipe) return <p>Recipe not found</p>;

  // Prepare the ingredients list
  const ingredients = [...recipe.ingredients];
  if (recipe.garnish) {
    ingredients.push(`Garnish: ${recipe.garnish}`);
  }
  if (recipe.glassware) {
    ingredients.push(`Glassware: ${recipe.glassware}`);
  }

  // Split the method into individual instructions
  const instructions = recipe.method
    .split(". ")
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  return (
    <>
      <Head>
        <title>{recipe.name} Recipe</title>
        {/* Include Playfair Display font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.recipePage}>
        <h1 className={styles.title}>{recipe.name}</h1>
        <h2 className={styles.subtitle}>Ingredients:</h2>
        <ul className={styles.list}>
          {ingredients.map((ingredient, index) => (
            <li key={index} className={styles.listItem}>
              {ingredient}
            </li>
          ))}
        </ul>
        <h2 className={styles.subtitle}>Instructions:</h2>
        <ol className={styles.list}>
          {instructions.map((instruction, index) => (
            <li key={index} className={styles.listItem}>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
