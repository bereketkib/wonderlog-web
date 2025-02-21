export const metadata = {
  title: "About",
  description: "Explore thought-provoking articles from our community",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
