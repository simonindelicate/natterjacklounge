import { useRouter } from "next/router";
import { recipes } from "@/data/recipes";
import Head from "next/head";
import styles from "@/styles/recipes.module.css";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

// Define the Recipe interface
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
  const recipeRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!slug || Array.isArray(slug)) return <p className={styles.error}>Invalid recipe</p>;

  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return <p className={styles.error}>Recipe not found</p>;

  const ingredients = [...recipe.ingredients];
  if (recipe.garnish) ingredients.push(`Garnish: ${recipe.garnish}`);
  if (recipe.glassware) ingredients.push(`Glassware: ${recipe.glassware}`);

  const instructions = recipe.method
    .split(/\. (?=[A-Z])/g)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);

  // Function to capture the recipe card as an image
  const downloadRecipeImage = async () => {
    if (!recipeRef.current) return;

    const canvas = await html2canvas(recipeRef.current, {
      scale: 2, // Higher quality
      backgroundColor: "#fff", // Ensures proper rendering
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${recipe.slug}-recipe.png`;
    link.click();
  };

  // Function to copy recipe text to clipboard
  const copyRecipeToClipboard = async () => {
    const formattedText = `
${recipe.name.toUpperCase()}

${recipe.description}

Ingredients:
${ingredients.map((ingredient) => `- ${ingredient}`).join("\n")}

Instructions:
${instructions.map((step, index) => `${index + 1}. ${step}`).join("\n")}
    `;

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopySuccess(true);

      // Reset message after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy recipe:", err);
    }
  };

  return (
    <>
      <Head>
        <title>{recipe.name} Recipe</title>
        <meta name="description" content={recipe.description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.recipePage} ref={recipeRef}>
        <div className={styles.logoContainer}>
          <img
            src="/images/logo300.png"
            alt="Natterjack Logo"
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>{recipe.name}</h1>
        <p className={styles.description}>{recipe.description}</p>

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
        <br />
        <hr className={styles.rule} />
        <br />
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button onClick={downloadRecipeImage} className={styles.downloadButton}>
          📷 Download Recipe as an Image
        </button>
        <button onClick={copyRecipeToClipboard} className={styles.copyButton}>
          📋 Copy Recipe to Clipboard
        </button>
      </div>

      {/* Copy Success Message */}
      {copySuccess && <p className={styles.copySuccess}>✅ Recipe copied!</p>}
    </>
  );
}
