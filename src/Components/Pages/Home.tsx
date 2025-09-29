import React, { JSX } from "react";
import MainLayout from "../Layouts/MainLayout";
import "./Home.css";

export default function Home(): JSX.Element {
  return (
    <MainLayout>
      <h1>Головна сторінка</h1>
      <p>Ласкаво просимо на наш сайт бронювання!</p>
    </MainLayout>
  );
}
