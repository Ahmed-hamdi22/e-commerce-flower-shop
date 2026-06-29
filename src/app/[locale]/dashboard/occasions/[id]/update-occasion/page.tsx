import fetchOccasionById from "@/lib/apis/occasion.api";
import UpdateOccasionForm from "./_components/update-occasion.form";

export default async function UpdateOccasionPage({ params }: { params: { id: string } }) {
  const occasionId = params.id;
  const occasionData = await fetchOccasionById(occasionId);

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-10">
      {/* Update occasion form */}
      <UpdateOccasionForm initialData={occasionData} occasionId={occasionId} />
    </div>
  );
}
