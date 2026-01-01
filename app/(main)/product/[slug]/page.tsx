import ShowProduct from "@/app/components/ShowProduct/ShowProduct";

interface PageProps {
  params: {
    slug: string,
  };
}

export default function Page({ params }: PageProps) {
  const attrProduct = params?.slug;
  return (
    <div>
      <ShowProduct attr={attrProduct} />
    </div>
  );
}
