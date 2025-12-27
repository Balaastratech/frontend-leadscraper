// src/hooks/useBillingPage.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, fetchUsage, startCheckout } from "../store/billingSlice";

export default function useBillingPage() {
  const dispatch = useDispatch();
  const { plans, usage, checkout } = useSelector((s) => s.billing);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchUsage());
  }, [dispatch]);

  const buy = async (pid) => {
    const res = await dispatch(startCheckout(pid));
    const url = res.payload?.checkoutUrl;
    if (url) window.location.href = url;
  };

  return { plans, usage, checkout, buy };
}
