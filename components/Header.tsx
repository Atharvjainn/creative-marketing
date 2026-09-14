import { getPayloadClient } from "@/lib/payload";
import HeaderClient from "./HeaderClient";

const defaultNav = [
  { label: "Solutions", url: "#solutions" },
  { label: "Features", url: "#features" },
  { label: "AI Power", url: "#ai-power" },
  { label: "Pricing", url: "#pricing" },
];

export default async function Header() {
  // Fetch the "Header" global directly from Payload
  const data = await getPayloadClient()
    .then((payload) => payload.findGlobal({ slug: "header" }))
    .catch((err) => {
      console.error("Failed to load 'header' global from Payload:", err);
      return null;
    });

  const brandName = data?.brandName || "Creative Marketing Agency";

  const navigation =
    data?.navigation && data.navigation.length > 0
      ? data.navigation.map((item) => ({
          label: item.label,
          url: item.url || "#",
        }))
      : defaultNav;

  const cta = data?.cta || {
    label: "Get Started",
    url: "#",
  };

  return (
    <HeaderClient
      brandName={brandName}
      navigation={navigation}
      cta={cta}
    />
  );
}
