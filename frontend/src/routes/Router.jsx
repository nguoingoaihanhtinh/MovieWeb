import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetail from "../pages/DetailPage";
import WatchPage from "../pages/WatchPage/WatchPage";
import FilmListPage from "../pages/FilmList/FilmListPage";
import SearchPage from "../pages/SearchPage/SearchPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="detail/:name" element={<MovieDetail />} />
        <Route path="watch/:name/episode/:id" element={<WatchPage />} />
        <Route path="list" element={<FilmListPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Route>
  )
);
export default Router;
