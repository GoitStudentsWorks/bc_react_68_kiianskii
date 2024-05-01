import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
// import { selectIsRefreshing } from './redux/auth/authSlice'
import { refreshThunk } from "./redux/auth/operations";
import { currencyThunk } from "./redux/currency/operations";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ButtonAddTransactions from "./components/ButtonAddTransactions/ButtonAddTransactions";

function App() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing)

  useEffect(() => {
    dispatch(currencyThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(refreshThunk());
    dispatch(userTransactionsThunk());
  }, [dispatch]);

  // const isRefreshing = useSelector(selectIsRefreshing)

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<DashboardPage />} /> */}
          <Route path="/home" element={<HomeTab />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/statistics" element={<StatisticsTab />} />
          <Route
            path="/btnAddTransactions"
            element={<ButtonAddTransactions />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
