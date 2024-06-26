import { posts } from "#site/content";
import PostItem from "@/components/Post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My blog",
  description: "my blog navigation page",
};

const POST_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POST_PER_PAGE * (currentPage - 1),
    POST_PER_PAGE * currentPage,
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My rambliings on all things web dev.
          </p>
        </div>
      </div>
      <hr className="mt-8" />
      {displayPosts?.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {displayPosts.map((post) => {
            const { slug, date, title, description, tags } = post;
            return (
              <li key={slug}>
                <PostItem
                  slug={slug}
                  title={title}
                  date={date}
                  description={description}
                  tags={tags}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Nothing to see here YET</p>
      )}

      <QueryPagination
        totalPages={totalPages}
        className="justify-center mt-8"
      />
    </div>
  );
}
