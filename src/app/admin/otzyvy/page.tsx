import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminReviews } from "@/lib/api/reviews";
import ApproveButton from "./ApproveButton";
import DeleteReviewButton from "./DeleteReviewButton";

const STARS = ["★", "★★", "★★★", "★★★★", "★★★★★"];

export default async function AdminOtzyvyPage() {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const reviews = await getAdminReviews(token);
  const pending = reviews.filter((r) => !r.isApproved).length;

  return (
    <div className="p-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#8a9188] mb-1">
          Управление
        </p>
        <h1 className="text-2xl font-heading">
          Отзывы
          {pending > 0 && (
            <span className="ml-3 text-sm font-normal bg-[#c9a84c] text-[#0f1210] px-2 py-0.5">
              {pending} на модерации
            </span>
          )}
        </h1>
      </div>

      <div className="border border-[#1e2a22] divide-y divide-[#1e2a22]">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`px-6 py-5 transition-colors ${
              !review.isApproved ? "bg-[#161b18]" : "hover:bg-[#161b18]/30"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  {!review.isApproved && (
                    <span className="shrink-0 text-xs bg-[#c9a84c]/20 text-[#c9a84c] px-2 py-0.5">
                      На модерации
                    </span>
                  )}
                  <span className="text-sm text-[#f5f5f0] font-medium">
                    {review.name}
                  </span>
                  <span className="text-[#c9a84c] text-sm">
                    {STARS[(review.rating ?? 1) - 1]}
                  </span>
                  <span className="text-xs text-[#8a9188]">
                    {new Date(review.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>
                <p className="text-sm text-[#8a9188] leading-relaxed mt-2">
                  {review.text}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {!review.isApproved && <ApproveButton id={review.id} />}
                <DeleteReviewButton id={review.id} name={review.name} />
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-center text-[#8a9188] text-sm py-12">
            Отзывов пока нет
          </p>
        )}
      </div>
    </div>
  );
}
