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
    "name": "The Wild Rover",
    "slug": "the-wild-rover",
    "description": "A bold and adventurous take on the classic Old Fashioned, with Natterjack Irish Whiskey, honey, and a dash of smoked bitters.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "10ml Honey syrup",
      "2 dashes smoked bitters"
    ],
    "method": "Stir Natterjack, honey syrup, and bitters with ice. Strain into a glass over a large ice cube and garnish with an orange twist.",
    "garnish": "Orange twist"
  },
  {
    "name": "The Wayfarer",
    "slug": "the-wayfarer",
    "description": "A whiskey sour with a Natterjack twist, using ginger and clove to enhance its adventurous spirit.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "25ml Lemon juice",
      "20ml Honey syrup",
      "1 dash clove bitters",
      "Egg white (optional)"
    ],
    "method": "Shake all ingredients dry, then add ice and shake again. Strain into a glass and garnish with grated nutmeg and a lemon twist.",
    "garnish": "Grated nutmeg and lemon twist"
  },
  {
    "name": "The Natterjack Mule",
    "slug": "natterjack-mule",
    "description": "A lively and refreshing whiskey mule with the smooth depth of Natterjack and a sharp ginger kick.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "15ml Lime juice",
      "10ml Honey syrup",
      "Ginger beer to top"
    ],
    "method": "Build in a glass over ice, stir gently, and garnish with fresh mint and a lime wheel.",
    "garnish": "Mint sprig and lime wheel"
  },
  {
    "name": "Follow the Toad",
    "slug": "follow-the-toad",
    "description": "A daring mix of Natterjack, coffee liqueur, and cream, bringing a smooth and velvety finish to a bold Irish classic.",
    "ingredients": [
      "40ml Natterjack Irish Whiskey",
      "20ml Coffee liqueur",
      "20ml Heavy cream",
      "Freshly grated nutmeg"
    ],
    "method": "Shake Natterjack and coffee liqueur with ice, strain into a glass, then float the cream on top. Garnish with freshly grated nutmeg.",
    "garnish": "Freshly grated nutmeg"
  },
  {
    "name": "The Rebel’s Spritz",
    "slug": "rebels-spritz",
    "description": "A bright and unexpected blend of whiskey, elderflower, and sparkling wine for those who choose their own path.",
    "ingredients": [
      "40ml Natterjack Irish Whiskey",
      "15ml Elderflower liqueur",
      "10ml Lemon juice",
      "Sparkling wine to top"
    ],
    "method": "Shake whiskey, elderflower liqueur, and lemon juice with ice. Strain into a glass and top with sparkling wine. Garnish with a lemon twist.",
    "garnish": "Lemon twist"
  },
  {
    "name": "The Roaming Toad",
    "slug": "roaming-toad",
    "description": "An Irish take on the classic Manhattan, where Natterjack’s boldness meets the deep richness of vermouth and bitters.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "25ml Sweet vermouth",
      "2 dashes aromatic bitters"
    ],
    "method": "Stir all ingredients with ice, strain into a chilled glass, and garnish with a cherry and an orange peel twist.",
    "garnish": "Cherry and orange peel twist"
  },
  {
    "name": "Toad in the Fog",
    "slug": "toad-in-the-fog",
    "description": "A warming and smoky hot toddy with Natterjack, honey, and spiced tea, perfect for cold evenings.",
    "ingredients": [
      "40ml Natterjack Irish Whiskey",
      "20ml Honey syrup",
      "Hot spiced tea to top",
      "Lemon wedge"
    ],
    "method": "Mix Natterjack and honey in a heatproof glass, top with hot spiced tea, and stir. Garnish with a lemon wedge and a cinnamon stick.",
    "garnish": "Lemon wedge and cinnamon stick"
  },
  {
    "name": "The Wanderer’s Highball",
    "slug": "wanderers-highball",
    "description": "A no-nonsense whiskey highball with crisp apple and soda, letting Natterjack shine.",
    "ingredients": [
      "40ml Natterjack Irish Whiskey",
      "Apple soda to top"
    ],
    "method": "Pour Natterjack over ice in a highball glass, top with apple soda, and garnish with a fresh apple slice.",
    "garnish": "Apple slice"
  },
  {
    "name": "Golden Horizon",
    "slug": "golden-horizon",
    "description": "A smooth and elegant whiskey cocktail with maple and vanilla, perfect for sipping as the sun sets.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "10ml Maple syrup",
      "10ml Vanilla liqueur",
      "2 dashes orange bitters"
    ],
    "method": "Stir all ingredients with ice, strain into a glass over a large ice cube, and garnish with an orange peel twist.",
    "garnish": "Orange peel twist"
  },
  {
    "name": "The Irish Gold Rush",
    "slug": "irish-gold-rush",
    "description": "A bright and citrusy whiskey cocktail with honey and lemon, full of smooth richness and zest.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "20ml Honey syrup",
      "20ml Lemon juice"
    ],
    "method": "Shake all ingredients with ice, strain into a glass with fresh ice, and garnish with a lemon wheel and thyme sprig.",
    "garnish": "Lemon wheel and thyme sprig"
  },
  {
    "name": "Natterjack & Smoke",
    "slug": "natterjack-smoke",
    "description": "A bold and smoky twist on the Old Fashioned with a hint of peat and spice.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "5ml Peated whiskey (for a smoky accent)",
      "10ml Simple syrup",
      "2 dashes smoked bitters"
    ],
    "method": "Stir all ingredients with ice, strain into a glass over a large ice cube, and garnish with a smoked rosemary sprig.",
    "garnish": "Smoked rosemary sprig"
  },
  {
    "name": "Toad in the Orchard",
    "slug": "toad-in-the-orchard",
    "description": "A crisp and autumnal whiskey cocktail with fresh apple, cinnamon, and a touch of honey.",
    "ingredients": [
      "40ml Natterjack Irish Whiskey",
      "20ml Apple cider",
      "10ml Honey syrup",
      "Dash of cinnamon bitters"
    ],
    "method": "Shake all ingredients with ice, strain into a glass, and garnish with an apple slice and a cinnamon stick.",
    "garnish": "Apple slice and cinnamon stick"
  },
  {
    "name": "Chai & Toad",
    "slug": "chai-and-toad",
    "description": "A rich and spiced whiskey cocktail infused with the deep warmth of chai.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "20ml Chai-infused syrup",
      "10ml Sweet vermouth"
    ],
    "method": "Shake all ingredients with ice, strain into a glass, and garnish with a cinnamon stick.",
    "garnish": "Cinnamon stick"
  },
  {
    "name": "The Midnight Leap",
    "slug": "midnight-leap",
    "description": "A dark and moody cocktail blending Natterjack with blackcurrant and a hint of anise.",
    "ingredients": [
      "50ml Natterjack Irish Whiskey",
      "20ml Blackcurrant liqueur",
      "5ml Absinthe rinse"
    ],
    "method": "Rinse the glass with absinthe, shake whiskey and blackcurrant liqueur with ice, strain, and garnish with a star anise pod.",
    "garnish": "Star anise pod"
  },
];
