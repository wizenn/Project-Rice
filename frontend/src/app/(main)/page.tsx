import Banner from "@/components/banner";

import Product from "@/components/product";
export default function Home() {
  return (
    <main className="pt-20 mb-20">
      <Banner />
      <div className="mb-20">
        <Product />
      </div>
    </main>

  );
}
