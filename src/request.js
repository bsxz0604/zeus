import axios from 'axios';

const service = axios.create({
    baseURL: 'http://111.231.132.239:13749'
})



export function CreatePartyA(data) {
    return service.post('/api/v1/party-a/', {
        ...data,
    })
}
export function GetPartyAList() {
    return service.get('/api/v1/party-a/');
}

export function GetPartyAInfo(id) {
    return service.get(`/api/v1/party-a/${id}`);
}

export function EditPartyAInfo(id) {
    return service.put(`/api/v1/party-a/${id}`);
}

export function DeletePartyAInfo(id) {
    return service.delete(`/api/v1/party-a/${id}`);
}

export function ContractPDF(id) {
    return service.get(`/api/v1/contracts/${id}/generate-docx-stream`, {
        responseType: 'blob',
    })
}


export function CreateContract(data) {
    return service.post('/api/v1/contracts/', {
        ...data,
    })
}
export function GetContractList() {
    return service.get('/api/v1/contracts/');
}

export function GetContractInfo(id) {
    return service.get(`/api/v1/contracts/${id}`);
}

export function EditContractInfo(id) {
    return service.put(`/api/v1/contracts/${id}`);
}

export function DeleteContractInfo(id) {
    return service.delete(`/api/v1/contracts/${id}`);
}





