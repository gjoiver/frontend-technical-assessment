import { Spinner } from "@shared/ui/atoms";
import { ErrorState } from "@shared/ui/molecules";
import { useProductsPage } from "@products/presentation/hooks/useProductsPage";
import { resolveProductsError } from "@products/presentation/i18n";
import { ProductsContent } from "@products/presentation/components";
import { Container, Centered } from "./ProductsPage.styles";
import type { ProductsPageProps } from "./ProductsPage.types";

export function ProductsPage({ interactor }: ProductsPageProps) {
  const { data, loading, error } = useProductsPage(interactor);

  if (loading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  if (error || !data) {
    return <ErrorState message={resolveProductsError(error)} />;
  }

  return (
    <Container>
      <ProductsContent data={data} />
    </Container>
  );
}
