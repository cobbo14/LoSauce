import {Link} from 'react-router';
import {blogPosts} from '~/data/blog';

export const meta = () => {
  return [
    {title: 'Blog — Locally Sauced'},
    {
      name: 'description',
      content:
        'Stories from behind the scenes at Locally Sauced. Restaurant spotlights, cooking tips, and the story behind the binder.',
    },
  ];
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
          From the Kitchen
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Stories from behind the scenes, restaurant spotlights, cooking tips,
          and the journey of building Locally Sauced.
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-8">
        {sorted.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            prefetch="intent"
            className="group block"
          >
            <article className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary">
                  {post.category}
                </span>
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
