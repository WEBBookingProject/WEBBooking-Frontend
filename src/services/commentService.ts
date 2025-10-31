import { CommentView } from "../models/CommentView";
import { getHotelById } from "./hotelService";

const API_BASE_URL = "https://localhost:7073/api";

export async function getComments(): Promise<CommentView[]> {
  const res = await fetch(`${API_BASE_URL}/review/Get3LastPositiveAsync`);
  const data = await res.json();

  const comments: CommentView[] = await Promise.all(
    data.map(async (review: any) => {
      const createdAt = new Date(review.createdAt);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

      let hotelName = "Hotel Name";
      try {
        const hotel = await getHotelById(review.propertyId);
        hotelName = hotel.name;
      } catch (err) {
        console.warn(`Hotel not found for id ${review.propertyId}`);
      }

      return {
        id: review.id.toString(),
        avatarUrl: "/icons/test/user.svg",
        name: "Anonymous",
        hotelName,
        daysAgo: diffDays,
        text: review.text,
      } as CommentView;
    })
  );

  return comments;
}
