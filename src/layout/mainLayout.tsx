import React from "react";
import Header from "@/src/components/header";
import Nav from "@/src/common/nav";
type PropsChildren = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: PropsChildren) => {
  return (
    <>
      <div className="min-h-full">
        <Header />
        <Nav />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
