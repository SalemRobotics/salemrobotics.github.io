export type NewsletterArticle = {
  filePath: string;
  title: string;
  description: string;
};

const newsletters = import.meta.glob("./newsletter/*.json", {
  eager: true,
  import: "default",
});

export async function getNewsletterEditions(): Promise<NewsletterArticle[]> {
  return Object.entries(newsletters)
    .map(([path, metadata]) => {
      const filePath = path.replace("./newsletter/", "").replace(".json", "");

      return {
        filePath,
        ...(metadata as Omit<NewsletterArticle, "filePath">),
      };
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.filePath}-01`);
      const dateB = new Date(`${b.filePath}-01`);

      return dateB.getTime() - dateA.getTime();
    });
}
