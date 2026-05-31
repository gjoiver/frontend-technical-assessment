import { env } from "@shared/lib/config/env";
import { createHttpClient } from "@shared/lib/http/HttpClient";
import {
  FakeStoreProductDataSource,
  StrapiPageDataSource,
  ProductRepositoryImpl,
  PageRepositoryImpl,
} from "@products/data";
import { ProductsInteractor } from "@products/core";

const fakeStoreHttp = createHttpClient(env.fakeStoreUrl);
const strapiHttp = createHttpClient(env.apiUrl);

const productDataSource = new FakeStoreProductDataSource(fakeStoreHttp);
const pageDataSource = new StrapiPageDataSource(strapiHttp);

const productRepository = new ProductRepositoryImpl(productDataSource);
const pageRepository = new PageRepositoryImpl(pageDataSource);

export const productsInteractor = new ProductsInteractor(
  productRepository,
  pageRepository,
);
