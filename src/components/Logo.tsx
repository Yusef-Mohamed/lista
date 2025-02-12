import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}> = ({ className, width, height, alt }) => {
  return (
    <>
      <Image
        width={width || 115}
        height={height || 58}
        alt={alt || "Logo"}
        className={cn("hidden dark:block aspect-[115/58]", className)}
        src={"/images/DarkLogo.png"}
      />
      <Image
        width={width || 115}
        height={height || 58}
        alt={alt || "Logo"}
        className={cn("dark:hidden aspect-[115/58]", className)}
        src={"/images/LightLogo.png"}
      />
    </>
  );
};

export default Logo;
