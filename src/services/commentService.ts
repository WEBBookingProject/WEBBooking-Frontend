import { CommentView } from "../models/CommentView";
import testComments from "../data/TestFiles/testComments.json";

export function getComments(): CommentView[] {
  return testComments.map((comment: CommentView) => ({
    id: comment.id,
    avatarUrl: comment.avatarUrl,
    name: comment.name,
    hotelName: comment.hotelName,
    daysAgo: comment.daysAgo,
    text: comment.text
  }));
}
