import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Users, AdminGames, AdminOrders, AdminQuestions, NotFound } from "./";
import { Loader } from "../components";
import { useState } from "react";

const paths = {
  users: "/",
  games: "/games",
  orders: "/orders",
  questions: "/questions",
};

export default function AdminPanel() {
  const { admin } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [admin]);

  if (loading) return <Loader />;
  if (!loading && !admin) return navigate("/");

  return (
    <Routes>
      <Route path={paths.users} element={<Users />} />
      <Route path={paths.games} element={<AdminGames />} />
      <Route path={paths.orders} element={<AdminOrders />} />
      <Route path={paths.questions} element={<AdminQuestions />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}
