import {Link, useParams} from 'react-router';
import {blogPosts} from '~/data/blog';

export const meta = ({params}) => {
  const post = blogPosts.find((p) => p.id === params.id);
  if (!post) return [{title: 'Post Not Found — Locally Sauced'}];
  return [
    {title: `${post.title} — Locally Sauced`},
    {name: 'description', content: post.excerpt},
  ];
};

export default function BlogPostPage() {
  const {id} = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find that blog post.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <hr className="mb-10 border-border" />

      {/* Content */}
      <div className="space-y-6 text-foreground/80 leading-relaxed text-base">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <hr className="my-12 border-border" />

      {/* Footer CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold mb-3">Enjoyed this?</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
          Explore our recipe collection or grab a binder and start cooking like
          a local.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/recipes"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Recipes
          </Link>
          <Link
            to="/collections/all"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md border border-border font-medium hover:bg-muted transition-colors"
          >
            Shop the Binder
          </Link>
        </div>
      </div>
    </div>
  );
}
