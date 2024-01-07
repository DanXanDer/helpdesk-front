import { useDispatch, useSelector } from "react-redux";
import { setActiveRoute, setMobileOpen } from "../store/uiSlice";

export const useUiStore = () => {
  const { mobileOpen, activeRoute } = useSelector((state) => state.uiSlice);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen());
  };

  const handleActiveRoute = (route) => {
    dispatch(setActiveRoute(route));
  };

  return {
    //Properties
    mobileOpen,
    activeRoute,

    //Methods
    handleDrawerToggle,
    handleActiveRoute,
  };
};
