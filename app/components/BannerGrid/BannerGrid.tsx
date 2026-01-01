import Image from "next/image";
import Link from "next/link";

interface Banner {
  image: string;
  alt: string;
  link: string;
}

interface BannerGridProps {
  banners: Banner[];
}

const BannerGrid = ({ banners }: BannerGridProps) => {
  return (
    <div className='container mx-auto my-8 px-2'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {banners.map((banner, index) => (
          <Link href={`${banner.link}`} key={index}>
            <div className='rounded-lg overflow-hidden w-full sm:h-[150px] xl:h-[300px]'>
              <Image
                src={banner.image}
                alt={banner.alt}
                width={400}
                height={300}
                className='w-full h-auto object-cover rounded-lg'
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BannerGrid;
