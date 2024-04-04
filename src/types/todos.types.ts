export type TTask = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: Date;
  isCompleted?: false;
  authorId: string;
};
