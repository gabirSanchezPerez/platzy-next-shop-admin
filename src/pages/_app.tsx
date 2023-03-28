import type { AppProps } from "next/app";
import { ProviderAuth } from "@/src/hooks/useAuth";
import MainLayout from "@/src/layout/mainLayout";
import "@/src/styles/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderAuth>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ProviderAuth>
  );
}
