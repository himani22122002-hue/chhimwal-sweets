import prisma from "./src/config/db.js";

const products = [
  {
    name: "Baal Mithai",
    slug: "baal-mithai",
    description:
      "Traditional Kumaoni sweet made from khoya, coated with sugar balls.",
    image: "/images/baall.png",
    category: "Baal Mithai",
    variants: [
      ["250g", 220],
      ["500g", 420],
      ["1kg", 800],
    ],
  },
  {
    name: "Singodi",
    slug: "singodi",
    description:
      "Delicious khoya sweet wrapped in fragrant Malu leaf.",
    image: "/images/singodi.png",
    category: "Singodi",
    variants: [
      ["6 Pieces", 250],
      ["12 Pieces", 480],
      ["24 Pieces", 920],
    ],
  },
  {
    name: "Peda",
    slug: "peda",
    description:
      "Soft, creamy milk fudge prepared with pure desi ghee.",
    image: "/images/peda.png",
    category: "Peda",
    variants: [
      ["250g", 180],
      ["500g", 350],
      ["1kg", 680],
    ],
  },
  {
    name: "Jalebi",
    slug: "jalebi",
    description:
      "Freshly fried crispy, syrup-soaked golden spirals.",
    image: "/images/jalebii.png",
    category: "Jalebi",
    variants: [
      ["250g", 150],
      ["500g", 280],
      ["1kg", 540],
    ],
  },
  {
    name: "Besan Laddu",
    slug: "besan-laddu",
    description:
      "Roasted gram flour balls enriched with nuts and desi ghee.",
    image: "/images/besan.png",
    category: "Besan Laddu",
    variants: [
      ["250g", 160],
      ["500g", 300],
      ["1kg", 580],
    ],
  },
  {
    name: "Milk Cake",
    slug: "milk-cake",
    description: "Rich, creamy traditional milk cake.",
    image: "/images/milk-cake.png",
    category: "Milk Sweets",
    variants: [
      ["250g", 200],
      ["500g", 380],
      ["1kg", 750],
    ],
  },
];

async function main() {
  for (const product of products) {
    const category = await prisma.category.upsert({
      where: {
        slug: product.category.toLowerCase().replace(/\s+/g, "-"),
      },
      update: {},
      create: {
        name: product.category,
        slug: product.category.toLowerCase().replace(/\s+/g, "-"),
      },
    });

    const createdProduct = await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: {
        name: product.name,
        description: product.description,
        image: product.image,
        categoryId: category.id,
        active: true,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        image: product.image,
        categoryId: category.id,
        active: true,
        variants: {
          create: product.variants.map(([weight, price], index) => ({
            sku: `${product.slug}-${index + 1}`,
            weight,
            price,
            stock: 100,
          })),
        },
      },
    });

    console.log(`Added: ${createdProduct.name}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });