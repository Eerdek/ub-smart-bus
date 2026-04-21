import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { SplashScreen } from "./pages/SplashScreen";
import { HomeScreen } from "./pages/HomeScreen";
import { SearchRoutesScreen } from "./pages/SearchRoutesScreen";
import { RouteDetailScreen } from "./pages/RouteDetailScreen";
import { SearchStopsScreen } from "./pages/SearchStopsScreen";
import { StopDetailScreen } from "./pages/StopDetailScreen";
import { MapScreen } from "./pages/MapScreen";
import { FareScreen } from "./pages/FareScreen";
import { FavoritesScreen } from "./pages/FavoritesScreen";
import { SettingsScreen } from "./pages/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "home", Component: HomeScreen },
      { path: "search-routes", Component: SearchRoutesScreen },
      { path: "route/:id", Component: RouteDetailScreen },
      { path: "search-stops", Component: SearchStopsScreen },
      { path: "stop/:id", Component: StopDetailScreen },
      { path: "map", Component: MapScreen },
      { path: "fare", Component: FareScreen },
      { path: "favorites", Component: FavoritesScreen },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);
