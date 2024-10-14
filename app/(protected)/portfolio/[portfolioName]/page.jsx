"use client";

import { GetTransactionsByPortfolioName } from "@/actions/transaction";
import { useServerAction } from "@/hooks/useServerAction";
import Portfolio from "@/components/portfolio/portfolio";

export default function Page({ params }) {
  const { portfolioName } = params;
  const {
    isLoading,
    data: originalTransactions,
    error,
    refetch,
  } = useServerAction(
    GetTransactionsByPortfolioName,
    "GetTransactionsByPortfolioName",
    decodeURI(portfolioName)
  );

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <>
      <Portfolio
        portfolioName={decodeURI(portfolioName)}
        originalTransactions={originalTransactions}
        handleRefetch={refetch}
      />
    </>
  );
}
