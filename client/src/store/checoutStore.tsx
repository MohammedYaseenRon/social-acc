import { ShippingInfo } from "@/state/types";
import { create } from "zustand";

interface CheckoutStore {
    shippingInfo: ShippingInfo,
    setShippingInfo: (info: ShippingInfo) => void;

}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
    shippingInfo:{
        name:"",
        lastName:"",
        email:"",
        address:"",
        city:"",
        state:"",
        zipcode:"",
    },

    setShippingInfo: (info) => set({shippingInfo: info})
}))