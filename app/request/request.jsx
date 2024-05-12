import axios from "axios";

export const getAlatMusik = async () => {
    const response = await axios.get(`https://appdev161.000webhostapp.com/resource`)
    return response;
    console.log(JSON.stringify(response));
}

export const getAlatMusikDetail = async (id) => {
    const response = await axios.get(`https://appdev161.000webhostapp.com/show/${id}`)
    return response.data;
    // console.log(JSON.stringify(response.data));
}
