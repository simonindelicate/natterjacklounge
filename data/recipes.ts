// data/recipes.ts

interface Recipe {
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  method: string;
  garnish?: string;
  glassware?: string; // Marked as optional
}

export const recipes: Recipe[] = [
  {
    name: "Stepping Stones",
    slug: "stepping-stones",
    description: "A daring blend of bourbon with amaretto, lime, and cranberry, spiced with a dash of clove bitters.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "25ml Amaretto",
      "20ml Lime juice",
      "30ml Cranberry juice",
      "Dash of clove bitters",
    ],
    method: "Shake bourbon, amaretto, lime juice, and cranberry juice with ice. Strain into a glass with ice, and garnish with lime and cranberries.",
    garnish: "Lime wedge and dried cranberries",
  },
  {
    name: "Compromise in the Glass",
    slug: "compromise-in-the-glass",
    description: "A unifying combination of bourbon and cognac, balanced with lime and mint, a refreshing nod to classic charm.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "20ml Cognac",
      "15ml Lime juice",
      "Fresh mint leaves",
      "10ml Honey syrup",
    ],
    method: "Muddle mint leaves with lime juice and honey syrup in a glass. Add bourbon, cognac, and ice. Stir gently and garnish with a mint sprig.",
    garnish: "Mint sprig and lime wheel",
  },
  {
    name: "The Bridge Builder",
    slug: "the-bridge-builder",
    description: "A sociable spritz that brings bourbon and Aperol together with a touch of Moscato D’Asti for a bright, engaging experience.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "20ml Aperol",
      "10ml Lemon juice",
      "Moscato D'Asti to top",
    ],
    method: "Shake bourbon, Aperol, and lemon juice with ice. Strain into a glass, top with Moscato D'Asti, and garnish with a lemon twist and orange peel.",
    garnish: "Lemon twist and orange peel",
  },
  {
    name: "The Velvet Embrace",
    slug: "the-velvet-embrace",
    description: "A luxurious twist on the Old Fashioned, with rich notes of chocolate and bourbon. Smooth and decadent.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "10ml Crème de Cocoa",
      "2 dashes spiced chocolate bitters",
    ],
    method: "Stir bourbon, Crème de Cocoa, and bitters with ice. Strain into an Old Fashioned glass over a large ice cube, and garnish with an orange peel twist.",
    garnish: "Orange peel twist",
  },
  {
    name: "Peachy Keen Punch",
    slug: "peachy-keen-punch",
    description: "A delightful and refreshing peach bourbon punch. It’s summery and light, ideal for when you want something bright and crisp.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "20ml Peach liqueur",
      "20ml Lemon juice",
      "Club soda to top",
    ],
    method: "Shake bourbon, peach liqueur, and lemon juice with ice. Strain into a glass with ice, top with soda, and garnish with a peach slice and mint sprig.",
    garnish: "Peach slice and mint sprig",
  },
  {
    name: "The Pinnacle Manhattan",
    slug: "the-pinnacle-manhattan",
    description: "A robust, no-nonsense take on the classic Manhattan, allowing the bourbon's strength to shine through.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "25ml Sweet vermouth",
      "2 dashes aromatic bitters",
    ],
    method: "Stir bourbon, vermouth, and bitters with ice. Strain into a chilled glass and garnish with a cherry and orange twist.",
    garnish: "Cherry and orange twist",
  },
  {
    name: "Maple Hearth Toddy",
    slug: "maple-hearth-toddy",
    description: "A warm and comforting Hot Toddy with a smooth maple twist, perfect for cold nights.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "20ml Maple syrup",
      "20ml Lemon juice",
      "Hot water to top",
    ],
    method: "Mix bourbon, maple syrup, and lemon juice in a heatproof glass. Top with hot water, and garnish with a cinnamon stick and lemon slice.",
    garnish: "Cinnamon stick and lemon slice",
  },
  {
    name: "Rogue Sour",
    slug: "rogue-sour",
    description: "A rebellious take on the Whiskey Sour, with a perfect balance of sour and sweet.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "25ml Lemon juice",
      "20ml Honey syrup",
      "Egg white (optional)",
    ],
    method: "Shake bourbon, lemon juice, honey syrup, and egg white with ice. Strain into a glass, and garnish with a lemon wedge and cherry.",
    garnish: "Lemon wedge and cherry",
  },
  {
    name: "Fig & Rosemary Elixir",
    slug: "fig-rosemary-elixir",
    description: "A fruity and herbaceous bourbon cocktail with fig, honey, and rosemary. It’s sophisticated and rich with flavor.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "20ml Fig liqueur",
      "10ml Honey syrup",
      "Fresh rosemary sprig",
    ],
    method: "Muddle rosemary with honey syrup. Add bourbon and fig liqueur, shake with ice, and strain into a glass over ice. Garnish with a fig slice and rosemary.",
    garnish: "Fig slice and rosemary",
  },
  {
    name: "Golden Hour Old Fashioned",
    slug: "golden-hour-old-fashioned",
    description: "A sweeter twist on the classic Old Fashioned, with orange bitters and a hint of sugar. Smooth, indulgent, and comforting.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "10ml Simple syrup",
      "2 dashes orange bitters",
    ],
    method: "Stir bourbon, simple syrup, and bitters with ice. Strain into an Old Fashioned glass over ice, and garnish with an orange slice and cherry.",
    garnish: "Orange slice and cherry",
  },
  {
    name: "Chai Bourbon Martini",
    slug: "chai-bourbon-martini",
    description: "A bold, spiced martini that infuses bourbon with chai, for a warm and intriguing flavor profile.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "20ml Chai-infused syrup",
      "10ml Dry vermouth",
    ],
    method: "Shake bourbon, chai syrup, and vermouth with ice. Strain into a martini glass, and garnish with a cinnamon stick.",
    garnish: "Cinnamon stick",
  },
  {
    name: "Cranberry Spice Celebration",
    slug: "cranberry-spice-celebration",
    description: "A festive, fizzy bourbon punch with cranberry and sparkling wine—perfect for celebrations.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "20ml Cranberry juice",
      "Sparkling wine to top",
    ],
    method: "Mix bourbon and cranberry juice in a glass with ice. Top with sparkling wine, and garnish with fresh cranberries and an orange slice.",
    garnish: "Fresh cranberries and orange slice",
  },
  {
    name: "Gingerbread Dreams",
    slug: "gingerbread-dreams",
    description: "A rich and comforting bourbon cocktail that captures the cozy, warm flavors of gingerbread. Perfect for those cold winter nights.",
    ingredients: [
      "50ml YourBrandHere Bourbon",
      "10ml Gingerbread syrup",
      "1 egg yolk",
    ],
    method: "Shake bourbon, gingerbread syrup, and egg yolk with ice. Strain into a glass, and garnish with ground nutmeg.",
    garnish: "Ground nutmeg",
  },
  {
    name: "Maple Smoke Fizz",
    slug: "maple-smoke-fizz",
    description: "An elegant and sophisticated bourbon cocktail with maple syrup and a hint of smoke, topped with soda for a refreshing fizz.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "15ml Maple syrup",
      "Soda water to top",
    ],
    method: "Mix bourbon and maple syrup in a glass with ice. Top with soda water, and garnish with a smoked rosemary sprig.",
    garnish: "Smoked rosemary sprig",
  },
  {
    name: "Easy Breeze Highball",
    slug: "easy-breeze-highball",
    description: "A simple, laid-back bourbon highball with ginger ale. Perfect for casual sipping.",
    ingredients: [
      "40ml YourBrandHere Bourbon",
      "Ginger ale to top",
    ],
    method: "Pour bourbon over ice in a highball glass, top with ginger ale, and garnish with a lemon twist.",
    garnish: "Lemon twist",
  },
];
