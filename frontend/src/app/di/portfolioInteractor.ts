import { env } from "@shared/lib/config/env";
import { createHttpClient } from "@shared/lib/http/HttpClient";
import { StrapiPortfolioDataSource } from "@portfolio/data/datasources";
import { PortfolioRepositoryImpl } from "@portfolio/data/repositories";
import { PortfolioInteractor } from "@portfolio/core";

// Composition root: build the dependency graph once at startup.
const httpClient = createHttpClient(env.apiUrl);
const dataSource = new StrapiPortfolioDataSource(httpClient);
const repository = new PortfolioRepositoryImpl(dataSource);

export const portfolioInteractor = new PortfolioInteractor(repository);
