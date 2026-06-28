import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const dataPerson = [
  {
    id: 1,
    image: "/assets/images/about-us/person1.jpg",
    alt: "Image 1",
    name: "Ahmed Mohammed",
    title: "Senior Graphic",
  },
  {
    id: 2,
    image: "/assets/images/about-us/person2.jpg",
    alt: "Image 2",
    name: "Ahmed Mohammed",
    title: "Senior Graphic",
  },
  {
    id: 3,
    image: "/assets/images/about-us/person3.jpg",
    alt: "Image 3",
    name: "Ahmed Mohammed",
    title: "Senior Graphic",
  },
  {
    id: 4,
    image: "/assets/images/about-us/person4.jpg",
    alt: "Image 4",
    name: "Ahmed Mohammed",
    title: "Senior Graphic",
  },
];

const SocialIcons = [
  { icon: Facebook, name: "Facebook" },
  { icon: Instagram, name: "Instagram" },
  { icon: Twitter, name: "Twitter" },
  { icon: Youtube, name: "YouTube" },
];

export default async function OurTeamSection() {
  // Translations
  const t = await getTranslations();

  return (
    <div>
      {/* About us Title */}
      <div className="flex flex-col sm:items-center gap-2  relative z-10 max-w-[442px] mx-auto py-[5px]">
        <h2 className="text-custom-rose-900 uppercase font-roboto font-bold text-[17px] leading-[30.6px] tracking-[4px]">
          {t("our-team")}
        </h2>
        <p
          className={`text-blue-gray-900 font-inter font-bold text-[20px] md:text-[30px] leading-[24.2px] md:leading-[30.31px] relative z-10`}
        >
          {t("meet-out-expert")} <span>{t("team")}</span>
        </p>

        {/* The Decorate Line */}
        <div className="absolute start-0 top-[61px] z-0 w-[338px] h-[17px] bg-main-color ltr:rounded-tr-[20px] ltr:rounded-br-[20px] rtl:rounded-tl-[20px] rtl:rounded-bl-[20px]  after:absolute after:bottom-0 after:start-0 after:w-[161px] after:h-[2px] after:bg-custom-rose-900"></div>
      </div>

      {/* Cards */}
      <div className="container flex gap-5 mt-10 justify-center flex-wrap">
        {dataPerson.map((item) => {
          return (
            <Card
              key={item.id}
              className="group border flex flex-col p-5 rounded-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <CardHeader className="p-0">
                <div className="w-full aspect-[254/274] relative rounded-t-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 254px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </CardHeader>

              {/* Description  */}
              <CardContent className="mt-3 space-y-1">
                <h1 className="text-xl font-bold text-gray-900">{t(item.name)}</h1>
                <h2 className="text-custom-rose-800 font-medium">{t(item.title)}</h2>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 mt-auto">
                <Separator className="w-4/5 mx-auto" />

                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                  {SocialIcons.map((social) => (
                    <Link
                      key={social.name}
                      href="#"
                      aria-label={`${item.name}'s ${social.name}`}
                      className="bg-custom-rose-600 text-white rounded-full w-9 h-9 p-1 hover:bg-custom-rose-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
