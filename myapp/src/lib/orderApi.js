import axios from "axios";

export const getOrders = async () => {
  try {
    const response = await axios.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axios.post("/api/orders", order);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderByUser = async(id)=>{
    try {
        if (!id) throw new Error("User ID is missing");
        const response = await axios.get(`http://127.0.0.1:3000/api/users/${id}/orders`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}