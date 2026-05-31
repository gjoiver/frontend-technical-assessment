import type { PageContent, Product } from "@products/core/entities";

export const productMock: Product = {
  id: 1,
  title: "Mechanical Keyboard",
  price: 99.9,
  category: "electronics",
  image: "https://img.test/keyboard.png",
};

export const pageContentMock: PageContent = {
  title: "Productos",
  intro: "Elige los productos que necesitas",
};
