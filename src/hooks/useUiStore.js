import { useDispatch, useSelector } from "react-redux"
import { setMobileOpen } from "../store/uiSlice";

export const useUiStore = () => {

    const {mobileOpen} = useSelector(state => state.uiSlice);

    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        dispatch(setMobileOpen());
    }


  return {
    //Properties
    mobileOpen,

    //Methods
    handleDrawerToggle,
  }
}
