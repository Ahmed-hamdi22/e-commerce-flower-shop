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
    <div className="mx-auto max-w-3xl pt-6 sm:pt-8 rtl:space-x-reverse">
      <Card className="border-emerald-leaf-600 mb-6 border-l-4 rounded-e-2xl bg-green-50 text-mint-green-800">
        <CardContent className="px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-start text-base font-medium text-emerald-l sm:items-center sm:text-lg">
            {/* Icon */}
            <CheckCircle className="me-2 mt-0.5 shrink-0 sm:mt-0" />

            {/* Title */}
            <span className="min-w-0 break-words text-blue-gray-900 ltr:ml-2">
              {t("order-confirmation-title")}
            </span>
          </div>

          {/* Message */}
          <p className="mt-2 break-words text-sm text-custom-gray">
            <span>{t("order-confirmation-message")} </span> {userEmail}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
