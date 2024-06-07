import axios from "axios";

export const getAlatMusik = async () => {
    const response = await axios.get(`https://testcaseapp123.000webhostapp.com/resource`)
    // console.log(JSON.stringify(response));
    return response;
}

export const getAlatMusikDetail = async (id) => {
    // console.log(`id adalah ${id}`);
    const response = await axios.get(`https://testcaseapp123.000webhostapp.com/resource/show/${id}`)
    // console.log(JSON.stringify(response.data));

    return response.data;
}
