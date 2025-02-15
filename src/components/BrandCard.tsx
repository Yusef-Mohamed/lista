"use client";
import { Link } from "@/i18n/routing";
import { IShop } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLocation } from "./LocationContext";
import { useMemo } from "react";
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
const BrandCard = ({ shop }: { shop: IShop }) => {
  const t = useTranslations("brands");
  const { location } = useLocation();
  const nearestBranch = useMemo(() => {
    if (location) {
      const branches = shop.branch_address;
      let nearestBranch = branches[0];
      let nearestDistance = getDistance(
        location.latitude,
        location.longitude,
        parseFloat(nearestBranch.lat),
        parseFloat(nearestBranch.lng)
      );
      for (const branch of branches) {
        const distance = getDistance(
          location.latitude,
          location.longitude,
          parseFloat(branch.lat),
          parseFloat(branch.lng)
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestBranch = branch;
        }
      }
      return nearestBranch;
    }
    return shop.branch_address[0];
  }, [location, shop.branch_address]);

  return (
    <div key={shop.id} className="border rounded-[8%] overflow-hidden">
      <Link href={`/brands/${shop.id}`}>
        <Image
          src={shop.background_image}
          alt={shop.shop_name}
          width={800}
          height={533}
          className="w-full transition-all object-cover brand"
        />
      </Link>
      <div className="py-3 px-4 flex items-start justify-between">
        <div>
          <Link href={`/brands/${shop.id}`}>
            <h3 className="text-2xl">{shop.shop_name}</h3>
          </Link>
          <p className="text-xs pt-2 ps-4 text-foreground/50">
            {shop.branches === 1
              ? t("oneBranch")
              : shop.branches === 2
              ? t("twoBranches")
              : t("nBranches", {
                  count: shop.branches,
                })}
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${nearestBranch.lat},${nearestBranch.lng}`}
            target="_blank"
            className="text-xs hover:underline py-2 ps-4 text-foreground/50"
          >
            {t("nearestBranchToYou")} {nearestBranch.title}
          </a>
        </div>
        <div className="flex gap-1 items-center fill-background text-background bg-gold w-fit px-2 py-1.5 rounded-full text-xs">
          {shop.rate}{" "}
          <svg
            width={10}
            height={10}
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.9125 9.625L2.725 6.40521L0 4.23958L3.6 3.95312L5 0.916664L6.4 3.95312L10 4.23958L7.275 6.40521L8.0875 9.625L5 7.91771L1.9125 9.625Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
