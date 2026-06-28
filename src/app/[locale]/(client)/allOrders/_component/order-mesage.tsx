import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getTranslations } from "next-intl/server";

export default async function OrderMessage({ order }: { order: Order | null }) {
  if (!order) return null;

  // Translations
  const t = await getTranslations();

  // GetSession
  const session = await getServerSession(authOptions);

  // User email
  const userEmail = session?.user?.email;

  return (
    <div className="max-w-3xl mx-auto pt-8 px-4 rtl:space-x-reverse ">
      <Card className="border-emerald-leaf-600 mb-6 border-l-4 rounded-e-2xl bg-green-50 text-mint-green-800">
        <CardContent className="py-6">
          <div className="flex items-center text-emerald-l text-lg font-medium">
            {/* Icon */}
            <CheckCircle className="me-2" />

            {/* Title */}
            <span className="ml-2 text-blue-gray-900">{t("order-confirmation-title")}</span>
          </div>

          {/* Message */}
          <p className="text-sm mt-1 text-custom-gray">
            <span>{t("order-confirmation-message")} </span> {userEmail}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
